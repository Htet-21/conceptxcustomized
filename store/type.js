import moment from "moment";

export const formUrl = "https://test.dinger.asia/form-payment/api/";
export const payUrl = "https://api.dinger.asia/api/";

export const baseUrl = 'https://api.dinger.asia/';

export const projectName = 'Classic Luxury Store';
export const apiKey = '7m0cnet.xU3AFZE-v6hfWZJYDVgzMZoAkzw';
export const merchantName = 'Burmese Auto';
/* export const projectName = 'user27';
export const apiKey = 'v1ub5e3.cfJkhmp0sVYElovXQPoA1Pd3Zp0';
export const merchantName = 'Shwe Yee Win Aung'; */

export const RedirectUrl = "https://portal.dinger.asia/gateway/redirect";
export const MPU_REDIRECT_URL = "https://portal.dinger.asia/gateway/mpu";
export const CREDIT_CARD_URL = "https://creditcard-portal.dinger.asia";
export const REDIRECT_CB = "https://portal.dinger.asia/gateway/cbpay";
export const REDIRECT_MPiteSan = "https://portal.dinger.asia/gateway/mpitesan";

/* export const RedirectUrl = "https://staging.dinger.asia/gateway/redirect";
export const MPU_REDIRECT_URL = "https://staging.dinger.asia/gateway/mpu";
export const CREDIT_CARD_URL = "https://credit-card-portal-testing.dinger.asia";
export const REDIRECT_CB = "https://staging.dinger.asia/gateway/cbpay";
export const REDIRECT_MPiteSan = "https://staging.dinger.asia/gateway/mpitesan"; */

export const error = {
  REQUEST_SUCCESS: "000",
  SYSTEM_ERROR: "001",
  ACCESS_DENIED: "002",
  AUTHENTICATION_FAILED: "003",
  UNSUPPORTED_MEDIA_TYPE: "008",
  DATABASE_ERROR: "009",
  INVALID_CHANNEL_VERSION: "100",
  INVALID_DATE_TIME_TIMEZONE: "101",
  INVALID_PARAMETER: "102",
  USER_NAME_ALREADY_EXIST: "103",
  INVALID_OLD_PASSWORD: "104",
  PROJECT_NAME_ALREADY_EXIST: "300",
  INVALID_OTP: "201",
  TOKEN_EXPIRE: "401",
  TOKEN_NOT_EXIST: "105",
};

export const AUTHENTICATE = "AUTHENTICATE";
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAIL = "AUTHENTICATE_FAIL";

export const PAYCONFIRM = "PAYCONFIRM";
export const PAYCONFIRM_SUCCESS = "PAYCONFIRM_SUCCESS";
export const PAYCONFIRM_FAIL = "PAYCONFIRM_FAIL";

export const SELECTED_PROVIDER = "SELECTED_PROVIDER";
export const SELECTED_PROVIDER_SUCCESS = "SELECTED_PROVIDER_SUCCESS";
export const SELECTED_PROVIDER_FAIL = "SELECTED_PROVIDER_FAIL";

export const SELECTED_TYPE_LIST = "SELECTED_TYPE_LIST";
export const SELECTED_TYPE_LIST_SUCCESS = "SELECTED_TYPE_LIST_SUCCESS";
export const SELECTED_TYPE_LIST_FAIL = "SELECTED_TYPE_LIST_FAIL";
// export const SECRET_KEY = "RGluZ2VyQFJ1bm5lcg==";

export const CHECK_STATUS = "CHECK_STATUS";
export const CHECK_STATUS_SUCCESS = "CHECK_STATUS_SUCCESS";
export const CHECK_STATUS_ERROR = "CHECK_STATUS_ERROR";

export const CHECK_TRANSACTION = "CHECK_TRANSACTION";
export const CHECK_TRANSACTION_SUCCESS = "CHECK_TRANSACTION_SUCCESS";
export const CHECK_TRANSACTION_ERROR = "CHECK_TRANSACTION_ERROR";

export const ERROR_EXIST = "ERROR_EXIST";
export const NO_ERROR = "NO_ERROR";

export const CLIENT_VERSION_NO = "1.0";
export const CHANNEL = "WEB";
export const TIME_ZONE = "Asia/Yangon";
export const DATE = moment().format("YYYYMMDD");
export const TIME = moment().format("HHmmss");

export const GET_TOKEN_ACTION = 'GET_TOKEN_ACTION';
export const GET_TOKEN_ACTION_SUCCESS = 'GET_TOKEN_ACTION_SUCCESS';
export const GET_TOKEN_ACTION_ERROR = 'GET_TOKEN_ACTION_ERROR';

export const PAY_API_ACTION = 'PAY_API_ACTION';
export const PAY_API_ACTION_SUCCESS = 'PAY_API_ACTION_SUCCESS';
export const PAY_API_ACTION_ERROR = 'PAY_API_ACTION_ERROR';

export const GET_COUNT_TRANS_ACTION = 'GET_COUNT_TRANS_ACTION';
export const GET_COUNT_TRANS_ACTION_SUCCESS = 'GET_COUNT_TRANS_ACTION_SUCCESS';
export const GET_COUNT_TRANS_ACTION_ERROR = 'GET_COUNT_TRANS_ACTION_ERROR';

export const TRANSACTION_DETAIL = 'TRANSACTION_DETAIL';
export const TRANSACTION_DETAIL_SUCCESS = 'TRANSACTION_DETAIL_SUCCESS';
export const TRANSACTION_DETAIL_ERROR = 'TRANSACTION_DETAIL_ERROR';
