// Action Constants
export const Action = {
    // Update Purchase Constants
    REQUEST_UPDATE_BILL_STATUS: "REQUEST_UPDATE_BILL_STATUS",
    RECEIVE_UPDATE_BILL_STATUS: "RECEIVE_UPDATE_BILL_STATUS",
    BILL_UPDATE_ERROR_STATUS: "BILL_UPDATE_ERROR_STATUS",
  };
  /* Delete PURCHASE */
  export const REQUEST_DELETE_BILL = "REQUEST_DELETE_BILL";
  export const RECEIVE_DELETE_BILL = "RECEIVE_DELETE_BILL";
  export const BILL_DELETE_ERROR = "BILL_DELETE_ERROR";
  /* Add PURCHASE*/
  export const REQUEST_ADD_BIILL = "REQUEST_ADD_BIILL";
  export const RECEIVE_ADD_BILL = "RECEIVE_ADD_BILL";
  export const BILL_ADD_ERROR = "BILL_ADD_ERROR";
  export const REQUEST_ADD_BILL_PRODUCT = "REQUEST_ADD_BILL_PRODUCT";
  export const BILL_PRODUCT_ADD_ERROR = "BILL_PRODUCT_ADD_ERROR";
  export const RECEIVE_ADD_STOCK_ENTRY_PRODUCT =
    "RECEIVE_ADD_STOCK_ENTRY_PRODUCT";
  /* Update PURCHASE */
  export const REQUEST_UPDATE_BILL = "REQUEST_UPDATE_BILL";
  export const RECEIVE_UPDATE_BILL = "RECEIVE_UPDATE_BILL";
  export const BILL_UPDATE_ERROR = "BILL_UPDATE_ERROR";
  /**
   * Request for deleting purchase
   */
  export function requestDeletePurchase() {
    return {
      type: REQUEST_DELETE_BILL,
    };
  }
  /**
   * Receive for deleting purchase
   */
  export function receiveDeletePurchase() {
    return {
      type: RECEIVE_DELETE_BILL,
    };
  }
  /**
   * Receive for error deleting purchase
   */
  export function purchaseDeleteError(error) {
    return {
      type: BILL_DELETE_ERROR,
      error,
    };
  }
  /**
   * Delete Purchase
   *
   * @param id
   * @returns {function(*): *}
   */
  /**
   * Request for creating purchase
   */
  export function requestAddBill() {
    return {
      type: REQUEST_ADD_BIILL,
    };
  }
  /**
   * Receive for receive purchase
   */
  export function receiveAddPortal() {
    return {
      type: RECEIVE_ADD_BILL,
    };
  }
  /**
   * Receive for error creating purchase
   */
  export function billCreateError(error) {
    return {
      type: BILL_ADD_ERROR,
      error,
    };
  }
  /**
   * Create PURCHASE
   *
   * @param data
   * @returns {function(*): Promise<AxiosResponse<any>>}
   */
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
  /**
   * Request for updating purchase
   */
  export function requestUpdateBill() {
    return {
      type: REQUEST_UPDATE_BILL,
    };
  }
  /**
   * Receive for updating Purchase
   */
  export function receiveUpdatePurchase() {
    return {
      type: RECEIVE_UPDATE_BILL,
    };
  }
  /**
   * Receive for error updating purchase
   */
  export function billUpdateError(error) {
    return {
      type: BILL_UPDATE_ERROR,
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
  /* update the status */
  export function receiveUpdatedPurchaseStatus() {
    return {
      type: Action.RECEIVE_UPDATE_BILL_STATUS,
    };
  }
  /**
   * Receive for error updating Product
   */
  export function purchaseUpdateStatusError(error) {
    return {
      type: Action.BILL_UPDATE_ERROR_STATUS,
      error,
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
      type: REQUEST_ADD_BILL_PRODUCT,
    };
  }
  export function receiveAddPurchaseProduct() {
    return {
      type: RECEIVE_ADD_STOCK_ENTRY_PRODUCT,
    };
  }
  export function PurchaseProductCreateError(error) {
    return {
      type: BILL_PRODUCT_ADD_ERROR,
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
  /**
   * Create stock entry
   *
   * @param values
   * @returns {function(*): Promise<AxiosResponse<any>>}
   */
  