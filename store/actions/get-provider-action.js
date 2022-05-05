import axios from "axios";
import {
  CHANNEL,
  CLIENT_VERSION_NO,
  DATE,
  error,
  formUrl,
  payUrl,
  SELECTED_PROVIDER_FAIL,
  SELECTED_PROVIDER_SUCCESS,
  TIME,
  TIME_ZONE,
} from "../type";
import Cookies from "universal-cookie";
import ToastNoti from "../../utils/ToastNoti";
import router, { Router } from "next/router";

const cookie = new Cookies();

export const SelectedProviderAction = (typeId, authKey) => {
  const token = cookie.get("token");
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${formUrl}selectedProviderListEnquiry?authKey=${authKey}&accessKey=${token}&typeId=${typeId}&paymentToken=${token}&time=${TIME}&date=${DATE}&timezone=${TIME_ZONE}&clientVersionNo=${CLIENT_VERSION_NO}&channel=${CHANNEL}&sort=createdDate,desc`
      );
      const res_1 = res.data;
      if (res_1.code == error.REQUEST_SUCCESS) {
        
        dispatch({
          type: SELECTED_PROVIDER_SUCCESS,
          payload: {
            success: true,
            response: res_1.response,
            message: res_1.message,
            code: res_1.code,
            loading: false,
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
          type: SELECTED_PROVIDER_FAIL,
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
