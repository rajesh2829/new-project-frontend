// import toast from "../components/toast";
import { apiEndpoints } from "../api/endpoints";
import { fetchList } from "./table";
import storeProductService from "../services/storeProductService";

import {
  REQUEST_STORE_PRODUCT_LIST,
  RECEIVE_STORE_PRODUCT_LIST,
  PRODUCT_STORE_LIST_ERROR
} from "../constants/ActionTypes";

/**
 * Request for updating store product
 */
export function requestStoreProductList() {
  return {
    type: REQUEST_STORE_PRODUCT_LIST
  };
}

/**
 * Receive store product list
 */
export function receiveStoreProductList() {
  return {
    type: RECEIVE_STORE_PRODUCT_LIST
  };
}

/**
 * Receive error
 */
export function storeProductListError(error) {
  return {
    type: PRODUCT_STORE_LIST_ERROR,
    error
  };
}
/**
 * Add store product
 *
 * @param data
 * @param params
 */
export function addStoreProduct(data, params, pageSize = 25, page = 1) {
  return async dispatch => {
    const response = await storeProductService.createStoreProduct(data);
    dispatch(requestStoreProductList());
    dispatch(
      fetchList(
        "storeProducts",
        `${apiEndpoints().storeProduct}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveStoreProductList());
    return response;
  };
}

/**
 * Add store product
 *
 * @param data
 * @param params
 */
export function bulkAddStoreProduct(data, params, pageSize = 25, page = 1) {
  return async dispatch => {
    const response = await storeProductService.bulkCreateStoreProduct(data);
    dispatch(requestStoreProductList());
    dispatch(
      fetchList(
        "storeProducts",
        `${apiEndpoints().storeProduct}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveStoreProductList());
    return response;
  };
}

/**
 * Edit store product
 *
 * @param productId
 * @param data
 * @param params
 */
export function editStoreProduct(id, data, params, pageSize = 25, page = 1) {
  return async dispatch => {
    const response = await storeProductService.updateStoreProduct(id, data);
    dispatch(requestStoreProductList());
    dispatch(
      fetchList(
        "storeProducts",
        `${apiEndpoints().storeProduct}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveStoreProductList());
    return response;
  };
}

/**
 * Delete store product
 *
 * @param productImageId
 * @param params
 */
export function deleteStoreProduct(
  storeId,
  productId,
  params,
  pageSize = 25,
  page = 1
) {
  return async dispatch => {
    const response = await storeProductService.deleteStoreProduct(
      storeId,
      productId
    );
    dispatch(requestStoreProductList());
    dispatch(
      fetchList(
        "storeProducts",
        `${apiEndpoints().storeProduct}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveStoreProductList());
    return response;
  };
}

/**
 * Filter store product
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function filterStoreProductList(params, pageSize = 25, page = 1) {
  return dispatch => {
    dispatch(requestStoreProductList());
    dispatch(
      fetchList(
        "storeProducts",
        `${apiEndpoints().storeProduct}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveStoreProductList());
  };
}
