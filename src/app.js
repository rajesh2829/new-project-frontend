import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
// ReactToastify CSS
import "react-toastify/dist/ReactToastify.min.css";
import { bindActionCreators } from "redux";
import Bill from "./views/purchase";
//thidiff
import AddBill from "./views/purchase/add";
import BillDetails from "./views/purchase/detail";
import "../node_modules/react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../node_modules/react-pdf/dist/esm/Page/TextLayer.css";
//Action
import { fetchSettings } from "./actions/settings";
import companySignup from "./views/company";
import Details from "./views/company/Detail";
import CompanyList from "./views/company/list";
import MediaList from "./views/media";
import MediaDetail from "./views/media/Detail";
import CompanyProfile from "./views/portalDetail/companyProfile";
import Themes from "./views/portalDetail/themes";
import Setting from "./views/setting";
import userDetail from "./views/user/userDetail";
import UserList from "./views/user/userList";
//Service
//SCSS
import "./app.scss";
import * as commonConstant from "./common/constants";
//Layout
import AdminLayout from "./components/layout/adminLayout";
import PublicLayout from "./components/layout/publicLayout";
//Context
import MyProvider from "./context/myProvider";
import Dashboard from "./views/dashboard";
import ForgotPassword from "./views/forgotPassword";
// History
import history from "./history";
import { COOKIE_SESSION_TOKEN } from "./lib/Cookie";
import Jobs from "./views/job";
import JobDetails from "./views/job/Detail";
//Lib
import Cookie, { isLoggedIn } from "./lib/Helper";
import PageService from "./services/PageService";
import Login from "./views/login";
import Page from "./views/page";
import DefaultLayout from "./views/page/defaultLayout";
import BlockDetail from "./views/page/details";

//Product

import EditBrandDetail from "./views/brand/detail";
import ProductBrand from "./views/brand/list";
import Product from "./views/product";
import ProductDetail from "./views/product/detail";
import productCategory from "./views/productCategory";
import EditProductCategory from "./views/productCategory/detail";
import ProductTags from "./views/tag";
import ProductTagsDetail from "./views/tag/detail";
import Transfer from "./views/transfer";
import TransferAdd from "./views/transfer/transferAdd";
//Store
import { PORTAL_TEMPLATE } from "./helpers/Support";
import { default as Account, default as vendor } from "./views/account";
import AccountDetails from "./views/account/Detail";
import Order from "./views/order";
import StoreDetail from "./views/store/detail";
import Stores from "./views/store/list";
// Vendor Products
import vendorProductList from "./views/vendorProduct";
import wishlist from "./views/wishlist/list";
// Vendor Products
import VendorProductDetail from "./views/vendorProduct/Detail";

import TaskDetails from "./views/recurring/detail";
import SalesSettlementReport from "./views/salesSettlementReport";
import StoreProductDetail from "./views/store/components/storeProductDetailPage";
import Ticket from "./views/ticket";
import TicketDetails from "./views/ticket/details";

import SupportPortalService from "./services/SupportPortalService";
import NewOrderPage from "./views/order/newOrderPage";
//Routes
import { Activity } from "./views/activity";
import ActivityDetail from "./views/activity/detail";
import EditProfile from "./views/userProfile/editProfile";

import SetPassword from "./views/forgotPassword/setPassword";

//Nav List
import { getAccountNavList } from "./nav/account";
import { getAdminNavList } from "./nav/admin";
import { getPortalNavList } from "./nav/defaultPortal";
import { getJobsNavList } from "./nav/job";
import { getPagesNavList } from "./nav/page";
import { getProjectsNavList } from "./nav/projects";
import { getStoreNavList } from "./nav/store";
import { getSupportPortalNavList } from "./nav/supportPortal";
import AccountDashboard from "./views/dashboard/account";
import AdminDashboard from "./views/dashboard/admin";
import JobsDashboard from "./views/dashboard/jobs";
import StoreDashboard from "./views/dashboard/store";
import SupportPortalDashboard from "./views/dashboard/supportPortal";

import AdminPortalSetting from "./views/country";
import CountryDetail from "./views/country/Detail";
import PaymentAccount from "./views/paymentAccount";
import PaymentAccountDetail from "./views/paymentAccount/detail";
import SaleSettlement from "./views/saleSettlement";
import SaleSettlementDetail from "./views/saleSettlement/detail";
import SchedulerJob from "./views/schedulerJob";
import SystemLog from "./views/systemLog";

