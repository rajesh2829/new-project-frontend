import * as portalConstant from "../helpers/PortalDetail";
import { getKeyValueByObject } from "../lib/Helper";
import { getCompanySettings } from "../services/SettingService";
import {
  faStore,
  faUser,
  faBookBookmark,
  faBriefcase,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import Permission from "../helpers/Permission";
import { hasPermission } from "../services/UserRolePermissionService";
import { Local } from ".././helpers/LocalStorage";

export async function getAppNavList() {
  let showAccountsMenu = hasPermission(Permission.ACCOUNTS_VIEW);

  let showJobMenu = hasPermission(Permission.JOB_VIEW);

  let showPagesMenu = hasPermission(Permission.PAGES_VIEW);

  let showPeopleMenu = hasPermission(Permission.PEOPLE_VIEW);

  let showLocationMenu = hasPermission(Permission.LOCATION_VIEW);
  let showProjectMenu = hasPermission(Permission.PROJECT_VIEW);
  let showMarketingMenu = hasPermission(Permission.MARKETING_VIEW);

  //GetSettings
  const data = localStorage.getItem(Local.MENU);

  let settings;

  if (!data) {
    settings = await getCompanySettings();
  }

  const enable_projects = data
    ? data.includes(portalConstant.SETTINGS_ENABLE_PROJECTS)
    : settings &&
    (await getKeyValueByObject(
      settings,
      portalConstant.SETTINGS_ENABLE_PROJECTS
    ));

  const enable_store = data
    ? data.includes(portalConstant.SETTINGS_ENABLE_STORE)
    : settings &&
    (await getKeyValueByObject(
      settings,
      portalConstant.SETTINGS_ENABLE_STORE
    ));

  const enable_account = data
    ? data.includes(portalConstant.SETTINGS_ENABLE_ACCOUNT)
    : settings &&
    (await getKeyValueByObject(
      settings,
      portalConstant.SETTINGS_ENABLE_ACCOUNT
    ));

  const enable_jobs = data
    ? data.includes(portalConstant.SETTINGS_ENABLE_JOBS)
    : settings &&
    (await getKeyValueByObject(
      settings,
      portalConstant.SETTINGS_ENABLE_JOBS
    ));

  const enable_pages = data
    ? data.includes(portalConstant.SETTINGS_ENABLE_PAGES)
    : settings &&
    (await getKeyValueByObject(
      settings,
      portalConstant.SETTINGS_ENABLE_PAGES
    ));

  let arrayList = [];

  arrayList = arrayList.concat({
    name: "My Dashboard",
    url: "/mydashboard",
    icon: faBriefcase
  });

  if ((enable_account && enable_account == "true") || enable_account == true) {
    if (showAccountsMenu) {
      arrayList = arrayList.concat({
        name: "Accounts",
        url: "/accountDashboard",
        icon: faBookBookmark
      });
    }
  }

  if ((enable_store && enable_store == "true") || enable_store == true) {
    if (showLocationMenu) {
      arrayList = arrayList.concat({
        name: "Commerce",
        url: "/locationDashboard",
        icon: faStore
      });
    }
  }

  if ((enable_pages && enable_pages == "true") || enable_pages == true) {
    if (showPagesMenu) {
      arrayList = arrayList.concat({
        name: "Pages",
        url: "/pages/pagelist",
        detailsPageurl: "/pages/pagelist/detail",
        icon: faFile
      });
    }
  }

  if (showPeopleMenu) {
    arrayList = arrayList.concat({
      name: "Peoples",
      url: "/people/dashboard",
      detailsPageurl: "/people/employment/detail/:id",
      icon: faUser
    });
  }

  if (showProjectMenu) {
    arrayList = arrayList.concat({
      name: "Projects",
      url: `/ticket`,
      detailsPageurl: "/ticket/detail/:id",
      icon: faUser
    });
  }

  if ((enable_jobs && enable_jobs == "true") || enable_jobs == true) {
    if (showJobMenu) {
      arrayList = arrayList.concat({
        name: "Jobs",
        url: "/job/dashboard",
        icon: faBriefcase
      });
    }
  }

  if (showMarketingMenu) {
    arrayList = arrayList.concat({
      name: "Marketing",
      url: "/marketing/dashboard",
      icon: faBriefcase
    });
  }

  return arrayList;
}
