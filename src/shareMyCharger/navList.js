/**
 * App navigation list
 */
export function getNavList() {
  let arrayList = [];
  {
    arrayList = arrayList.concat({
      name: "Home",
      url: "/sharemycharger",
    });
    arrayList = arrayList.concat({
      name: "How it works",
      url: "#",
    });
    arrayList = arrayList.concat({
      name: "Locate a charger",
      url: "#",
    });
    arrayList = arrayList.concat({
      name: "Share your charger",
      url: "#",
    });
    arrayList = arrayList.concat({
      name: "Store",
      url: "/store",
    });
  }
  return arrayList;
}
