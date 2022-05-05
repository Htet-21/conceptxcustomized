import {
  GET_TOKEN_ACTION,
  GET_TOKEN_ACTION_ERROR,
  GET_TOKEN_ACTION_SUCCESS,
} from "../type";

const initialState = {
  response: {},
  message: "",
  code: "",
  loading: false,
  error: false,
  errorMessage: "",
};

export const GetTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_ACTION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        code: action.payload.code,
        response: action.payload.response,
      };
    case GET_TOKEN_ACTION:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKEN_ACTION_ERROR:
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
