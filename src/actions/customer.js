/**
 * Service dependencies
 */
import { endpoints } from "../api/endPoints";
import { fetchList } from "./table";

// import {
//   REQUEST_CREATE_NEW_CUSTOMER,
//   RECEIVE_CREATE_NEW_CUSTOMER,
//   NEW_CUSTOMER_CREATE_ERROR
// } from "../constants/ActionTypes";

// import customerService from "../services/customerService";

/**
 * Request for creating new customer
 */
export function requestCreateNewCustomer() {
  return {
    type: REQUEST_CREATE_NEW_CUSTOMER
  };
}

/**
 * Receive for creating new customer
 */
export function receiveCreateNewCustomer() {
  return {
    type: RECEIVE_CREATE_NEW_CUSTOMER
  };
}

/**
 * Receive for error creating new customer
 */
export function newCustomerCreateError(error) {
  return {
    type: NEW_CUSTOMER_CREATE_ERROR,
    error
  };
}

/**
 * Import customer
 *
 * @param storeId
 * @param params
 * @param pageSize
 * @param page
 */
export function importCustomer(storeId, params, pageSize = 25, page = 1) {
  return async dispatch => {
    const response = await customerService.importCustomer(storeId);
    dispatch(requestCreateNewCustomer());
    dispatch(
      fetchList(
        "customer",
        `${endpoints().customer}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveCreateNewCustomer());
    return response;
  };
}

/**
 * Filter customer
 *
 * @param params
 * @param pageSize
 * @param page
 */
export function filterCustomerList(params, pageSize = 25, page = 1) {
  return dispatch => {
    dispatch(requestCreateNewCustomer());
    dispatch(
      fetchList(
        "customer",
        `${endpoints().customer}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveCreateNewCustomer());
  };
}
