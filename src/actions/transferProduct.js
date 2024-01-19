import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { fetchList } from "./table";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest } from "../lib/Http";

const actionConstants = {

  REQUEST_ADD_TRANSFER_PRODUCT: "REQUEST_ADD_TRANSFER_PRODUCT",
  RECEIVE_ADD_TRANSFER_PRODUCT: "RECEIVE_ADD_TRANSFER_PRODUCT",
  TRANSFER_PRODUCT_ADD_ERROR: "TRANSFER_PRODUCT_ADD_ERROR",

  REQUEST_DELETE_TRANSFER_PRODUCT: "REQUEST_DELETE_TRANSFER_PRODUCT",
  RECEIVE_DELETE_TRANSFER_PRODUCT: "RECEIVE_DELETE_TRANSFER_PRODUCT",
  TRANSFER_PRODUCT_DELETE_ERROR: "TRANSFER_PRODUCT_DELETE_ERROR",

  REQUEST_UPDATE_TRANSFER_PRODUCT: "REQUEST_UPDATE_TRANSFER_PRODUCT",
  RECEIVE_UPDATE_TRANSFER_PRODUCT: "RECEIVE_UPDATE_TRANSFER_PRODUCT",
  TRANSFER_PRODUCT_UPDATE_ERROR: "TRANSFER_PRODUCT_UPDATE_ERROR",

  REQUEST_UPDATE_SALE_STATUS: "REQUEST_UPDATE_SALE_STATUS",
  RECEIVE_UPDATE_TRANSFER_STATUS: "RECEIVE_UPDATE_TRANSFER_STATUS",
  TRANSFER_UPDATE_ERROR_STATUS: "TRANSFER_UPDATE_ERROR_STATUS",
}
export function requestAddTransferProduct() {
  return {
    type: actionConstants.REQUEST_ADD_TRANSFER_PRODUCT,
  };
}

export function receiveAddTransferProduct() {
  return {
    type: actionConstants.RECEIVE_ADD_TRANSFER_PRODUCT,
  };
}


export function transferProductCreateError(error) {
  return {
    type: actionConstants.TRANSFER_PRODUCT_ADD_ERROR,
    error,
  };
}
export function addTransferProduct(data, params, setValue, setQuantityLabels) {

  return (dispatch) => {
    try {
      dispatch(requestAddTransferProduct());

      apiClient
        .post(endpoints().transferProductApi, data)
        .then((response) => {

          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          setValue();
          setQuantityLabels();
        })
        .then(() => {
          dispatch(
            fetchList(
              "transferProduct",
              `${endpoints().transferProductApi}/search`,
              1,
              25,
              params
            )
          )
          dispatch(receiveAddTransferProduct());
        }).catch((error) => {
          dispatch(transferProductCreateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
            console.error(errorMessage);
          }
          return error;
        });
    } catch (error) {
      dispatch(transferProductCreateError(error));

      if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(errorMessage);
        console.error(errorMessage);
      }
      return error;
    };
  };
}

// * Request for creating Transfer 
export function requestDeleteTransferProduct() {
  return {
    type: actionConstants.REQUEST_DELETE_TRANSFER_PRODUCT,
  };
}

/**
 * Receive for receive Transfer 
 */
export function receiveDeleteTransferProduct() {
  return {
    type: actionConstants.RECEIVE_DELETE_TRANSFER_PRODUCT,
  };
}

/**
 * Receive for error creating Transfer 
 */
export function TransferProductDeleteError(error) {
  return {
    type: actionConstants.TRANSFER_PRODUCT_DELETE_ERROR,
    error,
  };
}

/**
 * Create Transfer
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function deleteTransferProduct(id, params, closeDeleteModal) {

  return (dispatch) => {
    dispatch(requestDeleteTransferProduct());

    apiClient
      .delete(`${endpoints().transferProductApi}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
        closeDeleteModal();
        return response && response.data;
      })
      .then(() => {
        dispatch(
          fetchList(
            "transferProduct",
            `${endpoints().transferProductApi}/search`,
            1,
            25,
            params ? params : {}
          )
        );
        dispatch(receiveDeleteTransferProduct());
      })
      .catch((error) => {
        dispatch(TransferProductDeleteError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
        return error;
      });
  };
}

export function requestUpdateTransferProduct() {
  return {
    type: actionConstants.REQUEST_UPDATE_TRANSFER_PRODUCT,
  };
}

/**
 * Receive for receive Transfer 
 */
export function receiveUpdateTransferProduct() {
  return {
    type: actionConstants.RECEIVE_UPDATE_TRANSFER_PRODUCT,
  };
}

/**
 * Receive for error creating Transfer 
 */
export function TransferProductUpdationError(error) {
  return {
    type: actionConstants.TRANSFER_PRODUCT_UPDATE_ERROR,
    error,
  };
}


/**
 * Create Transfer
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updateTransferProduct(id, body, params) {

  return (dispatch) => {
    try {

      dispatch(requestUpdateTransferProduct());
      apiClient
        .put(`${endpoints().transferProductApi}/${id}`, body)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          return response && response.data;
        })
        .then(() => {
          dispatch(
            fetchList(
              "transferProduct",
              `${endpoints().transferProductApi}/search`,
              1,
              25,
              params ? params : {}
            )
          );
          dispatch(receiveUpdateTransferProduct());
        })
        .catch((error) => {
          dispatch(TransferProductUpdationError(error));
          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
            console.error(errorMessage);
          }
          return error;
        })
    } catch (error) {
      dispatch(TransferProductUpdationError(error));

      if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(errorMessage);
        console.error(errorMessage);
      }
      return error;
    };
  };
}


/* update the status */
export function receiveUpdatedTransferStatus() {
  return {
    type: actionConstants.RECEIVE_UPDATE_TRANSFER_STATUS,
  };
}
/**
 * Receive for error updating Product
 */
export function transferUpdateStatusError(error) {
  return {
    type: actionConstants.TRANSFER_UPDATE_ERROR_STATUS,
    error,
  };
}

export function updateTransferStatus(id, status, params, pageSize, currentPage) {
  let data = {};
  data.status = status;

  return (dispatch) => {
    dispatch(receiveUpdatedTransferStatus());
    apiClient
      .put(`${endpoints().transferProductApi}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("transferProduct", `${endpoints().transferProductApi}/search`, currentPage, pageSize, params)
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
          Toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}