import { SALE_SETTLEMENT } from "./SaleSettlement";

//Nav List
export const Navlist = {
  BILL: "Bill",
  ORDER:"Order",
  TRANSFER:"Tranfer",
  SALE_SETTLEMENT:"Sale Settlement"
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

  userNavList = [
    getUserNavList(Navlist.BILL,Navlist.BILL),
    getUserNavList(Navlist.ORDER,Navlist.ORDER),
    getUserNavList(Navlist.SALE_SETTLEMENT,Navlist.SALE_SETTLEMENT),
    getUserNavList(Navlist.TRANSFER,Navlist.TRANSFER)
  
  
  ];
  // Return Portal Details Nav List
  return userNavList;
}


