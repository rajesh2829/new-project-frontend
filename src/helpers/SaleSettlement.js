// Shift options
export const shiftOptions = [
  {
    value: 1,
    label: "A",
  },
  {
    value: 2,
    label: "B",
  },
];

// TypeOptions
export const typeOptions = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "UPI",
    label: "UPI",
  },
];

export const salesShiftOptions = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
];

// SALE status
export const statusOptions = [
  {
    value: "New",
    label: "New",
  },
  {
    value: "Verified",
    label: "Verified",
  },
  {
    value: "MisMatch",
    label: "MisMatch",
  },
];

//Sale status
export const SaleSettlement = {
  STATUS_DRAFT: "Draft",
  STATUS_REVIEW: "Review",
  STATUS_COMPLETED: "Completed",
  ALL: "All",
  DRAFT_SALES_SETTLEMENT_TAB: "draftSaleSettlement",
  REVIEW_SALES_SETTLEMENT_TAB: "reviewSaleSettlement",
  ALL_SALES_SETTLEMENT_TAB: "allSaleSettlement",
}

// SALE types
export const SALE_SETTLEMENT = "sales";
export const SALE = "SALE_SETTLEMENT";
export const SALE_SETTLEMENT_TYPE_CASH = "Cash";
export const SALE_SETTLEMENT_TYPE_UPI = "UPI";
export const aleOptions = [SALE_SETTLEMENT_TYPE_CASH, SALE_SETTLEMENT_TYPE_UPI];

/* Add BILL*/
export const REQUEST_ADD_SALE_SETTLEMENT = "REQUEST_ADD_SALE_SETTLEMENT";
export const RECEIVE_ADD_SALE_SETTLEMENT = "RECEIVE_ADD_SALE_SETTLEMENT";
export const SALE_SETTLEMENT_ADD_ERROR = "SALE_SETTLEMENT_ADD_ERROR";

// Delete Bill
export const REQUEST_DELETE_SALE_SETTLEMENT = "REQUEST_DELETE_SALE_SETTLEMENT";
export const RECEIVE_DELETE_SALE_SETTLEMENT = "RECEIVE_DELETE_SALE_SETTLEMENT";
export const SALE_SETTLEMENT_DELETE_ERROR = "SALE_SETTLEMENT_DELETE_ERROR";

export const REQUEST_UPDATE_SALE_SETTLEMENT = "REQUEST_ADD_SALE_SETTLEMENT";
export const RECEIVE_UPDATE_SALE_SETTLEMENT = "RECEIVE_ADD_SALE_SETTLEMENT";
export const SALE_SETTLEMENT_UPDATE_ERROR = "SALE_SETTLEMENT_ADD_ERROR";

export const saleSettlementProduct = {
  REQUEST_SALE_SETTLEMENT_PRODUCT: "REQUEST_SALE_SETTLEMENT_PRODUCT",
  RECEIVE_ADD_SALE_SETTLEMENT_PRODUCT: "RECEIVE_ADD_SALE_SETTLEMENT_PRODUCT",
  SALE_SETTLEMENT_ADD_PRODUCT_ERROR: "SALE_SETTLEMENT_ADD_PRODUCT_ERROR",

  REQUEST_DELETE_SALE_SETTLEMENT_PRODUCT: "REQUEST_DELETE_SALE_SETTLEMENT_PRODUCT",
  RECEIVE_DELETE_SALE_SETTLEMENT_PRODUCT: "RECEIVE_DELETE_SALE_SETTLEMENT_PRODUCT",
  SALE_SETTLEMENT_PRODUCT_DELETE_ERROR: "SALE_SETTLEMENT_PRODUCT_DELETE_ERROR",
};

export const FieldLabel = {

  DISCREPANCY_AMOUNT_CASH: "Discrepancy Amount Cash",
  DISCREPANCY_AMOUNT_UPI: "Discrepancy Amount Upi",
  AMOUNT_CASH: "Amount Cash",
  AMOUNT_UPI: "Amount Upi",
  CALCULATED_AMOUNT_CASH: "Calculated Amount Cash",
  CALCULATED_AMOUNT_UPI: "Calculated Amount Upi",
  RECEIVED_AMOUNT_CASH: "Received Amount Cash",
  RECEIVED_AMOUNT_UPI: "Received Amount Upi",
  TOTAL_CALCULATED_AMOUNT: "Total Calculated Amount",
  TOTAL_RECEIVED_AMOUNT: "Total Received Amount",
  CASH_IN_LOCATION: "Cash In Location",
  CASH_TO_OFFICE: "Cash To Office",
};