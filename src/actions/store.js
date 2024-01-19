/**
 * Service dependencies
 */
import { apiClient } from "../api/client";
import { apiEndpoints } from "../api/endpoints";
import { fetchList } from "./table";
import { toast } from "react-toastify";

import {
  REQUEST_CREATE_NEW_STORE,
  RECEIVE_CREATE_NEW_STORE,
  NEW_STORE_CREATE_ERROR
} from "../constants/ActionTypes";
import { HttpStatus } from "../../helpers/HttpStatus";

/**
 * Request for creating new store
 */
export function requestCreateNewStore() {
  return {
    type: REQUEST_CREATE_NEW_STORE
  };
}

/**
 * Receive for creating new store
 */
export function receiveCreateNewStore() {
  return {
    type: RECEIVE_CREATE_NEW_STORE
  };
}

/**
 * Receive for error creating new store
 */
export function newStoreCreateError(error) {
  return {
    type: NEW_STORE_CREATE_ERROR,
    error
  };
}

/**
 * Create New Store
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addNewStore(data) {
  return dispatch => {
    dispatch(requestCreateNewStore());

    return apiClient
      .post(apiEndpoints().store, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(fetchList("location", `${apiEndpoints().store}/search`, 1, 25));
        dispatch(receiveCreateNewStore());
      })
      .catch(error => {
        dispatch(newStoreCreateError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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
