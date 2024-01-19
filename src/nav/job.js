import { faAddressCard, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

export function getJobsNavList() {

  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/job/dashboard",
    icon: faTableCellsLarge,

  });

  arrayList = arrayList.concat({
    name: "Jobs",
    url: "/jobs/jobslist",
    detailsPageurl: "/job/detail",
    icon: faAddressCard,
  });

  arrayList = arrayList.concat({
    name: "Candidates",
    url: "/jobs/candidate",
    detailsPageurl: "/jobs/candidate/",
    icon: faUsersViewfinder,
  });

  return arrayList;
}
