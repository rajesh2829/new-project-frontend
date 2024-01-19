import {
  faBoxOpen,
  faBoxesPacking,
  faCartShopping,
  faClipboard,
  faCubes,
  faFileInvoiceDollar,
  faFileWaveform,
  faHandHoldingDollar,
  faLayerGroup,
  faRectangleXmark,
  faRefresh,
  faStar,
  faStore,
  faTableCellsLarge,
  faTruck,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";
import permission from "../helpers/Permission";

import Url from "../helpers/Url";
import { hasPermission } from "../services/UserRolePermissionService";

export function getStoreNavList() {
  let showProduct =
    hasPermission(permission.PRODUCT_VIEW)
  let showStore =
    hasPermission(permission.LOCATION_VIEW)
  let showOrder =
    hasPermission(permission.ORDER_VIEW)
  let showCustomer =
    hasPermission(permission.CUSTOMER_VIEW)
  let showTag =
    hasPermission(permission.TAG_VIEW)
  let showVendor =
    hasPermission(permission.VENDOR_VIEW)
  let showCategories =
    hasPermission(permission.PRODUCT_CATEGORY_VIEW)
  let showBrands =
    hasPermission(permission.BRAND_VIEW)
  let showSupplierProduct =
    hasPermission(permission.SUPPLIER_PRODUCT_VIEW)
  let showStockEntry =
    hasPermission(permission.STOCK_ENTRY_VIEW)
  let showSaleSettlement =
    hasPermission(permission.SALE_SETTLEMENT_VIEW)
  let showPurchase =
    hasPermission(permission.PURCHASE_VIEW)
  let showReport =
    hasPermission(permission.REPORT_VIEW)
  let showTransfer =
    hasPermission(permission.TRANSFER_VIEW)
  let showWishlist =
    hasPermission(permission.WISHLIST_VIEW)

  let showPurchaseOrder =
    hasPermission(permission.PURCHASE_ORDER_VIEW)

  let showDeliveryOrder =
    hasPermission(permission.DELIVERY_ORDER_VIEW)
  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/locationDashboard",
    icon: faTableCellsLarge,
  });

  if (showOrder) {
    arrayList = arrayList.concat({
      name: "Orders",
      url: Url.ORDER_LIST,
      highlight: `/orders`,
      detailsPageurl: "/order/",
      addPageurl: "/location/orders/details",
      icon: faCartShopping,
    });
  }

  if (showDeliveryOrder) {
    arrayList = arrayList.concat({
      name: "Delivery Orders",
      url: Url.DELIVERY_ORDER_LIST,
      highlight: `/deliveryOrders`,
      detailsPageurl: "/deliveryOrder/",
      addPageurl: "/location/deliveryOrders/details",
      icon: faCartShopping,
    });
  }

  if (showTransfer) {
    arrayList = arrayList.concat({
      name: "Transfers",
      url: Url.TRANSFER_LIST,
      highlight: `/transfers`,
      detailsPageurl: "/transfer/",
      editPageurl: "/transfer/add",
      addPageurl: "/transfer/add/:fromLocationId/:toLocationId/:id",
      icon: faCubes,
    });
  }
  arrayList = arrayList.concat({
    name: "Replenishes",
    url: Url.REPLENISH_LIST,
    addPageurl: "/replenish",
    icon: faRefresh,
  });

  arrayList = arrayList.concat({
    name: "Replenishments",
    url: Url.REPLENISHMENT_PRODUCT,
    icon: faBoxOpen,
  });

  if (showPurchase) {
    arrayList = arrayList.concat({
      name: "Purchases",
      url: Url.PURCHASE_LIST,
      addPageurl: "/purchases",
      detailsPageurl: "/purchase/",
      icon: faCartShopping,
    });
  }

  if (showPurchaseOrder) {
    arrayList = arrayList.concat({
      name: "Purchase Orders",
      url: Url.PURCHASE_ORDER_LIST,
      addPageurl: "/purchaseorders",
      editPageurl: "/purchaseOrder/detail",
      icon: faFileInvoiceDollar,
    });
  }

  if (showStockEntry) {
    arrayList = arrayList.concat({
      name: "Stock Entries",
      url: Url.STOCK_ENTRY_LIST,
      highlight: `/stockEntry`,
      detailsPageurl: "/stockEntry/",
      editPageurl: "/location/stockEntry/add/",
      icon: faBoxesPacking,
    });
  }
  if (showSaleSettlement) {
    arrayList = arrayList.concat({
      name: "Sale Settlements",
      url: Url.SALES_SETTLEMENT_LIST,
      highlight: `/salesettlement`,
      detailsPageurl: "/SaleSettlement/",
      editPageurl: "/Sales",
      icon: faHandHoldingDollar,
    });
  }

  if (showProduct) {
    arrayList = arrayList.concat({
      name: "Products",
      url: Url.PRODUCTS_LIST,
      detailsPageurl: "/product/",
      icon: faBoxOpen,
    });
  }

  arrayList = arrayList.concat({
    name: "Inspections",
    url: Url.INSPECTION,
    detailsPageurl: "/inspections/",
    icon: faFileWaveform,
  });

  if (showBrands) {
    arrayList = arrayList.concat({
      name: "Brands",
      url: Url.BRANDS_LIST,
      detailsPageurl: "/brands/",
      icon: faStar,
    });
  }

  if (showCategories) {
    arrayList = arrayList.concat({
      name: "Categories",
      url: Url.CATEGORIES_LIST,
      detailsPageurl: "/category/",
      icon: faLayerGroup,
    });
  }

  if (showStore) {
    arrayList = arrayList.concat({
      name: "Locations",
      url: Url.LOCATION_LIST,
      detailsPageurl: "/location/",
      editPageurl: "/location/product/detail",
      icon: faStore,
    });
  }


  if (showCustomer) {
    arrayList = arrayList.concat({
      name: "Customers",
      url: Url.CUSTOMERS_LIST,
      detailsPageurl: "/customers/",
      icon: faUserAstronaut,
    });
  }
  if (showVendor) {
    arrayList = arrayList.concat({
      name: "Vendors",
      url: Url.VENDOR_LIST,
      detailsPageurl: `/vendor/`,
      icon: faTruck,
    });
  }

  if (showWishlist) {
    arrayList = arrayList.concat({
      name: "Wishlists",
      url: "/wishlist",
      icon: faRectangleXmark,
    });
  }

  if (showReport) {
    arrayList = arrayList.concat({
      name: "Reports",
      url: "/report",
      salesReport: "/salesSettlementReport",
      orderProductReport: "/orderProductReport",
      storeProductreport: "/storeProductReport",
      transferProductReport: "/transferProductReport",
      purchaseproductReport: "/purchaseProductReport",
      stockReport: "/stockReport",
      stockEntryReport: "/stockEntryReport",
      orderSummaryReport: "/orderSummaryReport",
      orderProductGraphReport: "/orderProductGraphReport",
      storeProductNoOrderReport: "/storeProductNoOrderReport",
      storeProductNoStockReport: "/storeProductNoStockReport",
      purchaseRecommendationReport: "/purchaseRecommendationReport",
      purchaseSummaryReport: "/purchaseSummaryReport",
      orderSalesSettlementDiscrepancyReport: "/orderSalesSettlementDiscrepancyReport",
      replenishReport: "/replenishReport",
      orderProductCancelledReport: "/orderProductCancelledReport",
      orderCancelledReport: "/orderCancelledReport",
      stockProductNegativeStockReport: "/stockProductNegativeStockReport",
      salesCoinReport: "/salesCoinReport",
      orderReport: "/orderReport",
      purchaseReport: "/purchaseReport",
      icon: faClipboard,
    });
  }

  return arrayList;
}
