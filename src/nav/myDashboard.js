import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

export function getMydashboardNavList() {
  let arrayList = [];
  arrayList = arrayList.concat({
    name: "My Dashboard",
    url: "/mydashboard",
    icon: faBriefcase,
  });
  return arrayList;
}
