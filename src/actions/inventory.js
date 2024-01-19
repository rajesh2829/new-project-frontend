/**
 * Service dependencies
 */
import { apiClient } from "../api/client";
import { apiEndpoints } from "../api/endpoints";
import { fetchList } from "./table";
import { toast } from "react-toastify";

import {
  REQUEST_CREATE_NEW_INVENTORY,
  RECEIVE_CREATE_NEW_INVENTORY,
  NEW_INVENTORY_CREATE_ERROR
} from "../constants/ActionTypes";
import { HttpStatus } from "../../helpers/HttpStatus";

/**
 * Request for creating new Inventory
 */
export function requestCreateNewInventory() {
  return {
    type: REQUEST_CREATE_NEW_INVENTORY
  };
}

/**
 * Receive for creating new Inventory
 */
export function receiveCreateNewInventory() {
  return {
    type: RECEIVE_CREATE_NEW_INVENTORY
  };
}

/**
 * Receive for error creating new Inventory
 */
export function newInventoryCreateError(error) {
  return {
    type: NEW_INVENTORY_CREATE_ERROR,
    error
  };
}

/**
 * Create New Inventory
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addNewInventory(data, params, pageSize = 25, page = 1) {
  return dispatch => {
    dispatch(requestCreateNewInventory());

    return apiClient
      .post(apiEndpoints().inventory, data)
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
            "inventory",
            `${apiEndpoints().inventory}/search`,
            page,
            pageSize,
            params ? params : {}
          )
        );
        dispatch(receiveCreateNewInventory());
      })
      .catch(error => {
        dispatch(newInventoryCreateError(error));

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
