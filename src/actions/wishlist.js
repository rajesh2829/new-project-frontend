import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

// Action Constants
export const Action = {
  // Delete wishlist
  REQUEST_DELETE_WISHLIST: "REQUEST_DELETE_WISHLIST",
  RECEIVE_DELETE_WISHLIST: "RECEIVE_DELETE_WISHLIST",
  WISHLIST_DELETE_ERROR: "WISHLIST_DELETE_ERROR",
  // Add wishlist
  REQUEST_ADD_WISHLIST: "REQUEST_ADD_WISHLIST",
  RECEIVE_ADD_WISHLIST: "RECEIVE_ADD_WISHLIST",
  WISHLIST_ADD_ERROR: "WISHLIST_ADD_ERROR",
  // Update wishlist
  // REQUEST_UPDATE_wishlist : "REQUEST_UPDATE_wishlist",
  // RECEIVE_UPDATE_wishlist : "RECEIVE_UPDATE_wishlist",
  // wishlist_UPDATE_ERROR : "wishlist_UPDATE_ERROR",
};

/**
 * Request for deleting wishlist
 */
export function requestDeleteWishlist() {
  return {
    type: Action.REQUEST_DELETE_WISHLIST,
  };
}

/**
 * Receive for deleting wishlist
 */
export function receiveDeleteWishlist() {
  return {
    type: Action.RECEIVE_DELETE_WISHLIST,
  };
}

/**
 * Receive for error deleting wishlist
 */
export function wishlistDeleteError(error) {
  return {
    type: Action.WISHLIST_DELETE_ERROR,
    error,
  };
}

/**
 * Delete wishlist
 *
 * @param id
 * @returns {function(*): *}
 */


/**
 * Request for creating wishlist
 */
export function requestAddWishlist() {
  return {
    type: Action.REQUEST_ADD_WISHLIST,
  };
}

/**
 * Receive for receive wishlist
 */
export function receiveAddWishlist() {
  return {
    type: Action.RECEIVE_ADD_WISHLIST,
  };
}

/**
 * Receive for error creating wishlist
 */
export function wishlistCreateError(error) {
  return {
    type: Action.WISHLIST_ADD_ERROR,
    error,
  };
}

/**
 * Create wishlist
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

