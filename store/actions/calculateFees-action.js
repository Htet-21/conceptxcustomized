import axios from "axios";
import {
  CHANNEL,
  CLIENT_VERSION_NO,
  DATE,
  error,
  formUrl,
  CALCULATE_FEES_ERROR,
  CALCULATE_FEES_SUCCESS,
  TIME,
  TIME_ZONE,
  baseUrl
} from "../type";
import Cookies from "universal-cookie";
import ToastNoti from "../../utils/ToastNoti";
import router, { Router } from "next/router";

const cookie = new Cookies();

export const calculateFeesAction = (data) => {
  const token = cookie.get("ba_token");
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${baseUrl}api/calculateFeesByMerchant?accessKey=${token}&paymentToken=${token}`, data, {
            headers: {
              "Content-Type": "application/json",
            },
        }
      );
      const res_1 = res.data;
      if (res_1.code == error.REQUEST_SUCCESS) {
        
        dispatch({
          type: CALCULATE_FEES_SUCCESS,
          payload: {
            response: res_1.response,
            message: res_1.message,
            code: res_1.code,
          },
        });
      } else if (
        res_1.code == error.TOKEN_EXPIRE ||
        res_1.code == error.TOKEN_NOT_EXIST
      ) {
        router.push({ pathname: "/expire", query: { msg: res_1.message } });
      } else {
        <ToastNoti content={res_1.message} type="error" />;
        dispatch({
          type: CALCULATE_FEES_ERROR,
          payload: {
            debug: res_1.debugMessage,
            message: res_1.message,
            code: res_1.code,
          },
        });
      }
    } catch (error) {
      console.log("error " + error);
    }
  };
};
