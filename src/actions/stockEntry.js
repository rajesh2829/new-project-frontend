import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { HttpStatus } from "../helpers/HttpStatus";

/* Stock Entry */
const StockEntry = {
  REQUEST_DELETE: "REQUEST_DELETE",
  RECEIVE_DELETE: "RECEIVE_DELETE",

  REQUEST_ADD: "REQUEST_ADD",
  RECEIVE_ADD: "RECEIVE_ADD",
  ADD_ERROR: "ADD_ERROR",

  REQUEST_UPDATE: "REQUEST_UPDATE",
  RECEIVE_UPDATE: "RECEIVE_UPDATE",
  UPDATE_ERROR: "UPDATE_ERROR",
  DELETE_ERROR: "DELETE_ERROR",

  REQUEST_ADD_PRODUCT: "REQUEST_ADD_PRODUCT",
  RECEIVE_ADD_PRODUCT: "RECEIVE_ADD_PRODUCT",
  PRODUCT_ADD_ERROR: "PRODUCT_ADD_ERROR",

  REQUEST_DELETE_PRODUCT: "REQUEST_DELETE_PRODUCT",
  RECEIVE_DELETE_PRODUCT: "RECEIVE_DELETE_PRODUCT",
  PRODUCT_DELETE_ERROR: "PRODUCT_DELETE_ERROR",

  REQUEST_UPDATE_PRODUCT: "REQUEST_UPDATE_PRODUCT",
  RECEIVE_UPDATE_PRODUCT: "RECEIVE_UPDATE_PRODUCT",
  PRODUCT_UPDATE_ERROR: "PRODUCT_UPDATE_ERROR",

  REQUEST_UPDATE_STOCKENTRY_STATUS: "REQUEST_UPDATE_STOCKENTRY_STATUS",
  RECEIVE_UPDATE_STOCKENTRY_STATUS: "RECEIVE_UPDATE_STOCKENTRY_STATUS",
  STOCKENTRY_UPDATE_ERROR_STATUS: "STOCKENTRY_UPDATE_ERROR_STATUS",
}

/**
 * Request for deleting Stock Entry
 */
export function requestDeleteStockEntry() {
  return {
    type: StockEntry.REQUEST_DELETE,
  };
}

/**
 * Receive for deleting Stock Entry
 */
export function receiveDeleteStockEntry() {
  return {
    type: StockEntry.RECEIVE_DELETE,
  };
}

/**
 * Receive for error deleting brand
 */
export function StockEntryDeleteError(error) {
  return {
    type: StockEntry.DELETE_ERROR,
    error,
  };
}

/**
 * Delete brand
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteStockEntry(id, params, stockEntryCurrentpage, stockEntryPageSize) {
  return (dispatch) => {
    dispatch(requestDeleteStockEntry());

    apiClient
      .delete(`${endpoints().stockEntry}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("stockEntry", `${endpoints().stockEntry}/search`, stockEntryCurrentpage || 1, stockEntryPageSize || 25, params)
        );
      })
      .catch((error) => {
        dispatch(brandDeleteError(error));
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

/**
 * Request for creating Stock Entry
 */
export function requestAddStockEntry() {
  return {
    type: StockEntry.REQUEST_ADD,
  };
}

/**
 * Receive for receive Stock Entry
 */
export function receiveAddStockEntry() {
  return {
    type: StockEntry.RECEIVE_ADD,
  };
}

/**
 * Receive for error creating Stock Entry
 */
export function StockEntryCreateError(error) {
  return {
    type: StockEntry.ADD_ERROR,
    error,
  };
}

/**
 * Create stock entry
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}

/**
 * Request for creating Stock Entry
 */
export function requestAddStockProductEntry() {
  return {
    type: StockEntry.REQUEST_ADD_PRODUCT,
  };
}

/**
 * Receive for receive Stock Entry
 */
export function receiveAddStockProductEntry() {
  return {
    type: StockEntry.RECEIVE_ADD_PRODUCT,
  };
}

/**
 * Receive for error creating Stock Entry
 */
export function StockEntryProductCreateError(error) {
  return {
    type: StockEntry.PRODUCT_ADD_ERROR,
    error,
  };
}

/**
 * Create stock entry
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */


/**
 * Request for creating Stock Entry
 */
export function requestDeleteStockProductEntry() {
  return {
    type: StockEntry.REQUEST_DELETE_PRODUCT,
  };
}

/**
 * Receive for receive Stock Entry
 */
export function receiveDeleteStockProductEntry() {
  return {
    type: StockEntry.RECEIVE_DELETE_PRODUCT,
  };
}

/**
 * Receive for error creating Stock Entry
 */
export function StockEntryProductDeleteError(error) {
  return {
    type: StockEntry.PRODUCT_DELETE_ERROR,
    error,
  };
}

/**
 * Create stock entry
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */


/**
 * Request for creating Stock Entry
 */
export function requestUpdateStockProductEntry() {
  return {
    type: StockEntry.REQUEST_UPDATE_PRODUCT,
  };
}

/**
 * Receive for receive Stock Entry
 */
export function receiveUpdateStockProductEntry() {
  return {
    type: StockEntry.RECEIVE_UPDATE_PRODUCT,
  };
}

/**
 * Receive for error creating Stock Entry
 */
export function StockEntryProductUpdationError(error) {
  return {
    type: StockEntry.PRODUCT_UPDATE_ERROR,
    error,
  };
}


/**
 * Create stock entry
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */



export function requestUpdateStockEntry() {
  return {
    type: StockEntry.REQUEST_UPDATE,
  };
}

/**
 * Receive for updating Bill
 */
export function receiveUpdateStockEntry() {
  return {
    type: StockEntry.RECEIVE_UPDATE,
  };
}

/**
 * Receive for error updating Bill
 */
export function stockEntryUpdateError(error) {
  return {
    type: StockEntry.UPDATE_ERROR,
    error,
  };
}

/* update the status */
export function receiveUpdatedStockEntryStatus() {
  return {
    type: StockEntry.RECEIVE_UPDATE_STOCKENTRY_STATUS,
  };
}
/**
 * Receive for error updating Product
 */
export function stockEntryUpdateStatusError(error) {
  return {
    type: StockEntry.STOCKENTRY_UPDATE_ERROR_STATUS,
    error,
  };
}

