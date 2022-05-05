import {
    CHECK_TRANSACTION,
    CHECK_TRANSACTION_ERROR,
    CHECK_TRANSACTION_SUCCESS,
  } from "../type";
  
  const initialState = {
    response: {},
    message: "",
    code: "",
    loading: false,
    error: false,
    errorMessage: "",
  };
  
  export const CheckTransactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHECK_TRANSACTION_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
          code: action.payload.code,
          response: action.payload.response,
        };
      case CHECK_TRANSACTION:
        return {
          ...state,
          loading: true,
        };
      case CHECK_TRANSACTION_ERROR:
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
  