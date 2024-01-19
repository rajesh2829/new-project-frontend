import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { HttpStatus } from "../helpers/HttpStatus";
import Url from "../lib/Url";
import { purchase } from "../helpers/Purchase";
import { createMedia } from "./media";

// Action Constants
export const Action = {
  // Update Purchase Constants
  REQUEST_UPDATE_PURCHASE_STATUS: "REQUEST_UPDATE_PURCHASE_STATUS",
  RECEIVE_UPDATE_PURCHASE_STATUS: "RECEIVE_UPDATE_PURCHASE_STATUS",
  PURCHASE_UPDATE_ERROR_STATUS: "PURCHASE_UPDATE_ERROR_STATUS",
};

/* Delete PURCHASE */
export const REQUEST_DELETE_PURCHASE = "REQUEST_DELETE_PURCHASE";
export const RECEIVE_DELETE_PURCHASE = "RECEIVE_DELETE_PURCHASE";
export const PURCHASE_DELETE_ERROR = "PURCHASE_DELETE_ERROR";

/* Add PURCHASE*/
export const REQUEST_ADD_PURCHASE = "REQUEST_ADD_PURCHASE";
export const RECEIVE_ADD_PURCHASE = "RECEIVE_ADD_PURCHASE";
export const PURCHASE_ADD_ERROR = "PURCHASE_ADD_ERROR";
export const REQUEST_ADD_PURCHASE_PRODUCT = "REQUEST_ADD_PURCHASE_PRODUCT";
export const PURCHASE_PRODUCT_ADD_ERROR = "PURCHASE_PRODUCT_ADD_ERROR";
export const RECEIVE_ADD_STOCK_ENTRY_PRODUCT =
  "RECEIVE_ADD_STOCK_ENTRY_PRODUCT";
/* Update PURCHASE */
export const REQUEST_UPDATE_PURCHASE = "REQUEST_UPDATE_PURCHASE";
export const RECEIVE_UPDATE_PURCHASE = "RECEIVE_UPDATE_PURCHASE";
export const PURCHASE_UPDATE_ERROR = "PURCHASE_UPDATE_ERROR";
export const REQUEST_DELETE_PURCHASE_PRODUCT = "REQUEST_DELETE_PURCHASE_PRODUCT";
export const RECEIVE_DELETE_PURCHASE_PRODUCT = "RECEIVE_DELETE_PURCHASE_PRODUCT";
export const PURCHASE_PRODUCT_DELETE_ERROR = "PURCHASE_PRODUCT_DELETE_ERROR";
/* TABS */
export const TAB_PURCHASE = "General";
export const TYPE_PURCHASE_PAYMENT = "General";
export const TYPE_MAKE_PAYMENT = "Item";

/* UPDATE Item */
export const REQUEST_ADD_ITEM = "REQUEST_ADD_ITEM";
export const RECEIVE_ADD_ITEM = "RECEIVE_ADD_ITEM";
export const ITEM_ADD_ERROR = "ITEM_ADD_ERROR";

/* ADD Item */
export const REQUEST_UPDATE_ITEM = "REQUEST_UPDATE_ITEM";
export const RECEIVE_UPDATE_ITEM = "RECEIVE_UPDATE_ITEM";
export const ITEM_UPDATE_ERROR = "ITEM_UPDATE_ERROR";

/* Delete Item */
export const REQUEST_DELETE_ITEM = "REQUEST_DELETE_ITEM";
export const RECEIVE_DELETE_ITEM = "RECEIVE_DELETE_ITEM";
export const ITEM_DELETE_ERROR = "ITEM_DELETE_ERROR";

/* Create Media */
export const REQUEST_ADD_PURCHASE_MEDIA = "REQUEST_ADD_PURCHASE_MEDIA";
export const RECEIVE_ADD_PURCHASE_MEDIA = "RECEIVE_ADD_PURCHASE_MEDIA";
export const PURCHASE_MEDIA_ADD_ERROR = "PURCHASE_MEDIA_ADD_ERROR";

