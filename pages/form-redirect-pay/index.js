import Header from "../../components/ui-layouts/header";
import styles from "./RedirectPay.module.css";
import { CheckStatusAction } from "../../store/actions/checkStatus-action";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Languages from "../../components/languages/languages";
import Footer from "../../components/ui-layouts/footer";
import PaymentDetail from "../../components/payment-detail/paymentDetail";
import {
  CREDIT_CARD_URL,
  MPU_REDIRECT_URL,
  RedirectUrl,
  REDIRECT_CB,
  REDIRECT_MPiteSan
} from "../../store/type";
import { GetTokenAction } from '../../store/actions/getToken-action';

const FormRedirectPay = ({ dispatch, checkStatusResponse }) => {
  const router = useRouter();
  const cookie = new Cookies();
  const [language, setLanguage] = useState("my");
  const submittedVal = cookie.get("submittedVal");
  const payApiRes = cookie.get("payApiRes");
  const transactionNum = payApiRes?.transactionNum;
  const formToken = payApiRes?.formToken;
  const provider = submittedVal?.providerName;
  const merchantOrderId = payApiRes?.merchOrderId;

  const RedirectFunc = () => {
    if (
      provider == "KBZ Pay" ||
      provider == "Mytel" ||
      provider == "WAVE PAY" ||
      provider == "KBZ Direct Pay" ||
      provider == "Citizens" ||
      provider == "MAB Bank"
    ) {
      window.location =
        RedirectUrl +
        "?merchantOrderId=" +
        merchantOrderId +
        "&transactionNo=" +
        transactionNum +
        "&formToken=" +
        formToken;
    } else if (provider == "MPU") {
      window.location =
        MPU_REDIRECT_URL +
        "?transactionNumber=" +
        transactionNum +
        "&formToken=" +
        formToken;
    } else if (
      provider == "Visa" ||
      provider == "Master" ||
      provider == "JCB"
    ) {
      window.location =
        CREDIT_CARD_URL +
        "?merchantOrderId=" +
        merchantOrderId +
        "&transactionNum=" +
        transactionNum +
        "&formToken=" +
        formToken;
    } else if (
      provider == "CB Pay" 
    ) {
      window.location =
        REDIRECT_CB +
        "?merchantOrderId=" +
        merchantOrderId +
        "&transactionNumber=" +
        transactionNum +
        "&formToken=" +
        formToken
    } else if (
      provider == "MPitesan" 
    ) {
      window.location =
        REDIRECT_MPiteSan +
        "?merchantOrderId=" +
        merchantOrderId +
        "&transactionNumber=" +
        transactionNum +
        "&formToken=" +
        formToken
    }
  };

  useEffect(() => {

    if (checkStatusResponse.response.status === "SUCCESS")
      router.push({
        pathname: "/payment-success",
        query: {
          merchantOrderId: merchantOrderId,
        },
      });

    const interval = setInterval(() => {
      transactionNum !== ""
        ? dispatch(CheckStatusAction(transactionNum))
        : null;
    }, 5000);
    return () => clearInterval(interval);
  }, [checkStatusResponse.response]);

  useEffect(() => {
    const interval = setInterval(() => {
      cookie.remove("ba_token");
      dispatch(GetTokenAction());
    }, 780000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="bg-gray">
      <div className="container" id={language}>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="border-box bg-white mt-md-5 mt-3">
              <Header setLanguage={setLanguage} language={language} />

              <PaymentDetail language={language} />

              <p className={styles.qr_text}>
                {Languages[language].redirect_text}
              </p>
              <div className={styles.click_confrim}>
                <button onClick={() => RedirectFunc()}>
                  {Languages[language].proceed}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect((state) => ({
  checkStatusResponse: state.checkStatusResponse,
}))(FormRedirectPay);
