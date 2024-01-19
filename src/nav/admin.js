import { faIntercom } from "@fortawesome/free-brands-svg-icons";
import { Navlist } from "../helpers/Nav";
import Url from "../helpers/Url";
import {
  faArrowsRotate,
  faBuilding,
  faCalendarCheck,
  faChartLine,
  faMobile,
  faPhotoFilm,
  faProjectDiagram,
  faTableCellsLarge,
  faTags,
  faUserGear,
  faTasks
} from "@fortawesome/free-solid-svg-icons";
import Permission from "../helpers/Permission";
import { hasPermission } from "../services/UserRolePermissionService";


export function getAdminNavList() {
  let showRecurringTask = hasPermission(Permission.RECURRING_TASK_VIEW);

  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Company Profiles",
    url: "/admin/companyProfile",
    icon: faBuilding,
  });

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/admin/dashboard",
    listPageurl: "/admin/dashboard",
    icon: faTableCellsLarge,
  });

  arrayList = arrayList.concat({
    name: "Integrations",
    url: "/integrations/Chat",
    detailsPageurl: "/integrations/Chat/Slack",
    editPageurl: "/integrations/Chat/WhatsApp",
    icon: faIntercom,
  });

  arrayList = arrayList.concat({
    name: "Media",
    url: "/media",
    detailsPageurl: "/media/detail",
    icon: faPhotoFilm,
  });

  arrayList = arrayList.concat({
    name: "Mobile App",
    url: "/mobileapp",
    icon: faMobile,
  });

  arrayList = arrayList.concat({
    name: "Notifications",
    url: "/admin/notification",
    icon: faBuilding,
  });

  arrayList = arrayList.concat({
    name: "Projects",
    url: "/project",
    detailsPageurl: "/project/",
    icon: faProjectDiagram
  });

  if (showRecurringTask) {
    arrayList = arrayList.concat({
      name: "Recurring Tasks",
      url: Url.RECURRING_TASK_LIST,
      detailsPageurl: "/recurringTask",
      icon: faTasks
    });
  }

  arrayList = arrayList.concat({
    name: "Recurring Activity",
    url: "/recurringActivity",
    detailsPageurl: "/recurringActivity",
    icon: faChartLine
  });

  arrayList = arrayList.concat({
    name: "Roles",
    url: "/admin/roles",
    detailsPageurl: "/admin/roles/",
    icon: faBuilding,
  });

  arrayList = arrayList.concat({
    name: "Settings",
    url: `/setting/${Navlist.ACCOUNT}`,
    roledetailsPageurl: `/setting/${Navlist.USER_NAV_ROLE_DETAIL}`,
    listPageurl: `/setting/${Navlist.COUNTRY}`,
    addPageurl: `/setting/${Navlist.THEMES}`,
    activePageurl: `/setting/${Navlist.SHIFT}`,

    countryDetailPageurl: `/admin/settings/country/`,
    productSettingPageUrl: `/setting/${Navlist.PRODUCTS}`,
    statusPageurl: `/setting/${Navlist.STATUS}`,
    activiyType: `/setting/${Navlist.ACTIVITY_TYPE_URL}`,
    transferType: `/setting/${Navlist.TRANSFER_TYPE_URL}`,
    mobileApp: `/setting/${Navlist.MOBILE_APP_URL}`,
    Bills: `/setting/${Navlist.BILLS}`,
    Bills: `/setting/${Navlist.PURCHASE}`,
    Bills: `/setting/${Navlist.ORDER}`,
    Bills: `/setting/${Navlist.PAYMENT}`,
    loyaltyDetailPageurl: `/admin/settings/loyalty/`,
    icon: faUserGear,
  });

  arrayList = arrayList.concat({
    name: "Scheduler Jobs",
    url: "/schedulerJobs",
    detailsPageurl: "/schedulerJobs/detail/",
    icon: faCalendarCheck,
  });

  arrayList = arrayList.concat({
    name: "System Logs",
    url: "/systemLogs",
    icon: faArrowsRotate,
  });

  arrayList = arrayList.concat({
    name: "Tags",
    url: "/tags",
    detailsPageurl: "/tags/detail",
    editPageurl: "/tags/details/:id",
    icon: faTags,
  });

  return arrayList;
}
