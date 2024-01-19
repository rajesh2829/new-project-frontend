import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import * as saleSettlementConstant from "../helpers/SaleSettlement";
import { SaleSettlement } from "../helpers/SaleSettlement";
import { HttpStatus } from "../helpers/HttpStatus";
import Url from "../lib/Url";

// Action Constants
export const Action = {
  // Update Bill Constants
  REQUEST_UPDATE_SALE_SETTLEMENT_STATUS: "REQUEST_UPDATE_SALE_SETTLEMENT_STATUS",
  RECEIVE_UPDATE_SALE_SETTLEMENT_STATUS: "RECEIVE_UPDATE_SALE_SETTLEMENT_STATUS",
  SALE_SETTLEMENT_UPDATE_ERROR_STATUS: "SALE_SETTLEMENT_UPDATE_ERROR_STATUS",
};
/* 
    Create Account Data 
*/

// Request for creating sales data
export function requestAddSaleSettlement() {
  return {
    type: saleSettlementConstant.REQUEST_ADD_SALE_SETTLEMENT,
  };
}

// Reveive response
export function receivedResponse() {
  return {
    type: saleSettlementConstant.RECEIVE_ADD_SALE_SETTLEMENT,
  };
}

// Error
export function addSaleSettlementError() {
  return {
    type: saleSettlementConstant.SALE_SETTLEMENT_ADD_ERROR,
  };
}
export function requestUpdateSaleSettlement() {
  return {
    type: saleSettlementConstant.REQUEST_UPDATE_SALE_SETTLEMENT,
  };
}

// Reveive response
export function receivedUpdateResponse() {
  return {
    type: saleSettlementConstant.RECEIVE_UPDATE_SALE_SETTLEMENT,
  };
}

// Error
export function updateSaleSettlementError() {
  return {
    type: saleSettlementConstant.SALE_SETTLEMENT_UPDATE_ERROR,
  };
}
/**
 * Request for deleting Page
 */
export function requestDeleteSaleSettlement() {
  return {
    type: saleSettlementConstant.REQUEST_DELETE_SALE_SETTLEMENT,
  };
}

/**
 * Receive for deleting Page
 */
export function receiveDeleteSaleSettlement() {
  return {
    type: saleSettlementConstant.RECEIVE_DELETE_SALE_SETTLEMENT,
  };
}

/**
 * Receive for error deleting Page
 */
export function SaleSettlementDeleteError(error) {
  return {
    type: saleSettlementConstant.SALE_SETTLEMENT_DELETE_ERROR,
    error,
  };
}



export function requestDeleteSaleSettlementProduct() {
  return {
    type: saleSettlementConstant.saleSettlementProduct.REQUEST_DELETE_SALE_SETTLEMENT_PRODUCT,
  };
}
export function SaleSettlementProductDeleteError(error) {
  return {
    type: saleSettlementConstant.saleSettlementProduct.SALE_SETTLEMENT_PRODUCT_DELETE_ERROR,
    error,
  };
}
export function receiveDeleteStockProductEntry() {
  return {
    type: saleSettlementConstant.saleSettlementProduct.RECEIVE_DELETE_SALE_SETTLEMENT_PRODUCT,
  };
}

export function SaleSettlementProductCreateError(error) {
  return {
    type: saleSettlementConstant.saleSettlementProduct.SALE_SETTLEMENT_ADD_PRODUCT_ERROR,
    error,
  };
}

export function requestAddSaleSettlementProduct() {
  return {
    type: saleSettlementConstant.saleSettlementProduct.REQUEST_SALE_SETTLEMENT_PRODUCT,
  };
}
export function receiveAddSaleSettlementProduct() {
  return {
    type: saleSettlementConstant.saleSettlementProduct.RECEIVE_ADD_SALE_SETTLEMENT_PRODUCT,
  };
}

/* update the status */
export function receiveUpdatedSaleStatus() {
  return {
    type: Action.RECEIVE_UPDATE_SALE_SETTLEMENT_STATUS,
  };
}
/**
 * Receive for error updating Product
 */
export function saleUpdateStatusError(error) {
  return {
    type: Action.SALE_SETTLEMENT_UPDATE_ERROR_STATUS,
    error,
  };
}




