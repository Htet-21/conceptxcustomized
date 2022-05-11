import {
    CALCULATE_FEES,
    CALCULATE_FEES_ERROR,
    CALCULATE_FEES_SUCCESS,
    CALCULATE_FEES_CANCEL
  } from "../type";
  
  const initialState = {
    response: {},
    message: "",
    code: "",
    loading: false,
    error: false,
    errorMessage: "",
  };
  
  export const CalculateFeesReducer = (state = initialState, action) => {
    switch (action.type) {
      case CALCULATE_FEES_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
          code: action.payload.code,
          response: action.payload.response,
          loading: false
        };
      case CALCULATE_FEES:
        return {
          ...state,
          loading: true,
          response: {},
          message: "",
          code: "",
        };
      case CALCULATE_FEES_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: action.payload.message,
        };
      case CALCULATE_FEES_CANCEL:
        return {
            response: {},
            message: "",
            code: "",
            loading: false,
            error: false,
            errorMessage: "",
        };
      default:
        return state;
    }
  };
  