import { PAYCONFIRM, PAYCONFIRM_FAIL, PAYCONFIRM_SUCCESS } from "../type";

const initialState = {
    response: {},
    message: "",
    debugMessage: "",
    loading : false,
    success : false,
    code:"",
  };
  export const PayConfirmReducer = (state = initialState, action) => {
    switch (action.type) {
      case PAYCONFIRM:
        return {
          ...state,
          loading: true,
        };
      case PAYCONFIRM_SUCCESS:
        return {
          ...state,
          loading: false,
          response:action.payload.response,
          message: action.payload.message,
          code: action.payload.code,
          success : true
        };
      case PAYCONFIRM_FAIL:
        return {
          ...state,
          loading: false,
          success :false,
          message: action.payload.message,
          debugMessage: action.payload.debug,
          code: action.payload.code,
        };
      default:
        return state;
    }
  };
