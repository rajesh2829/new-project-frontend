import {
  faBuilding,
  faTableCellsLarge
} from "@fortawesome/free-solid-svg-icons";


export function getSupportPortalNavList() {
  let arrayList = [];
  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/supportPortal/dashboard",
    icon: faTableCellsLarge,
  });
  arrayList = arrayList.concat({
    name: "Companies",
    url: "/supportPortal/company",
    detailsPageurl: `/supportPortal/company/detail/`,
    icon: faBuilding,
  });
  return arrayList;
}
