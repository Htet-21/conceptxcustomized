import { useState, useRef, useEffect } from 'react';
import ReactGA from 'react-ga';

const Header = ({ setLanguage, language }) => {

    useEffect(() => {
        ReactGA.initialize('G-M7V91TP1MF');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const [menuToggle, setMenuToggle] = useState(false);

    //this function detect if use click the outside of the menu, menu will close
    const outsideClicker = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenuToggle(false);
                } 
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const confirmRef = useRef(null);
    outsideClicker(confirmRef);

    const onLangChange=(value)=>{
        setLanguage(value);
        setMenuToggle(false);
    }

    return(
        <div className="headerContainer">
            <figure className="float-left">
                <img src="./images/burmese_auto.jpg" alt=""/>
            </figure>

            <div className="relative float-right" ref={confirmRef}>
                <span className="d-block size-14 text-end">Languages</span>
                <button className="lang_btn" onClick={()=>setMenuToggle(!menuToggle)}>
                    <img src="./images/language_icon.png" alt="" className="icon me-1"/>
                    {language=='my'?
                        <img src="./images/myanmar.png" className="my"/>
                        :
                        <img src="./images/eng.png" className="en"/>
                    }
                    <img src="./images/down_arrow.png" className="clicker"/>
                </button>
                <ul className={`lang_btn_dropdown ${menuToggle?'hasHeight':'noHeight'}`}>
                    <li onClick={() => onLangChange("my")} className={language=='my'?'pointer-none':'my'}>မြန်မာ</li>
                    <li onClick={() => onLangChange("en")} className={language=='en'?'pointer-none':''}>English</li>
                </ul>
            </div>
        </div>
    )
}
export default Header;