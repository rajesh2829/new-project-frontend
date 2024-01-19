// import toast from "../components/toast";
import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { toast } from "react-toastify";

// Services
import VendorProductService from "../services/VendorProductService";
import shopifyService from "../services/ShopifyService";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest } from "../lib/Http";
import { productCreateError, receiveAddPortal, requestAddProduct } from "./storeProduct";
import  Url from "../lib/Url";
import { Product } from "../helpers/Product";

/**
 * Request for creating vendor product
 */
export function requestCreateVendorProduct() {
  return {
    type: REQUEST_CREATE_VENDOR_PRODUCT
  };
}

// Vendor Product

export const REQUEST_VENDOR_PRODUCT_LIST = "REQUEST_VENDOR_PRODUCT_LIST";
export const RECEIVE_VENDOR_PRODUCT_LIST = "RECEIVE_VENDOR_PRODUCT_LIST";
export const VENDOR_PRODUCT_LIST_ERROR = "VENDOR_PRODUCT_LIST_ERROR";
export const REQUEST_CREATE_VENDOR_PRODUCT = "REQUEST_CREATE_VENDOR_PRODUCT";
export const RECEIVE_CREATE_VENDOR_PRODUCT = "RECEIVE_CREATE_VENDOR_PRODUCT";
export const VENDOR_PRODUCT_CREATE_ERROR = "VENDOR_PRODUCT_CREATE_ERROR";

/**
 * Receive for creating vendor product
 */
export function receiveCreateVendorProduct() {
  return {
    type: RECEIVE_CREATE_VENDOR_PRODUCT
  };
}

/**
 * Receive for error creating vendor product
 */
export function vendorProductCreateError(error) {
  return {
    type: VENDOR_PRODUCT_CREATE_ERROR,
    error
  };
}
/**
 * Request for updating vendor product
 */
export function requestVendorProductList() {
  return {
    type: REQUEST_VENDOR_PRODUCT_LIST
  };
}

/**
 * Receive vendor product list
 */
export function receiveVendorProductList() {
  return {
    type: RECEIVE_VENDOR_PRODUCT_LIST
  };
}

/**
 * Receive error
 */
export function vendorProductListError(error) {
  return {
    type: VENDOR_PRODUCT_LIST_ERROR,
    error
  };
}

/**
 * Create New Vendor Product
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addVendorProduct(data, params) {
  return dispatch => {
    dispatch(requestCreateVendorProduct());

    return apiClient
      .post(endpoints().vendorProduct, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "vendorProducts",
            `${endpoints().vendorProduct}/search`,
            1,
            25,
            params
          )
        );
        dispatch(
          fetchList(
            "NewVendorProducts",
            `${endpoints().vendorProduct}/search`,
            1,
            25,
            params
          )
        );
        dispatch(
          fetchList(
            "ExportedVendorProducts",
            `${endpoints().vendorProduct}/search`,
            1,
            25,
            params
          )
        );
        dispatch(
          fetchList(
            "ExcludedVendorProducts",
            `${endpoints().vendorProduct}/search`,
            1,
            25,
            params
          )
        );

        dispatch(receiveCreateVendorProduct());
      })
      .catch(error => {
        dispatch(vendorProductCreateError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };
}

/**
 * Bulk update vendor product
 *
 * @param data
 * @param params
 */
export function bulkUpdateVendorProduct(data, params) {
  return async dispatch => {
    const response = await vendorProductService.bulkUpdateVendorProductStatus(
      data
    );
    dispatch(requestVendorProductList());
    dispatch(
      fetchList(
        "vendorProducts",
        `${endpoints().vendorProduct}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveVendorProductList());
    return response;
  };
}

/**
 * Update vendor product details by id
 *
 * @param productId
 * @param data
 * @param params
 */
export function updateVendorProductDetailsById(vendorProductId, data, params) {
  return async dispatch => {
    const response = await vendorProductService.updateVendorProductDetailsById(
      vendorProductId,
      data
    );
    dispatch(requestVendorProductList());
    dispatch(
      fetchList(
        "vendorProducts",
        `${endpoints().vendorProduct}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveVendorProductList());
    return response;
  };
}

/**
 * Export to master product
 *
 * @param data
 */
export function exportToMaster(data, params, pageSize) {
  return async dispatch => {
    const response = await shopifyService.bulkUpdateCreateInProducts(data);
    dispatch(requestVendorProductList());
    dispatch(
      fetchList(
        "vendorProducts",
        `${endpoints().vendorProduct}/search`,
        1,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(fetchList("sync", `${endpoints().sync}/search`, 1, 10));
    dispatch(receiveVendorProductList());
    return response;
  };
}

/**
 * Sync product from vendor product URL
 *
 * @param data
 */
export function syncToVendorProduct(data, params) {
  return async dispatch => {
    const response = await vendorProductService.syncToVendorProduct(data);
    dispatch(requestVendorProductList());
    dispatch(
      fetchList(
        "vendorProducts",
        `${endpoints().vendorProduct}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(fetchList("sync", `${endpoints().sync}/search`, 1, 10));
    dispatch(receiveVendorProductList());
    return response;
  };
}


export function addProductVendor(data, params,toggle) {
  return async dispatch => {
    dispatch(requestCreateVendorProduct());

    try {
      const response = await apiClient
        .post(`${endpoints().vendorProductAPI}/productAdd`, data);
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);    
        toggle();
      } dispatch(
        fetchList(
          "vendorProduct",
          `${endpoints().vendorProductAPI}/search`,
          1,
          25,
          params
        )
      );

      dispatch(receiveCreateVendorProduct());
    } catch (error) {
      dispatch(vendorProductCreateError(error));

      if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(errorMessage);
        console.error(errorMessage);
      }
    }
  };
}


/**
 * Create Product URL
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createVendorProduct(url, params, toggle) {
  const search = Url.GetParam("search");
  return (dispatch) => {
    dispatch(requestAddProduct());

    return apiClient
      .post(`${endpoints().productImport}?url=${url}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        toggle();
      })
      .then(() => {
        dispatch(
          fetchList(
            "draftProducts",
            `${endpoints().productAPI}/search`,
            1,
            25,
            {
              status: Product.STATUS_DRAFT,
            },
            params
          )
        )
        dispatch(receiveAddPortal());
      })
      .catch((error) => {
        dispatch(productCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };
}
