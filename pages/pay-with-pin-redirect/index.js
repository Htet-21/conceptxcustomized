import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import Languages from "../../components/languages/languages";
import Footer from "../../components/ui-layouts/footer";
import Header from "../../components/ui-layouts/header";
import { CheckStatusAction } from "../../store/actions/checkStatus-action";
import { GetTokenAction } from '../../store/actions/getToken-action';
import { useRouter } from "next/router";
import PaymentDetail from '../../components/payment-detail/paymentDetail';

const PayWithPinRedirect = ({ dispatch, checkStatusResponse }) => {
    const cookie = new Cookies();
    const router = useRouter();
    const submittedVal = cookie.get("submittedVal");
    const payApiRes = cookie.get("payApiRes");
    const transactionNum = payApiRes?.transactionNum;
    const merchantOrderId = payApiRes?.merchOrderId;
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


    return(
        <div id={language} className="bg-gray">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-6">
                        <div className="border-box bg-white mt-md-5 mt-3">
                            <Header setLanguage={setLanguage} language={language}/>
                            <div className="mt-5">
                                {/* <h3 className="h5">{Languages[language].check_payment_data}</h3>

                                <div className="w-100 d-flex pb-3 pt-4">
                                    <span className="opacity-3">{Languages[language].phone}</span>
                                    <span className="ml-auto">{submittedVal?.customerPhone}</span>
                                </div>
                                <div className="w-100 d-flex pb-5">
                                    <span className="opacity-3">{Languages[language].total_amount}</span>
                                    <span className="ml-auto">{submittedVal?.totalAmount} {Languages[language].mmk}</span>
                                </div>
 */}
                                <PaymentDetail language={language} />
                                <p>{Languages[language].guide_text1} {submittedVal?.providerName} {Languages[language].guide_text2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default connect((state) => ({
    checkStatusResponse: state.checkStatusResponse,
  }))(PayWithPinRedirect);
