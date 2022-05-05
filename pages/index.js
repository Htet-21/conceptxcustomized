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

const FormPaymentVIU = ({ token, payApiRes }) => {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [submitVal, setSubmitVal] = useState(null);
  const [language, setLanguage] = useState("my");

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

  const formik = useFormik({
    initialValues: {
      providerName: "",
      methodName: "",
      totalAmount: 18000,
      orderId: "",
      customerPhone: "",
      customerName: "",
      items: `[{\"name\":\"Classic Luxury Store Payment Form\",\"amount\": \"18000\",\"quantity\":\"1\"}]`,
      email: "",
      billToForeName: "",
      billToSurName: "",
      billAddress: "",
      billCity: "",
      description:""
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
            }),
        }),
      billAddress: Yup.string().when("providerName", {
        is: "Visa",
        then: Yup.string().required(
          Languages[language].billing_address_required
        ),
        otherwise: Yup.string().when("providerName", {
          is: "JCB",
          then: Yup.string().required(
            Languages[language].billing_address_required
          ),
        }),
      }),
      billCity: Yup.string().when("providerName", {
        is: "Visa",
        then: Yup.string().required(Languages[language].billing_city_required),
        otherwise: Yup.string().when("providerName", {
          is: "JCB",
          then: Yup.string().required(
            Languages[language].billing_city_required
          ),
        }),
      }),
      description: Yup.string(),
      customerAddress: Yup.string().required(Languages[language].enter_address1),
      orderIdNumber: Yup.string().required(Languages[language].enter_orderIdNumber),
      totalAmount: Yup.number().required(Languages[language].totalAmount_required)
    }),
    onSubmit: (values) => {
      rsaFunction(values);
      setSubmitVal(values);
      cookie.set("submittedVal", JSON.stringify(values));
    },
  });

  useEffect(() => {
    if(formik.values.orderIdNumber){
      formik.setFieldValue("description", `Order ID : ${formik.values.orderIdNumber}`);
    }
  }, [formik.values.orderIdNumber]);

  const NodeRSA = require("node-rsa");
  const rsaFunction = (values) => {

    /* production publick key */
    const pubKey =
       "-----BEGIN PUBLIC KEY-----\n" +
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJQdvERD9tqtTbgFD1MMLycARiBz/4k67p8yFgpsr61g7c8esQh7F3Yy5HbvJcwQx18yJzs6jXfpiDBwEaYutz3e4AIu+m1WeNUpEpUqZVDu0IZspjliubHEfpBqAq2GEgQc4joToV1p1+NYf/UHn7BmER76rxYM4UjmgElRwvCQIDAQAB";
    ("-----END PUBLIC KEY-----");

    /* dev public key */
    /* const pubKey =
       "-----BEGIN PUBLIC KEY-----\n" +
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCAiLiFXNUu6fe4POPDuhxeEhGne1BR3Usp0/r5MpxHpARBjAJCG1j6B6FuAEdf1M63uI4rymKVQGK6P7IbOplJ+VbYqyXmG4vqHS6UA8NgmAWzhF7/b8LG45xFcW3qr73T80/iEPRCAyKsEn9LL0gwlObG01KUv/jf7B+ci3ZavQIDAQAB";
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
        <title>Classic Luxury Store (Payment Form)</title>
        <link rel="icon" href="/images/tab_icon.jpg" type="image/png" sizes="16x16"/>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />

        {/* Open Graph */}
        <meta property="og:url" content="https://classicluxury.dinger.asia" key="ogurl" />
        <meta property="og:image" content='/images/burmese_auto.jpg' key="ogimage" />
        <meta property="og:site_name" content="Classic Luxury Store (Payment Form)" key="ogsitename" />
        <meta property="og:title" content="Classic Luxury Store (Payment Form) | Dinger" key="ogtitle" />
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
                <PaymentForm formik={formik} language={language} />
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
  payApiRes: state.viuPayApi
}))(FormPaymentVIU);
