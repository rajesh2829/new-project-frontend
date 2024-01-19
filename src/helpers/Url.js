import { Tabs } from "../helpers/Tabs";
import DateTime from "../lib/DateTime";
import Urls from "../lib/Url";
import { Order } from "./Order";
import { ACTIVE } from "./TransferType";
import { OrderProduct } from "./orderProduct";


const Url = {
  LOCATION_LIST: `/location`,
  BRANDS_LIST: `/brands`,
  CATEGORIES_LIST: `/categories`,
  CUSTOMERS_LIST: `/customers`,
  FINE_LIST: `/fine`,
  ORDER_LIST: `/orders?tab=${
    Tabs.ORDERS
  }&&startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  PRODUCTS_LIST: `/products`,
  PURCHASE_LIST: `/purchases?tab=${Tabs.PURCHASE}`,
  PURCHASE_ORDER_LIST: `/purchaseorders?tab=${
    Tabs.PURCHASE_ORDER
  }`,
  SALES_SETTLEMENT_LIST: `/salesettlement?tab=${
    Tabs.SALES_SETTLEMENT
  }&&startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  STOCK_ENTRY_LIST: `/stockEntry?tab=${
    Tabs.STOCK_ENTRY
  }&&startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  TRANSFER_LIST: `/transfers?tab=${
    Tabs.TRANSFER
  }&startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,
  VENDOR_LIST: `/vendor`,
  Account_LIST: `/accounts`,
  TICKET_LIST: `/ticket?projectId=${Urls.GetParam("projectId")}`,
  DASHBOARD_TICKET_LIST: `/dashboard/ticket`,
  REPLENISH_LIST: "/replenish",
  REPLENISHMENT_PRODUCT: "/replenishmentProduct",
  VISITOR_LIST: "/visitor",
  GATE_PASS_LIST : "/gatePass",
  // report url
  ORDER_PRODUCT_REPORT: `/orderProductReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  STORE_PRODUCT_REPORT: `/storeProductReport`,
  STORE_PRODUCT_NEGATIVE_STOCK_REPORT: `/stockProductNegativeStockReport`,
  ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT: `/orderSalesSettlementDiscrepancyReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  STOCK_REPORT: `/stockReport`,
  ORDER_REPORT: `/orderReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  ORDER_REPORT_USER_WISE: `/orderReportUserWise?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}&type=User Wise`,

  ORDER_CANCELLED_REPORT: `/orderCancelledReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  ORDER_PRODUCT_CANCELLED_REPORT: `/orderProductCancelledReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,

  STORE_PRODUCT_NO_STOCK_REPORT: `/storeProductNoStockReport`,
  STORE_PRODUCT_NO_ORDER_REPORT: `/storeProductNoOrderReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  TRANSFER_PRODUCT_REPORT: `/transferProductReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  SALES_REPORT: `/salesSettlementReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  PURCHASE_PRODUCT_REPORT: `/purchaseProductReport`,
  ORDER_PRODUCT_REPORT: `/orderProductReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  ORDER_GRAPH_REPORT: `/orderProductGraphReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}&graphData=${OrderProduct.REPORT_TYPE_AMOUNT_WISE}&type=${OrderProduct.REPORT_TYPE_BRAND_WISE}&sort=${"amount"}&sortDir=${"DESC"}`,
  PURCHASE_SUMMARY_REPORT: `/purchaseSummaryReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  PURCHASE_RECOMMENDATION_REPORT: `/purchaseRecommendationReport?startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  ATTENDENCE_SUMMARY_REPORT: `/attendanceSummaryReport?startDate=${DateTime.currentMonthStartDate()}&endDate=${DateTime.getToday()}`,
  ATTENDENCE_REPORT: `/attendanceReport?date=${DateTime.getToday()}`,
  FINE_REPORT: `/fineReport?date=${DateTime.getToday()}`,
  ACCOUNT_ENTRY_REPORT: `/accountReports/AccountEntryReport?startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,
  SALES_GST_REPORT: `/accountReports/SalesGstReport?startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,
  PURCHASE_GST_REPORT: `/accountReports/PurchaseGstReport?startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,
  INSPECTION: "/inspections",
  RECURRING_TASK_LIST: `/recurringTask`,
  STOCK_ENTRY_REPORT: `/stockEntryReport?startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,
  LOCATION_USER_ALLOCATION: `/locationUserAllocation?date=${DateTime.getToday()}`,
  REPLENISH_REPORT: `/replenishReport?date=${DateTime.getToday()}`,
  SETTING_TRANSFER:`Transfer?status=${ACTIVE}`,
  DELIVERY_ORDER_LIST: `/deliveryOrders?tab=${
    Tabs.DELIVERY_ORDERS
  }&&type=${Order.TYPE_DELIVERY}&&startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`,
  SALES_COIN_REPORT: `/salesCoinReport?startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,
  PURCHASE_REPORT: `/purchaseReport?startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,

};
export default Url;
