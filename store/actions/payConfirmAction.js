import Axios from "axios";
import { error, baseUrl, PAY_API_ACTION_ERROR, PAY_API_ACTION_SUCCESS } from "../type";
import Cookies from "universal-cookie";
import ToastNoti from "../../utils/ToastNoti";
import localforage from "localforage";
import router from "next/router";

const cookie = new Cookies();

export const PayConfirmAcition = (data) => {
  const token = cookie.get("ba_token");
  const submittedVal = cookie.get("submittedVal");
  
  return async (dispatch) => {
    try {
      const res = await Axios.post(`${baseUrl}api/pay`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: 'Bearer ' + token
        },
      });
      const res_1 = res.data;
      if (res_1.code == error.REQUEST_SUCCESS) {
        
        dispatch({
          type: PAY_API_ACTION_SUCCESS,
          payload: {
            success: true,
            response: res_1.response,
            message: res_1.message,
            code: res_1.code,
            loading: false,
          },
        });
        cookie.set('payApiRes', JSON.stringify(res_1.response));
        if(res_1.response.qrCode){
          router.push("/qr-code")
        } else if(res_1.response.formToken){
          router.push("/form-redirect-pay")
        } else if(!res_1.response.qrCode && !res_1.response.formToken){
          router.push("/pay-with-pin-redirect")
        }
        
      }else if (
        res_1.code == error.TOKEN_EXPIRE ||
        res_1.code == error.TOKEN_NOT_EXIST ||
        res_1.code == "401"
      ) {
        router.push({ pathname: "/expire", query: { msg: res_1.message } });
      } else {

        <ToastNoti content={res_1.message} type="error" />;
        dispatch({
          type: PAY_API_ACTION_ERROR,
          payload: {
            debug: res_1.debugMessage,
            success: false,
            message: res_1.message,
            code: res_1.code,
            loading: false,
          },
        });
        router.push({ pathname: "/expire", query: { msg: res_1.message } });
      }
    } catch (error) {
      <ToastNoti content={error.message} type="error" />;
      console.log("error " + error.message);
    }
  };
};
