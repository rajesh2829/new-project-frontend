import Dashboard from "../dashboard";
import EcommHomePage from "../homePage";
import Login from "../login";
import ProductList from "./product";
import EcommSignUpPage from "./signUpPage";

const routes = [
  {
    path: "/home",
    exact: true,
    name: "BookMyWaterCan",
    component: EcommHomePage,
  },
  {
    path: "/signup",
    exact: true,
    name: "EcommSignUpPage",
    component: EcommSignUpPage,
  },
  {
    path: "/login",
    exact: true,
    name: "EcommLoginPage",
    component: Login,
  },
  {
    path: "/mydashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/category/:name",
    exact: true,
    name: "Product",
    component: ProductList,
  },
];
export default routes;
