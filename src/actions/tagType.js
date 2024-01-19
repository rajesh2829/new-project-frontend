import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import  Url from "../lib/Url";

/* Delete portal */
export const REQUEST_DELETE_TAG = "REQUEST_DELETE_TAG";
export const RECEIVE_DELETE_TAG = "RECEIVE_DELETE_TAG";
export const TAG_DELETE_ERROR = "TAG_DELETE_ERROR";

/* Add portal */
export const REQUEST_ADD_TAG = "REQUEST_ADD_TAG";
export const RECEIVE_ADD_TAG = "RECEIVE_ADD_TAG";
export const TAG_ADD_ERROR = "TAG_ADD_ERROR";

/* Update portals */
export const REQUEST_UPDATE_TAG = "REQUEST_UPDATE_TAG";
export const RECEIVE_UPDATE_TAG = "RECEIVE_UPDATE_TAG";
export const TAG_UPDATE_ERROR = "TAG_UPDATE_ERROR";



/**
 * Request for deleting TagType
 */
export function requestDeleteTagType() {
  return {
    type: REQUEST_DELETE_TAG,
  };
}

/**
 * Receive for deleting TagType
 */
export function receiveDeleteTagType() {
  return {
    type: RECEIVE_DELETE_TAG,
  };
}

/**
 * Receive for error deleting TagType
 */
export function TagDeleteError(error) {
  return {
    type: TAG_DELETE_ERROR,
    error,
  };
}

/**
 * Delete TagType
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteTagType(id, params) {

  return (dispatch) => {
    dispatch(requestDeleteTagType());

    apiClient
      .delete(`${endpoints().tagTypeApi}/${id}`)
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
            `${endpoints().tagTypeApi}/search`,
            1,
            25,
            {params, pagination:true}
            
          )
        );
      })
      .catch((error) => {
        dispatch(TagDeleteError(error));
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
 * Request for creating TagType
 */
export function requestAddTagType() {
  return {
    type: REQUEST_ADD_TAG,
  };
}
/**
 * Receive for receive TagType
 */
export function receiveAddPortal() {
  return {
    type: RECEIVE_ADD_TAG,
  };
}

/**
 * Receive for error creating TagType
 */
export function TagCreateError(error) {
  return {
    type: TAG_ADD_ERROR,
    error,
  };
}

/**
 * Create TagType
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addTagType(data, params, toggle) {


  return async (dispatch) => {
    dispatch(requestAddTagType());

    try {
          const response = await apiClient
              .post(`${endpoints().tagTypeApi}`, data);
          let successMessage;
          if (response && response.data) {
              successMessage = response.data.message;
              toast.success(successMessage);
          }
          toggle(); dispatch(
              fetchList("allTags", `${endpoints().tagTypeApi}/search`, 1, 25, {
                  params,
                  pagination: true,
              })
          );
      } catch (error) {
          dispatch(TagCreateError(error));

          if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                  errorMessage = JSON.parse(errorRequest.response).message;
              }
              toast.error(errorMessage);
              console.error(errorMessage);
          }
      }
  };
}

/**
 * Request for updating TagType
 */
export function requestUpdateTag() {
  return {
    type: REQUEST_UPDATE_TAG,
  };
}

/**
 * Receive for updating TagType
 */
export function receiveUpdateTag() {
  return {
    type: RECEIVE_UPDATE_TAG,
  };
}

/**
 * Receive for error updating TagType
 */
export function TagUpdateError(error) {
  return {
    type: TAG_UPDATE_ERROR,
    error,
  };
}

/**
 * Update TagType details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateTagType(id, data, params,toggle) {
  return (dispatch) => {
    dispatch(requestUpdateTag());
    apiClient
      .put(`${endpoints().tagTypeApi}/${id}`, data)
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
          fetchList(
            "allTags",
            `${endpoints().tagTypeApi}/search`,
            1,
            25,
            {params, pagination:true}
          )
        );
      })
      .catch((error) => {
        dispatch(TagUpdateError(error));

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
