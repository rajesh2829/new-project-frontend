import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import Url from "../lib/Url";
import { Brand } from "../helpers/Brand";

// Action Constants
export const Action = {
  // Delete Brand Constants
  REQUEST_DELETE_BRAND: "REQUEST_DELETE_BRAND",
  RECEIVE_DELETE_BRAND: "RECEIVE_DELETE_BRAND",
  BRAND_DELETE_ERROR: "BRAND_DELETE_ERROR",
  // Add Brand Constants
  REQUEST_ADD_BRAND: "REQUEST_ADD_BRAND",
  RECEIVE_ADD_BRAND: "RECEIVE_ADD_BRAND",
  BRAND_ADD_ERROR: "BRAND_ADD_ERROR",
  // Update Brand Constants
  REQUEST_UPDATE_BRAND: "REQUEST_UPDATE_BRAND",
  RECEIVE_UPDATE_BRAND: "RECEIVE_UPDATE_BRAND",
  BRAND_UPDATE_ERROR: "BRAND_UPDATE_ERROR",
  // Update Brand Brand Constants
  REQUEST_UPDATE_BRAND_STATUS: "REQUEST_UPDATE_BRAND_STATUS",
  RECEIVE_UPDATE_BRAND_STATUS: "RECEIVE_UPDATE_BRAND_STATUS",
  BRAND_UPDATE_ERROR_STATUS: "BRAND_UPDATE_ERROR_STATUS",
}

/**
 * Request for deleting brand
 */
export function requestDeleteBrand() {
  return {
    type: Action.REQUEST_DELETE_BRAND,
  };
}

/**
 * Receive for deleting brand
 */
export function receiveDeleteBrand() {
  return {
    type: Action.RECEIVE_DELETE_BRAND,
  };
}

/**
 * Receive for error deleting brand
 */
export function brandDeleteError(error) {
  return {
    type: Action.BRAND_DELETE_ERROR,
    error,
  };
}

/**
 * Delete brand
 *
 * @param id
 * @returns {function(*): *}
 */


/**
 * Request for creating brand
 */
export function requestAddBrand() {
  return {
    type: Action.REQUEST_ADD_BRAND,
  };
}

/**
 * Receive for receive brand
 */
export function receiveAddBrand() {
  return {
    type: Action.RECEIVE_ADD_BRAND,
  };
}

/**
 * Receive for error creating brand
 */
export function brandCreateError(error) {
  return {
    type: Action.BRAND_ADD_ERROR,
    error,
  };
}

/**
 * Create brand
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */


/**
 * Request for updating brand
 */
export function requestUpdateBrand() {
  return {
    type: Action.REQUEST_UPDATE_BRAND,
  };
}

/**
 * Receive for updating brand
 */
export function receiveUpdateBrand() {
  return {
    type: Action.RECEIVE_UPDATE_BRAND,
  };
}

/**
 * Receive for error updating brand
 */
export function brandUpdateError(error) {
  return {
    type: Action.BRAND_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Releaase details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */


/* update the status */
export function receiveUpdatedBrandStatus() {
  return {
    type: Action.RECEIVE_UPDATE_BRAND_STATUS,
  };
}

/**
 * Receive for error updating Product
 */
export function brandUpdateStatusError(error) {
  return {
    type: Action.BRAND_UPDATE_ERROR_STATUS,
    error,
  };
}
