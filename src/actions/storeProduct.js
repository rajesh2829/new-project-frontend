import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import Url from "../lib/Url";
import ProductService from "../services/ProductService";
import { Product } from "../helpers/Product";

// Action Constants
export const Action = {
  // Delete Product
  REQUEST_DELETE_PRODUCT: "REQUEST_DELETE_PRODUCT",
  RECEIVE_DELETE_PRODUCT: "RECEIVE_DELETE_PRODUCT",
  PRODUCT_DELETE_ERROR: "PRODUCT_DELETE_ERROR",
  // Add Product
  REQUEST_ADD_PRODUCT: "REQUEST_ADD_PRODUCT",
  RECEIVE_ADD_PRODUCT: "RECEIVE_ADD_PRODUCT",
  PRODUCT_ADD_ERROR: "PRODUCT_ADD_ERROR",
  // Update Product
  REQUEST_UPDATE_PRODUCT: "REQUEST_UPDATE_PRODUCT",
  RECEIVE_UPDATE_PRODUCT: "RECEIVE_UPDATE_PRODUCT",
  PRODUCT_UPDATE_ERROR: "PRODUCT_UPDATE_ERROR",
  // Update Product Status
  REQUEST_UPDATE_PRODUCT_STATUS: "REQUEST_UPDATE_PRODUCT_STATUS",
  RECEIVE_UPDATE_PRODUCT_STATUS: "RECEIVE_UPDATE_PRODUCT_STATUS",
  PRODUCT_UPDATE_ERROR_STATUS: "PRODUCT_UPDATE_ERROR_STATUS",
};

/**
 * Request for deleting Product
 */
export function requestDeleteProduct() {
  return {
    type: Action.REQUEST_DELETE_PRODUCT,
  };
}

/**
 * Receive for deleting Product
 */
export function receiveDeleteProduct() {
  return {
    type: Action.RECEIVE_DELETE_PRODUCT,
  };
}

/**
 * Receive for error deleting Product
 */
export function productDeleteError(error) {
  return {
    type: Action.PRODUCT_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Product
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteProduct(id, params, history) {
  return (dispatch) => {
    dispatch(requestDeleteProduct());

    apiClient
      .delete(`${endpoints().productAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        history.push("/products");
      })
      .then(() => {
        dispatch(receiveAddPortal());
      })
      .catch((error) => {
        dispatch(productDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}

/**
 * Request for creating Product
 */
export function requestAddProduct() {
  return {
    type: Action.REQUEST_ADD_PRODUCT,
  };
}

/**
 * Receive for receive Product
 */
export function receiveAddPortal() {
  return {
    type: Action.RECEIVE_ADD_PRODUCT,
  };
}

/**
 * Receive for error creating Product
 */
export function productCreateError(error) {
  return {
    type: Action.PRODUCT_ADD_ERROR,
    error,
  };
}

/**
 * Create Product
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addProduct(data, params, toggle) {
  const search = Url.GetParam("search");
  return (dispatch) => {
    dispatch(requestAddProduct());

    return apiClient
      .post(`${endpoints().productAPI}`, data)
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
              search: search || "",
              pagination: true,
            },
            params
          )
        );

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

/**
 * Request for updating Product
 */
export function requestUpdateProduct() {
  return {
    type: Action.REQUEST_UPDATE_PRODUCT,
  };
}

/**
 * Receive for updating Product
 */
export function receiveUpdateProduct() {
  return {
    type: Action.RECEIVE_UPDATE_PRODUCT,
  };
}

/**
 * Receive for error updating Product
 */
export function productUpdateError(error) {
  return {
    type: Action.PRODUCT_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Product details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateProduct(id, data, params, getProductDetail) {
  return (dispatch) => {
    dispatch(requestUpdateProduct());
    apiClient
      .put(`${endpoints().productAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        getProductDetail && getProductDetail();
      })
      .then(() => {
        dispatch(receiveAddPortal());
      })
      .catch((error) => {
        dispatch(productUpdateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}
/* update the status */
export function receiveUpdatedProductStatus() {
  return {
    type: Action.RECEIVE_UPDATE_PRODUCT_STATUS,
  };
}

/**
 * Receive for error updating Product
 */
export function productUpdateStatusError(error) {
  return {
    type: Action.PRODUCT_UPDATE_ERROR_STATUS,
    error,
  };
}

export function updateProductStatus(
  id,
  status,
  params,
  currentPublishedPage,
  ActiveCurrentPageSize,
  currentAllPage,
  AllCurrentPageSize,
  currentDraftPage,
  brand
) {
  const search = Url.GetParam("search");
  const sort = Url.GetParam("sort");
  const sortDir = Url.GetParam("sortDir");
  let data = {};
  data.status = status;
  return async (dispatch) => {
    try {
      dispatch(receiveUpdatedProductStatus());
       await ProductService.updateStatus(id, data);
     
      dispatch(
        fetchList(
          "publishedProducts",
          `${endpoints().productAPI}/search`,
          currentPublishedPage || 1,  
          ActiveCurrentPageSize,
          {
            stateList: true,
            status: Product.STATUS_ACTIVE,
            search: search == null ? "" : search,
            sort: sort,
            sortDir: sortDir,
            brand: params.brand,
            category: params.category,
            
          }
        )
      );
      dispatch(
        fetchList(
          "archivedProducts",
          `${endpoints().productAPI}/search`,
          currentPublishedPage || 1,
          25,
          {
            stateList: true,
            status: Product.STATUS_ARCHIVED,
            search: search == null ? "" : search,
            sort: sort,
            sortDir: sortDir,
            
          }
        )
      );
      dispatch(
        fetchList(
          "draftProducts",
          `${endpoints().productAPI}/search`,
          currentDraftPage || 1,
          25,
          {
            stateList: true,
            status: Product.STATUS_DRAFT,
            search: search == null ? "" : search,
            sort: sort,
            sortDir: sortDir,
            
          }
        )
      );
      dispatch(
        fetchList(
          "allProducts",
          `${endpoints().productAPI}/search`,
          currentAllPage || 1,
          AllCurrentPageSize,
          {
            stateList: true,
            search: search == null ? "" : search,
            sort: sort,
            sortDir: sortDir,
            brand: params.brand,
            category: params.category,
            
          }
        )
      );
      dispatch(receiveAddPortal());
      dispatch(productUpdateStatusError(error));
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };
}
