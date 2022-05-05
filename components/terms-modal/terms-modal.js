import Languages from "../languages/languages";

const TermsModal = ({language, onModalClose}) => {

    return (
        <div id={language} className='theme-modal'>
            <div className="theme-modal-inner">
                <button type="button" className="theme-modal-close" onClick={()=>onModalClose()}><img src="./images/close_icon.png"/></button>
                <h2 className="h4 pb-4">{Languages[language].terms_title}</h2>
                <p>{Languages[language].terms_para}</p>

                <h3 className="h5 pt-3 pb-2">{Languages[language].territory}</h3>
                <p>{Languages[language].myanmar}</p>

                <h3 className="h5 pt-3 pb-2">{Languages[language].eligibility}</h3>
                <ol className="pl-3">
                    <li className="pb-2">{Languages[language].eligibility_para1}</li>
                    <li className="pb-2">{Languages[language].eligibility_para2}</li>
                    <li className="pb-2">{Languages[language].eligibility_para3}</li>
                </ol>

                <h3 className="h5 pt-3 pb-2">{Languages[language].promo_period}</h3>
                <ol className="pl-3">
                    <li className="pb-2">{Languages[language].promo_period_para1}</li>
                    <li className="pb-2">{Languages[language].promo_period_para2}</li>
                </ol>

                <h3 className="h5 pt-3 pb-2">{Languages[language].promo_title}</h3>
                <ol className="pl-3">
                    <li className="pb-2">{Languages[language].promo_para1}
                        <table className="table table-bordered mt-2">
                            <thead>
                                <tr>
                                    <td>{Languages[language].promo_para1_price_th_1}</td>
                                    <td>{Languages[language].promo_para1_price_th_2}</td>
                                    <td>{Languages[language].promo_para1_price_th_3}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>{Languages[language].promo_para1_price_td_1}</td>
                                    <td>{Languages[language].promo_para1_price_td_2}</td>
                                    <td>{Languages[language].promo_para1_price_td_3}</td>
                                </tr> */}
                                <tr>
                                    <td>{Languages[language].promo_para1_price_td_1}</td>
                                    <td>{Languages[language].promo_para1_price_td_5}</td>
                                    <td>{Languages[language].promo_para1_price_td_6}</td>
                                </tr>
                                <tr>
                                    <td>{Languages[language].promo_para1_price_td_4}</td>
                                    <td>{Languages[language].promo_para1_price_td_8}</td>
                                    <td>{Languages[language].promo_para1_price_td_9}</td>
                                </tr>
                                <tr>
                                    <td>{Languages[language].promo_para1_price_td_7}</td>
                                    <td>{Languages[language].promo_para1_price_td_11}</td>
                                    <td>{Languages[language].promo_para1_price_td_12}</td>
                                </tr>
                                <tr>
                                    <td>{Languages[language].promo_para1_price_td_10}</td>
                                    <td>{Languages[language].promo_para1_price_td_14}</td>
                                    <td>{Languages[language].promo_para1_price_td_15}</td>
                                </tr>
                                <tr>
                                    <td>{Languages[language].promo_para1_price_td_13}</td>
                                    <td>{Languages[language].promo_para1_price_td_17}</td>
                                    <td>{Languages[language].promo_para1_price_td_18}</td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <li className="pb-2">{Languages[language].promo_para2}
                        <ol className="list-style-alpha pl-4">
                            <li>{Languages[language].promo_para2_sub1}</li>
                            <li>{Languages[language].promo_para2_sub2}</li>
                            <li>{Languages[language].promo_para2_sub3}</li>
                        </ol>
                    </li>
                    <li className="pb-2" dangerouslySetInnerHTML={{__html: Languages[language].promo_para3}}></li>
    
                    <li className="pb-2" dangerouslySetInnerHTML={{__html: Languages[language].promo_para_new}}></li>
                    <li className="pb-2">{Languages[language].promo_para4}</li>
                    <li className="pb-2">{Languages[language].promo_para5}</li>
                    <li className="pb-2">{Languages[language].promo_para6}</li>
                    <li className="pb-2">{Languages[language].promo_para7}</li>
                    <li className="pb-2">{Languages[language].promo_para8}</li>
                    <li className="pb-2">{Languages[language].promo_para9}</li>
                    <li className="pb-2">{Languages[language].promo_para10}</li>
                    <li className="pb-2">{Languages[language].promo_para11}</li>
                    <li className="pb-2">{Languages[language].promo_para12}</li>
                    <li className="pb-2">{Languages[language].promo_para13}</li>
                    <li className="pb-2">{Languages[language].promo_para14}</li>
                    <li className="pb-2">{Languages[language].promo_para15}</li>
                    <li className="pb-2">{Languages[language].promo_para16}</li>
                    <li className="pb-2">{Languages[language].promo_para17}</li>
                    <li className="pb-2" dangerouslySetInnerHTML={{__html: Languages[language].promo_para18}}></li>
                    <li className="pb-2" dangerouslySetInnerHTML={{__html: Languages[language].promo_para19}}></li>
                    <li className="pb-2" dangerouslySetInnerHTML={{__html: Languages[language].promo_para20}}></li>
                    <li className="pb-2">{Languages[language].promo_para21}</li>
                </ol>

                <h3 className="h5 pt-3 pb-2">{Languages[language].warranty_title}</h3>
                <ol className="pl-3">
                    <li className="pb-2">{Languages[language].warranty_para1}
                        <ol className="list-style-alpha pl-4">
                            <li>{Languages[language].warranty_para1_sub1}</li>
                            <li>{Languages[language].warranty_para1_sub2}</li>
                            <li>{Languages[language].warranty_para1_sub3}</li>
                            <li>{Languages[language].warranty_para1_sub4}</li>
                            <li>{Languages[language].warranty_para1_sub5}</li>
                        </ol>
                    </li>
                    <li className="pb-2">{Languages[language].warranty_para2}</li>
                </ol>

                <h3 className="h5 pt-3 pb-2">{Languages[language].pics_title}</h3>
                <p dangerouslySetInnerHTML={{__html: Languages[language].pics_paragraph1}}></p>
                <p>{Languages[language].pics_paragraph2}</p>

                <h3 className="h5 pt-3 pb-2">{Languages[language].general}</h3>
                <ol className="pl-3">
                    <li className="pb-2">{Languages[language].general_p1}</li>
                    <li className="pb-2">{Languages[language].general_p2}</li>
                    <li className="pb-2">{Languages[language].general_p3}</li>
                    <li className="pb-2">{Languages[language].general_p4}</li>
                    <li className="pb-2">{Languages[language].general_p5}</li>
                    <li className="pb-2">{Languages[language].general_p6}</li>
                    <li className="pb-2">{Languages[language].general_p7}</li>
                    <li className="pb-2">{Languages[language].general_p8}</li>
                    <li className="pb-2">{Languages[language].general_p9}</li>
                    <li className="pb-2">{Languages[language].general_p10}</li>
                </ol>
            </div>
        </div>
    );
}

export default TermsModal;