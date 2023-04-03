import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, connect } from "react-redux";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Cookies from "universal-cookie";
import { error } from "../store/type";
import router from "next/router";
import Header from "../components/ui-layouts/header";
import PaymentForm from "../components/form/paymentForm";
import Languages from "../components/languages/languages";
import { GetTokenAction } from "../store/actions/getToken-action";
import { PayConfirmAcition } from "../store/actions/payConfirmAction";
import Footer from "../components/ui-layouts/footer";
import Head from 'next/head';

const FormPaymentVIU = ({ token, payApiRes, calculateFees }) => {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [submitVal, setSubmitVal] = useState(null);
  const [language, setLanguage] = useState("my");
  const [totalWithTransFees, setTotalWithTransFees] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(GetTokenAction());
    cookie.remove("ba_token");
    cookie.remove("payApiRes");
    cookie.remove("submittedVal");

    //create order id with uuid and set the value
    let orderId = uuidv4();
    formik.setFieldValue("orderId", orderId);

    //call token every 13min
    const interval = setInterval(() => {
      cookie.remove("ba_token");
      dispatch(GetTokenAction());
    }, 780000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(calculateFees.code == error.REQUEST_SUCCESS){
      setLoading(false);
      let total = JSON.parse(totalAmount) + calculateFees.response.transactionFees;
      setTotalWithTransFees(total);
      formik.setFieldValue("totalAmount", total);
      formik.setFieldValue("additionalFees", calculateFees.response.transactionFees);
    }
  }, [calculateFees])

  const formik = useFormik({
    initialValues: {
      providerName: "",
      methodName: "",
      totalAmount: 0,
      orderId: "",
      customerPhone: "",
      customerName: "",
      items: "",
      email: "",
      billToForeName: "",
      billToSurName: "",
      billAddress: "",
      billCity: "",
      description:"",
      additionalFees:0
    },
    validationSchema: Yup.object({
      providerName: Yup.string()
        .max(20, Languages[language].max_20_length)
        .required(Languages[language].bank_type_required),
      methodName: Yup.string()
        .max(20, Languages[language].max_20_length)
        .required(Languages[language].payment_method_required),
      totalAmount: Yup.number()
        .required(Languages[language].totalAmount_required),
      customerPhone: Yup.string().matches(phoneRegExp, Languages[language].invalid_phone_number).required(Languages[language].phone_number_required).max(50, Languages[language].max_50_length),
      email: Yup.string()
        .email(Languages[language].invalid_email)
        .when("providerName", {
          is: "Visa",
          then: Yup.string().required(Languages[language].email_required),
          otherwise: Yup.string()
            .email(Languages[language].invalid_email)
            .when("providerName", {
              is: "JCB",
              then: Yup.string().required(Languages[language].email_required),
            })
            .when("providerName", {
              is: "Master",
              then: Yup.string().required(Languages[language].email_required),
            }),
        }),
      billToForeName: Yup.string()
        .max(20, Languages[language].max_20_length)
        .when("providerName", {
          is: "Visa",
          then: Yup.string().required(Languages[language].firstName_required),
          otherwise: Yup.string()
            .max(20, Languages[language].max_20_length)
            .when("providerName", {
              is: "JCB",
              then: Yup.string().required(
                Languages[language].firstName_required
              ),
            })
            .when("providerName", {
              is: "Master",
              then: Yup.string().required(
                Languages[language].firstName_required
              ),
            }),
        }),
      billToSurName: Yup.string()
        .max(20, Languages[language].max_20_length)
        .when("providerName", {
          is: "Visa",
          then: Yup.string().required(Languages[language].lastName_required),
          otherwise: Yup.string()
            .max(20, Languages[language].max_20_length)
            .when("providerName", {
              is: "JCB",
              then: Yup.string().required(
                Languages[language].lastName_required
              ),
            }).when("providerName", {
              is: "Master",
              then: Yup.string().required(
                Languages[language].lastName_required
              ),
            }),
        }),
      billAddress: Yup.string()
        .when("providerName", {
          is: "Visa",
          then: Yup.string().required(
            Languages[language].billing_address_required
          ),
          otherwise: Yup.string()
            .when("providerName", {
              is: "JCB",
              then: Yup.string().required(
                Languages[language].billing_address_required
              ),
            }).when("providerName", {
              is: "Master",
              then: Yup.string().required(
                Languages[language].billing_address_required
              ),
            }),
      }),
      billCity: Yup.string().when("providerName", {
        is: "Visa",
        then: Yup.string().required(Languages[language].billing_city_required),
        otherwise: Yup.string()
          .when("providerName", {
            is: "JCB",
            then: Yup.string().required(
              Languages[language].billing_city_required
            ),
          }).when("providerName", {
            is: "Master",
            then: Yup.string().required(
              Languages[language].billing_city_required
            ),
          }),
      }),
      description: Yup.string(),
      customerName: Yup.string().required(Languages[language].enter_customerName),
      totalAmount: Yup.number().required(Languages[language].totalAmount_required).min(100)
    }),
    onSubmit: (values) => {
      let result = {...values};
      rsaFunction(result);
      setSubmitVal(result);
      cookie.set("submittedVal", JSON.stringify(result));
    },
  });
  
  useEffect(() => {
    if(formik.values.customerName){
      formik.setFieldValue("description", `Student Name : ${formik.values.customerName}`);
    }
  }, [formik.values.customerName]);

  const NodeRSA = require("node-rsa");
  const rsaFunction = (values) => {

    /* production publick key */
    const pubKey =
       "-----BEGIN PUBLIC KEY-----\n" +
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCylSaeUXbXn5grxB6sczMG+iJ3o/J431Cqe7wWMX4Etahepy3p9xfn1rf9ky9Fu2I0VsrBMiGOewJ6zQwiYN6X44BeJI0c/SSUmgEXJfXjDCXLRMYPxl+OLZEPTaGB9hgWqOxmAN8eM4b+vkrK79PA1sET78thBRcGSsLoceWIfwIDAQAB";
    ("-----END PUBLIC KEY-----");

    /* dev public key */
   /*  const pubKey =
       "-----BEGIN PUBLIC KEY-----\n" +
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfzDObYSSRoTbZsKifgk/3kKj2ItxC48vNkantCJonahgGf06Rjr21Mrz85X75bK7ND7GVmcanfa2Hu3G18ErMDh17qSR1cS+HDJaeXOqEQ7ZTU+sSntn2FHY+78OQfBiNAhDutDf0XPx+QpDadNXH4JRRBmKAu2ylb6CnrpM8swIDAQAB";
    ("-----END PUBLIC KEY-----"); */

    const publicKey = new NodeRSA();
    publicKey.importKey(pubKey, "pkcs8-public");
    publicKey.setOptions({ encryptionScheme: "pkcs1" });
    const encrytpStr = publicKey.encrypt(values, "base64");
    let formData = new FormData();
    formData.append("payload", encrytpStr);
    dispatch(PayConfirmAcition(formData));
  }; //encrypteDataWithRsa

  return (
    <>
      <Head>
        <title>ConceptX (Payment Form)</title>
        <link rel="icon" href="/images/classicluxury.jpeg" type="image/png" sizes="16x16"/>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />

        {/* Open Graph */}
        <meta property="og:url" content="http://conceptx.dinger.asia/" key="ogurl" />
        <meta property="og:image" content='/images/classicluxury.jpeg' key="ogimage" />
        <meta property="og:site_name" content="ConceptX (Payment Form)" key="ogsitename" />
        <meta property="og:title" content="ConceptX (Payment Form) | Dinger" key="ogtitle" />
      </Head>
      <div className="bg-gray">
        <div className="container" id={language}>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <div className="border-box bg-white mt-md-5 mt-3">
                <Header setLanguage={setLanguage} language={language} />
                <h2 className="h4 pt-3" id={language}>
                  {Languages[language].formTitle}
                </h2>
                <PaymentForm formik={formik} language={language} calculateFees={calculateFees?.response} totalWithTransFees={totalWithTransFees} setTotalAmount={setTotalAmount} totalAmount={totalAmount} setLoading={setLoading} loading={loading} setTotalWithTransFees={setTotalWithTransFees}/>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default connect((state) => ({
  token: state.getToken,
  payApiRes: state.viuPayApi,
  calculateFees: state.calculateFees
}))(FormPaymentVIU);
