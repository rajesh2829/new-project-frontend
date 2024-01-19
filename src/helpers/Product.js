// Product Status
export const Status = {
  ACTIVE: "Active",
  INACTIVE: "InActive",
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
  ALL: "All",
  ACTIVE_VALUE: 1,
  INACTIVE_VALUE:2,
};

export const Product = {
  
  STATUS_ACTIVE_TEXT: "Active",
  STATUS_DRAFT_TEXT: "Draft",
  STATUS_INACTIVE_TEXT: "INACTIVE",

  STATUS_ACTIVE: 1,
  STATUS_DRAFT:3,
  STATUS_INACTIVE:2,
};

// Brand Status
export const BrandStatus = { ACTIVE: "Active", INACTIVE: "InActive" };

// Category Status
export const CATEGORY_STATUS_ACTIVE = "Active";
export const CATEGORY_STATUS_INACTIVE = "InActive";
export const CategoryStatus = { ACTIVE: "Active", INACTIVE: "InActive" };

/* Tag Status */
export const TAG_STATUS_ACTIVE = "Active";
export const TAG_STATUS_INACTIVE = "InActive";

/* Store Status */
export const LOCATION_STATUS_ACTIVE = "Active";
export const LOCATION_STATUS_INACTIVE = "InActive";

/* Supplier Status */
export const SUPPLIER_STATUS_ACTIVE = "Active";
export const SUPPLIER_STATUS_INACTIVE = "InActive";
export const SUPPLIER_STATUS_ALL = "All";

// Product Taxable
export const ProductTaxable = {
  YES: "Yes",
  YES_VALUE: "1",
  NO: "0",
  NO_VALUE: "0",
};

// Product Shopify Status
export const ProductShopifyStatus = {
  PUBLISHED: "Published",
  DRAFT: "Draft",
};

// Product Store Status
export const ProductStoreStatus = { ACTIVE: "Active", INACTIVE: "InActive" };

// Product Media constants
export const Feature = { FEATURE_ENABLED: 1, FEATURE_DISABLED: 0 };
export const Media = { VISIBILITY_ENABLED: 1 };
// Product Weight Unit Options
export const weightUnitOptions = [
  {
    value: "g",
    label: "g",
  },
  {
    value: "lb",
    label: "lb",
  },
  {
    value: "oz",
    label: "oz",
  },
  {
    value: "kg",
    label: "kg",
  },
  {
    value: "l",
    label: "l",
  },
  {
    value: "ml",
    label: "ml",
  },
  {
    value: "inch",
    label: "inch",
  },
  {
    value: "pcs",
    label: "pcs",
  },
  {
    value: "coils",
    label: "coils",
  },
  {
    value: "mg",
    label: "mg",
  },
];

export const productStatusOptions = [
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Archived",
    label: "Archived",
  },
];

export const taxable = [
  {
    value: 1,
    label: "Yes",
  },
  {
    value: 0,
    label: "No",
  },
];

export const allowTransferOutOfStock = [
  {
    value: 1,
    label: "Yes",
  },
  {
    value: 0,
    label: "No",
  },
];

export const allowSellOutOfStock = [
  {
    value: 1,
    label: "Yes",
  },
  {
    value: 0,
    label: "No",
  },
];

export const RUPEE = "₹";

export const FieldLabel = {
  MRP: "MRP",
  COST_PRICE: "Cost Price",
  SALE_PRICE: "Sale Price",
  PROFIT: "Profit",
  PROFIT_AMOUNT: "Profit Amount",
  MAX_QUANTITY: "Max Quantity",
  MIN_QUANTITY: "Min Quantity",
  CATEGORY:"Category",
  TAX: "Tax",
  CGST: "CGST",
  SGST: "SGST",
  SKU : "SKU",
  HSN_CODE : "HSN Code",
  PACK_SIZE : "Pack Size",
  SHELF_LIFE : "Shelf Life",
  SALES_COIN : "Sales Coin",
  CGST_AMOUNT: "CGST Amount",
  SGST_AMOUNT: "SGST Amount",
  BRAND:"Brand",
  BAR_CODE:"Bar Code",
  MANUFACTURE:"Manufacture",
  DISCOUNT: "Discount",
  MARGIN: "Margin",
};



