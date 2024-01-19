import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

/* Delete portal */
const REQUEST_DELETE_STORE = "REQUEST_DELETE_STORE";
const RECEIVE_DELETE_STORE = "RECEIVE_DELETE_STORE";
const STORE_DELETE_ERROR = "STORE_DELETE_ERROR";

/* Add portal */
const REQUEST_ADD_STORE = "REQUEST_ADD_STORE";
const RECEIVE_ADD_STORE = "RECEIVE_ADD_STORE";
const STORE_ADD_ERROR = "STORE_ADD_ERROR";

/* Update portals */
const REQUEST_UPDATE_STORE = "REQUEST_UPDATE_STORE";
const RECEIVE_UPDATE_STORE = "RECEIVE_UPDATE_STORE";
const STORE_UPDATE_ERROR = "STORE_UPDATE_ERROR";

/**
 * Request for deleting Store
 */
export function requestDeleteStore() {
  return {
    type: REQUEST_DELETE_STORE,
  };
}

/**
 * Receive for deleting Store
 */
export function receiveDeleteStore() {
  return {
    type: RECEIVE_DELETE_STORE,
  };
}

/**
 * Receive for error deleting Store
 */
export function storeDeleteError(error) {
  return {
    type: STORE_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Store
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteStoreProduct(id, params, tableId,CurrentPage,CurrentPageSize,) {
  return (dispatch) => {
    dispatch(requestDeleteStore());

    apiClient
      .delete(`${endpoints().storeProductAPI}/${id}`)
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
            tableId,
            `${endpoints().storeProductAPI}/search`,
            CurrentPage||  1,
            CurrentPageSize|| 25,
            params
            
          )
        );
      })
      .catch((error) => {
        dispatch(storeDeleteError(error));
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
 * Request for creating Store
 */
export function requestAddStore() {
  return {
    type: REQUEST_ADD_STORE,
  };
}

/**
 * Receive for receive Store
 */
export function receiveAddPortal() {
  return {
    type: RECEIVE_ADD_STORE,
  };
}

/**
 * Receive for error creating Store
 */
export function storeCreateError(error) {
  return {
    type: STORE_ADD_ERROR,
    error,
  };
}

/**
 * Create Store
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addStore(data, params, toggle, getProductDetail) {
  
  return (dispatch) => {
    dispatch(requestAddStore());

    return apiClient
      .post(`${endpoints().storeProductAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          toggle();
          getProductDetail();
        }
      })
      .then(async () => {
        dispatch(
          fetchList(
            "storeProductReplenish", `${endpoints().storeProductAPI}/replenish/search`, 1, 25, params
          )
        );
        dispatch(receiveAddPortal());
      })
      .then(async () => {
        dispatch(
          fetchList(
            "activeStore", `${endpoints().locationAPI}/search`, 1, 25, params
          )
        );
        dispatch(receiveAddPortal());
      })
      .catch((error) => {
        dispatch(storeCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };
}

/**
 * Request for updating Store
 */
export function requestUpdateStore() {
  return {
    type: REQUEST_UPDATE_STORE,
  };
}

/**
 * Receive for updating Store
 */
export function receiveUpdateStore() {
  return {
    type: RECEIVE_UPDATE_STORE,
  };
}

/**
 * Receive for error updating Store
 */
export function storeUpdateError(error) {
  return {
    type: STORE_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Store details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateStore(id, data, params, store) {
  return (dispatch) => {
    dispatch(requestUpdateStore());
    apiClient
      .put(`${endpoints().locationAPI}/link/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          store();
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "stores",
            `${endpoints().locationAPI}/link/${id}`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(storeUpdateError(error));

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
