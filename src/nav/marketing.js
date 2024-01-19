import { faAddressCard, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import Permission from "../helpers/Permission";
import { hasPermission } from "../services/UserRolePermissionService";

export function getMarketingNavList() {
  let showLeads = hasPermission(Permission.LEADS_VIEW)

  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/marketing/dashboard",
    icon: faTableCellsLarge,
  });

  if (showLeads) {
    arrayList = arrayList.concat({
      name: "Leads",
      url: "/leads",
      detailPageurl: "/lead/id",
      icon: faAddressCard,
    });
  }

  return arrayList;
}
