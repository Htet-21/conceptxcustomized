import {
    GET_COUNT_TRANS_ACTION,
    GET_COUNT_TRANS_ACTION_ERROR,
    GET_COUNT_TRANS_ACTION_SUCCESS,
  } from "../type";
  
  const initialState = {
    response: {},
    message: "",
    code: "",
    loading: false,
    error: false,
    errorMessage: "",
  };
  
  export const GetCountTransReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNT_TRANS_ACTION_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
          code: action.payload.code,
          response: action.payload.response,
        };
      case GET_COUNT_TRANS_ACTION:
        return {
          ...state,
          loading: true,
        };
      case GET_COUNT_TRANS_ACTION_ERROR:
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
  