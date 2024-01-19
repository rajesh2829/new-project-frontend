import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { Order } from "../helpers/Order";


export const Tab = {
  ACTIVE: "Active",
  ALL: "All",
  DRAFT: "Draft",
  COMPLETED: "Completed",
};
// Action Constants
export const Action = {
  // Delete Orders
  REQUEST_DELETE_ORDER: "REQUEST_DELETE_ORDER",
  RECEIVE_DELETE_ORDER: "RECEIVE_DELETE_ORDER",
  ORDER_DELETE_ERROR: "ORDER_DELETE_ERROR",
};

/**
 * Request for deleting Order
 */
export function requestdeleteOrder() {
  return {
    type: Action.REQUEST_DELETE_ORDER,
  };
}

/**
 * Receive for error deleting Order
 */
export function receiveDeleteOrder(error) {
  return {
    type: Action.RECEIVE_DELETE_ORDER,
    error,
  };
}

/**
 * Receive for error deleting Order
 */
export function OrderDeleteError(error) {
  return {
    type: Action.ORDER_DELETE_ERROR,
    error,
  };
}
/**
 * Delete Order
 *
 *  @param id
 * @returns {function(*): *}
 */


