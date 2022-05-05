import {
    PAY_API_ACTION,
    PAY_API_ACTION_ERROR,
    PAY_API_ACTION_SUCCESS,
  } from "../type";
  
  const initialState = {
    response: {},
    message: "",
    code: "",
    loading: false,
    error: false,
    errorMessage: "",
  };
  
  export const ViuPayApiReducer = (state = initialState, action) => {
    switch (action.type) {
      case PAY_API_ACTION_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
          code: action.payload.code,
          response: action.payload.response,
        };
      case PAY_API_ACTION:
        return {
          ...state,
          loading: true,
        };
      case PAY_API_ACTION_ERROR:
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
  