//Default Scheduler Job
export const SchedulerApiUrl = [
  {
    label: "Account Product: Update from Purchase Product",
    value: "/v1/scheduler/accountProduct/updateFromPurchaseProduct"
  },
  {
    label: "Attendance: Daily Report",
    value: "/v1/scheduler/attendance/dailyReport"
  },
  {
    label: "Attendance: Add Missing Absent Records",
    value: "/v1/scheduler/attendance/addMissedAttendanceAbsentRecord"
  },
  {
    label: "Attendance: Add Absent Record",
    value: "/v1/scheduler/attendance/autoAbsentAdd"
  },
  {
    label: "Attendance: Send Attendance Missing Report Email",
    value: "/v1/scheduler/attendance/sendAttendanceMissingReportEmail"
  },
  {
    label: "Attendance: Update Late Hours",
    value: "/v1/scheduler/attendance/updateAttendanceLateHours"
  },
  {
    label: "Bill: Regenerate Bill Number",
    value: "/v1/scheduler/bill/regenerateBillNumber"
  },
  {
    label: "Setup: Create Default Records",
    value: "/v1/scheduler/setup/createDefaultRecords"
  },
  {
    label: "Media:  Update S3 ACH",
    value: "/v1/scheduler/media/updateACH"
  },
  {
    label: "Media: Update Media From Product Media Table ",
    value: "/v1/scheduler/media/productMediaToMediaMigration"
  },
  {
    label: "Notification: Location - Daily Order Report Email",
    value: "/v1/scheduler/reports/dailyOrderReportEmail"
  },
  {
    label: "Location: No Check-In Notification",
    value: "/v1/scheduler/location/noCheckInEmail"
  },
  {
    label: "Location: Opening Report",
    value: "/v1/scheduler/location/locationOpeningReport"
  },
  {
    label: "Notification: Location Product Shortage Quantity Report Email",
    value: "/v1/scheduler/locationProduct/shortageQuantityReportEmail"
  },
  {
    label: "Notification: Location Product Excess Quantity Report Email",
    value: "/v1/scheduler/locationProduct/excessQuantityReportEmail"
  },
  {
    label: "Location Product: Update Min/Max Order Quantity",
    value: "/v1/scheduler/locationProduct/updateMinMaxOrderQuantity"
  },
  {
    label: "Location Product: Add Missing Products",
    value: "/v1/scheduler/locationProduct/addMissingProducts"
  },
  {
    label: "Location Product:Reindex",
    value: "/v1/scheduler/locationProduct/reindex"
  },
  {
    label: "Notification:Cancelled orders",
    value: "/v1/scheduler/order/cancelledOrders"
  },
  {
    label: "Order Product: Top(50) Report",
    value: "/v1/scheduler/reports/orderProductTop50Report"
  },
  {
    label: "Order: Top (50) Report",
    value: "/v1/scheduler/order/orderTop50Report"
  },
  {
    label: "Product: Update Product Index",
    value: "/v1/scheduler/product/productIndex"
  },
  {
    label: "Product: Price Update",
    value: "/v1/scheduler/product/updatePrice"
  },
  {
    label: "Product: Update Product Id In Stock Entry Product Table",
    value: "/v1/scheduler/product/updateProductIdInStockEntryProduct"
  },
  {
    label: "Product: Update Product Id In Transfer Product Table",
    value: "/v1/scheduler/product/product/updateProductIdInTransferProduct"
  },
  {
    label: "Product:  Update Product Id In Bill Product Table",
    value: "/v1/scheduler/product/updateProductIdInBillProduct"
  },
  {
    label: "Update:Update Purchase Product StoreId",
    value: "/v1/scheduler/purchaseProduct/updatePurchaseProductStoreId"
  },
  {
    label: "Purchase Order: Create",
    value: "/v1/scheduler/purchseorder/purchaseOrderCreate"
  },
  {
    label: "Recurring Task: Create",
    value: "/v1/scheduler/recurringTask/recurringTaskCreate"
  },
  {
    label: "Recurring Task: Create Missing Tasks",
    value: "/v1/scheduler/recurringTask/recurringMissingTaskCreate"
  },
  {
    label: "Replenish: Update Replenish Index",
    value: "/v1/scheduler/replenish/updateReplenishIndex"
  },
  {
    label : "Transfer Product: Daily Expired Return Products Report",
    value : "/v1/scheduler/transferProduct/dailyExpiredReturnProductsReport"
  },
  {
    label: "Bills - Pending Report",
    value: "/v1/scheduler/reports/billPendingReport"
  },
  {
    label: "Order: No Order Report",
    value: "/v1/scheduler/reports/noOrderReport"
  },
  {
    label: "Notification:Summary Report",
    value: "/v1/scheduler/reports/summaryReport"
  },
  {
    label: "Purchase - Pending Report",
    value: "/v1/scheduler/reports/purchasePendingReport"
  },
  {
    label: "Payment - Pending Report",
    value: "/v1/scheduler/reports/paymentPendingReport"
  },
  {
    label: "Sale: Regenerate Sale Number",
    value: "/v1/scheduler/saleSettlement/regenerateSaleNumber"
  },
  {
    label: "Sales Settlement: Missing Report",
    value: "/v1/scheduler/saleSettlement/salesSettlementMisssingReport"
  },
  {
    label: "Sales Settlement: Create Sale Settlement Missing Ticket",
    value: "/v1/scheduler/saleSettlement/createSaleSettlementMissingTicket"
  },
  {
    label: "Notification: Product Wise- Daily Sale Report Email",
    value: "/v1/scheduler/sale/dailyProductSaleReportEmail"
  },
  {
    label: "Sales: Daily Report",
    value: "/v1/scheduler/sales/salesReportMail"
  },
  {
    label: "Sale: Update SaleDiscrepancy",
    value: "/v1/scheduler/saleSettlement/saleDiscrepancyUpdate"
  },
  {
    label: "Notification: No Activity Reminder Slack Notification",
    value: "/v1/scheduler/slack/noActivityEmail"
  },
  {
    label: "Notification: Goal Status Reminder Slack Notification",
    value: "/v1/scheduler/slack/goalStatusEmail"
  },
  {
    label: "Stock Entry: Create Based on Location",
    value: "/v1/scheduler/stockEntry/stockEntryCreateBasedOnLocation"
  },
  {
    label: "Stock Entry Product:Update Status From Not Matched To Accepted",
    value:
      "/v1/scheduler/stockEntryProduct/UpdateStockEntryProductStatusFromNotMatchedToAccepted"
  },
  {
    label: "Stock Entry: Daily Report",
    value: "/v1/scheduler/stockEntry/stockEntryDailyReport"
  },
  {
    label: "Country: Sync Country Records",
    value: "/v1/scheduler/sync/country"
  },
  {
    label: "Product: Sync Vendor Product",
    value: "/v1/scheduler/sync/vendorProduct"
  },
  {
    label: "User: Sync Users From Tracker",
    value: "/v1/scheduler/sync/syncUsersFromTracker"
  },
  {
    label: "Attendance: Sync Attendance From Tracker",
    value: "/v1/scheduler/sync/syncAttendanceFromTracker"
  },
  {
    label: "Ticket: Update Ticket Index",
    value: "/v1/scheduler/ticket/ticketIndex"
  },
  {
    label: "Ticket: No inprogress tickets notification",
    value: "/v1/scheduler/ticket/noInprogressTicket"
  },
  {
    label: "Transfer: Create Return Transfer for Excess Quantity",
    value: "/v1/scheduler/transfer/returnTransferForExcessQuantity"
  },
  {
    label: "User: Update Date Of Joining based on Attendance",
    value: "/v1/scheduler/user/userUpdateDateOfJoiningByAttendance"
  },
  {
    label: "User: No Check-In Report",
    value: "/v1/scheduler/user/noCheckinActivityReport"
  },
  {
    label: "User: Update User Role",
    value: "/v1/scheduler/user/userRole"
  },
  {
    label: "User: Add Monthly Leave Balance",
    value: "/v1/scheduler/user/userMonthlyLeaveBalanceAdd"
  }
];
export const schedulerJob = {
  STATUS_ACTIVE_TEXT: "Active",
  STATUS_INACTIVE_TEXT: "In Active",
  STATUS_ACTIVE: 1,
  STATUS_INACTIVE: 2
};
