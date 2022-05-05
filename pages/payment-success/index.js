import Header from "../../components/ui-layouts/header";
import styles from "./PaySuccess.module.css";
import { useDispatch, connect } from "react-redux";
import { ReceiptAction } from "../../store/actions/receipt-action";
import Cookies from "universal-cookie";
import Footer from "../../components/ui-layouts/footer";
import Languages from "../../components/languages/languages";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TransactionDetailAction } from "../../store/actions/transactionDetail-action";
import { useRouter } from "next/router";
import Head from 'next/head';
import * as fbq from '../../lib/fpixel';
import { GetTokenAction } from '../../store/actions/getToken-action';

const PaymentSuccess = ({ transactionDetailResponse }) => {
  const cookies = new Cookies();
  const [language, setLanguage] = useState("my");
  const dispatch = useDispatch();
  const router = useRouter();
  const merchantOrderId = router.query.merchantOrderId;
  const token = cookies.get("ba_token");

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview()

    const handleRouteChange = () => {
      fbq.pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if (token == null) {
      dispatch(GetTokenAction());
      const interval = setInterval(() => {
        token !== ""
          ? dispatch(TransactionDetailAction(merchantOrderId))
          : null;
      }, 3000);
      return () => clearInterval(interval);

    } else {
      const interval = setInterval(() => {
        token !== ""
          ? dispatch(TransactionDetailAction(merchantOrderId))
          : null;
      }, 3000);
      return () => clearInterval(interval);
    }

  }, []);

  return (

    <>

      <Head>
        <script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
          }}
        />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=AW-781027320`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('event', 'conversion', {'send_to': 'AW-781027320/sWBPCNLvuY4DEPiPtvQC'});
            gtag('config', 'AW-781027320');
          `,
          }}
        />

      </Head>

      <div className="bg-gray">
        <div className="container" id={language}>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <div className="border-box bg-white mt-md-5 mt-3">
                <Header setLanguage={setLanguage} language={language} />

                {transactionDetailResponse.response.state === "SUCCESS" ? (
                  <div className={styles.success_div}>
                    <div className={styles.left_div}>
                      <img src="/images/success_icon.svg" />
                    </div>
                    <div className={styles.right_div}>
                      <h3 className={styles.pay_success_text} id={language}>
                        {Languages[language].pay_sucess_text}
                      </h3>
                      <p className={styles.bot_text}>
                        { }
                        {Languages[language].tfyp}
                      </p>
                    </div>
                  </div>
                ) : null}

                {transactionDetailResponse.response.state === "PENDING" ? (
                  <div className={styles.success_div}>
                    <p className={styles.pending_text}>
                      {Languages[language].pay_pending_text}
                    </p>
                  </div>
                ) : null}

                {transactionDetailResponse.response.state === "ERROR" ? (
                  <div className={styles.success_div}>
                    <p className={styles.bot_text}>
                      {Languages[language].pay_error_text}
                    </p>
                    <div className={styles.click_confrim}>
                      <button onClick={() => window.location.assign('/')}>
                        {Languages[language].try_again}
                      </button>
                    </div>
                  </div>
                ) : null}

                <div className={styles.payment_detail} id={language}>
                  <h2 className={styles.qr_title} id={language}>
                    {Languages[language].pay_detail}
                  </h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <p className={styles.left_text}>{Languages[language].phone}</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <p className={styles.right_text}>{transactionDetailResponse.response.senderPhone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <p className={styles.left_text}>{Languages[language].amount}</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <p className={styles.right_text}>
                        {transactionDetailResponse.response.amount} {Languages[language].mmk}
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
                      <p className={styles.right_text}>{transactionDetailResponse.response.providerName}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <p className={styles.left_text}>{Languages[language].method}</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <p className={styles.right_text}>{transactionDetailResponse.response.methodName}</p>
                    </div>
                  </div>
                </div>

                <p>
                  {Languages[language].code} :{" "}
                  <span className={styles.code_color}>VIUMPT</span>
                </p>
                <p>
                  {Languages[language].redeem_text} (
                  <Link href="https://bit.ly/3nWvwjC">
                    <a target="_blank">https://bit.ly/3nWvwjC</a>
                  </Link>
                  )
                </p>

                {transactionDetailResponse.response.state === "SUCCESS" ? (
                  <div className={styles.success_btn_div}>
                    <button
                      className={styles.receipt_btn}
                      onClick={() => {
                        dispatch(ReceiptAction(transactionDetailResponse.response.transactionNumber));
                      }}
                    >
                      {Languages[language].download_receipt}
                    </button>
                  </div>
                ) : null}

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
  transactionDetailResponse: state.transactionDetailResponse,
}))(PaymentSuccess);