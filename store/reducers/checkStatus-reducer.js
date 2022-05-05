import {
  CHECK_STATUS,
  CHECK_STATUS_ERROR,
  CHECK_STATUS_SUCCESS,
} from "../type";

const initialState = {
  response: {},
  message: "",
  code: "",
  loading: false,
  error: false,
  errorMessage: "",
};

export const CheckStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_STATUS_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        code: action.payload.code,
        response: action.payload.response,
      };
    case CHECK_STATUS:
      return {
        ...state,
        loading: true,
      };
    case CHECK_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};
