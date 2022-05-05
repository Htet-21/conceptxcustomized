import { useState } from "react";
import Languages from "../../components/languages/languages";
import Footer from "../../components/ui-layouts/footer";
import Header from "../../components/ui-layouts/header";

const TransactionLimit = () => {
  const [language, setLanguage] = useState("my");

  return (
    <div className="bg-gray">
      <div className="container" id={language}>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="border-box bg-white mt-md-5 mt-3">
              <Header setLanguage={setLanguage} language={language} />
              <div className="mt-5 pb-4">
                <div className="d-flex align-items-top">
                  <figure className="pr-4">
                    <img
                      src="./images/exclamation-mark-red.png"
                      alt=""
                      className="w-40"
                    />
                  </figure>
                  <div>
                    <p>{Languages[language].limited_text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default TransactionLimit;
