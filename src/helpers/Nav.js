import { hasPermission } from "../services/UserRolePermissionService";
import Permission from "../helpers/Permission";
import Url from "./Url";
//Nav List
export const Navlist = {
  ACCOUNT:"Account",
  ACTIVITY_TYPE: "Activity Types",
  ACTIVITY_TYPE_URL: "ActivityTypes",
  ATTENDANCE_TYPE: "AttendanceTypes",
  BILL: "Bill",
  COUNTRY: "Countries",
  FINE:"Fine",
  GENERAL: "General",
  INTEGRATIONS: "Integrations",
  INSPECTION:"Inspection",
  LOCATION: "Location",
  LOYALTY : "Loyalty",
  LOCATION_PRODUCT: "Location Product",
  LOCATION_PRODUCT_URL: "LocationProduct",
  MESSAGE: "Message",
  NOTIFICATION: "Notifications",
  ORDER:"Order",
  ORDER_PRODUCT:"Order Product",
  ORDER_PRODUCT_URL:"Order_product",
  PURCHASE:"Purchase",
  PURCHASE_PRODUCT: "Purchase Product",
  PURCHASE_PRODUCT_URL:"Purchase_product",
  PAYMENT:"Payment",
  REPLENISHMENT:"Replenishment",
  SHIFT: "Shifts",
  STATUS: "Statues",
  SALES_SETTLEMENT: "Sales Settlement",
  SALES_SETTLEMENT_URL:"Sale_settlement",
  STOCK_ENTRY: "Stock Entry",
  STOCK_ENTRY_URL:"Stock_entry",
  STOCK_ENTRY_PRODUCT: "Stock Entry Product",
  STOCK_ENTRY_PRODUCT_URL:"Stock_entry_product",
  THEMES: "Themes",
  TRANSFER_TYPE_URL: "TransferTypes",
  TRANSFER: "Transfer",
  TICKET: "Ticket",
  TAX_URL:"tax",
  TAX:"Tax",
  TIME_SHEET:"Timesheet",
  VISITOR_TYPE : "VisitorType",
  TRANSFER_PRODUCT: "Transfer Product",
  TRANSFER_PRODUCT_URL:"transfer_product"
  
};

/**
 * Get User Side Nav List
 *
 * @returns {Array}
 */
export function getUserNavList() {
  let userNavList = [];
  // Return User Nav Object
  const getUserNavList = (tab, URL, subtab = "", subSection = "") => {
    return {
      name: tab,
      defaultSubTab: subtab,
      defaultSubSection: subSection,
      url: URL
    };
  };
  let showActivityTypeView=hasPermission(Permission.ACTIVITY_TYPE_VIEW)
  let showLocationView = hasPermission(Permission.LOCATION_VIEW)
  let showTransferView=hasPermission(Permission.TRANSFER_VIEW)
  let showCountries=hasPermission(Permission.COUNTRY_VIEW)
  userNavList.push(getUserNavList(Navlist.ACCOUNT, Navlist.ACCOUNT))

  if(showActivityTypeView){
    userNavList.push(getUserNavList(Navlist.ACTIVITY_TYPE, Navlist.ACTIVITY_TYPE_URL))
  }
  userNavList.push(getUserNavList(Navlist.ATTENDANCE_TYPE, Navlist.ATTENDANCE_TYPE))
  userNavList.push(getUserNavList(Navlist.BILL, Navlist.BILL))
  if(showCountries){
    userNavList.push(getUserNavList(Navlist.COUNTRY, Navlist.COUNTRY))
  }
  userNavList.push(getUserNavList(Navlist.FINE, Navlist.FINE))
  userNavList.push(getUserNavList(Navlist.GENERAL, Navlist.GENERAL))
  userNavList.push(getUserNavList(Navlist.INSPECTION, Navlist.INSPECTION))

  if (showLocationView) {
    userNavList.push(getUserNavList(Navlist.LOCATION, Navlist.LOCATION))
  }
  userNavList.push(getUserNavList(Navlist.LOYALTY, Navlist.LOYALTY))
  userNavList.push(getUserNavList(Navlist.LOCATION_PRODUCT, Navlist.LOCATION_PRODUCT_URL))
  userNavList.push(getUserNavList(Navlist.ORDER, Navlist.ORDER))
  userNavList.push(getUserNavList(Navlist.ORDER_PRODUCT, Navlist.ORDER_PRODUCT_URL))
  userNavList.push(getUserNavList(Navlist.PAYMENT, Navlist.PAYMENT))
  userNavList.push(getUserNavList(Navlist.PURCHASE, Navlist.PURCHASE))
  userNavList.push(getUserNavList(Navlist.PURCHASE_PRODUCT, Navlist.PURCHASE_PRODUCT_URL))
  userNavList.push(getUserNavList(Navlist.REPLENISHMENT, Navlist.REPLENISHMENT))
  userNavList.push(getUserNavList(Navlist.SHIFT, Navlist.SHIFT))
  userNavList.push(getUserNavList(Navlist.STATUS, Navlist.STATUS))
  userNavList.push(getUserNavList(Navlist.SALES_SETTLEMENT, Navlist.SALES_SETTLEMENT_URL))
  userNavList.push(getUserNavList(Navlist.STOCK_ENTRY, Navlist.STOCK_ENTRY_URL))
  userNavList.push(getUserNavList(Navlist.STOCK_ENTRY_PRODUCT, Navlist.STOCK_ENTRY_PRODUCT_URL))
  userNavList.push(getUserNavList(Navlist.TAX, Navlist.TAX_URL))
  userNavList.push(getUserNavList(Navlist.THEMES, Navlist.THEMES))
  if(showTransferView){
    userNavList.push(getUserNavList(Navlist.TRANSFER, Url.SETTING_TRANSFER))
  }
  userNavList.push(getUserNavList(Navlist.TRANSFER_PRODUCT,Navlist.TRANSFER_PRODUCT_URL))
  userNavList.push(getUserNavList(Navlist.TIME_SHEET, Navlist.TIME_SHEET))
  userNavList.push(getUserNavList(Navlist.TICKET, Navlist.TICKET))
  userNavList.push(getUserNavList(Navlist.VISITOR_TYPE, Navlist.VISITOR_TYPE))


  // Return Portal Details Nav List
  return userNavList;
}


