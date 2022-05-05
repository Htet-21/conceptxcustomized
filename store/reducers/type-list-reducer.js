import {
  SELECTED_TYPE_LIST,
  SELECTED_TYPE_LIST_FAIL,
  SELECTED_TYPE_LIST_SUCCESS,
} from "../type";

const initialState = {
  response: {},
  message: "",
  loading: false,
  innerList:[],
  error: false,
  errorMessage: "",
};

export const SelectedTypeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_TYPE_LIST_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        innerList: action.payload.response,
      };
    case SELECTED_TYPE_LIST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_TYPE_LIST_FAIL:
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
