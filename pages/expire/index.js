import Header from "../../components/ui-layouts/header";
import styles from "./Expire.module.css";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import Languages from "../../components/languages/languages";

const Expire = () => {
  const router = useRouter();
  const errorMsg = router.query.msg;
  const cookies = new Cookies();
  const [language, setLanguage] = useState("my");

  useEffect(() => {
    cookies.remove("ba_token");
    cookies.remove("submittedVal");
    cookies.remove("payApiRes");
  }, []);

  return (
    <div className="bg-gray">
      <div className="container" id={language}>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="border-box bg-white mt-md-5 mt-3">
              <Header setLanguage={setLanguage} language={language} />
              <p className={styles.error_text}>{errorMsg}</p>
              <div className={styles.click_confrim}>
                <button onClick={() => window.location.assign('/')}>
                  {Languages[language].try_again}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expire;
