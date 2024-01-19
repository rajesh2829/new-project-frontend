/**
 * Service dependencies
 */
import { apiClient } from "../api/client";
import { apiEndpoints } from "../api/endpoints";
import { fetchList } from "./storeActions/tableCopy";
import { toast } from "react-toastify";

import {
  REQUEST_CREATE_NEW_BRAND,
  RECEIVE_CREATE_NEW_BRAND,
  NEW_BRAND_CREATE_ERROR
} from "../constants/ActionTypes";
import { HttpStatus } from "../helpers/HttpStatus";

/**
 * Request for creating new brand
 */
export function requestCreateNewBrand() {
  return {
    type: REQUEST_CREATE_NEW_BRAND
  };
}

/**
 * Receive for creating new brand
 */
export function receiveCreateNewBrand() {
  return {
    type: RECEIVE_CREATE_NEW_BRAND
  };
}

/**
 * Receive for error creating new brand
 */
export function newBrandCreateError(error) {
  return {
    type: NEW_BRAND_CREATE_ERROR,
    error
  };
}

/**
 * Create New Brand
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addNewBrand(data, params, pageSize = 25, page = 1) {
  return dispatch => {
    dispatch(requestCreateNewBrand());

    return apiClient
      .post(apiEndpoints().productBrand, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "brand",
            `${apiEndpoints().productBrand}/search`,
            page,
            pageSize,
            params ? params : {}
          )
        );
        dispatch(receiveCreateNewBrand());
      })
      .catch(error => {
        dispatch(newBrandCreateError(error));

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
