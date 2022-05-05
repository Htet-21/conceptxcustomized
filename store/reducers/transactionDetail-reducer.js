import {
    TRANSACTION_DETAIL,
    TRANSACTION_DETAIL_ERROR,
    TRANSACTION_DETAIL_SUCCESS,
  } from "../type";
  
  const initialState = {
    response: {},
    message: "",
    code: "",
    loading: false,
    error: false,
    errorMessage: "",
  };
  
  export const TransactionDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case TRANSACTION_DETAIL_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
          code: action.payload.code,
          response: action.payload.response,
        };
      case TRANSACTION_DETAIL:
        return {
          ...state,
          loading: true,
        };
      case TRANSACTION_DETAIL_ERROR:
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
  