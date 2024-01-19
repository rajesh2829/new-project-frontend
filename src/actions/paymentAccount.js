import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

// Adding Account
const REQUEST_ADD_PAYMENT_ACCOUNT = "REQUEST_ADD_PAYMENT_ACCOUNT";
const RECEIVE_ADD_PAYMENT_ACCOUNT = "RECEIVE_ADD_ACCOUNT";
const PAYMENT_ACCOUNT_ADD_ERROR = "PAYMENT_ACCOUNT_ADD_ERROR";

// Deleting Account
const REQUEST_DELETE_PAYMENT_ACCOUNT = "REQUEST_DELETE_PAYMENT_ACCOUNT";
const RECEIVE_DELETE_PAYMENT_ACCOUNT = "RECEIVE_DELETE_PAYMENT_ACCOUNT";
const PAYMENT_ACCOUNT_DELETE_ERROR = "PAYMENT_ACCOUNT_DELETE_ERROR";

class PaymentAccount{
// Request Add Accounts
static requestAddPaymentAccounts() {
  return {
    type: REQUEST_ADD_PAYMENT_ACCOUNT
  }
};
// Receive Add Accounts 
static receiveAddPaymentAccounts() {
  return {
    type: RECEIVE_ADD_PAYMENT_ACCOUNT
  }
}
// Error Add Accounts
static addPaymentAccountsError() {
  return {
    type: PAYMENT_ACCOUNT_ADD_ERROR
  }
};

/**
 * Request for deleting Accounts
 */
static requestDeletePaymentAccount() {
  return {
    type: REQUEST_DELETE_PAYMENT_ACCOUNT,
  };
}

/**
 * Receive for deleting Accounts
 */
static receiveDeletePaymentAccount() {
  return {
    type: RECEIVE_DELETE_PAYMENT_ACCOUNT,
  };
}

/**
 * error for deleting Accounts
 */
static  PaymentAccountsDeleteError(error) {
  return {
    type: PAYMENT_ACCOUNT_DELETE_ERROR,
    error,
  };
}
}

export default PaymentAccount