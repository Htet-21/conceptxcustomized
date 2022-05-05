import axios from "axios";
import {
  CHANNEL,
  CHECK_STATUS_ERROR,
  CHECK_STATUS_SUCCESS,
  CLIENT_VERSION_NO,
  DATE,
  error,
  baseUrl,
  TIME,
  TIME_ZONE,
} from "../type";
import Cookies from "universal-cookie";
import router from "next/router";

const cookie = new Cookies();


export const CheckStatusAction = (id) => {
  const token = cookie.get("ba_token");
  return (dispatch) => {
    return axios
      .get(
        `${baseUrl}api/checkStatus?&accessToken=${token}&transactionId=${id}&paymentToken=${token}&time=${TIME}&date=${DATE}&timezone=${TIME_ZONE}&clientVersionNo=${CLIENT_VERSION_NO}&channel=${CHANNEL}`
      )
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code == error.REQUEST_SUCCESS) {
          
          dispatch({
            type: CHECK_STATUS_SUCCESS,
            payload: {
              success: true,
              response: res.response,
              message: res.message,
              code: res.code,
              loading: false,
            },
          });
        }else if (
          res.code == error.TOKEN_EXPIRE ||
          res.code == error.TOKEN_NOT_EXIST
        ) {
          router.push({ pathname: "/expire", query: { msg: res.message } });
        } else {
          dispatch({
            type: CHECK_STATUS_ERROR,
            payload: {
              debug: res.debugMessage,
              success: false,
              message: res.message,
              code: res.code,
              loading: false,
            },
          });
        }
      })
      .catch((error) => {
        console.log("error "+ error)
      });
  };
};
