import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import  Url from "../lib/Url";

/* Delete portal */
export const REQUEST_DELETE_PRODUCT_TAG = "REQUEST_DELETE_PRODUCT_TAG";
export const RECEIVE_DELETE_PRODUCT_TAG = "RECEIVE_DELETE_PRODUCT_TAG";
export const PRODUCT_TAG_DELETE_ERROR = "PRODUCT_TAG_DELETE_ERROR";

/* Add portal */
export const REQUEST_ADD_PRODUCT_TAG = "REQUEST_ADD_PRODUCT_TAG";
export const RECEIVE_ADD_PRODUCT_TAG = "RECEIVE_ADD_PRODUCT_TAG";
export const PRODUCT_TAG_ADD_ERROR = "PRODUCT_TAG_ADD_ERROR";

/* Update portals */
export const REQUEST_UPDATE_PRODUCT_TAG = "REQUEST_UPDATE_PRODUCT_TAG";
export const RECEIVE_UPDATE_PRODUCT_TAG = "RECEIVE_UPDATE_PRODUCT_TAG";
export const PRODUCT_TAG_UPDATE_ERROR = "PRODUCT_TAG_UPDATE_ERROR";

/* Tag Status Update portals */
export const REQUEST_UPDATE_PRODUCT_TAG_STATUS =
  "REQUEST_UPDATE_PRODUCT_TAG_STATUS";
export const PRODUCT_TAG_UPDATE_STATUS_ERROR =
  "PRODUCT_TAG_UPDATE_STATUS_ERROR";

/**
 * Request for deleting ProductTag
 */
export function requestDeleteProductTag() {
  return {
    type: REQUEST_DELETE_PRODUCT_TAG,
  };
}

/**
 * Receive for deleting ProductTag
 */
export function receiveDeleteProductTag() {
  return {
    type: RECEIVE_DELETE_PRODUCT_TAG,
  };
}

/**
 * Receive for error deleting ProductTag
 */
export function productTagDeleteError(error) {
  return {
    type: PRODUCT_TAG_DELETE_ERROR,
    error,
  };
}

/**
 * Delete ProductTag
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteProductTag(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteProductTag());

    apiClient
      .delete(`${endpoints().tagApi}/${id}`)
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
            "allTags",
            `${endpoints().tagApi}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(productTagDeleteError(error));
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
 * Request for creating ProductTag
 */
export function requestAddProductTag() {
  return {
    type: REQUEST_ADD_PRODUCT_TAG,
  };
}
/**
 * Receive for receive ProductTag
 */
export function receiveAddPortal() {
  return {
    type: RECEIVE_ADD_PRODUCT_TAG,
  };
}

/**
 * Receive for error creating ProductTag
 */
export function productTagCreateError(error) {
  return {
    type: PRODUCT_TAG_ADD_ERROR,
    error,
  };
}

/**
 * Create Product
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addProductTag(data, params, toggle) {


  return (dispatch) => {
    dispatch(requestAddProductTag());

    return apiClient
      .post(`${endpoints().tagApi}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        toggle();
      })
      .then(() => {
        dispatch(
          fetchList("allTags", `${endpoints().tagApi}/search`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(productTagCreateError(error));

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
 * Request for updating ProductTag
 */
export function requestUpdateProductTag() {
  return {
    type: REQUEST_UPDATE_PRODUCT_TAG,
  };
}

/**
 * Receive for updating ProductTag
 */
export function receiveUpdateProductTag() {
  return {
    type: RECEIVE_UPDATE_PRODUCT_TAG,
  };
}

/**
 * Receive for error updating ProductTag
 */
export function productTagUpdateError(error) {
  return {
    type: PRODUCT_TAG_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Product details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateProductTag(id, data, params,toggle) {
  return (dispatch) => {
    dispatch(requestUpdateProductTag());
    apiClient
      .put(`${endpoints().tagApi}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          toggle()
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "allTags",
            `${endpoints().tagApi}/search`,
            1,
            25,
            params
          )
        ); 
      })
      .catch((error) => {
        dispatch(productTagUpdateError(error));

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

/**
 * Request for updating ProductTag
 */
export function requestUpdateTagStatus() {
  return {
    type: REQUEST_UPDATE_PRODUCT_TAG_STATUS,
  };
}

/**
 * Receive for error updating ProductTag
 */
export function TagStatusUpdateError(error) {
  return {
    type: PRODUCT_TAG_UPDATE_STATUS_ERROR,
    error,
  };
}

/**
 * Update Product tag Status
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateTagStatus(id, status, params) {
  const sort = Url.GetParam("sort");
  const sortDir = Url.GetParam("sortDir");
  let data = {};
  data.status = status;
  return (dispatch) => {
    dispatch(requestUpdateTagStatus());
    apiClient
      .put(`${endpoints().tagApi}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("allTags", `${endpoints().tagApi}/search`, 1, 25, {
            sort: sort || "",
            sortDir: sortDir || "",
          })
        );
      })
      .catch((error) => {
        dispatch(TagStatusUpdateError(error));

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
