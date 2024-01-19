import {
  faBuildingColumns,
  faClipboard,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import permission from "../helpers/Permission";
import Url from "../helpers/Url";
import { hasPermission } from "../services/UserRolePermissionService";
export function getAccountNavList(setting, permissionList) {
  let showAccountEntry = hasPermission(permission.ACCOUNT_ENTRY_VIEW)
  let showAccount = hasPermission(permission.ACCOUNTS_VIEW)
  let showBill = hasPermission(permission.BILL_VIEW)

  let showPaymentAccount = hasPermission(permission.PAYMENT_ACCOUNT_VIEW)
  let arrayList = [];

  
    arrayList = arrayList.concat({
      name: "Dashboard",
      url: "/accountDashboard",
      icon: faTableCellsLarge,
    });
    arrayList = arrayList.concat({
      name: "Accounts",
      url: Url.Account_LIST,
      detailsPageurl: `/accounts`,
      icon: faBuildingColumns,
    });
    if (showBill) {
      arrayList = arrayList.concat({
        name: "Bills",
        url: "/bill",
        detailsPageurl: "/bill/detail",
        icon: faBuildingColumns,
      });
    }
  
    if (showPaymentAccount) {
      arrayList = arrayList.concat({
        name: "Payments",
        url: "/payment",
        detailsPageurl: "/payment/detail",
        icon: faBuildingColumns,
      });
    }
    if (showAccountEntry) {
      arrayList = arrayList.concat({
        name: "Account Entries",
        url: "/accountEntry",
        detailsPageurl: "/accountEntry/details",
        icon: faBuildingColumns,
      });
    }
    arrayList = arrayList.concat({
      name: "Salaries",
      url: "/salary",
      detailsPageurl: "/salary/detail/",
      addPageurl: "/salary/add",
      icon: faBuildingColumns,
    });
    arrayList = arrayList.concat({
      name: "Categories",
      url: "/category",
      icon: faBuildingColumns,
    });
    if (showAccount) {
      arrayList = arrayList.concat({
        name: "Payment Accounts",
        url: "/paymentAccount",
        detailsPageurl: "/paymentAccount/detail",
        icon: faBuildingColumns,
      });
    }
  
    arrayList = arrayList.concat({
      name: "Reports",
      url: "/accountReports",
      detailsPageurl: "/accountReports/",
      AccountEntryReport: "/accountReports/AccountEntryReport",
      SalesGstReport: "/accountReports/SalesGstReport",
      PurchaseGstReport: "/accountReports/PurchaseGstReport",
      icon: faClipboard,
    });
  
    return arrayList;
  }


