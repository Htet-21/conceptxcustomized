import axios from "axios";
import {
  CHANNEL,
  TRANSACTION_DETAIL,
  TRANSACTION_DETAIL_SUCCESS,
  TRANSACTION_DETAIL_ERROR,
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

export const TransactionDetailAction = (id) => {
  const token = cookie.get("ba_token");
  return (dispatch) => {

    return  axios({
      url: `${baseUrl}api/transactionInfoEnquiryByMerchantOrderId?&merchantOrderId=${id}&time=${TIME}&date=${DATE}&timezone=${TIME_ZONE}&clientVersionNo=${CLIENT_VERSION_NO}&channel=${CHANNEL}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code == error.REQUEST_SUCCESS) {
          
          dispatch({
            type: TRANSACTION_DETAIL_SUCCESS,
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
            type: TRANSACTION_DETAIL_ERROR,
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
