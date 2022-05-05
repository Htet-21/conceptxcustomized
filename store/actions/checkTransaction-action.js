import axios from "axios";
import {
  CHECK_TRANSACTION_ERROR,
  CHECK_TRANSACTION_SUCCESS,
  error,
  formUrl,
} from "../type";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("token");
import router from "next/router";

export const CheckTransactionAction = (data) => {
  return (dispatch) => {
    return axios
      .post(`${formUrl}backTransaction`, data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code == error.REQUEST_SUCCESS) {
          
          dispatch({
            type: CHECK_TRANSACTION_SUCCESS,
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
            type: CHECK_TRANSACTION_ERROR,
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
        console.log("error " + error);
      });
  };
};
