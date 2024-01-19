/**
 * Service dependencies
 */
import { endpoints } from "../api/endPoints";
import { fetchList } from "./table";

import {
  REQUEST_CREATE_NEW_ORDER,
  RECEIVE_CREATE_NEW_ORDER,
  NEW_ORDER_CREATE_ERROR
} from "../helpers/Store";

// import orderService from "../services/orderService";

/**
 * Request for creating new Order
 */
export function requestCreateNewOrder() {
  return {
    type: REQUEST_CREATE_NEW_ORDER
  };
}

/**
 * Receive for creating new Order
 */
export function receiveCreateNewOrder() {
  return {
    type: RECEIVE_CREATE_NEW_ORDER
  };
}

/**
 * Receive for error creating new Order
 */
export function newOrderCreateError(error) {
  return {
    type: NEW_ORDER_CREATE_ERROR,
    error
  };
}

/**
 * Import order
 *
 * @param storeId
 * @param params
 * @param pageSize
 * @param page
 */


/**
 * Filter order
 *
 * @param params
 * @param pageSize
 * @param page
 */

