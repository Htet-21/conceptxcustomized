import {
  ERROR_EXIST,
  NO_ERROR,
  PAYCONFIRM,
  PAYCONFIRM_FAIL,
  PAYCONFIRM_SUCCESS,
} from "../type";

const initialState = {
  message: "",
  errorInd: false,
  code: "",
};
export const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_EXIST:
      return {
        ...state,
        errorInd: true,
        message: action.payload.message,
        code: action.payload.code,
      };
    case NO_ERROR:
      return {
        ...state,
        errorInd: false,
        message: action.payload.message,
        code: action.payload.code,
      };
    default:
      return state;
  }
};
