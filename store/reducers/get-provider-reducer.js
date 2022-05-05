import {
  SELECTED_PROVIDER,
  SELECTED_PROVIDER_FAIL,
  SELECTED_PROVIDER_SUCCESS,
} from "../type";

const initialState = {
  response: {},
  message: "",
  code: "",
  loading: false,
  error: false,
  errorMessage: "",
};

export const SelectedProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_PROVIDER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        code: action.payload.code,
        response: action.payload.response,
      };
    case SELECTED_PROVIDER:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_PROVIDER_FAIL:
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