import StockEntry from "./views/stockEntry";
import StockEntryDetails from "./views/stockEntry/stockEntryDetail";
import StockEntryDetailPage from "./views/stockEntry/stockEntryDetailPage";

import { getPeopleNavList } from "./nav/people";
import PeopleDashboard from "./views/dashboard/people";

//StoreProduct
import OrderProducts from "./views/orderProducts";
//Accounts
import AccountEntry from "./views/accountEntry";
import AccountEntryDetails from "./views/accountEntry/details";
import AttendanceDetail from "./views/attendance/detail";
import AttendanceSummaryReport from "./views/attendanceSummaryReport/list";
import BillListPage from "./views/bill";
import BillDetail from "./views/bill/detail";
import DeviceInfo from "./views/device info";
import fine from "./views/fine";
import FineDetail from "./views/fine/detail";
import orderProductGraphReport from "./views/orderProductGraphReport/index";
import orderSummaryReport from "./views/orderSummaryReport/index";
import PageDetail from "./views/page/detail";
import PaymentDetail from "./views/payment/detail";
import PaymentListPage from "./views/payment/list";
import Project from "./views/project";
import ProjectDetail from "./views/project/projectDetail";
import purchaseOrder from "./views/purchaseOrder/index";
import purchaseOrderDetailPage from "./views/purchaseOrder/purchaseOrderDetailsPage";
import purchaseProductReport from "./views/purchaseProductReport";
import ReportList from "./views/report/list";
import SalaryForm from "./views/salary/components/salaryForm";
import SalaryDetail from "./views/salary/detail";
import salaryList from "./views/salary/list";
import Sprint from "./views/sprint";
import sprintDetail from "./views/sprint/SprintDetail";
import statusList from "./views/status";
import statusDetail from "./views/status/detail";
import stockReport from "./views/stockReport/index";
import storeProductNoOrderReport from "./views/storeProductNoOrderReport";
import storeProductNoStockReport from "./views/storeProductNoStockReport";
import storeProductReport from "./views/storeProductReport/list";
import stockProductNegativeStockReport from "./views/stockProductNegativeStockReport/list";
import TransferDetail from "./views/transfer/transferDetail";
import TransferReportList from "./views/transferReport";

import Message from "./views/message";
import TicketTypeDetail from "./views/project/components/ticketTypeDetail";
import purchaseSummaryReport from "./views/purchaseSummaryReport";
import DetailSchedulerModal from "./views/schedulerJob/detail";

import PurchaseRecommendationReport from "./views/purchaseRecommendationReport";
import Replenish from "./views/replenish";
import DashboardTicket from "./views/ticket/dashboardTicket";
import Visitor from "./views/visitor";
import VisitorDetail from "./views/visitor/detail";

import AccountEntryReportList from "./views/accountEntryReport";
import accountEntryList from "./views/accountEntryReport/accountEntryReports";
import Category from "./views/category";
import orderReportUserWise from "./views/orderReportUserWise";
import orderSalesSettlementDiscrepancyReport from "./views/orderSalesSettlementDiscrepancyReport/index";
import peoplesReportList from "./views/peoplereport /list";
import ReplenishmentProduct from "./views/replenish/ReplenishmentProduct";
import TagDetail from "./views/tag/components/tagList";
import TrainingList from "./views/training";
import TrainingDetailPage from "./views/training/detail";
import UserFormList from "./views/user/components/userSalaryForm";

