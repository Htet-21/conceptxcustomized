import Cookies from "universal-cookie";
import Languages from "../languages/languages";
import styles from "./PayDetail.module.css";

const PaymentDetail = ({ language }) => {
  const cookie = new Cookies();
  const submittedVal = cookie.get("submittedVal");

  return (
    <div className={styles.payment_detail} id={language}>
      <h2 className={styles.qr_title} id={language}>
        {Languages[language].pay_detail}
      </h2>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.left_text}>{Languages[language].phone}</p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.right_text}>{submittedVal?.customerPhone}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.left_text}>{Languages[language].amount}</p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.right_text}>
            {submittedVal?.totalAmount} {Languages[language].mmk}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.left_text}>
            {Languages[language].provider_name}
          </p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.right_text}>{submittedVal?.providerName}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.left_text}>{Languages[language].method}</p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <p className={styles.right_text}>{submittedVal?.methodName}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