/* Delete Media */
export const REQUEST_DELETE_MEDIA = "REQUEST_DELETE_MEDIA";
export const RECEIVE_DELETE_MEDIA = "RECEIVE_DELETE_MEDIA";
export const MEDIA_DELETE_ERROR = "MEDIA_DELETE_ERROR";

/**
 * Request for deleting purchase
 */
export function requestDeletePurchase() {
  return {
    type: REQUEST_DELETE_PURCHASE,
  };
}

/**
 * Receive for deleting purchase
 */
export function receiveDeletePurchase() {
  return {
    type: RECEIVE_DELETE_PURCHASE,
  };
}

/**
 * Receive for error deleting purchase
 */
export function purchaseDeleteError(error) {
  return {
    type: PURCHASE_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Purchase
 *
 * @param id
 * @returns {function(*): *}
 */
export function deletePurchase(
  id,
  params,
  draftCurrentPageSize,
  draftCurrentPage,
  reviewCurrentPage,
  reviewCurrentPageSize,
  allCurrentPageSize,
  allCurrentPage
) {
  return (dispatch) => {
    dispatch(requestDeletePurchase());
    apiClient
      .delete(`${endpoints().purchaseAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            purchase.DRAFT_PURCHASE,
            `${endpoints().purchaseAPI}/list`,
            draftCurrentPage || 1,
            draftCurrentPageSize || 25,
            {
              pagination: true,
              status: purchase.STATUS_DRAFT,
              section: purchase.STATUS_DRAFT,
            }
          )
        );
        dispatch(
          fetchList(
            purchase.REVIEW_PURCHASE,
            `${endpoints().purchaseAPI}/list`,
            reviewCurrentPage || 1,
            reviewCurrentPageSize || 25,
            {
              pagination: true,
              status: purchase.STATUS_REVIEW,
              section: purchase.STATUS_REVIEW,
            }
          )
        );
        dispatch(
          fetchList(
            purchase.ALL_PURCHASE,
            `${endpoints().purchaseAPI}/list`,
            allCurrentPage || 1,
            allCurrentPageSize || 25,
            {
              pagination: true,
            },
            params
          )
        );
      })
      .catch((error) => {
        dispatch(purchaseDeleteError(error));
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
 * Request for creating purchase
 */
export function requestAddPurchase() {
  return {
    type: REQUEST_ADD_PURCHASE,
  };
}

/**
 * Receive for receive purchase
 */
export function receiveAddPortal() {
  return {
    type: RECEIVE_ADD_PURCHASE,
  };
}

/**
 * Receive for error creating purchase
 */
export function purchaseCreateError(error) {
  return {
    type: PURCHASE_ADD_ERROR,
    error,
  };
}

/**
 * Create PURCHASE
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addPurchase(data, params, history, callback) {
  return (dispatch) => {
    dispatch(requestAddPurchase());

    return apiClient
      .post(`${endpoints().purchaseAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          dispatch(history.push(`/purchase/${response.data.purchase.id}`));
        }
        return callback(response && response.data);
      })
      .then(async (response) => {
        // dispatch(
        //   fetchList("purchase", `${endpoints().purchaseAPI}/list`, 1, 25, params)
        // );
        dispatch(receiveAddPortal());
      })
      .catch((error) => {
        dispatch(purchaseCreateError(error));

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
 * Create Purchase Payment
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Create New Media
 */
export function requestAddPurchaseMedia() {
  return {
    type: REQUEST_ADD_PURCHASE_MEDIA,
  };
}

/**
 * Receive for receive purchase
 */
export function receivepurchaseMedia() {
  return {
    type: RECEIVE_ADD_PURCHASE_MEDIA,
  };
}

/**
 * Receive for error creating purchase
 */
export function purchaseMediaCreateError(error) {
  return {
    type: PURCHASE_MEDIA_ADD_ERROR,
    error,
  };
}

export function addPurchaseMedia(data, params, purchaseId, status, callback) {
  return (dispatch) => {
    dispatch(requestAddPurchaseMedia());

    return apiClient
      .post(`${endpoints().mediaAPI}`, data)
      .then((response) => {
        callback &&  callback(response.data.id)
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          status(true);
        }
      })
      .then(() => {
        dispatch(
          fetchList("media", `${endpoints().mediaAPI}/search`, 1, 25, params)
        );
        dispatch(receivepurchaseMedia());
      })
      .catch((error) => {
        dispatch(purchaseMediaCreateError(error));

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
 * Request for updating purchase
 */
export function requestUpdatePurchase() {
  return {
    type: REQUEST_UPDATE_PURCHASE,
  };
}

/**
 * Receive for updating Purchase
 */
export function receiveUpdatePurchase() {
  return {
    type: RECEIVE_UPDATE_PURCHASE,
  };
}

/**
 * Receive for error updating purchase
 */
export function purchaseUpdateError(error) {
  return {
    type: PURCHASE_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Purchase details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updatePurchase(id, data, params,callback) {
  return (dispatch) => {
    dispatch(requestUpdatePurchase());
    apiClient
      .put(`${endpoints().purchaseAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          return callback(response);

        }
      })
      .catch((error) => {
        dispatch(purchaseUpdateError(error));

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
export function receiveUpdatedPurchaseStatus() {
  return {
    type: Action.RECEIVE_UPDATE_PURCHASE_STATUS,
  };
}

/**
 * Receive for error updating Product
 */
export function purchaseUpdateStatusError(error) {
  return {
    type: Action.PURCHASE_UPDATE_ERROR_STATUS,
    error,
  };
}

export function updatePurchaseStatus(
  id,
  status,
  params,
  draftCurrentPageSize,
  draftCurrentPage,
  reviewCurrentPage,
  reviewCurrentPageSize,
  allCurrentPageSize,
  allCurrentPage
) {
  let data = {};
  data.status = status;
  return (dispatch) => {
    dispatch(receiveUpdatedPurchaseStatus());
    apiClient
      .put(`${endpoints().purchaseAPI}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            purchase.DRAFT_PURCHASE,
            `${endpoints().purchaseAPI}/list`,
            draftCurrentPage || 1,
            draftCurrentPageSize || 25,
            {
              pagination: true,
              status: purchase.STATUS_DRAFT,
              section: purchase.STATUS_DRAFT,
            }
          )
        );
        dispatch(
          fetchList(
            purchase.REVIEW_PURCHASE,
            `${endpoints().purchaseAPI}/list`,
            reviewCurrentPage || 1,
            reviewCurrentPageSize || 25,
            {
              pagination: true,
              status: purchase.STATUS_REVIEW,
              section: purchase.STATUS_REVIEW,
            }
          )
        );
        dispatch(
          fetchList(
            purchase.ALL_PURCHASE,
            `${endpoints().purchaseAPI}/list`,
            allCurrentPage || 1,
            allCurrentPageSize || 25,
            {
              pagination: true,
            },
            params
          )
        );
      })
      .catch((error) => {
        dispatch(purchaseUpdateStatusError(error));

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

export function requestAddItem() {
  return {
    type: REQUEST_ADD_ITEM,
  };
}

export function receiveAddItem() {
  return {
    type: RECEIVE_ADD_ITEM,
  };
}
export function itemCreateError(error) {
  return {
    type: ITEM_ADD_ERROR,
    error,
  };
}

export function addItem(data, params) {
  return (dispatch) => {
    dispatch(requestAddItem());

    return apiClient
      .post(`${endpoints().itemAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(fetchList("item", `${endpoints().itemAPI}`, 1, 25, params));
        dispatch(receiveAddItem());
      })
      .catch((error) => {
        dispatch(itemCreateError(error));

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

export function requestUpdateItem() {
  return {
    type: REQUEST_UPDATE_ITEM,
  };
}

export function itemUpdateError(error) {
  return {
    type: ITEM_UPDATE_ERROR,
    error,
  };
}
export function updateItem(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateItem());
    apiClient
      .put(`${endpoints().itemAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("item", `${endpoints().itemAPI}/${id}`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(itemUpdateError(error));

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

/**
 * Request for deleting item
 */
export function requestDeleteItem() {
  return {
    type: REQUEST_DELETE_ITEM,
  };
}

/**
 * Receive for deleting item
 */
export function receiveDeleteItem() {
  return {
    type: RECEIVE_DELETE_ITEM,
  };
}

/**
 * Receive for error deleting item
 */
export function itemDeleteError(error) {
  return {
    type: ITEM_DELETE_ERROR,
    error,
  };
}

export function deleteItem(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteItem());

    apiClient
      .delete(`${endpoints().itemAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("item", `${endpoints().itemAPI}/${id}`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(itemDeleteError(error));
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
 * Request for deleting item
 */
export function requestDeleteMedia() {
  return {
    type: REQUEST_DELETE_MEDIA,
  };
}

/**
 * Request for creating Stock Entry
 */
export function requestAddPurchaseProduct() {
  return {
    type: REQUEST_ADD_PURCHASE_PRODUCT,
  };
}

export function receiveAddPurchaseProduct() {
  return {
    type: RECEIVE_ADD_STOCK_ENTRY_PRODUCT,
  };
}

export function PurchaseProductCreateError(error) {
  return {
    type: PURCHASE_PRODUCT_ADD_ERROR,
    error,
  };
}

export function requestDeletePurchaseProduct() {
  return {
    type: REQUEST_DELETE_PURCHASE_PRODUCT,
  };
}
/**
 * Receive for deleting item
 */
export function receiveDeleteMedia() {
  return {
    type: RECEIVE_DELETE_MEDIA,
  };
}
export function receiveDeletePurchaseProduct() {
  return {
    type: RECEIVE_DELETE_PURCHASE_PRODUCT,
  };
}
export function PurchaseProductDeleteError(error) {
  return {
    type: PURCHASE_PRODUCT_DELETE_ERROR,
    error,
  };
}


/**
 * Receive for error deleting item
 */
export function mediaDeleteError(error) {
  return {
    type: MEDIA_DELETE_ERROR,
    error,
  };
}

export function deleteMedia(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteMedia());

    apiClient
      .delete(`${endpoints().purchaseMediaAPI}/media/delete/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "purchase-media",
            `${endpoints().purchaseMediaAPI}/media/search`,
            1,
            25,
            params
          )
        );
        dispatch(receiveDeleteMedia());
      })
      .catch((error) => {
        dispatch(mediaDeleteError(error));
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
 * Create stock entry
 *
 * @param values
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addPurchaseProduct(data, params) {
  return (dispatch) => {
    dispatch(requestAddPurchaseProduct());

    apiClient
      .post(`${endpoints().purchaseProductAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        // return response && response.data;
      })
      .then(() => {
        dispatch(
          fetchList(
            "purchaseProduct",
            `${endpoints().purchaseProductAPI}/search`,
            currentPage || 1,
            pageSize || 25,
            {
              params,
            }
          )
        );
        dispatch(receiveAddPurchaseProduct());
      })
      .catch((error) => {
        dispatch(PurchaseProductCreateError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
        return error;
      });
  };
}

export function deletePurchaseProductEntry(id, params, closeDeleteModal) {
  return (dispatch) => {
    dispatch(requestDeletePurchaseProduct());

    apiClient
      .delete(`${endpoints().purchaseProductAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        closeDeleteModal();
        return response && response.data;
      })
      .then(() => {
        dispatch(
          fetchList(
            "purchaseProduct",
            `${endpoints().purchaseProductAPI}/search`,
            Url.GetParam("page") ? Url.GetParam("page")  : 1,
             Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
            params
          )
        );
        dispatch(receiveDeletePurchaseProduct());
      })
      .catch((error) => {
        dispatch(PurchaseProductDeleteError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
        return error;
      });
  };
}


// Purchase Filter and Purchase Search
export function searchPurchaseData(pageSize, params) {
  return (dispatch) => {
    dispatch(
      fetchList("purchase", `${endpoints().purchaseAPI}/list`, 1, pageSize, params)
    );
    // dispatch(receivedResponse());
  };
}