import EcommLayOut from "./components/layout/ecommLayout";
import { getMydashboardNavList } from "./nav/myDashboard";
import Integrations from "./views/Integrations";
import SlackPage from "./views/Integrations/components/SlackPage";
import WhatsApp from "./views/Integrations/components/WhatsApp";
import SalesGstReport from "./views/SalesGstReport";
import AttendanceReport from "./views/attendanceReport/list";
import candidate from "./views/candidate";
import CandidateDetail from "./views/candidate/detail";
import EcommHomePage from "./views/homePage";
import EcommSignUpPage from "./views/ecomm/signUpPage";
import Inspection from "./views/inspection";
import InspectionFormDetail from "./views/inspection/InspectionForm";
import MyDashboard from "./views/myDashboard";
import PurchaseGstReport from "./views/purchaseGstReport";
import RecurringTask from "./views/recurring";
import UserRoleDetails from "./views/setting/UserRoleDetails";
import UserRole from "./views/setting/UserRoleList";
import Notification from "./views/setting/components/Notification";
import TimeSheetListPage from "./views/timeSheet";
import TimeSheetDetailPage from "./views/timeSheet/detailPage";
import ProductList from "./views/ecomm/product";
import InspectionSetting from "./views/inspectionSetting/detail";
import LeadListPage from "./views/lead";
import MarketingDashboard from "./views/dashboard/marketing";
import { getMarketingNavList } from "./nav/marketing";
import leadDetail from "./views/lead/detail";
import TicketSearch from "./views/ticketSearch";
import StockEntryReport from "./views/stockEntryReport";
import AttendanceList from "./views/attendance/list";
import GatePass from "./views/gatePass";
import GatePassDetail from "./views/gatePass/detail";
import CategoryDetail from "./views/loyalty/detail";
import { getCompanySettings } from "./services/SettingService";
import { Local } from "./helpers/LocalStorage";
import LocalStorage from "./lib/LocalStorage";
import orderCancelledReport from "./views/orderCancelledReport";
import orderProductCancelledReport from "./views/orderProductCancelledReport";
import locationUserAllocation from "./views/locationUserAllocation";
import replenishReportPage from "./views/replenishReport";
import attendanceReport from "./views/attendanceReport/list";
import fineReport from "./views/fineReport/list";
import MobileApp from "./views/mobileApp";
import SalesCoinReport from "./views/salesCoinReport";
import RecurringActivite from "./views/recurringActivitiy";
import activiteDetailPage from "./views/recurringActivitiy/detailPage";
import OrderReport from "./views/orderReport";
import PurchaseReport from "./views/purchaseReport";
import PageNotFound from "./components/PageNotFound";
import { getRedirectUrl } from "./lib/Url";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portalName: "",
      template: "",
      blockList: [],
      isUrlExist: false,
      settings: []
    };
  }
  bodyClass(authenticated) {
    if (!authenticated) {
      document.body.classList.remove("loggedin-layout");
    } else {
      document.body.classList.add("loggedin-layout");
    }
  }

  componentDidMount() {
    this.bodyClass(Cookie.get(COOKIE_SESSION_TOKEN));
    this.getPortalName();
    this.getSettings();
    this.userPermission();
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath === "/admin" && isLoggedIn()) {
      window.location.replace(`/admin/dashboard`);
    }
  }

  userPermission = async () => { };

  componentDidUpdate() {
    this.bodyClass(Cookie.get(COOKIE_SESSION_TOKEN));
  }

  componentWillUnmount() {
    this.bodyClass(Cookie.get(COOKIE_SESSION_TOKEN));
  }

  getPortalName = async () => {
    const baseUrl = window.location.origin;
    //Get Portal Name By Base Url
    const portalName = await SupportPortalService.getPortalNameByBaseUrl(
      baseUrl
    );

    //Get Template By Base Url
    const template = await SupportPortalService.getTemplateByBaseUrl(baseUrl);

    //Get Page List

    let portal_name = portalName && portalName.replace(/ /g, "").toLowerCase();

    const pathName = window.location.pathname;

    //Check if pathName is exist in Page List
    let routeName = pathName.split("/");

    this.setState({
      portalName: portal_name,
      template: template
    });
    //Get components by page URL
    const lists = await PageService.getBlockByPageUrl(routeName[1]);
    this.setState({ blockList: lists });
  };

  customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    this.props.history.push("/login");
  };

  getSettings = async () => {
    const settingData = await LocalStorage.get(
      Local.THEME,
      (value) => {
        return { settings: value };
      },
      async () => {
        return { settings: await getCompanySettings() };
      }
    );

    this.setState({ settings: settingData });
  };

  render() {
    const { portalName, template, isUrlExist, blockList, settings } = this.state;

    let pathName = window.location.pathname;
    let routeName = pathName.split("/");

    const currentPath = window.location.pathname + window.location.search;

    let redirectUrl = getRedirectUrl()
    //Public Page
    if (currentPath == "/" && template) {
      let url =
        template == PORTAL_TEMPLATE.ADMIN
          ? Cookie.get(COOKIE_SESSION_TOKEN)
            ? "/mydashboard"
            : redirectUrl ? `/login?redirect=${redirectUrl}` : "/login"
          : template == PORTAL_TEMPLATE.TRACKER
            ? "/login"
            : "/home";

      const startPageUrl = url;
      window.location.replace(startPageUrl);
    }

    return (
      <div>
        {/* Template Based Layout */}

        {/* {template === PORTAL_TEMPLATE.THIDIFF_WEBSITE &&
          getThidiffWebsiteRoutes(settings)} */}
        {/* {template === PORTAL_TEMPLATE.AB_MINI_STORE &&
          getEcommRoutes(settings)} */}
        {/* {template === PORTAL_TEMPLATE.THINK_JOBS &&
          getShareMyChargerRoutes(settings)} */}

        {template === PORTAL_TEMPLATE.ECOMM && getEcommRoutes(settings)}

        {template === PORTAL_TEMPLATE.ADMIN &&
          getAdminRoutes(
            portalName,
            pathName,
            settings,
            isUrlExist,
            blockList,
            routeName
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchSettings }, dispatch)
  };
}

