// import toast from "../components/toast";
import { apiEndpoints } from "../api/endpoints";
import { fetchList } from "./table";
import productImageService from "../services/productImage";

import {
  REQUEST_PRODUCT_IMAGE_LIST,
  RECEIVE_PRODUCT_IMAGE_LIST,
  PRODUCT_IMAGE_LIST_ERROR
} from "../constants/ActionTypes";

/**
 * Request for updating image
 */
export function requestProductImageList() {
  return {
    type: REQUEST_PRODUCT_IMAGE_LIST
  };
}

/**
 * Receive image list
 */
export function receiveProductImageList() {
  return {
    type: RECEIVE_PRODUCT_IMAGE_LIST
  };
}

/**
 * Receive error
 */
export function productImageListError(error) {
  return {
    type: PRODUCT_IMAGE_LIST_ERROR,
    error
  };
}

/**
 * Filter product image list
 *
 * @param params
 */
export function filterProductImageList(params, pageSize = 25, page = 1) {
  return dispatch => {
    dispatch(requestProductImageList());
    dispatch(
      fetchList(
        "ProductImage",
        `${apiEndpoints().productImage}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveProductImageList());
  };
}

/**
 * Bulk update product image list
 *
 * @param data
 * @param params
 */
export function bulkUpdateProductImage(data, params, pageSize = 25, page = 1) {
  return async dispatch => {
    const response = await productImageService.bulkUpdateProductImage(data);
    dispatch(requestProductImageList());
    dispatch(
      fetchList(
        "productImages",
        `${apiEndpoints().productImage}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveProductImageList());
    return response;
  };
}

/**
 * Add product image
 *
 * @param data
 * @param params
 */
export function addProductImageFromUrl(data, params) {
  return async dispatch => {
    const response = await productImageService.addProductImageFromUrl(data);
    dispatch(requestProductImageList());
    dispatch(
      fetchList(
        "productImages",
        `${apiEndpoints().productImage}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveProductImageList());
    return response;
  };
}

/**
 * Edit product image
 *
 * @param productId
 * @param data
 * @param params
 */
export function editProductImage(productId, data, params) {
  return async dispatch => {
    const response = await productImageService.editProductImage(
      productId,
      data
    );
    dispatch(requestProductImageList());
    dispatch(
      fetchList(
        "productImages",
        `${apiEndpoints().productImage}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveProductImageList());
    return response;
  };
}

/**
 * Delete product image
 *
 * @param productImageId
 * @param params
 */
export function deleteProductImage(productImageId, params) {
  return async dispatch => {
    const response = await productImageService.deleteProductImage(
      productImageId
    );
    dispatch(requestProductImageList());
    dispatch(
      fetchList(
        "productImages",
        `${apiEndpoints().productImage}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveProductImageList());
    return response;
  };
}
