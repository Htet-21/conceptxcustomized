import { combineReducers } from "redux";
import { AuthenticateReducer } from "./authenticate-reducer";
import { CheckStatusReducer } from "./checkStatus-reducer";
import { CheckTransactionReducer } from "./checkTransaction-reducer";
import { ErrorReducer } from "./error-reducer";
import { SelectedProviderReducer } from "./get-provider-reducer";
import { PayConfirmReducer } from "./payConfirm-reducer";
import { SelectedTypeListReducer } from "./type-list-reducer";
import { GetTokenReducer } from './getToken-reducer';
import { ViuPayApiReducer } from './viuPayApi-reducer';
import { GetCountTransReducer } from './getCountTrans-reducer';
import { TransactionDetailReducer } from './transactionDetail-reducer';
import { CalculateFeesReducer } from './calculateFees-reducer';

export default combineReducers({
  authenticateResponse: AuthenticateReducer,
  payConfirmResponse: PayConfirmReducer,
  selectedProviderResponse: SelectedProviderReducer,
  selectedTypeListResponse: SelectedTypeListReducer,
  checkStatusResponse: CheckStatusReducer,
  checkTransactionResponse: CheckTransactionReducer,
  errorIndicator:ErrorReducer,
  getToken: GetTokenReducer,
  viuPayApi: ViuPayApiReducer,
  countTransaction: GetCountTransReducer,
  transactionDetailResponse: TransactionDetailReducer,
  calculateFees: CalculateFeesReducer
});
