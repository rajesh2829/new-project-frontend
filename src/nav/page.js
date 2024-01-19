import { faFile } from "@fortawesome/free-solid-svg-icons";

export function getPagesNavList() {
  let arrayList = [];
  arrayList = arrayList.concat({
    name: "Pages",
    url: "/pages/pagelist",
    detailsPageurl: "/pages/pagelist/detail",
    addPageurl: "/pages/pagelist/detail/:id/:section",
    icon: faFile,
  });
  return arrayList;
}
