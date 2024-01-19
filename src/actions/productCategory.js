import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { ProductCategory } from "../helpers/ProductCategory";
import Url from "../lib/Url";

/* Delete ENVIRONMENT */
export const REQUEST_DELETE_PRODUCTCATEGORY = "REQUEST_DELETE_PRODUCTCATEGORY";
export const RECEIVE_DELETE_PRODUCTCATEGORY = "RECEIVE_DELETE_PRODUCTCATEGORY";
export const PRODUCTCATEGORY_DELETE_ERROR = "PRODUCTCATEGORY_DELETE_ERROR";

/* Add ENVIRONMENT */
export const REQUEST_ADD_PRODUCTCATEGORY = "REQUEST_ADD_PRODUCTCATEGORY";
export const RECEIVE_ADD_PRODUCTCATEGORY = "RECEIVE_ADD_PRODUCTCATEGORY";
export const PRODUCTCATEGORY_ADD_ERROR = "PRODUCTCATEGORY_ADD_ERROR";

/* Update ENVIRONMENTs */
export const REQUEST_UPDATE_PRODUCTCATEGORY = "REQUEST_UPDATE_PRODUCTCATEGORY";
export const RECEIVE_UPDATE_PRODUCTCATEGORY = "RECEIVE_UPDATE_PRODUCTCATEGORY";
export const PRODUCTCATEGORY_UPDATE_ERROR = "PRODUCTCATEGORY_UPDATE_ERROR";
export const REQUEST_CREATE_CATEGORY_PRODUCT = "REQUEST_CREATE_CATEGORY_PRODUCT";
export const RECEIVE_CREATE_CATEGORY_PRODUCT = "RECEIVE_CREATE_CATEGORY_PRODUCT";
export const CATEGORY_PRODUCT_CREATE_ERROR = "CATEGORY_PRODUCT_CREATE_ERROR";
/**
 * Request for creating environment
 */


 
export function receiveCreateCategoryProduct() {
  return {
    type: RECEIVE_CREATE_CATEGORY_PRODUCT
  };
}

/**
 * Receive for error creating vendor product
 */
export function categoryProductCreateError(error) {
  return {
    type: CATEGORY_PRODUCT_CREATE_ERROR,
    error
  };
}
/**
 * Request for updating vendor product
 */
export function requestCreateCategoryProduct() {
  return {
    type: REQUEST_CREATE_CATEGORY_PRODUCT
  };
}
export function requestAddProductCategory() {
  return {
    type: REQUEST_ADD_PRODUCTCATEGORY,
  };
}

/**
 * Receive for receive environment
 */
export function receiveProductCategory() {
  return {
    type: RECEIVE_ADD_PRODUCTCATEGORY,
  };
}

/**
 * Receive for error creating category
 */
export function productCategoryCreateError(error) {
  return {
    type: PRODUCTCATEGORY_ADD_ERROR,
    error,
  };
}

/**
 * Create category
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addProductCategory(data, toggle, params) {
  
  try {
    return async (dispatch) => {
      dispatch(requestAddProductCategory());
      try {
        const response = await apiClient.post(
          `${endpoints().categoryAPI}`,
          data
        );
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          toggle();
        }

        dispatch(
          fetchList(
            "AllCategory",
            `${endpoints().categoryAPI}/search`,
            params.AllCurrentPage || 1,
            params.AllCurrentPageSize || 25,
            {status: Url.GetParam("status"),sort : Url.GetParam("sort"), sortDir : Url.GetParam('sortDir'), pagination:true }
          )
        );

        
      } catch (error) {
        dispatch(productCategoryCreateError(error));

        if (isBadRequest(error)) {
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
  } catch (err) {
    console.log(err);
  }
}

export function requestDeleteProductCategory() {
  return {
    type: REQUEST_DELETE_PRODUCTCATEGORY,
  };
}

/**
 * Receive for deleting release
 */
export function receiveDeleteProductCategory() {
  return {
    type: RECEIVE_DELETE_PRODUCTCATEGORY,
  };
}

/**
 * Receive for error deleting release
 */
export function productcategoryDeleteError(error) {
  return {
    type: PRODUCTCATEGORY_DELETE_ERROR,
    error,
  };
}

/**
 * Delete release
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteProductCategory(id) {
  return (dispatch) => {
    dispatch(requestDeleteProductCategory());

    apiClient
      .delete(`${endpoints().categoryAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("Active", `${endpoints().categoryAPI}/search`, 1, 25, {
            status: ProductCategory.STATUS_ACTIVE_TEXT,
          })
        );
      })
      .then(() => {
        dispatch(
          fetchList("InActive", `${endpoints().categoryAPI}/search`, 1, 25, {
            status: ProductCategory.STATUS_INACTIVE_TEXT,
          })
        );
      })
      .then(() => {
        dispatch(fetchList("All", `${endpoints().categoryAPI}/search`, 1, 10));
      })
      .catch((error) => {
        dispatch(productcategoryDeleteError(error));
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

export function requestUpdateProductCategory() {
  return {
    type: REQUEST_UPDATE_PRODUCTCATEGORY,
  };
}

/**
 * Receive for updating release
 */
export function receiveUpdateProductCategory() {
  return {
    type: RECEIVE_UPDATE_PRODUCTCATEGORY,
  };
}

/**
 * Receive for error updating release
 */
export function productConstantUpdateError(error) {
  return {
    type: PRODUCTCATEGORY_UPDATE_ERROR,
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
export function updateCategory(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateProductCategory());
    apiClient
      .put(`${endpoints().releaseAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("Active", `${endpoints().categoryAPI}/search`, 1, 25, {
            status: ProductCategory.STATUS_ACTIVE_TEXT,
          })
        );
      })
      .then(() => {
        dispatch(
          fetchList("InActive", `${endpoints().categoryAPI}/search`, 1, 25, {
            status: ProductCategory.STATUS_ACTIVE_TEXT,
          })
        );
      })
      .then(() => {
        dispatch(fetchList("All", `${endpoints().categoryAPI}/search`, 1, 10));
      })
      .catch((error) => {
        dispatch(productCategoryCreateError(error));

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
