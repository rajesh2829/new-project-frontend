import About from "./about/index";
import Career from "./career";
import Client from "./client";
import Contact from "./contact";
import Ecommerce from "./ecommerce";
import ExtendedTeam from "./extendedTeam";
import Home1 from "./home";
import MobileAppTesting from "./mobileAppTesting";
import Mobility from "./mobility/index";
import Privacy from "./privacyPolicy";
import TermsOfUse from "./termsOfUse";
import Testing from "./testing";

const routes = [
  {
    path: "/home",
    exact: true,
    name: "thidff",
    component: Home1,
  },
  {
    path: "/about-us",
    exact: true,
    name: "about",
    component: About,
  },
  {
    path: "/client",
    exact: true,
    name: "clients",
    component: Client,
  },
  {
    path: "/extended-team",
    exact: true,
    name: "ExtendedTeam",
    component: ExtendedTeam,
  },
  {
    path: "/ecommerce",
    exact: true,
    name: "Ecommerce",
    component: Ecommerce,
  },
  {
    path: "/mobility",
    exact: true,
    name: "mobility",
    component: Mobility,
  },
  {
    path: "/testing-services",
    exact: true,
    name: "testing",
    component: Testing,
  },
  {
    path: "/contact",
    exact: true,
    name: "contact",
    component: Contact,
  },
  {
    path: "/career",
    exact: true,
    name: "career",
    component: Career,
  },
  {
    path: "/mobile-app-testing",
    exact: true,
    name: "mobile",
    component: MobileAppTesting,
  },
  {
    path: "/privacy-policy",
    exact: true,
    name: "privacy",
    component: Privacy,
  },
  {
    path: "/terms-of-use",
    exact: true,
    name: "privacy",
    component: TermsOfUse,
  },
];
export default routes;
