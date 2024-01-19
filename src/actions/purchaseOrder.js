
/* purchase order Entry */
const purchaseOrder = {
  REQUEST_DELETE: "REQUEST_DELETE",
  RECEIVE_DELETE: "RECEIVE_DELETE",

  REQUEST_ADD: "REQUEST_ADD",
  RECEIVE_ADD: "RECEIVE_ADD",
  ADD_ERROR: "ADD_ERROR",

  REQUEST_UPDATE: "REQUEST_UPDATE",
  RECEIVE_UPDATE: "RECEIVE_UPDATE",
  UPDATE_ERROR: "UPDATE_ERROR",
  DELETE_ERROR: "DELETE_ERROR",

  REQUEST_ADD_PRODUCT: "REQUEST_ADD_PRODUCT",
  RECEIVE_ADD_PRODUCT: "RECEIVE_ADD_PRODUCT",
  PRODUCT_ADD_ERROR: "PRODUCT_ADD_ERROR",

  REQUEST_DELETE_PRODUCT: "REQUEST_DELETE_PRODUCT",
  RECEIVE_DELETE_PRODUCT: "RECEIVE_DELETE_PRODUCT",
  PRODUCT_DELETE_ERROR: "PRODUCT_DELETE_ERROR",

  REQUEST_UPDATE_PRODUCT: "REQUEST_UPDATE_PRODUCT",
  RECEIVE_UPDATE_PRODUCT: "RECEIVE_UPDATE_PRODUCT",
  PRODUCT_UPDATE_ERROR: "PRODUCT_UPDATE_ERROR",

  RECEIVE_UPDATE_PURCHASE_ORDER_STATUS: "RECEIVE_UPDATE_PURCHASE_ORDER_STATUS",
  PURCHASE_ORDER_UPDATE_ERROR_STATUS: "PURCHASE_ORDER_UPDATE_ERROR_STATUS",

}


/**
 * Request for creating purchase order Entry
 */

class PurchaseOrder{
static  requestAddPurchaseOrder() {
  return {
    type: purchaseOrder.REQUEST_ADD,
  };
}

/**
 * Receive for receive purchase order Entry
 */
static receiveAddPurchaseOrder() {
  return {
    type: purchaseOrder.RECEIVE_ADD,
  };
}


static PurchaseOrderCreateError(error) {
  return {
    type: purchaseOrder.ADD_ERROR,
    error,
  };
}

static requestAddPurchaseProductOrder() {
  return {
    type: purchaseOrder.REQUEST_ADD_PRODUCT,
  };
}


static receiveAddPurchaseOrderProductEntry() {
  return {
    type: purchaseOrder.RECEIVE_ADD_PRODUCT,
  };
}


static PurchaseOrderProductCreateError(error) {
  return {
    type: purchaseOrder.PRODUCT_ADD_ERROR,
    error,
  };
}

static requestUpdateOrderProduct() {
  return {
    type: purchaseOrder.REQUEST_UPDATE,
  };
}

static receiveUpdateStockEntry() {
  return {
    type: purchaseOrder.RECEIVE_UPDATE,
  };
}


static purchaseOrderUpdateError(error) {
  return {
    type: purchaseOrder.UPDATE_ERROR,
    error,
  };
}

static receiveUpdatedPurchaseOrderStatus() {
  return {
    type: purchaseOrder.RECEIVE_UPDATE_PURCHASE_ORDER_STATUS,
  };
}
static UpdatePurchaseOrderError(error) {
  return {
    type: purchaseOrder.PURCHASE_ORDER_UPDATE_ERROR_STATUS,
    error,
  };
}

static requestDeletePurchaseOrder() {
  return {
    type: purchaseOrder.REQUEST_DELETE,
  };
}

/**
 * Receive for deleting purchase order
 */
static receiveDeletePurchaseOrder() {
  return {
    type: purchaseOrder.RECEIVE_DELETE,
  };
}

/**
 * Receive for error deleting brand
 */
static receivePurchaseOrderDeleteError(error) {
  return {
    type: purchaseOrder.DELETE_ERROR,
    error,
  };
}
}
export default PurchaseOrder