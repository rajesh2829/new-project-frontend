const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const appApi = (path) => `${REACT_APP_API_URL}/${path}`;

// API call routes
export const endpoints = () => ({
  // User API Routes
  userAPI: appApi("user/v1"),
  userRoleAPI: appApi("v1/userRole"),
  userPermissionAPI: appApi("v1/user/permission"),
  storeUserAPI: appApi("v1/storeUser"),
  userRolePermissionAPI: appApi("v1/user/role/permission"),
  activityAPI: appApi("activity/v1"),
  userAvatarUpdate: appApi("v1/user/updateAvatar"),
  activityTypeApi: appApi("v1/activityType"),
  fineApi: appApi("v1/fine"),
  userDeviceInfo: appApi("v1/userDeviceInfo"),
  // Admin API Routes
  attendanceAPI: appApi("attendance/v1"),
  companyAPI: appApi("v1/company"),
  portalAPI: appApi("v1/portal"),
  settingAPI: appApi("v1/setting"),
  companyUserAPI: appApi("v1/companyUser"),
  userEmploymentAPI: appApi("v1/userEmployment"),
  pageAPI: appApi("v1/page"),
  pageBlockAPI: appApi("v1/pageBlock"),
  pageBlockAttributeAPI: appApi("v1/block/attribute"),
  jobAPI: appApi("jobs/v1"),
  mediaAPI: appApi("v1/media"),
  productImport: "v1/product/import",
  tracketProjectAPI: appApi("/v1/projectList"),

  // Store API Routes
  productAPI: appApi("v1/product"),
  customerAPI: appApi("v1/customer"),
  accountAPI: appApi("v1/account"),
  brandAPI: appApi("v1/product/brand"),
  inventoryAPI: appApi("v1/inventory"),
  categoryAPI: appApi("v1/product/category"),
  tagApi: appApi("v1/tagApi"),
  locationAPI: appApi("v1/location"),
  billAPI: appApi("v1/accounts/bill"),
  storeProductAPI: appApi("v1/storeProduct"),
  vendorProductAPI: appApi("v1/vendorProduct"),
  itemAPI: appApi("accounts/purchase/v1"),
  orderAPI: appApi("v1/order"),
  orderProductAPI: appApi("v1/orderProduct"),
  storeDasboardAPI: appApi("v1/dashboardRoute"),
  jobDasboardAPI: appApi("v1/dashboardRoute"),
  ticketsAPI: appApi("v1/tickets"),
  salesSettlementReportAPI: appApi("v1/salesSettlementReport"),

  // Account API Routes
  purchaseAPI: appApi("v1/purchase"),
  purchaseProductAPI: appApi("v1/purchaseProduct"),
  saleSettlementAPI: appApi("v1/saleSettlement"),
  purchaseMediaAPI: appApi("purchaseMedia/v1"),
  ticketsMediaAPI: appApi("ticketsMedia/v1"),
  paymentAPI: appApi("v1/payment"),
  // Drive API Routes
  docsAPI: appApi(`v1/docs`),
  // Job API Routes
  JobApi: appApi("jobs/v1"),
  projectAPI: appApi("v1/project"),

  //country list api
  countryAPI: appApi("v1/country"),

  //state api
  stateAPI: appApi("v1/state"),

  systemLogAPI: appApi("v1/systemLog"),

  vendorProduct: "v1/vendorProduct",

  vendorProductImport: "v1/vendorProduct/import",

  sync: "/v1/sync",

  schedulerJobAPI: appApi("schedular/job/v1"),

  productBrand: "v1/product/brand",

  productCategory: "v1/product/category",

  publicAPI: "/public/detail/v1",

  slackAPI: appApi("v1/slack"),

  stockEntry: appApi("v1/stockEntry"),
  stockProductEntry: appApi("v1/stockProductEntry"),
  wishlistAPI: appApi("v1/wishlist"),

  saleProduct: appApi("v1/saleProduct"),

  // Account api
  paymentAccountAPI: appApi("v1/paymentAccount"),

  loginAPI: appApi("user/v1/login"),

  //shift API

  shiftAPI: appApi("v1/shift"),

  sprintAPI: appApi("v1/sprint"),

  transferApi: appApi("v1/transfer"),

  transferProductApi: appApi("v1/transfer/Product"),

  //Account Entry Api
  accountEntryAPI: appApi("accountEntry/v1"),
  projectLabelAPI: appApi("project/label/v1"),

  ticketAPI: appApi("v1/ticket"),

  // Tag Type API
  tagTypeApi: appApi("v1/tagType"),

  stockReportAPI: appApi("v1/stockReport"),

  storeProductReportAPI: appApi("v1/storeProductReport"),
  storeProductNegativeStockReportAPI : appApi("v1/storeProductNegativeStockReport"),
  purchaseProductReportAPI: appApi("v1/purchaseProductReport"),
  //Salary Api
  salaryAPI: appApi("v1/salary"),

  // purchase Order API
  purchaseOrderAPI: appApi("v1/purchaseOrder"),
  TransferTypeApi: appApi("v1/transferType"),

  // Purchase Order Product API
  purchaseOrderProductAPI: appApi("v1/purchaseOrderProduct"),

  // statusApi
  statusAPI: appApi("v1/status"),

  // objectAPI
  objectAPI: appApi("v1/object/search"),

  addressAPI: appApi("v1/address"),
  // Contact API
  contactAPI: appApi("v1/contact"),
  messageAPI: appApi("v1/message"),
  productPriceAPI: appApi("v1/productPrice"),
  TransferTypeReasonAPI: appApi("v1/transferTypeReason"),
  orderSummaryReportAPI: appApi("v1/orderSummaryReport"),
  orderReportUserWiseAPI: appApi("v1/orderReportUserWise"),
  orderProductReportAPI: appApi("v1/orderProductReport"),
  purchaseSummaryReportAPI: appApi("v1/purchaseSummaryReport"),
  storeProductNoOrderReportAPI: appApi("v1/storeProductNoOrderReport"),
  storeProductNoStockReportAPI: appApi("v1/storeProductNoStockReport"),
  projectTicketTypeAPI: appApi("v1/projectTicketType"),
  candidate: appApi("candidate/v1"),
  loyaltyCategory : appApi("v1/loyaltyCategory"),
  accountLoyalty : appApi("v1/accountLoyalty"),
  replenish: appApi("v1/replenish"),
  purchaseRecommendationReportAPI: appApi(
    "v1/purchaseRecommendationReport"
  ),
  visitor: appApi("v1/visitor"),
  GatePassApi : appApi("v1/gatePass"),
  state: appApi("v1/state"),
  //UsertSalary Api
  UsersalaryAPI: appApi("v1/userSalary"),

  //Product Price
  productPrice: appApi("v1/productPrice"),
  TrainingAPI: appApi("v1/training"),

  // Account Entry Report API
  accountEntryReportAPI: appApi("v1/accountEntryReport"),
  orderSalesSettlementAPI: appApi("v1/orderSalesSettlementDiscrepancyReport"),

  customFieldAPI: appApi("v1/customField"),

  customFieldValue: appApi("v1/customFieldValue"),

  // Custom Form API
  inspectionAPI: appApi("v1/inspection"),
  RecurringTaskAPI: appApi("v1/recurringTask"),

  TimeSheetAPI: appApi("v1/timeSheet"),
  TimeSheetDetailAPI: appApi("v1/timeSheetDetail"),
  Comment: appApi("v1/comment"),
  DashboardAPI: appApi("v1/dashboard"),
  salesGstReportAPI: appApi("v1/salesGstReport"),
  purchaseGstReportAPI: appApi("v1/purchaseGstReport"),
  UserDeviceInfoApi: appApi("v1/userDeviceInfo"),
  TicketTest: appApi("v1/ticketTest"),
  taxApi: appApi("v1/tax"),
  ProjectSettingAPI: appApi("v1/projectSetting"),
  attendanceReportAPI: appApi("v1/attendanceReport"),
  fineReportAPI: appApi("v1/fineReport"),
  BookMyWaterCanApi: appApi("v1/bookMyWaterCan"),
  EcommCategory:appApi("v1/category"),
  LeadApi:appApi("v1/lead"),
  ProjectUserApi:appApi("v1/project/users"),
  stockEntryReportApi:appApi("v1/stockEntryReport"),
  MessageChannelApi:appApi("v1/messageChannel"),
  MessageChannelUserApi:appApi("v1/messageChannelUser"),
  channelMessageAPI: appApi("v1/channelMessage"),
  orderCancelledReportAPI: appApi("v1/orderCancelledReport"),
  orderProductCancelledReportAPI: appApi("v1/orderProductCancelledReport"),
  replenishReportAPI: appApi("v1/replenishReport"),
  userLocationAPI: appApi("v1/userLocation"),
  LocationUserAllocationAPI: appApi("v1/locationUserAllocation"),
  attendanceTypeAPI: appApi("v1/attendanceType"),
  salesCoinReportAPI: appApi("v1/salesCoinReport"),
  accountProductAPI: appApi("v1/accountProduct"),
  RecurringActivityAPI: appApi("v1/recurringActivity"),
  orderReportAPI: appApi("v1/orderReport"),
  PurchaseReportAPI: appApi("v1/purchaseReport"),

});
