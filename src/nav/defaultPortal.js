import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
export function getPortalNavList() {
  let arrayList = [];
  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/dashboard",
    icon: faTableCellsLarge,
  });
  return arrayList;
}
