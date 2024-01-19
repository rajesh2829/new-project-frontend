// StockEntry Product Status
export const StockEntryProduct = {
  ACTIVE: "Active",
  DRAFT: "Draft",
  TYPE_ALL: "All",
  TYPE_MATCHED: "Matched",
  TYPE_NOT_MATCHED: "Not Matched",
  TYPE_NOT_MATCHED_POSTIVE: "Not Matched (Positive)",
  TYPE_NOT_MATCHED_NEGATIVE: "Not Matched (Negative)",
  TYPE_ALL_VALUE: 1,
  TYPE_MATCHED_VALUE: 2,
  TYPE_NOT_MATCHED_VALUE: 3,
  TYPE_NOT_MATCHED_POSITIVE_VALUE: 4,
  TYPE_NOT_MATCHED_NEGATIVE_VALUE: 5,
  TYPE_LOCATION_WISE: "Location Wise",
  TYPE_USER_WISE: "User Wise",
  
};
export const actionOptions = [
  {
    label: "Complete",
    value: "Complete"
  },
  {
    label: "Review",
    value: "Review"
  },
  {
    label: "Delete",
    value: "Delete"
  }
];
export const typeOptions = [
  {
    label: StockEntryProduct.TYPE_LOCATION_WISE,
    value: StockEntryProduct.TYPE_LOCATION_WISE
  },
  {
    label: StockEntryProduct.TYPE_USER_WISE,
    value: StockEntryProduct.TYPE_USER_WISE
  },
 
];
