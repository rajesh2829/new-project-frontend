import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { Transfer } from "../helpers/Transfer";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";
import { fetchList } from "./table";

export const REQUEST_DELETE_TRANSFER = "REQUEST_DELETE_TRANSFER";
export const REQUEST_ADD_TRANSFER = "REQUEST_ADD_TRANSFER";
export const RECEIVE_ADD_TRANSFER = "RECEIVE_ADD_TRANSFER";
export const TRANSFER_ADD_ERROR = "TRANSFER_ADD_ERROR";
export const TRANSFER_REQUEST_UPDATE = "REQUEST_UPDATE";
export const TRANSFER_RECEIVE_UPDATE = "RECEIVE_UPDATE";
export const TRANSFER_UPDATE_ERROR = "UPDATE_ERROR";
export const TRANSFER_DELETE_ERROR = "DELETE_ERROR";

export const REQUEST_UPDATE_TRANSFER_STATUS = "REQUEST_UPDATE_TRANSFER_STATUS";
export const RECEIVE_UPDATE_TRANSFER_STATUS = "RECEIVE_UPDATE_TRANSFER_STATUS";
export const TRANSFER_UPDATE_ERROR_STATUS = "TRANSFER_UPDATE_ERROR_STATUS";

export function requestAddTransfer() {
  return {
    type: REQUEST_ADD_TRANSFER,
  };
}
/**
 * Receive for error deleting brand
 */
export function transferDeleteError(error) {
  return {
    type: TRANSFER_DELETE_ERROR,
    error,
  };
}

/**
 * Request for deleting Transfer
 */
export function requestDeleteTransfer() {
  return {
    type: REQUEST_DELETE_TRANSFER,
  };
}

export function receiveAddTransfer() {
  return {
    type: RECEIVE_ADD_TRANSFER,
  };
}

export function transferCreateError(error) {
  return {
    type: TRANSFER_ADD_ERROR,
    error,
  };
}
export function addTransfer(data, params, callback) {
  return (dispatch) => {
    dispatch(requestAddTransfer());

    apiClient
      .post(endpoints().transferApi, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        return callback(response && response.data);
      })
      .then(() => {
        dispatch(receiveAddTransfer());
      })
      .catch((error) => {
        dispatch(transferCreateError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
        return callback(error && error.response && error.response.data);
      });
  };
}

/**
 * Delete Transfer
 *
 *  @param id
 * @returns {function(*): *}
 */
export default function deleteTransfer(id, params, allCurrentPage, allCurrentPageSize) {
  return (dispatch) => {
    dispatch(requestDeleteTransfer());

    apiClient
      .delete(`${endpoints().transferApi}/delete/${id}`)
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
            "transfer",
            `${endpoints().transferApi}/search`,
            allCurrentPage || 1,
            allCurrentPageSize || 25,
            {
              pagination: true,
              search: Url.GetParam("search"),
              status: Url.GetParam("status"),
              type: Url.GetParam("type"),
              section: Url.GetParam("section")

            },
            params

          )
        );
      })
      .catch((error) => {
        dispatch(transferDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}

export function requestUpdateTransfer() {
  return {
    type: TRANSFER_REQUEST_UPDATE,
  };
}

/**
 * Receive for updating Bill
 */
export function receiveUpdateTransfer() {
  return {
    type: TRANSFER_RECEIVE_UPDATE,
  };
}

/**
 * Receive for error updating Bill
 */
export function transferUpdateError(error) {
  return {
    type: TRANSFER_REQUEST_UPDATE,
    error,
  };
}

export function updateTransfer(id, data, getDetails, params) {
  return (dispatch) => {
    dispatch(requestUpdateTransfer());
    apiClient
      .put(`${endpoints().transferApi}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        getDetails(id)
      }
      )
      .catch((error) => {
        dispatch(transferUpdateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}

/* update the status */
export function receiveUpdatedTransferStatus() {
  return {
    type: RECEIVE_UPDATE_TRANSFER_STATUS,
  };
}
/**
 * Receive for error updating Product
 */
export function transferUpdateStatusError(error) {
  return {
    type: TRANSFER_UPDATE_ERROR_STATUS,
    error,
  };
}

export function updateTransferStatus(id, status, params, allCurrentPage, allCurrentPageSize) {


  let data = {};
  data.status = status;
  return (dispatch) => {
    dispatch(receiveUpdatedTransferStatus());
    apiClient
      .put(`${endpoints().transferApi}/status/${id}`, data)
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
            "transfer",
            `${endpoints().transferApi}/search`,
            allCurrentPage || 1,
            allCurrentPageSize || 25,
            {
              pagination: true,
              search: Url.GetParam("search"),
              status: Url.GetParam("status"),
              type: Url.GetParam("type"),
              section: Url.GetParam("section"),
              startDate : Url.GetParam("startDate"),
              endDate : Url.GetParam("endDate"),
              user : Url.GetParam("user"),
              fromLocation :Url.GetParam("fromLocation"),
              toLocation :Url.GetParam("toLocation")



            },
            params

          )
        );
      })
      .catch((error) => {
        dispatch(transferUpdateStatusError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}
