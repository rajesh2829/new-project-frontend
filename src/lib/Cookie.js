import { clearCookie } from "./Helper";

// Cookies
export const COOKIE_SESSION_TOKEN = "session_token";
export const COOKIE_COMPANY_NAME = "companyName";
export const COOKIE_SELECTED_PAYMENT = "orderSelectedPayment";
export const COOKIE_SELECTED_SALESEXECUTIVE = "orderSelectedSalesExecutive";
export const COOKIE_SELECTED_SHIFT = "orderSelectedShift";
export const COOKIE_SELECTED_STORE = "orderSelectedStore";
export const COOKIE_ORDER_ID = "orderId";
export const COOKIE_PERMISSION = "permission";
export const COOKIE_TIME_ZONE = "timezone";
export const COOKIE_LOCATION_PRODUCT = "locationProductListColumns";
export const COOKIE_PURCHASE_LIST_COLUMNS = "purchaseProductListColumns";
export const COOKIE_PRODUCT = "Product"



/**
 * Clear all cookies
 *
 */
export function clearAllCookies() {
  clearCookie(COOKIE_SESSION_TOKEN);
  clearCookie(COOKIE_SELECTED_PAYMENT);
  clearCookie(COOKIE_SELECTED_SALESEXECUTIVE);
  clearCookie(COOKIE_SELECTED_SHIFT);
  clearCookie(COOKIE_SELECTED_STORE)
  clearCookie(COOKIE_ORDER_ID)
  clearCookie(COOKIE_TIME_ZONE);
  clearCookie(COOKIE_LOCATION_PRODUCT);
  clearCookie(COOKIE_PURCHASE_LIST_COLUMNS);
  clearCookie(COOKIE_PRODUCT)


  window.localStorage.clear();
  return "";
}
