import axios from "axios";
import {
  error,
  baseUrl,
  GET_COUNT_TRANS_ACTION_ERROR,
  GET_COUNT_TRANS_ACTION_SUCCESS
} from "../type";
import Cookies from "universal-cookie";
import ToastNoti from "../../utils/ToastNoti";

const cookie = new Cookies();

export const GetCountTransAction = () => {
  const token = cookie.get("ba_token");
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${baseUrl}api/getCountTransaction`, {
            headers: {
              Authorization: 'Bearer ' + token
            },
        });
      const res_1 = res.data;
      if (res_1.code == error.REQUEST_SUCCESS) {
        
        dispatch({
          type: GET_COUNT_TRANS_ACTION_SUCCESS,
          payload: {
            success: true,
            response: res_1.response,
            message: res_1.message,
            code: res_1.code,
            loading: false,
          },
        });
      } else {
        <ToastNoti content={res_1.message} type="error" />;
        dispatch({
          type: GET_COUNT_TRANS_ACTION_ERROR,
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
