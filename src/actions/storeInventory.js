/**
 * Service dependencies
 */
import { toast } from "react-toastify";
import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import * as inventryConstant from "../helpers/Store";
import { HttpStatus } from "../helpers/HttpStatus";

/**
 * Request for creating new Inventory
 */
export function requestCreateNewInventory() {
  return {
    type: inventryConstant.REQUEST_CREATE_NEW_INVENTORY,
  };
}

/**
 * Receive for creating new Inventory
 */
export function receiveCreateNewInventory() {
  return {
    type: inventryConstant.RECEIVE_CREATE_NEW_INVENTORY,
  };
}

/**
 * Receive for error creating new Inventory
 */
export function newInventoryCreateError(error) {
  return {
    type: inventryConstant.NEW_INVENTORY_CREATE_ERROR,
    error,
  };
}

/**
 * Create New Inventory
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addNewInventory(data, handleChange, params, callback) {
  return (dispatch) => {
    dispatch(requestCreateNewInventory());

    apiClient
      .post(endpoints().inventoryAPI, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        handleChange();
        return callback(null);
      })
      .then(() => {
        dispatch(
          fetchList(
            "Stock",
            `${endpoints().inventoryAPI}/search`,
            1,
            25,
            params ? params : {}
          )
        );
        dispatch(receiveCreateNewInventory());
      })
      .catch((error) => {
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
        return callback(error);
      });
  };
}
