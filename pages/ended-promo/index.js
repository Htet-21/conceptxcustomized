import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import Languages from "../../components/languages/languages";
import Footer from "../../components/ui-layouts/footer";
import Header from "../../components/ui-layouts/header";
import { useRouter } from "next/router";

const PromoEnd = () => {

    const [language, setLanguage] = useState("my");

    return(
        <div id={language} className="bg-gray">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-6">
                        <div className="border-box bg-white mt-md-5 mt-3 pb-5">
                            <Header setLanguage={setLanguage} language={language}/>
                            <div className="mt-5 text-center mb-5">
                                <img src="./images/price-tag.png" alt="" className="pb-4 mb-2 w-65"/>
                                <h3 className="h4">{Languages[language].promo_over_title}</h3>
                                <p className="w-75p m-auto lh-22">{Languages[language].promor_over_p}</p>
                            </div>
                            {/* <div className="w-100 d-inline-block border-top pt-4 mt-5">
                                <button className="theme-btn w-100 btn-gray">{Languages[language].close}</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default PromoEnd;