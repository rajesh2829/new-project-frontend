
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { fetchList } from "./table";


/* Payment */
export const REQUEST_ADD_PAYMENT = "REQUEST_ADD_PAYMENT";
export const RECEIVE_ADD_PAYMENT = "RECEIVE_ADD_PAYMENT";
export const PAYMENT_ADD_ERROR = "PAYMENT_ADD_ERROR";
export const REQUEST_DELETE_PAYMENT = "REQUEST_DELETE_PAYMENT";
export const RECEIVE_DELETE_PAYMENT = "RECEIVE_DELETE_PAYMENT";
export const PAYMENT_DELETE_ERROR = "PAYMENT_DELETE_ERROR";



/**
 * Request for creating bill
 */
export function requestAddPayment() {
  return {
    type: REQUEST_ADD_PAYMENT,
  };
}

/**
 * Receive for receive bill
 */
export function receivePaymentAddPortal() {
  return {
    type: RECEIVE_ADD_PAYMENT,
  };
}

/**
 * Receive for error creating bill
 */
export function paymentCreateError(error) {
  return {
    type: PAYMENT_ADD_ERROR,
    error,
  };
}


/**
 * Delete the Payment
 */
export function requestDeletePayment() {
  return {
    type: REQUEST_DELETE_PAYMENT,
  };
}
export function receiveDeletePayment() {
  return {
    type: RECEIVE_DELETE_PAYMENT,
  };
}
export function purchasePaymentDeleteError(error) {
  return {
    type: PAYMENT_DELETE_ERROR,
    error,
  };
}


export function addPayment(data, purchaseId) {
  return (dispatch) => {
    dispatch(requestAddPayment());

    apiClient
      .post(`${endpoints().paymentAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "payment",
            `${endpoints().paymentAPI}/search`,
            1,
            25,
            purchaseId
          )
        );
        dispatch(receiveDeletePayment());
      })
      .catch((error) => {
        dispatch(paymentCreateError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
        return error;
      });
  };
}



export function deletePayment(id, purchaseId, closeDeleteModal) {
  return (dispatch) => {
    dispatch(requestDeletePayment());

    apiClient
      .delete(`${endpoints().paymentAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        closeDeleteModal();
        return response && response.data;
      })
      .then(() => {
        dispatch(
          fetchList(
            "Payment",
            `${endpoints().paymentAPI}/search`,
            1,
            25,
            purchaseId
          )
        );
        dispatch(receiveDeletePayment());
      })
      .catch((error) => {
        dispatch(purchasePaymentDeleteError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
        return error;
      });
  };
}