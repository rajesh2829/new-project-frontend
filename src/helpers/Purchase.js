import Currency from "../lib/Currency";

// Bill Status Constants
export const purchase = {
  STATUS_COMPLETED: "Complete",
  STATUS_REOPEN: "Reopen",
  // redux id
  DRAFT_PURCHASE: "draft_purchase",
  REVIEW_PURCHASE: "review_PURCHASE",
  ALL_PURCHASE: "all_purchase",


  STATUS_DRAFT: "Draft",
  STATUS_REVIEW: "Review",
  STATUS_ALL: "All",
};

export const FieldLabel = {
  COST_PRICE: "Cost Price",
  DISCOUNT_AMOUNT: "Discount Amount",
  MANUFACTURED_DATE: "Manufacture Date",
  STATUS: "Status",
  TAXABLE_AMOUNT: "Taxable Amount",
  TAX_AMOUNT: "Tax Amount",
  UNIT_MARGIN_AMOUNT: "Unit Margin Amount",
};

export const Type ={
  VENDOR_WISE: "Vendor Wise",
  DATE_WISE: "Date Wise",
  MONTH_WISE: "Month Wise",
}

export const calculateNetAmount = (amount, discountAmount, discrepancyAmount, taxAmount, detail) => {
  if (detail) {
    let minusAmount =
      Currency.Get(amount === "" ? 0 : amount ? amount : detail?.amount) -
      Currency.Get(discountAmount === "" ? 0 : discountAmount ? discountAmount : detail?.discount_amount);
    let netAmount =
      Currency.Get(minusAmount === "" ? 0 : minusAmount) +
      Currency.Get(taxAmount === "" ? 0 : taxAmount ? taxAmount : detail?.tax_amount) +
      Currency.Get(
        discrepancyAmount === "" ? 0 : discrepancyAmount ? discrepancyAmount : detail?.discrepancy_amount
      );
    return netAmount;
  } else {
    let minusAmount =
      Currency.Get(amount ? amount : 0) -
      Currency.Get(discountAmount ? discountAmount : 0);
    let netAmount =
      Currency.Get(minusAmount ? minusAmount : 0) +
      Currency.Get(taxAmount ? taxAmount : 0) +
      Currency.Get(discrepancyAmount ? discrepancyAmount : 0);
    return netAmount;
  }
}
