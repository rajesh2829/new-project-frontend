// import toast from "../components/toast";
import { apiEndpoints } from "../api/endpoints";
import { fetchList } from "./table";

import {
  REQUEST_PRODUCT_LIST,
  RECEIVE_PRODUCT_LIST,
  PRODUCT_LIST_ERROR
} from "../constants/ActionTypes";

/**
 * Request for product pricing list
 */
export function requestProductPriceList() {
  return {
    type: REQUEST_PRODUCT_LIST
  };
}

/**
 * Receive for product pricing list
 */
export function receiveProductPriceList() {
  return {
    type: RECEIVE_PRODUCT_LIST
  };
}

/**
 * Error for product pricing list
 */
export function productPriceListError(error) {
  return {
    type: PRODUCT_LIST_ERROR,
    error
  };
}

/**
 * Filter Product Pricing List
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function filterProductPricingList(params) {
  return dispatch => {
    dispatch(requestProductPriceList());
    dispatch(
      fetchList(
        "ProductPricing",
        `${apiEndpoints().pricing}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveProductPriceList());
  };
}
