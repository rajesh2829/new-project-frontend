import {
  faBuildingColumns,
  faChartLine,
  faClipboard,
  faClipboardList,
  faMapLocationDot,
  faTableCellsLarge,
  faTasks,
  faUser,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import Permission from "../helpers/Permission";
import Url from "../helpers/Url";
import DateTime from "../lib/DateTime";
import { hasPermission } from "../services/UserRolePermissionService";

export function getPeopleNavList(setting, permissionList) {

  const showFine = hasPermission(Permission.FINE_VIEW);

  let showAttendance =
    hasPermission(Permission.ATTENDANCE_VIEW)
  let showAttendanceReport =
    hasPermission(Permission.ATTENDANCE_SUMMARY_REPORT_VIEW)
  let showVisitor = hasPermission(Permission.VISITOR_VIEW)
  let showUser = hasPermission(Permission.USER_VIEW)
  let showGatePass = hasPermission(Permission.GATE_PASS_VIEW)

  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/people/dashboard",
    icon: faTableCellsLarge,
  });

  arrayList = arrayList.concat({
    name: "Activities",
    url: "/activity",
    detailsPageurl: "/activity/detail",
    icon: faChartLine,
  });

  if (showAttendance) {
    arrayList = arrayList.concat({
      name: "Attendance",
      url: `/attendance?startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`,
      addPageurl: "/attendance",
      detailsPageurl: "/attendance/",
      icon: faClipboardList,
    });
  }

  if (showFine) {
    arrayList = arrayList.concat({
      name: "Fines",
      url: Url.FINE_LIST,
      detailsPageurl: "/fine/",
      icon: faTasks,
    });
  }

  if (showGatePass) {
    arrayList = arrayList.concat({
      name: "Gate Pass",
      url: Url.GATE_PASS_LIST,
      editPageurl: "/gatePass",
      icon: faUser
    })
  }

  if (showVisitor) {
    arrayList = arrayList.concat({
      name: "Visitors",
      url: Url.VISITOR_LIST,
      editPageurl: "/visitor",
      icon: faUser
    })
  };

  if (showUser) {
    arrayList = arrayList.concat({
      name: "Users",
      url: "/users",
      detailsPageurl: "/user/",
      icon: faUser,
    });
  }

  arrayList = arrayList.concat({
    name: "Trainings",
    url: "/training",
    detailsPageurl: "/training/",
    // addPageurl: "/salary/add",
    icon: faBuildingColumns,
  });

  arrayList = arrayList.concat({
    name: "Timesheets",
    url: "/timesheet",
    detailsPageurl: "/timesheet/",
    icon: faUserAstronaut,
  });

  if (showAttendanceReport) {
    arrayList = arrayList.concat({
      name: "Reports",
      url: "/Reports",
      detailsPageurl: "/attendanceSummaryReport",
      attendanceReportLocationWise: "/attendanceReportLocationWise",
      icon: faClipboard,
    });
  }

  arrayList = arrayList.concat({
    name: "Location User Allocation",
    url: Url.LOCATION_USER_ALLOCATION,
    detailsPageurl: "/locationUserAllocation",
    icon: faMapLocationDot,
  });


  return arrayList;
}