function getEcommRoutes(settings) {
  return (
    <>
      <MyProvider>
        <div className="routeSection">
          <Router history={history}>
            <Switch>
              <Route exact path="/"></Route>
              <EcommLayOut
                exact
                name="BookMyWaterCan"
                path="/home"
                component={EcommHomePage}
                history={history}
                settings={settings}
              />
              <EcommLayOut
                exact
                name="EcommSignUpPage"
                path="/signup"
                component={EcommSignUpPage}
                settings={settings}
              />
              <EcommLayOut
                exact
                name="EcommLoginPage"
                path="/login"
                component={Login}
                settings={settings}
              />
              <EcommLayOut
                exact
                name="Dashboard"
                path="/mydashboard"
                component={Dashboard}
                settings={settings}
              />
              <EcommLayOut
                exact
                name="Product"
                path="/category/:name"
                component={ProductList}
                settings={settings}
              />
            </Switch>
          </Router>
        </div>
      </MyProvider>
    </>
  );
}

//Admin Routes
function getAdminRoutes(
  portalName,
  pathName,
  settings,
  isUrlExist,
  blockList,
  routeName
) {
  return (
    <div>
      <MyProvider>
        <div className="routeSection">
          <Router history={history}>
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route exact path="/">
                {" "}
              </Route>
              {portalName == commonConstant.PORTAL_SHARE_MY_CHARGER &&
                routeName[1] != "admin" &&
                isUrlExist && (
                  <>
                    <DefaultLayout
                      pathName={pathName}
                      settings={settings}
                      blockList={blockList}
                    />
                  </>
                )}

              <PublicLayout
                exact
                name="company SignUp"
                path="/company-signup"
                component={companySignup}
                settings={settings}
              />
              <PublicLayout
                exact
                name="login"
                path="/login"
                component={Login}
                settings={settings}
              />
               <PublicLayout
                exact
                name="PageNotFound"
                path="/page-not-found"
                component={PageNotFound}
                settings={settings}
              />
              <PublicLayout
                exact
                name="forgot Password"
                path="/forgot-password"
                component={ForgotPassword}
                settings={settings}
              />
              <PublicLayout
                exact
                name="Set Password"
                path="/set-password"
                component={SetPassword}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Product Detail"
                path={["/product/:tab", "/product/:tab/:subtab"]}
                component={ProductDetail}
                settings={settings}
                navList={getStoreNavList}
              />
              <AdminLayout
                exact
                name="Message"
                path={"/message"}
                component={Message}
                settings={settings}
                navList={getStoreNavList}
              />

              <AdminLayout
                exact
                name="Product Tag Detail"
                path={["/tags/detail/:id", "/tags/detail/:tab/:subtab"]}
                navList={getAdminNavList}
                settings={settings}
                component={ProductTagsDetail}
              />
              <AdminLayout
                exact
                name="Store Detail"
                path={["/location/:tab", "/location/:tab/:subtab"]}
                navList={getStoreNavList}
                component={StoreDetail}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Jobs"
                path="/jobs/jobslist"
                component={Jobs}
                navList={getJobsNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Products"
                path="/products"
                component={Product}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Customers"
                path="/customers"
                component={Account}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Customers Detail"
                path={["/customers/:tab", "/customers/:tab/:subtab"]}
                component={AccountDetails}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Dashboard"
                path={"/job/dashboard"}
                component={JobsDashboard}
                navList={getJobsNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Candidate"
                path={"/jobs/candidate"}
                component={candidate}
                navList={getJobsNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Candidate"
                path={"/jobs/candidate/:id"}
                component={CandidateDetail}
                navList={getJobsNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="My Dashboard"
                path={"/mydashboard"}
                component={MyDashboard}
                navList={getMydashboardNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Job Detail"
                path={"/job/detail/:id"}
                component={JobDetails}
                navList={getJobsNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Vendor"
                path="/vendor"
                component={Account}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Account"
                path="/accounts"
                component={Account}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Orders"
                path="/orders"
                component={Order}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Delivery Orders"
                path="/deliveryOrders"
                component={Order}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Delivery Order Details"
                path="/location/deliveryOrders/details"
                component={NewOrderPage}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Details"
                path="/location/orders/details"
                component={NewOrderPage}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Details"
                path="/order/:id"
                navList={getStoreNavList}
                settings={settings}
                component={NewOrderPage}
              />
              <AdminLayout
                exact
                name="Delivery Order Details"
                path="/deliveryOrder/:id"
                navList={getStoreNavList}
                settings={settings}
                component={NewOrderPage}
              />
              <AdminLayout
                exact
                name="Category"
                path="/categories"
                component={productCategory}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Product Category Details"
                path="/category/:id"
                component={EditProductCategory}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Brand Details"
                path="/brands/:id"
                navList={getStoreNavList}
                settings={settings}
                component={EditBrandDetail}
              />
              <AdminLayout
                exact
                name="category Details"
                path="/admin/settings/loyalty/:id"
                navList={getAdminNavList}
                settings={settings}
                component={CategoryDetail}
              />
              <AdminLayout
                exact
                name="Product Category Detail"
                path="/categories/detail/:id"
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Brand"
                path="/brands"
                component={ProductBrand}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Transfer"
                path="/transfers"
                component={Transfer}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Location"
                path="/locationDashboard"
                component={StoreDashboard}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="fine"
                path="/fine"
                component={fine}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Location"
                path="/location"
                component={Stores}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="visitor"
                path="/visitor"
                component={Visitor}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="visitor"
                path="/visitor/:id"
                component={VisitorDetail}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="gatePass"
                path="/gatePass"
                component={GatePass}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="gatePass"
                path="/gatePass/:id"
                component={GatePassDetail}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="FIne Details"
                path="/fine/:id"
                component={FineDetail}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Product Tags"
                path="/tags"
                component={ProductTags}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Product Tags"
                path="/tags/details/:id"
                component={TagDetail}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="dashboard"
                path="/dashboard"
                component={Dashboard}
                navList={getPortalNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Support Portal"
                path="/supportPortal/dashboard"
                component={SupportPortalDashboard}
                navList={getSupportPortalNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="vendor"
                path="/vendor"
                component={vendor}
                navList={getPortalNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Supplier Details"
                path="/vendor/:id"
                component={AccountDetails}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Account Details"
                path="/accounts/:id"
                component={AccountDetails}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="setting"
                path={[
                  "/setting/:tab",
                  "/setting/:tab/:subtab",
                  "/setting/:tab/:subtab/:id"
                ]}
                component={Setting}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Company"
                path="/supportPortal/company/detail/:id"
                component={Details}
                navList={getSupportPortalNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Company"
                path="/supportPortal/company"
                component={CompanyList}
                navList={getSupportPortalNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Admin Dashboard"
                path="/admin/dashboard"
                component={AdminDashboard}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Company Profile"
                path="/admin/companyProfile"
                component={CompanyProfile}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Company Profile"
                path="/admin/notification"
                component={Notification}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Company Profile"
                path="/admin/roles"
                component={UserRole}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="roles"
                path="/admin/roles/:id"
                component={UserRoleDetails}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Admin Theme"
                path="/admin/theme"
                component={Themes}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Admin Users"
                path="/users"
                component={UserList}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Admin Users"
                path="/user/:id"
                component={userDetail}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Attendance"
                path="/attendance"
                component={AttendanceList}
                navList={getPeopleNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Attendance"
                path="/attendance/:id"
                component={AttendanceDetail}
                navList={getPeopleNavList}
                settings={settings}
              />
              {/* <AdminLayout
                exact
                name="Admin Portal"
                path="/admin/dashboard/edit/:id"
                component={editPortal}
                navList={getAdminNavList}
                settings={settings}
              /> */}
              <AdminLayout
                exact
                name="Page"
                path="/pages/pagelist"
                component={Page}
                navList={getPagesNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Page"
                path="/pages/pagelist/detail/:id"
                navList={getPagesNavList}
                // component={PageBlockList}
                component={PageDetail}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Component Detail"
                path="/pages/pagelist/detail/:id/:section"
                navList={getPagesNavList}
                component={BlockDetail}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Edit-Profile"
                path="/edit/profile"
                component={EditProfile}
                navList={getPortalNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Media"
                path="/media"
                component={MediaList}
                navList={getAdminNavList}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Mobile App"
                path="/mobileapp"
                component={MobileApp}
                navList={getAdminNavList}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Media Detail"
                path="/media/detail/:id"
                component={MediaDetail}
                navList={getAdminNavList}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="dashboard"
                path="/accountDashboard"
                component={AccountDashboard}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="dashboard"
                path="/people/dashboard"
                component={PeopleDashboard}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Bills"
                path="/purchases"
                component={Bill}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Bills"
                path={["/purchase/:tab", "/purchase/:tab/:subtab"]}
                component={BillDetails}
                navList={getStoreNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Sale Settlement"
                path="/salesettlement"
                component={SaleSettlement}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="wishlist"
                path="/wishlist"
                component={wishlist}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Sale Settlement"
                path="/SaleSettlement/:id"
                component={SaleSettlementDetail}
                navList={getStoreNavList}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="PaymentAccount"
                path="/paymentAccount"
                component={PaymentAccount}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="PaymentAccount"
                path="/paymentAccount/detail"
                component={PaymentAccountDetail}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Account Entry"
                path="/accountEntry"
                component={AccountEntry}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Account Entry"
                path="/accountEntry/details/:id"
                component={AccountEntryDetails}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Bills"
                path={"/purchase/new"}
                component={AddBill}
                navList={getStoreNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Admin Activity"
                path="/activity"
                component={Activity}
                navList={getPeopleNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Admin Activity"
                path="/activity/detail/:id"
                component={ActivityDetail}
                navList={getPeopleNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Ceneficiary"
                path="/category"
                component={Category}
                navList={getAccountNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Account Entry Report"
                path="/accountReports"
                component={accountEntryList}
                navList={getAccountNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Account Entry Report"
                path="/accountReports/AccountEntryReport"
                component={AccountEntryReportList}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Sales GST Report"
                path="/accountReports/SalesGstReport"
                component={SalesGstReport}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Purchase GST Report"
                path="/accountReports/PurchaseGstReport"
                component={PurchaseGstReport}
                navList={getAccountNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Bill"
                path="/bill"
                component={BillListPage}
                navList={getAccountNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Bill Detail"
                path="/bill/detail/:id"
                component={BillDetail}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Sales Settlement Report"
                path="/salesSettlementReport"
                navList={getStoreNavList}
                component={SalesSettlementReport}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Purchase Vendor Wise Report"
                path="/purchaseSummaryReport"
                navList={getStoreNavList}
                component={purchaseSummaryReport}
                settings={settings}
              />
                <AdminLayout
                exact
                name="Purchase Report"
                path="/purchaseReport"
                navList={getStoreNavList}
                component={PurchaseReport}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Ticket"
                path="/ticket"
                showProjectSelector
                navList={getProjectsNavList}
                component={Ticket}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Ticket Search"
                path="/ticketSearch"
                navList={getProjectsNavList}
                component={TicketSearch}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Recurring Task"
                path="/recurringTask"
                navList={getAdminNavList}
                component={RecurringTask}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Recurring Activites"
                path="/recurringActivity"
                navList={getAdminNavList}
                component={RecurringActivite}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Ticket"
                path="/dashboard/ticket"
                showProjectSelector
                navList={getProjectsNavList}
                component={DashboardTicket}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Projects"
                path="/Project"
                navList={getAdminNavList}
                component={Project}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Projects"
                path="/Project/:id"
                showProjectSelector
                navList={getProjectsNavList}
                component={ProjectDetail}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="projects"
                path="/project/:id/:typeId"
                showProjectSelector
                navList={getProjectsNavList}
                component={TicketTypeDetail}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Sprint"
                path="/sprint"
                showProjectSelector
                navList={getProjectsNavList}
                component={Sprint}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Sprint"
                path="/sprint/:id"
                navList={getProjectsNavList}
                showProjectSelector
                component={sprintDetail}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Ticket"
                path="/ticket/:project/:id"
                navList={getProjectsNavList}
                component={TicketDetails}
                settings={settings}
                showProjectSelector
                history={history}
              />
              <AdminLayout
                exact
                name="recurringTask"
                path="/recurringTask/details/:id"
                navList={getAdminNavList}
                component={TaskDetails}
                settings={settings}
                history={history}
              />
               <AdminLayout
                exact
                name="recurringActivity"
                path="/recurringActivity/details/:id"
                navList={getAdminNavList}
                component={activiteDetailPage}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Order Products"
                path="/orderProductReport"
                navList={getStoreNavList}
                component={OrderProducts}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Products"
                path="/order/products/details/:id"
                navList={getStoreNavList}
                component={OrderProducts}
                settings={settings}
              />

              <AdminLayout
                exact
                name="System Logs"
                path="/systemLogs"
                component={SystemLog}
                navList={getAdminNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Device Info"
                path="/deviceInfo"
                component={DeviceInfo}
                navList={getAdminNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Vendor Product List"
                path="/vendor/products"
                component={vendorProductList}
                settings={settings}
                navList={getStoreNavList}
              />

              <AdminLayout
                exact
                name="Vendor product Detail"
                path="/vendor/product/detail/:id"
                component={VendorProductDetail}
                settings={settings}
                navList={getStoreNavList}
              />

              <AdminLayout
                exact
                name="Scheduler Jobs"
                path="/schedulerJobs"
                component={SchedulerJob}
                navList={getAdminNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Scheduler Jobs Detail"
                path="/schedulerJobs/detail/:id"
                component={DetailSchedulerModal}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Settings"
                path="/admin/settings"
                component={AdminPortalSetting}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Country Detail"
                path="/admin/settings/country/:id"
                component={CountryDetail}
                navList={getAdminNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Statues Detail"
                path="/setting/Statues/:id"
                component={statusList}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Statues Detail"
                path="/setting/Statues/:name/:id"
                component={statusDetail}
                navList={getAdminNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Stock Entry"
                path="/stockEntry"
                component={StockEntry}
                navList={getStoreNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Stock Entry Add Page"
                path="/location/stockEntry/add/:storeId/:stockEntryId"
                component={StockEntryDetailPage}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Stock Entry Detail Page"
                path="/stockEntry/:stockEntryId"
                component={StockEntryDetails}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Location Product Detail"
                path={["/location/product/detail/:id"]}
                navList={getStoreNavList}
                component={StoreProductDetail}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Inventory"
                path={["/transfer/add/:fromLocationId/:toLocationId/:id"]}
                component={TransferAdd}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Inventory"
                path={["/transfer/:id"]}
                component={TransferDetail}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="AttendanceReport"
                path="/attendanceSummaryReport"
                component={AttendanceSummaryReport}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Attendance Report"
                path="/attendanceReport"
                component={attendanceReport}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Attendance Report"
                path="/fineReport"
                component={fineReport}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Store Product Report"
                path="/storeProductReport"
                component={storeProductReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Store Product Negative Stock Report"
                path="/stockProductNegativeStockReport"
                component={stockProductNegativeStockReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Salary List"
                path="/salary"
                component={salaryList}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Training"
                path="/training"
                component={TrainingList}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Training Detail"
                path="/training/:id"
                component={TrainingDetailPage}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Salary Form"
                path="/salary/add"
                component={SalaryForm}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="User Salary Form"
                path="/user/salary/add"
                component={UserFormList}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="User Salary Form"
                path="/user/salary/detail/:id"
                component={UserFormList}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Purchase Order"
                path="/purchaseorders"
                component={purchaseOrder}
                navList={getStoreNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Salary Detail"
                path="/salary/detail/:id"
                component={SalaryDetail}
                navList={getAccountNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Purchase Order Detail Page"
                path="/purchaseOrder/detail/:purchaseOrderId"
                component={purchaseOrderDetailPage}
                navList={getStoreNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Status"
                path="/Status"
                component={statusList}
                navList={getAdminNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="InsepectionSetting"
                path="/customField/detail/:id"
                settings={settings}
                component={InspectionSetting}
                navList={getAdminNavList}
              />
              <AdminLayout
                exact
                name="Status Detail"
                path={["/Status/:id"]}
                navList={getAdminNavList}
                settings={settings}
                component={statusDetail}
              />
              <AdminLayout
                exact
                name="Payment"
                path="/payment"
                component={PaymentListPage}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Payment Detail"
                path="/payment/detail/:id"
                component={PaymentDetail}
                navList={getAccountNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Transfer Report"
                path="/transferProductReport"
                component={TransferReportList}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Product Report"
                path="/purchaseProductReport"
                component={purchaseProductReport}
                navList={getStoreNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Replenish"
                path="/replenish"
                component={Replenish}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Replenishment Products"
                path="/replenishmentProduct"
                component={ReplenishmentProduct}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Report"
                path="/report"
                component={ReportList}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Report"
                path="/reports"
                component={peoplesReportList}
                navList={getPeopleNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Stock Report"
                path="/stockReport"
                component={stockReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Stock Entry Report"
                path="/stockEntryReport"
                component={StockEntryReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Report"
                path="/orderSummaryReport"
                component={orderSummaryReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Sales Executive Report"
                path="/orderReportUserWise"
                component={orderReportUserWise}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Cancelled Report"
                path="/orderCancelledReport"
                component={orderCancelledReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Product Cancelled Report"
                path="/orderProductCancelledReport"
                component={orderProductCancelledReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Replenish Report"
                path="/replenishReport"
                component={replenishReportPage}
                navList={getStoreNavList}
                settings={settings}
              />
               <AdminLayout
                exact
                name="Sales Coins Report"
                path="/salesCoinReport"
                component={SalesCoinReport}
                navList={getStoreNavList}
                settings={settings}
              />
                <AdminLayout
                exact
                name="Order Report"
                path="/orderReport"
                component={OrderReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order and Sales Settlement Discrepancy Report"
                path="/orderSalesSettlementDiscrepancyReport"
                component={orderSalesSettlementDiscrepancyReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Order Product Graph Report"
                path="/orderProductGraphReport"
                component={orderProductGraphReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Store Product - No Order Report"
                path="/storeProductNoOrderReport"
                component={storeProductNoOrderReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Store Product - No Stock Report"
                path="/storeProductNoStockReport"
                component={storeProductNoStockReport}
                navList={getStoreNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="Purchase: Recommendation Report"
                path="/purchaseRecommendationReport"
                component={PurchaseRecommendationReport}
                navList={getStoreNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Inspection"
                path={["/Inspections"]}
                navList={getStoreNavList}
                settings={settings}
                component={Inspection}
              />

              <AdminLayout
                exact
                name="CustomFormDataDetail"
                path={["/Inspections/detail/:id"]}
                navList={getStoreNavList}
                settings={settings}
                component={InspectionFormDetail}
              />

              <AdminLayout
                exact
                name="Timesheet"
                path="/timesheet"
                navList={getPeopleNavList}
                component={TimeSheetListPage}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="TimesheetDetail"
                path="/timesheet/:id"
                navList={getPeopleNavList}
                component={TimeSheetDetailPage}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Integrations"
                path="/integrations/Chat"
                navList={getAdminNavList}
                component={Integrations}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Integrations Slack"
                path="/integrations/Chat/Slack"
                navList={getAdminNavList}
                component={SlackPage}
                settings={settings}
                history={history}
              />
              <AdminLayout
                exact
                name="Integrations WhatsApp"
                path="/integrations/Chat/WhatsApp"
                navList={getAdminNavList}
                component={WhatsApp}
                settings={settings}
                history={history}
              />

              <AdminLayout
                exact
                name="leads"
                path="/leads"
                component={LeadListPage}
                navList={getMarketingNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="Dashboard"
                path={"/marketing/dashboard"}
                component={MarketingDashboard}
                navList={getMarketingNavList}
                settings={settings}
              />

              <AdminLayout
                exact
                name="leadsDetail"
                path="/lead/:id"
                component={leadDetail}
                navList={getMarketingNavList}
                settings={settings}
              />
              <AdminLayout
                exact
                name="User Allocation"
                path="/locationUserAllocation"
                component={locationUserAllocation}
                navList={getPeopleNavList}
                settings={settings}
              />

              {/* end */}
            </Switch>
          </Router>
        </div>
      </MyProvider>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
