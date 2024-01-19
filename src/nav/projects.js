import {
  faCheckSquare,
  faProjectDiagram,
  faTasks
} from "@fortawesome/free-solid-svg-icons";
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import Cookie from "../helpers/Cookie";
import Urls from "../lib/Url";
import Permission from "../helpers/Permission";
import Url from "../helpers/Url";
import { hasPermission } from "../services/UserRolePermissionService";
import Cookies from "../lib/Helper";

export function getProjectsNavList(settings, permissionList) {
  let showTicket = hasPermission(Permission.TICKET_VIEW);
  let showSprintView = hasPermission(Permission.SPRINT_VIEW)

  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: Url.DASHBOARD_TICKET_LIST,
    detailsPageurl: "/dashboard/ticket",
    icon: faTableCellsLarge
  });

  if (showTicket) {
    arrayList = arrayList.concat({
      name: "Tickets",
      url: `/ticket?projectId=${Urls.GetParam("projectId")}`,
      addPageurl: "/ticket",
      detailsPageurl: "/ticket/",
      icon: faTasks
    });
  }


  if (showSprintView) {
    arrayList = arrayList.concat({
      name: "Sprints",
      url: "/sprint",
      detailsPageurl: "/sprint/:id",
      icon: faCheckSquare
    });
  }

  arrayList = arrayList.concat({
    name: "Ticket Search",
    url: "/ticketSearch",
    detailsPageurl: "/ticketSearch",
    icon: faTasks
  });


  if (Cookies.get(Cookie.PROJECT_ID) && Cookies.get(Cookie.PROJECT_ID) !== "null") {
    arrayList = arrayList.concat({
      name: "Settings",
      url: `/project/${Cookies.get(Cookie.PROJECT_ID)}?projectId=${Cookies.get(Cookie.PROJECT_ID)}`,
      detailsPageurl: "/project/",
      icon: faTasks
    }
    );
  }
  return arrayList;
}
