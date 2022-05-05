import Axios from "axios";
import { error, formUrl, PAYCONFIRM_FAIL, PAYCONFIRM_SUCCESS } from "../type";
import Cookies from "universal-cookie";
import ToastNoti from "../../utils/ToastNoti";
import localforage from "localforage";
import router from "next/router";

const cookie = new Cookies();
export const PayConfirmAcition = (data) => {
  return async (dispatch) => {
    try {
      const res = await Axios.post(`${formUrl}payConfirm`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res_1 = res.data;
      if (res_1.code == error.REQUEST_SUCCESS) {
        
        dispatch({
          type: PAYCONFIRM_SUCCESS,
          payload: {
            success: true,
            response: res_1.response,
            message: res_1.message,
            code: res_1.code,
            loading: false,
          },
        });
        localforage
          .setItem("payResponse", res_1)
          .then((value) => {})
          .catch(console.error.bind(console));
      }else if (
        res_1.code == error.TOKEN_EXPIRE ||
        res_1.code == error.TOKEN_NOT_EXIST ||
        res_1.code == "401"
      ) {
        router.push({ pathname: "/expire", query: { msg: res_1.message } });
      } else {

        <ToastNoti content={res_1.message} type="error" />;
        dispatch({
          type: PAYCONFIRM_FAIL,
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
      // dispatch({
      //   type: PAYCONFIRM_FAIL,
      //   payload: {
      //     debug: res_1.debugMessage,
      //     success: false,
      //     message: res_1.message,
      //     code: "",
      //     loading: false,
      //   },
      // });
    }
  };
};
