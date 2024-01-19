// import toast from "../components/toast";
import { endpoints } from "../api/endPoints";
import { fetchList } from "./tableCopy";

import {
  REQUEST_PRODUCT_LIST,
  RECEIVE_PRODUCT_LIST,
  PRODUCT_LIST_ERROR
} from "../helpers/Store";

/**
 * Request for updating Expert
 */
export function requestProductList() {
  return {
    type: REQUEST_PRODUCT_LIST
  };
}

/**
 * Receive for updating Expert
 */
export function receiveProductList() {
  return {
    type: RECEIVE_PRODUCT_LIST
  };
}

/**
 * Receive for error updating Expert
 */
export function productListError(error) {
  return {
    type: PRODUCT_LIST_ERROR,
    error
  };
}

/**
 * Update Expert
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function filterProductList(params, pageSize = 25, page = 1) {
  return dispatch => {
    dispatch(requestProductList());
    dispatch(
      fetchList(
        "products",
        `${endpoints().product}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveProductList());
  };
}

/**
 * Get Vendor Product
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function filterVendorProductList(params, pageSize, page) {
  return dispatch => {
    dispatch(requestProductList());
    dispatch(
      fetchList(
        "vendorProducts",
        `${endpoints().vendorProduct}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveProductList());
  };
}
