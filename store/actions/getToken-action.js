import axios from "axios";
import {
  CHANNEL,
  CLIENT_VERSION_NO,
  DATE,
  error,
  baseUrl,
  GET_TOKEN_ACTION_ERROR,
  GET_TOKEN_ACTION_SUCCESS,
  TIME,
  TIME_ZONE,
  projectName,
  apiKey,
  merchantName
} from "../type";
import Cookies from "universal-cookie";
import ToastNoti from "../../utils/ToastNoti";
import router, { Router } from "next/router";

const cookie = new Cookies();

export const GetTokenAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${baseUrl}api/token?projectName=${projectName}&apiKey=${apiKey}&merchantName=${merchantName}`
      );
      const res_1 = res.data;
      if (res_1.code == error.REQUEST_SUCCESS) {
        
        dispatch({
          type: GET_TOKEN_ACTION_SUCCESS,
          payload: {
            success: true,
            response: res_1.response,
            message: res_1.message,
            code: res_1.code,
            loading: false,
          },
        });
        cookie.set('ba_token', res_1.response.paymentToken);
      } else {
        <ToastNoti content={res_1.message} type="error" />;
        dispatch({
          type: GET_TOKEN_ACTION_ERROR,
          payload: {
            debug: res_1.debugMessage,
            success: false,
            message: res_1.message,
            code: res_1.code,
            loading: false,
          },
        });
      }
    } catch (error) {
      console.log("error " + error);
    }
  };
};
