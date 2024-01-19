import Home from "./home/index";
import Store from "./store/index";

const routes = [
  {
    path: "/home",
    exact: true,
    name: "shareMyCharger",
    component: Home,
  },
  {
    path: "/store",
    exact: true,
    name: "shareMyCharger",
    component: Store,
  },
];
export default routes;
