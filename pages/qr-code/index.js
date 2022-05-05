import Header from "../../components/ui-layouts/header";
import styles from "./Qr.module.css";
import { CheckStatusAction } from "../../store/actions/checkStatus-action";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Languages from "../../components/languages/languages";
import Footer from "../../components/ui-layouts/footer";
import PaymentDetail from "../../components/payment-detail/paymentDetail";
import { GetTokenAction } from '../../store/actions/getToken-action';

const QrCode = ({ dispatch, checkStatusResponse }) => {
  const QRCode = require("qrcode.react");
  const router = useRouter();
  const cookie = new Cookies();
  const payApiRes = cookie.get("payApiRes");
  const transactionNum = payApiRes?.transactionNum;
  const merchantOrderId = payApiRes?.merchOrderId;
  const qrCode = payApiRes?.qrCode;
  const [language, setLanguage] = useState("my");

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
              <p className={styles.qr_text}>{Languages[language].scan_qr}</p>
              <div className={styles.qr_div}>
                <QRCode value={qrCode} />
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
}))(QrCode);
