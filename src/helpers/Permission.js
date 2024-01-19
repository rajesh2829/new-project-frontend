

class Permission {
  // Company Permissions
  static COMPANY_VIEW = "company_view";
  static COMPANY_ADD = "company_add";
  static COMPANY_EDIT = "company_edit";
  static COMPANY_DELETE = "company_delete";
//Accounts

static ACCOUNT_VIEW = "account_view";
static ACCOUNT_EDIT = "account_edit";
static  ACCOUNT_ADD = "account_add";
static ACCOUNT_DELETE = "account_delete"

  // Users
  static USER_VIEW = "user_view";
  static USER_ADD = "user_add";
  static USER_EDIT = "user_edit";
  static USER_DELETE = "user_delete";
  static USER_STATUS_UPDATE = "user_status_update";
  static USER_HISTORY_VIEW = "user_history_view"
  static USER_MANAGE_OTHERS = "user_manage_others";


  // Stock Entry
  static STOCK_ENTRY_VIEW = "stock_entry_view";
  static STOCK_ENTRY_ADD = "stock_entry_add";
  static STOCK_ENTRY_DELETE = "stock_entry_delete";
  static STOCK_ENTRY_STATUS = "stock_entry_status";
  static STOCK_ENTRY_MANAGE_OTHERS = "stock_entry_manage_others";
  static STOCK_ENTRY_HISTORY_VIEW = "stock_entry_history_view"

  // Stock Product Entry
  static STOCK_PRODUCT_ENTRY_VIEW = "stock_product_entry_view";
  static STOCK_PRODUCT_ENTRY_ADD = "stock_product_entry_Add";
  static STOCK_PRODUCT_ENTRY_EDIT = "stock_product_entry_edit";
  static STOCK_PRODUCT_ENTRY_DELETE = "stock_product_entry_delete";

  //Inspection View 
  static INSPECTION_VIEW = "inspection_view";

  //Report Menu 
  static REPORT_VIEW = "report_view";


  // PURCHASE Permissions
  static PURCHASE_VIEW = "purchase_view";
  static PURCHASE_ADD = "purchase_add";
  static PURCHASE_EDIT = "purchase_edit";
  static PURCHASE_DELETE = "purchase_delete";
  static PURCHASE_DUE_DATE_UPDATE = "purchase_due_date_update";
  static PURCHASE_STATUS_UPDATE = "purchase_status_update";
  static PURCHASE_MANAGE_OTHERS = "purchase_manage_others";


  static PURCHASE_ORDER_VIEW = "purchase_order_view";
  static PURCHASE_ORDER_ADD = "purchase_order_add";
  static PURCHASE_ORDER_EDIT = "purchase_order_edit";
  static PURCHASE_ORDER_DELETE = "purchase_order_delete";
  static PURCHASE_ORDER_STATUS_UPDATE = "purchase_order_status_update";
  static PURCHASE_ORDER_HISTORY_VIEW = "purchase_order_history_view"
  // Category Permissions
  static CATEGORY_VIEW = "category_view";
  static CATEGORY_ADD = "category_add";
  static CATEGORY_EDIT = "category_edit";
  static CATEGORY_DELETE = "category_delete";


  // SALE Permissions
  static SALE_SETTLEMENT_VIEW = "sale_settlement_view";
  static SALE_SETTLEMENT_ADD = "sale_settlement_add";
  static SALE_SETTLEMENT_EDIT = "sale_settlement_edit";
  static SALE_SETTLEMENT_DELETE = "sale_settlement_delete";
  static SALE_SETTLEMENT_STATUS_UPDATE = "sale_settlement_status_edit";
  static SALE_SETTLEMENT_STATUS = "sale_settlement_status";
  static SALE_SETTLEMENT_MANAGE_OTHERS = "sale_settlement_manage_others";
  static SALE_SETTLEMENT_HISTORY_VIEW = "sale_settlement_history_view"

  // Store Permissions
  static LOCATION_VIEW = "location_view";
  static LOCATION_ADD = "location_add";
  static LOCATION_EDIT = "location_edit";
  static LOCATION_DELETE = "location_delete";
  static LOCATION_STATUS_UPDATE = "location_status_edit";
  static LOCATION_HISTORY_VIEW = "location_history_view"

  //Bill Permission
  static BILL_VIEW = "bill_view";
  static BILL_ADD = "bill_add";
  static BILL_EDIT = "bill_edit";
  static BILL_DELETE = "bill_delete";
  static BILL_HISTORY_VIEW = "bill_history_view"
  static BILL_MANAGE_OTHERS = "bill_manage_others";

  // lead permission

  static LEADS_VIEW = "leads_view";
  static LEADS_ADD = "leads_add";
  static LEADS_EDIT = "leads_edit";
  static LEADS_DELETE = "leads_delete";
  static LEADS_MANAGE_OTHERS = "leads_manage_others";

  // Brand Permissions
  static BRAND_VIEW = "brand_view";
  static BRAND_ADD = "brand_add";
  static BRAND_EDIT = "brand_edit";
  static BRAND_DELETE = "brand_delete";
  static BRAND_STATUS_UPDATE = "brand_status_edit";

    // Bulk Order Permissions
    static BULK_ORDER_VIEW = "bulk_order_view";

  // Product Category Permissions
  static PRODUCT_CATEGORY_VIEW = "product_category_view";
  static PRODUCT_CATEGORY_ADD = "product_category_add";
  static PRODUCT_CATEGORY_EDIT = "product_category_edit";
  static PRODUCT_CATEGORY_DELETE = "product_category_delete";
  static PRODUCT_CATEGORY_UPDATE = "product_category_update";
  static PRODUCT_CATEGORY_HISTORY_VIEW = "product_category_history_view";
  // Product Permissions
  static PRODUCT_VIEW = "product_view";
  static PRODUCT_ADD = "product_add";
  static PRODUCT_EDIT = "product_edit";
  static PRODUCT_DELETE = "product_delete";
  static PRODUCT_UPDATE_STATUS = "product_update_status";
  static PRODUCT_BULK_UPDATE = "product_bulk_update";
  static PRODUCT_BULK_DELETE = "product_bulk_delete";
  static PRODUCT_PRICE_VIEW = "product_price_view";
  static PRODUCT_SYNC = "product_sync";
  static SYNC_FROM_VENDOR_URL = "sync_from_vendor_url";
  static PRODUCT_HISTORY_VIEW = "product_history_view";

  //Product Prcie
  static PRODUCT_PRICE_EDIT = "product_price_edit";
  static PRODUCT_PRICE_DELETE = "product_price_delete";

  // Tag Permissions
  static TAG_VIEW = "tag_view";
  static TAG_ADD = "tag_add";
  static TAG_EDIT = "tag_edit";
  static TAG_DELETE = "tag_delete";
  static TAG_STATUS_UPDATE = "tag_status_edit";

  // Customer Permissions
  static CUSTOMER_VIEW = "customer_view";
  static CUSTOMER_ADD = "customer_add";
  static CUSTOMER_EDIT = "customer_edit";
  static CUSTOMER_DELETE = "customer_delete";
  static CUSTOMER_IMPORT = "customer_import";
  static CUSTOMER_UPDATE_STATUS = "customer_update_status";

  // Country Permissions
  static COUNTRY_VIEW = "country_view";
  static COUNTRY_ADD = "country_add";
  static COUNTRY_EDIT = "country_edit";
  static COUNTRY_DELETE = "country_delete";

  //Device info status 

  static DEVICE_INFO_STATUS_UPDATE = "device_info_status_update"

  // Order Product Permissions
  static ORDER_PRODUCT_VIEW = "order_product_view";
  static ORDER_PRODUCT_ADD = "order_product_add";
  static ORDER_PRODUCT_EDIT = "order_product_edit";
  static ORDER_PRODUCT_DELETE = "order_product_delete";
  static ORDER_PRODUCT_CANCEL = "order_product_cancel";

  // Order Permissions
  static ORDER_VIEW = "order_view";
  static ORDER_ADD = "order_add";
  static ORDER_EDIT = "order_edit";
  static ORDER_DELETE = "order_delete";
  static ORDER_IMPORT = "order_import";
  static ORDER_MANAGE_OTHERS = "order_manage_others";
  static ORDER_TOTAL_VIEW = "order_total_view";
  static ORDER_CANCEL = "order_cancel";
  static ORDER_HISTORY_VIEW = "order_history_view"

  //Delivery Order
  static DELIVERY_ORDER_VIEW = "delivery_order_view";

  //Distribution

  static DISTRIBUTION_VIEW = "distribution_view"

  // Supplier Permissions
  static VENDOR_VIEW = "vendor_view";
  static VENDOR_ADD = "vendor_add";
  static VENDOR_EDIT = "vendor_edit";
  static VENDOR_DELETE = "vendor_delete";
  static VENDOR_STATUS_UPDATE = "vendor_status_edit";
  static VENDOR_HISTORY_VIEW = "vendor_history_view"

  // Vendor Product Permissions
  static SUPPLIER_PRODUCT_VIEW = "supplier_product_view";
  static SUPPLIER_PRODUCT_ADD = "supplier_product_add";
  static SUPPLIER_PRODUCT_EDIT = "supplier_product_edit";
  static SUPPLIER_PRODUCT_DELETE = "supplier_product_delete";
  static SUPPLIER_PRODUCT_BULK_DELETE = "supplier_product_bulk_delete";
  static SUPPLIER_PRODUCT_BULK_UPDATE_STATUS =
    "supplier_product_bulk_update_status";
  static SUPPLIER_PRODUCT_EXPORT_TO_PRODUCT =
    "supplier_product_export_to_product";
  static SUPPLIER_PRODUCT_IMPORT_VENDOR_PRODUCT =
    "supplier_product_import_vendor_product";
  static SUPPLIER_PRODUCT_SYNC_ALL_PRODUCTS =
    "supplier_product_sync_all_products";
  static SUPPLIER_PRODUCT_SYNC_PRODUCTS_FROM_VENDOR =
    "supplier_product_sync_products_from_vendor";
  static SUPPLIER_PRODUCT_UPDATE_IMPORT_STATUS =
    "supplier_product_update_import_status";

  // Feature Permission
  static FEATURE_VIEW = "feature_view";
  static FEATURE_ADD = "feature_add";
  static FEATURE_SAVE = "feature_save";

  // Feature Permission
  static MEDIA_VIEW = "media_view";

  //Mobile App Dashboard Menu
  static MOBILEAPP_DASHBOARD_MENU_DELIVERY = "mobileapp_dashboard_menu_delivery";
  static MOBILEAPP_DASHBOARD_MENU_DISTRIBUTION = "mobileapp_dashboard_menu_distribution";
  static MOBILEAPP_DASHBOARD_MENU_GEOFENCING = "mobileapp_dashboard_menu_geofencing";
  static MOBILEAPP_DASHBOARD_MENU_ORDER_SUMMARY_VIEW = "mobileapp_dashboard_menu_order_summary_view";
  static MOBILEAPP_DASHBOARD_MENU_ORDER = "mobileapp_dashboard_menu_order";
  static MOBILEAPP_DASHBOARD_MENU_INSPECTION = "mobileapp_dashboard_menu_inspection";
  static MOBILEAPP_DASHBOARD_MENU_MESSAGES = "mobileapp_dashboard_menu_messages";
  static MOBILEAPP_DASHBOARD_MENU_PRODUCT = "mobileapp_dashboard_menu_product";
  static MOBILEAPP_DASHBOARD_MENU_PURCHASE = "mobileapp_dashboard_menu_purchase";
  static MOBILEAPP_DASHBOARD_MENU_REPLENISH = "mobileapp_dashboard_menu_replenish";
  static MOBILEAPP_DASHBOARD_MENU_REPORTS = "mobileapp_dashboard_menu_reports";
  static MOBILEAPP_DASHBOARD_MENU_TICKET = "mobileapp_dashboard_menu_ticket";
  static MOBILEAPP_DASHBOARD_MENU_TRANSFER = "mobileapp_dashboard_menu_transfer";
  static MOBILEAPP_DASHBOARD_MENU_VISITOR = "mobileapp_dashboard_menu_visitor";





  // Scheduler Jobs Permission
  static SCHEDULER_JOBS_VIEW = "scheduler_view";
  static SCHEDULER_JOBS_ADD = "scheduler_add";
  static SCHEDULER_JOBS_EDIT = "scheduler_edit";
  static SCHEDULER_JOBS_DELETE = "scheduler_delete";
  static SCHEDULER_JOBS_LAST_EXECUTED_UPDATE = "scheduler_last_executed_update";
  static SCHEDULER_JOBS_HISTORY_VIEW = "scheduler_jobs_history_view"
  // System Logs Permission
  static SYSTEM_LOGS_VIEW = "system_logs_view";

  // Activity Type Permissions
  static ACTIVITY_TYPE_VIEW = "activity_type_view";
  static ACTIVITY_TYPE_ADD = "activity_type_add";
  static ACTIVITY_TYPE_EDIT = "activity_type_edit";
  static ACTIVITY_TYPE_DELETE = "activity_type_delete";

  // Account Entry Permissions
  static ACCOUNT_ENTRY_VIEW = "account_entry_view";
  static ACCOUNT_ENTRY_ADD = "account_entry_add";
  static ACCOUNT_ENTRY_EDIT = "account_entry_edit";
  static ACCOUNT_ENTRY_DELETE = "account_entry_delete";

  // Attendance Permissions
  static ATTENDANCE_VIEW = "attendance_view";
  static ATTENDANCE_ADD = "attendance_add";
  static ATTENDANCE_EDIT = "attendance_edit";
  static ATTENDANCE_DELETE = "attendance_delete";
  static ATTENDANCE_MANAGE_OTHERS = "attendance_manage_others";
  static TRANSFER_MANAGE_OTHERS = "transfer_manage_others";
  static USER_WEB_CHECKIN = "user_web_checkin"
  static USER_MOBILE_CHECKIN = "user_mobile_checkin"
  static ATTENDANCE_HISTORY_VIEW = "attendance_history_view"

  //Payment Account  Permissions
  static PAYMENT_ACCOUNT_VIEW = "payment_account_view";
  static PAYMENT_ACCOUNT_ADD = "payment_account_add";
  static PAYMENT_ACCOUNT_EDIT = "payment_account_edit";
  static PAYMENT_ACCOUNT_DELETE = "payment_account_delete";
  static PAYMENT_HISTORY_VIEW = "payment_history_view";

  // Attendance Summary Report Permissions
  static ATTENDANCE_SUMMARY_REPORT_VIEW = "attendance_report_view";

  // Transfer Permissions
  static TRANSFER_VIEW = "transfer_view";
  static TRANSFER_ADD = "transfer_add";
  static TRANSFER_EDIT = "transfer_edit";
  static TRANSFER_DELETE = "transfer_delete";
  static TRANSFER_STATUS = "transfer_status";
  static TRANSFER_HISTORY_VIEW = "transfer_history_view";

  // Transfer Product Permissions
  static TRANSFER_PRODUCT_ADD = "transfer_product_add";
  static TRANSFER_PRODUCT_EDIT = "transfer_product_edit";
  static TRANSFER_PRODUCT_DELETE = "transfer_product_delete";
  
  static PROJECT_EDIT = "project_edit"

  // Ticket Permission
  static TICKET_VIEW = "ticket_view";
  static TICKET_ADD = "ticket_add";
  static TICKET_EDIT = "ticket_edit";
  static TICKET_DELETE = "ticket_delete";
  static TICKET_MANAGE_OTHERS = "ticket_manage_others";
  static TICKET_HISTORY_VIEW = "ticket_history_view"

  //Fine Permision
  static FINE_VIEW = "fine_view";
  static FINE_ADD = "fine_add";
  static FINE_EDIT = "fine_edit";
  static FINE_DELETE = "fine_delete";
  static FINE_MANAGE_OTHERS = "fine_manage_others"
  static FINE_HISTORY_VIEW = "fine_history_view"

  //Wishlist Permission

  static WISHLIST_VIEW = "wishlist_view";
  static WISHLIST_ADD = "wishlist_add";
  static WISHLIST_EDIT = "wishlist_edit";
  static WISHLIST_DELETE = "wislist_delete";

  static ACTIVITY_VIEW = "activity_view";
  static ACTIVITY_ADD = "activity_add";
  static ACTIVITY_EDIT = "activity_edit";
  static ACTIVITY_DELETE = "activity_delete";

  //  Candidte Profile
  static CANDIDATE_VIEW = "candidate_view";
  static CANDIDATE_ADD = "candidate_add";
  static CANDIDATE_EDIT = "candidate_edit";
  static CANDIDATE_DELETE = "candidate_delete";
  static CANDIDATE_HISTORY_VIEW = "candidate_history_view"

  static SETTINGS_VIEW = "settings_view";

  //Admin Menu
  static ACCOUNTS_VIEW = "accounts_view";
  static JOB_VIEW = "job_view";
  static PAGES_VIEW = "pages_view";
  static PEOPLE_VIEW = "people_view";
  static PROJECT_VIEW = "project_view";
  static MARKETING_VIEW="marketing_view"


  static REPLENISHMENT_ADD = "replenishment_add";
  static REPLENISHMENT_VIEW = "replenishment_view";
  static REPLENISHMENT_EDIT = "replenishment_edit";
  static REPLENISHMENT_MANAGE_OTHERS = "replenishment_manage_others";

  static ADMIN_PORTAL_VIEW = "admin_portal_view";
  static SUPPORT_PORTAL_VIEW = "support_portal_view";

  //Order reports
  static ORDER_PRODUCT_GRAPH_REPORT_VIEW = "order_product_graph_report_view"
  static ORDER_PRODUCT_REPORT_VIEW = "order_product_report_view"
  static ORDER_REPORT_VIEW = "order_report_view"
  static ORDER_CANCELLED_REPORT_VIEW = "order_cancelled_report_view"
  static ORDER_PRODUCT_CANCELLED_REPORT_VIEW = "order_product_cancelled_report_view"
  

  // Purchase reports
  static PURCHASE_REPORT_VENDOR_WISE_VIEW = "purchase_report_vendor_wise_view"
  static PURCHASE_RECOMMENDATION_REPORT_VIEW = "purchase_recommendation_report_view"
  
  // purchase product report

  static PURCHASE_PRODUCT_REPORT_VIEW = "purchase_product_report_view"

  // sales report
  static SALES_SETTLEMENT_REPORT_VIEW = "sales_settelement_report_view"

  //stock report
  static STOCK_REPORT_VIEW = "stock_report_view"

  //store product report
  static STORE_PRODUCT_NO_ORDER_REPORT_VIEW = "store_product_no_order_report_view"
  static STORE_PRODUCT_NO_STOCK_REPORT_VIEW = "store_product_no_stock_report_view"
  static STORE_PRODUCT_STORE_PRODUCT_REPORT_VIEW = "store_product_stock_product_report_view"
  static STORE_PRODUCT_NEGATIVE_STOCK_REPORT_VIEW =  "store_product_negative_stock_report_view"

  //transfer product
  static TRANSFER_PRODUCT_REPORT_VIEW = "transfer_product_report_view"

  //Payment permission

  static PAYMENT_VIEW = "payment_view";
  static PAYMENT_EDIT = "payment_edit";
  static PAYMENT_MANAGE_OTHERS = "payment_manage_others";

  //Sync View 

  static SYNC_VIEW = "sync_view";

  //GatePass Permission 

  static GATE_PASS_VIEW = "gate_pass_view";
  static GATE_PASS_ADD = "gate_pass_add";
  static GATE_PASS_EDIT = "gate_pass_edit";
  static GATE_PASS_DELETE = "gate_pass_delete";

  // visitor permision
  static VISITOR_VIEW = "visitor_view";
  static VISITOR_ADD = "visitor_add";
  static VISITOR_EDIT = "visitor_edit";
  static VISITOR_DELETE = "visitor_delete";
  static VISITOR_HISTORY_VIEW = "visitor_history_view"
  static ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT_VIEW = "order_sales_settlement_discrepancy"

  // Task Permission
  static RECURRING_TASK_VIEW = "recurring_task_view";
  static RECURRING_TASK_ADD = "recurring_task_add";
  static RECURRING_TASK_EDIT = "recurring_task_edit";
  static RECURRING_TASK_DELETE = "recurring_task_delete";
  static RECURRING_TASK_MANAGE_OTHERS = "recurring_task_manage_others";
  static SALES_GST_REPORT_VIEW = "sales_gst_report_view"
  static PURCHASE_GST_REPORT_VIEW = "purchase_gst_report_view"

  // sprint permision
  static SPRINT_VIEW = "sprint_view";
  static SPRINT_ADD = "sprint_add";
  static SPRINT_EDIT = "sprint_edit";
  static SPRINT_DELETE = "sprint_delete";

  //Timesheet Permision
  static TIMESHEET_VIEW = "timesheet_view";
  static TIMESHEET_ADD = "timesheet_add";
  static TIMESHEET_EDIT = "timesheet_edit";
  static TIMESHEET_DELETE = "timesheet_delete";
  static TIMESHEET_MANAGE_OTHERS = "timesheet_manage_others"
  static PURCHASE_HISTORY_VIEW = "purchase_history_view"
  static STATUS_HISTORY_VIEW = "status_history_view"

  //Salary
  static SALARY_EDIT = "salary_edit"
  static SALARY_VIEW = "salary_view"


  //Sales Coin
  static SALES_COIN_VIEW = "sales_coin_view"



  static UserPermissionLists() {
    return [
      {
        label: this.COMPANY_VIEW,
        value: this.COMPANY_VIEW,
      },
      {
        label: this.COMPANY_ADD,
        value: this.COMPANY_ADD,
      },
      {
        label: this.COMPANY_EDIT,
        value: this.COMPANY_EDIT,
      },
      {
        label: this.COMPANY_DELETE,
        value: this.COMPANY_DELETE,
      },
      {
        label: this.DEVICE_INFO_STATUS_UPDATE,
        value: this.DEVICE_INFO_STATUS_UPDATE,
      },
      {
        label: this.USER_VIEW,
        value: this.USER_VIEW,
      },
      {
        label: this.USER_MANAGE_OTHERS,
        value: this.USER_MANAGE_OTHERS,
      },
      {
        label: this.USER_ADD,
        value: this.USER_ADD,
      },
      {
        label: this.USER_STATUS_UPDATE,
        value: this.USER_STATUS_UPDATE,
      },
      {
        label: this.USER_EDIT,
        value: this.USER_EDIT,
      },
      {
        label: this.USER_HISTORY_VIEW,
        value: this.USER_HISTORY_VIEW,
      },
      {
        label: this.PURCHASE_HISTORY_VIEW,
        value: this.PURCHASE_HISTORY_VIEW,
      },
      {
        label: this.USER_DELETE,
        value: this.USER_DELETE,
      },
      {
        label: this.STATUS_HISTORY_VIEW,
        value: this.STATUS_HISTORY_VIEW,
      },
      {
        label: this.STOCK_ENTRY_VIEW,
        value: this.STOCK_ENTRY_VIEW,
      },
      {
        label: this.STOCK_ENTRY_ADD,
        value: this.STOCK_ENTRY_ADD,
      },
      {
        label: this.STOCK_ENTRY_DELETE,
        value: this.STOCK_ENTRY_DELETE,
      },
      {
        label: this.STOCK_ENTRY_STATUS,
        value: this.STOCK_ENTRY_STATUS,
      },
      {
        label: this.STOCK_ENTRY_HISTORY_VIEW,
        value: this.STOCK_ENTRY_HISTORY_VIEW,
      },
      {
        label: this.STOCK_ENTRY_MANAGE_OTHERS,
        value: this.STOCK_ENTRY_MANAGE_OTHERS,
      },
      {
        label: this.STOCK_PRODUCT_ENTRY_ADD,
        value: this.STOCK_PRODUCT_ENTRY_ADD,
      },
      {
        label: this.STOCK_PRODUCT_ENTRY_VIEW,
        value: this.STOCK_PRODUCT_ENTRY_VIEW,
      },
      {
        label: this.STOCK_PRODUCT_ENTRY_DELETE,
        value: this.STOCK_PRODUCT_ENTRY_DELETE,
      },
      {
        label: this.STOCK_PRODUCT_ENTRY_EDIT,
        value: this.STOCK_PRODUCT_ENTRY_EDIT,
      },
      {
        label: this.INSPECTION_VIEW,
        value: this.INSPECTION_VIEW,
      },
      {
        label: this.REPORT_VIEW,
        value: this.REPORT_VIEW,
      },

      {
        label: this.PURCHASE_ORDER_VIEW,
        value: this.PURCHASE_ORDER_VIEW,
      },
      {
        label: this.PURCHASE_ORDER_ADD,
        value: this.PURCHASE_ORDER_ADD,
      },
      {
        label: this.PURCHASE_ORDER_EDIT,
        value: this.PURCHASE_ORDER_EDIT,
      },
      {
        label: this.PURCHASE_ORDER_DELETE,
        value: this.PURCHASE_ORDER_DELETE,
      },
      {
        label: this.PURCHASE_ORDER_STATUS_UPDATE,
        value: this.PURCHASE_ORDER_STATUS_UPDATE,
      },
      {
        label: this.PURCHASE_VIEW,
        value: this.PURCHASE_VIEW,
      },
      {
        label: this.PURCHASE_ADD,
        value: this.PURCHASE_ADD,
      },
      {
        label: this.PURCHASE_EDIT,
        value: this.PURCHASE_EDIT,
      },
      {
        label: this.PURCHASE_DELETE,
        value: this.PURCHASE_DELETE,
      },
      {
        label: this.PURCHASE_STATUS_UPDATE,
        value: this.PURCHASE_STATUS_UPDATE,
      },
      {
        label: this.PURCHASE_HISTORY_VIEW,
        value: this.PURCHASE_HISTORY_VIEW,
      },
      {
        label: this.PURCHASE_DUE_DATE_UPDATE,
        value: this.PURCHASE_DUE_DATE_UPDATE,
      },
      {
        label: this.PURCHASE_MANAGE_OTHERS,
        value: this.PURCHASE_MANAGE_OTHERS,
      },
      {
        label: this.SALE_SETTLEMENT_ADD,
        value: this.SALE_SETTLEMENT_ADD,
      },
      {
        label: this.SALE_SETTLEMENT_EDIT,
        value: this.SALE_SETTLEMENT_EDIT,
      },
      {
        label: this.SALE_SETTLEMENT_DELETE,
        value: this.SALE_SETTLEMENT_DELETE,
      },
      {
        label: this.SALE_SETTLEMENT_VIEW,
        value: this.SALE_SETTLEMENT_VIEW,
      },
      {
        label: this.SALE_SETTLEMENT_STATUS_UPDATE,
        value: this.SALE_SETTLEMENT_STATUS_UPDATE,
      },
      {
        label: this.SALE_SETTLEMENT_STATUS,
        value: this.SALE_SETTLEMENT_STATUS,
      },
      {
        label: this.SALE_SETTLEMENT_MANAGE_OTHERS,
        value: this.SALE_SETTLEMENT_MANAGE_OTHERS,
      },
      {
        label: this.SALE_SETTLEMENT_HISTORY_VIEW,
        value: this.SALE_SETTLEMENT_HISTORY_VIEW,
      },
      {
        label: this.CATEGORY_ADD,
        value: this.CATEGORY_ADD,
      },
      {
        label: this.CATEGORY_EDIT,
        value: this.CATEGORY_EDIT,
      },
      {
        label: this.CATEGORY_VIEW,
        value: this.CATEGORY_VIEW,
      },
      {
        label: this.CATEGORY_DELETE,
        value: this.CATEGORY_DELETE,
      },
      {
        label: this.LOCATION_ADD,
        value: this.LOCATION_ADD,
      },
      {
        label: this.LOCATION_EDIT,
        value: this.LOCATION_EDIT,
      },
      {
        label: this.LOCATION_VIEW,
        value: this.LOCATION_VIEW,
      },
      {
        label: this.LOCATION_DELETE,
        value: this.LOCATION_DELETE,
      },
      {
        label: this.LOCATION_STATUS_UPDATE,
        value: this.LOCATION_STATUS_UPDATE,
      },
      {
        label: this.LOCATION_HISTORY_VIEW,
        value: this.LOCATION_HISTORY_VIEW,
      },
      {
        label: this.PRODUCT_CATEGORY_ADD,
        value: this.PRODUCT_CATEGORY_ADD,
      },
      {
        label: this.PRODUCT_CATEGORY_EDIT,
        value: this.PRODUCT_CATEGORY_EDIT,
      },
      {
        label: this.PRODUCT_CATEGORY_VIEW,
        value: this.PRODUCT_CATEGORY_VIEW,
      },
      {
        label: this.PRODUCT_CATEGORY_DELETE,
        value: this.PRODUCT_CATEGORY_DELETE,
      },
      {
        label: this.PRODUCT_CATEGORY_UPDATE,
        value: this.PRODUCT_CATEGORY_UPDATE,

      },
      {
        label: this.PRODUCT_CATEGORY_HISTORY_VIEW,
        value: this.PRODUCT_CATEGORY_HISTORY_VIEW,

      },
      {
        label: this.CATEGORY_HISTORY_VIEW,
        value: this.CATEGORY_HISTORY_VIEW,

      },
      {
        label: this.BILL_ADD,
        value: this.BILL_ADD,
      },
      {
        label: this.BILL_EDIT,
        value: this.BILL_EDIT,
      },
      {
        label: this.BILL_VIEW,
        value: this.BILL_VIEW,
      },
      {
        label: this.BILL_DELETE,
        value: this.BILL_DELETE,
      },
      {
        label: this.BILL_HISTORY_VIEW,
        value: this.BILL_HISTORY_VIEW,
      },
      {
        label: this.BILL_MANAGE_OTHERS,
        value: this.BILL_MANAGE_OTHERS,
      },
      {
        label: this.LEADS_ADD,
        value: this.LEADS_ADD,
      },
  
        {label: this.LEADS_VIEW,
        value: this.LEADS_VIEW,
      },
    
       { label: this.LEADS_DELETE,
        value: this.LEADS_DELETE,
      },
    
       { label: this.LEADS_EDIT,
        value: this.LEADS_EDIT,
      },
      { label: this.LEADS_MANAGE_OTHERS,
        value: this.LEADS_MANAGE_OTHERS,
      },

      {
        label: this.BRAND_ADD,
        value: this.BRAND_ADD,
      },
      {
        label: this.BULK_ORDER_VIEW,
        value: this.BULK_ORDER_VIEW,
      },
      {
        label: this.BRAND_EDIT,
        value: this.BRAND_EDIT,
      },
      {
        label: this.BRAND_VIEW,
        value: this.BRAND_VIEW,
      },
      {
        label: this.BRAND_DELETE,
        value: this.BRAND_DELETE,
      },
      {
        label: this.BRAND_STATUS_UPDATE,
        value: this.BRAND_STATUS_UPDATE,
      },

      {
        label: this.TAG_ADD,
        value: this.TAG_ADD,
      },
      {
        label: this.TAG_EDIT,
        value: this.TAG_EDIT,
      },
      {
        label: this.TAG_VIEW,
        value: this.TAG_VIEW,
      },
      {
        label: this.TAG_DELETE,
        value: this.TAG_DELETE,
      },
      {
        label: this.TAG_STATUS_UPDATE,
        value: this.TAG_STATUS_UPDATE,
      },
      {
        label: this.PRODUCT_ADD,
        value: this.PRODUCT_ADD,
      },
      {
        label: this.PRODUCT_EDIT,
        value: this.PRODUCT_EDIT,
      },
      {
        label: this.PRODUCT_VIEW,
        value: this.PRODUCT_VIEW,
      },
      {
        label: this.PRODUCT_DELETE,
        value: this.PRODUCT_DELETE,
      },
      {
        label: this.PRODUCT_UPDATE_STATUS,
        value: this.PRODUCT_UPDATE_STATUS,
      },
      {
        label: this.PRODUCT_BULK_DELETE,
        value: this.PRODUCT_BULK_DELETE,
      },
      {
        label: this.PRODUCT_PRICE_VIEW,
        value: this.PRODUCT_PRICE_VIEW,
      },
      {
        label: this.PRODUCT_PRICE_EDIT,
        value: this.PRODUCT_PRICE_EDIT,
      },
      {
        label: this.PRODUCT_PRICE_DELETE,
        value: this.PRODUCT_PRICE_DELETE,
      },
      {
        label: this.PRODUCT_BULK_UPDATE,
        value: this.PRODUCT_BULK_UPDATE,
      },
      {
        label: this.PRODUCT_HISTORY_VIEW,
        value: this.PRODUCT_HISTORY_VIEW,
      },
      {
        label: this.PRODUCT_SYNC,
        value: this.PRODUCT_SYNC,
      },
      {
        label: this.SYNC_FROM_VENDOR_URL,
        value: this.SYNC_FROM_VENDOR_URL,
      },
      {
        label: this.CUSTOMER_ADD,
        value: this.CUSTOMER_ADD,
      },
      {
        label: this.CUSTOMER_EDIT,
        value: this.CUSTOMER_EDIT,
      },
      {
        label: this.CUSTOMER_VIEW,
        value: this.CUSTOMER_VIEW,
      },
      {
        label: this.CUSTOMER_DELETE,
        value: this.CUSTOMER_DELETE,
      },
      {
        label: this.CUSTOMER_IMPORT,
        value: this.CUSTOMER_IMPORT,
      },
      {
        label: this.CUSTOMER_UPDATE_STATUS,
        value: this.CUSTOMER_UPDATE_STATUS,
      },

      {
        label: this.PAYMENT_VIEW,
        value: this.PAYMENT_VIEW,

      },
      {
        label : this.PAYMENT_EDIT,
        value : this.PAYMENT_EDIT,
      },
      {
        label: this.PAYMENT_MANAGE_OTHERS,
        value: this.PAYMENT_MANAGE_OTHERS,

      },
      {
        label: this.SYNC_VIEW,
        value: this.SYNC_VIEW,

      },
      {
        label: this.COUNTRY_ADD,
        value: this.COUNTRY_ADD,
      },
      {
        label: this.COUNTRY_EDIT,
        value: this.COUNTRY_EDIT,
      },
      {
        label: this.COUNTRY_VIEW,
        value: this.COUNTRY_VIEW,
      },
      {
        label: this.COUNTRY_DELETE,
        value: this.COUNTRY_DELETE,
      },
      {
        label: this.INVENTORY_VIEW,
        value: this.INVENTORY_VIEW,
      },
      {
        label: this.INVENTORY_ADD,
        value: this.INVENTORY_ADD,
      },
      {
        label: this.INVENTORY_EDIT,
        value: this.INVENTORY_EDIT,
      },
      {
        label: this.INVENTORY_DELETE,
        value: this.INVENTORY_DELETE,
      },
      {
        label: this.ORDER_PRODUCT_VIEW,
        value: this.ORDER_PRODUCT_VIEW,
      },
      {
        label: this.ORDER_PRODUCT_ADD,
        value: this.ORDER_PRODUCT_ADD,
      },
      {
        label: this.ORDER_PRODUCT_EDIT,
        value: this.ORDER_PRODUCT_EDIT,
      },
      {
        label: this.ORDER_PRODUCT_DELETE,
        value: this.ORDER_PRODUCT_DELETE,
      },
      {
        label: this.ORDER_PRODUCT_CANCEL,
        value: this.ORDER_PRODUCT_CANCEL
      },
      {
        label: this.ORDER_VIEW,
        value: this.ORDER_VIEW,
      },
      {
        label: this.DELIVERY_ORDER_VIEW,
        value: this.DELIVERY_ORDER_VIEW,
      },
      {
        label: this.DISTRIBUTION_VIEW,
        value: this.DISTRIBUTION_VIEW,
      },
      {
        label: this.ORDER_ADD,
        value: this.ORDER_ADD,
      },
      {
        label:this.SALARY_EDIT,
        value:this.SALARY_EDIT
      },
      {
        label:this.SALARY_VIEW,
        value:this.SALARY_VIEW
      },
      {
        label:this.SALES_COIN_VIEW,
        value:this.SALES_COIN_VIEW
      },
      {
        label: this.ORDER_EDIT,
        value: this.ORDER_EDIT,
      },
      {
        label: this.ORDER_DELETE,
        value: this.ORDER_DELETE,
      },
      {
        label: this.ORDER_CANCEL,
        value: this.ORDER_CANCEL,
      },
      {
        label: this.ORDER_IMPORT,
        value: this.ORDER_IMPORT,
      },
      {
        label: this.ORDER_HISTORY_VIEW,
        value: this.ORDER_HISTORY_VIEW
      },
      {
        label: this.ORDER_MANAGE_OTHERS,
        value: this.ORDER_MANAGE_OTHERS
      },
      {
        label: this.ORDER_TOTAL_VIEW,
        value: this.ORDER_TOTAL_VIEW,
      },
      {
        label: this.VENDOR_VIEW,
        value: this.VENDOR_VIEW,
      },
      {
        label: this.VENDOR_ADD,
        value: this.VENDOR_ADD,
      },
      {
        label: this.VENDOR_EDIT,
        value: this.VENDOR_EDIT,
      },
      {
        label: this.VENDOR_DELETE,
        value: this.VENDOR_DELETE,
      },
      {
        label: this.VENDOR_STATUS_UPDATE,
        value: this.VENDOR_STATUS_UPDATE,
      },
      {
        label: this.VENDOR_HISTORY_VIEW,
        value: this.VENDOR_HISTORY_VIEW
      },
      {
        label: this.SUPPLIER_PRODUCT_VIEW,
        value: this.SUPPLIER_PRODUCT_VIEW,
      },
      {
        label: this.SUPPLIER_PRODUCT_ADD,
        value: this.SUPPLIER_PRODUCT_ADD,
      },
      {
        label: this.SUPPLIER_PRODUCT_EDIT,
        value: this.SUPPLIER_PRODUCT_EDIT,
      },
      {
        label: this.SUPPLIER_PRODUCT_DELETE,
        value: this.SUPPLIER_PRODUCT_DELETE,
      },
      {
        label: this.SUPPLIER_PRODUCT_BULK_DELETE,
        value: this.SUPPLIER_PRODUCT_BULK_DELETE,
      },
      {
        label: this.SUPPLIER_PRODUCT_BULK_UPDATE_STATUS,
        value: this.SUPPLIER_PRODUCT_BULK_UPDATE_STATUS,
      },
      {
        label: this.SUPPLIER_PRODUCT_EXPORT_TO_PRODUCT,
        value: this.SUPPLIER_PRODUCT_EXPORT_TO_PRODUCT,
      },
      {
        label: this.SUPPLIER_PRODUCT_IMPORT_VENDOR_PRODUCT,
        value: this.SUPPLIER_PRODUCT_IMPORT_VENDOR_PRODUCT,
      },
      {
        label: this.SUPPLIER_PRODUCT_SYNC_ALL_PRODUCTS,
        value: this.SUPPLIER_PRODUCT_SYNC_ALL_PRODUCTS,
      },
      {
        label: this.SUPPLIER_PRODUCT_SYNC_PRODUCTS_FROM_VENDOR,
        value: this.SUPPLIER_PRODUCT_SYNC_PRODUCTS_FROM_VENDOR,
      },
      {
        label: this.SUPPLIER_PRODUCT_UPDATE_IMPORT_STATUS,
        value: this.SUPPLIER_PRODUCT_UPDATE_IMPORT_STATUS,
      },
      {
        label: this.FEATURE_VIEW,
        value: this.FEATURE_VIEW,
      },
      {
        label: this.FEATURE_ADD,
        value: this.FEATURE_ADD,
      },
      {
        label: this.FEATURE_SAVE,
        value: this.FEATURE_SAVE,
      },
      {
        label: this.MEDIA_VIEW,
        value: this.MEDIA_VIEW,
      },
      {
        label: this.SCHEDULER_JOBS_VIEW,
        value: this.SCHEDULER_JOBS_VIEW,
      },
      {
        label: this.SCHEDULER_JOBS_ADD,
        value: this.SCHEDULER_JOBS_ADD,
      },
      {
        label: this.SCHEDULER_JOBS_EDIT,
        value: this.SCHEDULER_JOBS_EDIT,
      },
      {
        label: this.SCHEDULER_JOBS_DELETE,
        value: this.SCHEDULER_JOBS_DELETE,
      },
      {
        label: this.SCHEDULER_JOBS_LAST_EXECUTED_UPDATE,
        value: this.SCHEDULER_JOBS_LAST_EXECUTED_UPDATE,
      },
      {
        label: this.SCHEDULER_JOBS_HISTORY_VIEW,
        value: this.SCHEDULER_JOBS_HISTORY_VIEW,
      },
      {
        label: this.SYSTEM_LOGS_VIEW,
        value: this.SYSTEM_LOGS_VIEW,
      },
      {
        label: this.ACTIVITY_TYPE_VIEW,
        value: this.ACTIVITY_TYPE_VIEW,
      },
      {
        label: this.ACTIVITY_TYPE_ADD,
        value: this.ACTIVITY_TYPE_ADD,
      },
      {
        label: this.ACTIVITY_TYPE_EDIT,
        value: this.ACTIVITY_TYPE_EDIT,
      },
      {
        label: this.ACTIVITY_TYPE_DELETE,
        value: this.ACTIVITY_TYPE_DELETE,
      },
      {
        label: this.ACCOUNT_ENTRY_VIEW,
        value: this.ACCOUNT_ENTRY_VIEW,
      },
      {
        label: this.ACCOUNT_ENTRY_ADD,
        value: this.ACCOUNT_ENTRY_ADD,
      },
      {
        label: this.ACCOUNT_ENTRY_EDIT,
        value: this.ACCOUNT_ENTRY_EDIT,
      },
      {
        label: this.ACCOUNT_ENTRY_DELETE,
        value: this.ACCOUNT_ENTRY_DELETE,
      },
      {
        label: this.ACCOUNT_VIEW,
        value: this.ACCOUNT_VIEW,
      },
      {
        label: this.ACCOUNT_ADD,
        value: this.ACCOUNT_ADD,
      },
      {
        label: this.ACCOUNT_EDIT,
        value: this.ACCOUNT_EDIT,
      },
      {
        label: this.ACCOUNT_DELETE,
        value: this.ACCOUNT_DELETE,
      },
      {
        label: this.ATTENDANCE_ADD,
        value: this.ATTENDANCE_ADD,
      },
      {
        label: this.ATTENDANCE_VIEW,
        value: this.ATTENDANCE_VIEW,
      },
      {
        label: this.USER_WEB_CHECKIN,
        value: this.USER_WEB_CHECKIN,
      },
      {
        label: this.USER_MOBILE_CHECKIN,
        value: this.USER_MOBILE_CHECKIN,
      },
      {
        label: this.ATTENDANCE_EDIT,
        value: this.ATTENDANCE_EDIT,
      },
      {
        label: this.ATTENDANCE_DELETE,
        value: this.ATTENDANCE_DELETE,
      },
      {
        label: this.ATTENDANCE_MANAGE_OTHERS,
        value: this.ATTENDANCE_MANAGE_OTHERS,
      },
      {
        label: this.ATTENDANCE_SUMMARY_REPORT_VIEW,
        value: this.ATTENDANCE_SUMMARY_REPORT_VIEW,
      },
      {
        label: this.ATTENDANCE_HISTORY_VIEW,
        value: this.ATTENDANCE_HISTORY_VIEW,
      },
      {
        label: this.PAYMENT_ACCOUNT_VIEW,
        value: this.PAYMENT_ACCOUNT_VIEW,
      },
      {
        label: this.PAYMENT_ACCOUNT_ADD,
        value: this.PAYMENT_ACCOUNT_ADD,
      },
      {
        label: this.PAYMENT_ACCOUNT_EDIT,
        value: this.PAYMENT_ACCOUNT_EDIT,
      },
      {
        label: this.PAYMENT_ACCOUNT_DELETE,
        value: this.PAYMENT_ACCOUNT_DELETE,
      },

      {
        label: this.TRANSFER_VIEW,
        value: this.TRANSFER_VIEW,
      },
      {
        label: this.TRANSFER_ADD,
        value: this.TRANSFER_ADD,
      },
      {
        label: this.TRANSFER_EDIT,
        value: this.TRANSFER_EDIT,
      },
      {
        label: this.TRANSFER_DELETE,
        value: this.TRANSFER_DELETE,
      },
      {
        label: this.TRANSFER_STATUS,
        value: this.TRANSFER_STATUS,
      },
      {
        label: this.TRANSFER_HISTORY_VIEW,
        value: this.TRANSFER_HISTORY_VIEW,
      },
      {
        label: this.TRANSFER_MANAGE_OTHERS,
        value: this.TRANSFER_MANAGE_OTHERS,
      },
      {
        label: this.TRANSFER_PRODUCT_REPORT_VIEW,
        value: this.TRANSFER_PRODUCT_REPORT_VIEW,
      },
      {
        label: this.TRANSFER_PRODUCT_ADD,
        value: this.TRANSFER_PRODUCT_ADD,
      },
      {
        label: this.TRANSFER_PRODUCT_EDIT,
        value: this.TRANSFER_PRODUCT_EDIT,
      },
      {
        label: this.TRANSFER_PRODUCT_DELETE,
        value: this.TRANSFER_PRODUCT_DELETE,
      },
      {
        label: this.TICKET_EDIT,
        value: this.TICKET_EDIT,
      },
      {
        label: this.TICKET_ADD,
        value: this.TICKET_ADD,
      },
      {
        label: this.TICKET_VIEW,
        value: this.TICKET_VIEW,
      },
      {
        label: this.TICKET_DELETE,
        value: this.TICKET_DELETE,
      },
      {
        label: this.TICKET_HISTORY_VIEW,
        value: this.TICKET_HISTORY_VIEW,
      },
      {
        label: this.TICKET_MANAGE_OTHERS,
        value: this.TICKET_MANAGE_OTHERS,
      },
      {
        label: this.FINE_EDIT,
        value: this.FINE_EDIT,
      },
      {
        label: this.FINE_ADD,
        value: this.FINE_ADD,
      },
      {
        label: this.FINE_VIEW,
        value: this.FINE_VIEW,
      },
      {
        label: this.FINE_DELETE,
        value: this.FINE_DELETE,
      },
      {
        label: this.FINE_HISTORY_VIEW,
        value: this.FINE_HISTORY_VIEW,
      },
      {
        label: this.FINE_MANAGE_OTHERS,
        value: this.FINE_MANAGE_OTHERS,
      },
      {
        label: this.WISHLIST_DELETE,
        value: this.WISHLIST_DELETE,
      },
      {
        label: this.WISHLIST_EDIT,
        value: this.WISHLIST_EDIT,
      },
      {
        label: this.WISHLIST_ADD,
        value: this.WISHLIST_ADD,
      },
      {
        label: this.WISHLIST_VIEW,
        value: this.WISHLIST_VIEW,
      },
      {
        label: this.ACTIVITY_VIEW,
        value: this.ACTIVITY_VIEW,
      },
      {
        label: this.ACTIVITY_ADD,
        value: this.ACTIVITY_ADD,
      },
      {
        label: this.ACTIVITY_EDIT,
        value: this.ACTIVITY_EDIT,
      },
      {
        label: this.ACTIVITY_DELETE,
        value: this.ACTIVITY_DELETE,
      },
      {
        label: this.ACCOUNTS_VIEW,
        value: this.ACCOUNTS_VIEW,
      },                             
      {
        label: this.JOB_VIEW,
        value: this.JOB_VIEW,
      },
      {
        label: this.MARKETING_VIEW,
        value: this.MARKETING_VIEW,
      },
      {
        label: this.PAGES_VIEW,
        value: this.PAGES_VIEW,
      },
      {
        label: this.PEOPLE_VIEW,
        value: this.PEOPLE_VIEW,
      },
      {
        label: this.LOCATION_VIEW,
        value: this.LOCATION_VIEW,
      },
      {
        label: this.PROJECT_VIEW,
        value: this.PROJECT_VIEW,
      },
      {
        label: this.SETTINGS_VIEW,
        value: this.SETTINGS_VIEW,
      },
      {
        label: this.REPLENISH_VIEW,
        value: this.REPLENISH_VIEW,
      },
      {
        label: this.ADMIN_PORTAL_VIEW,
        value: this.ADMIN_PORTAL_VIEW,
      },
      {
        label: this.SUPPORT_PORTAL_VIEW,
        value: this.SUPPORT_PORTAL_VIEW,
      },

      // reports
      {
        label: this.ORDER_PRODUCT_GRAPH_REPORT_VIEW,
        value: this.ORDER_PRODUCT_GRAPH_REPORT_VIEW,
      },
      {
        label: this.ORDER_PRODUCT_REPORT_VIEW,
        value: this.ORDER_PRODUCT_REPORT_VIEW,
      },
      {
        label: this.ORDER_REPORT_VIEW,
        value: this.ORDER_REPORT_VIEW,
      },
      {
        label: this.ORDER_CANCELLED_REPORT_VIEW,
        value: this.ORDER_CANCELLED_REPORT_VIEW,
      },
      {
        label: this.ORDER_PRODUCT_CANCELLED_REPORT_VIEW,
        value: this.ORDER_PRODUCT_CANCELLED_REPORT_VIEW,
      },
      {
        label: this.PURCHASE_REPORT_VENDOR_WISE_VIEW,
        value: this.PURCHASE_REPORT_VENDOR_WISE_VIEW,
      },
      {
        label: this.PURCHASE_RECOMMENDATION_REPORT_VIEW,
        value: this.PURCHASE_RECOMMENDATION_REPORT_VIEW,
      },
      {
        label: this.PURCHASE_PRODUCT_REPORT_VIEW,
        value: this.PURCHASE_PRODUCT_REPORT_VIEW,
      },
      {
        label: this.SALES_SETTLEMENT_REPORT_VIEW,
        value: this.SALES_SETTLEMENT_REPORT_VIEW,
      },
      {
        label: this.STOCK_REPORT_VIEW,
        value: this.STOCK_REPORT_VIEW,
      },
      {
        label: this.STORE_PRODUCT_NO_ORDER_REPORT_VIEW,
        value: this.STORE_PRODUCT_NO_ORDER_REPORT_VIEW,
      },
      {
        label: this.STORE_PRODUCT_NO_STOCK_REPORT_VIEW,
        value: this.STORE_PRODUCT_NO_STOCK_REPORT_VIEW,
      },
      {
        label: this.GATE_PASS_VIEW,
        value: this.GATE_PASS_VIEW,
      },
      {
        label: this.GATE_PASS_ADD,
        value: this.GATE_PASS_ADD,
      },
      {
        label: this.GATE_PASS_EDIT,
        value: this.GATE_PASS_EDIT,
      },
      {
        label: this.GATE_PASS_DELETE,
        value: this.GATE_PASS_DELETE,
      },

      {
        label: this.VISITOR_VIEW,
        value: this.VISITOR_VIEW,
      },
      {
        label: this.VISITOR_ADD,
        value: this.VISITOR_ADD,
      },
      {
        label: this.VISITOR_EDIT,
        value: this.VISITOR_EDIT,
      },
      {
        label: this.VISITOR_DELETE,
        value: this.VISITOR_DELETE,
      },
      {
        label: this.VISITOR_HISTORY_VIEW,
        value: this.VISITOR_HISTORY_VIEW,
      },
      {
        label: this.STORE_PRODUCT_STORE_PRODUCT_REPORT_VIEW,
        value: this.STORE_PRODUCT_STORE_PRODUCT_REPORT_VIEW,
      },
      {
        label: this.STORE_PRODUCT_NEGATIVE_STOCK_REPORT_VIEW,
        value: this.STORE_PRODUCT_NEGATIVE_STOCK_REPORT_VIEW,
      },
      {
        label: this.CANDIDATE_ADD,
        value: this.CANDIDATE_ADD,
      },
      {
        label: this.CANDIDATE_DELETE,
        value: this.CANDIDATE_DELETE,
      },
      {
        label: this.CANDIDATE_EDIT,
        value: this.CANDIDATE_EDIT,
      },
      {
        label: this.CANDIDATE_VIEW,
        value: this.CANDIDATE_VIEW,
      },
      {
        label : this.CANDIDATE_HISTORY_VIEW,
        value : this.CANDIDATE_HISTORY_VIEW,

      },
      {
        label: this.ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT_VIEW,
        value: this.ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT_VIEW,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_ORDER,
        value: this.MOBILEAPP_DASHBOARD_MENU_ORDER,
      },
      {
        label : this.MOBILEAPP_DASHBOARD_MENU_ORDER_SUMMARY_VIEW,
        value : this.MOBILEAPP_DASHBOARD_MENU_ORDER_SUMMARY_VIEW,

      },
      {
        label : this.MOBILEAPP_DASHBOARD_MENU_GEOFENCING,
        value : this.MOBILEAPP_DASHBOARD_MENU_GEOFENCING,

      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_INSPECTION,
        value: this.MOBILEAPP_DASHBOARD_MENU_INSPECTION,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_MESSAGES,
        value: this.MOBILEAPP_DASHBOARD_MENU_MESSAGES,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_PURCHASE,
        value: this.MOBILEAPP_DASHBOARD_MENU_PURCHASE,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_VISITOR,
        value: this.MOBILEAPP_DASHBOARD_MENU_VISITOR,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_PRODUCT,
        value: this.MOBILEAPP_DASHBOARD_MENU_PRODUCT,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_REPLENISH,
        value: this.MOBILEAPP_DASHBOARD_MENU_REPLENISH,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_TICKET,
        value: this.MOBILEAPP_DASHBOARD_MENU_TICKET,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_DELIVERY,
        value: this.MOBILEAPP_DASHBOARD_MENU_DELIVERY,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_DISTRIBUTION,
        value: this.MOBILEAPP_DASHBOARD_MENU_DISTRIBUTION,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_TRANSFER,
        value: this.MOBILEAPP_DASHBOARD_MENU_TRANSFER,
      },
      {
        label: this.MOBILEAPP_DASHBOARD_MENU_REPORTS,
        value: this.MOBILEAPP_DASHBOARD_MENU_REPORTS,
      },
      {
        label: this.RECURRING_TASK_EDIT,
        value: this.RECURRING_TASK_EDIT,
      },
      {
        label: this.RECURRING_TASK_ADD,
        value: this.RECURRING_TASK_ADD,
      },
      {
        label: this.RECURRING_TASK_VIEW,
        value: this.RECURRING_TASK_VIEW,
      },  
      {
        label: this.RECURRING_TASK_DELETE,
        value: this.RECURRING_TASK_DELETE,
      },

      {
        label: this.RECURRING_TASK_MANAGE_OTHERS,
        value: this.RECURRING_TASK_MANAGE_OTHERS,
      },
      {
        label: this.REPLENISHMENT_VIEW,
        value: this.REPLENISHMENT_VIEW,
      },
      {
        label: this.REPLENISHMENT_EDIT,
        value: this.REPLENISHMENT_EDIT,
      },
      {
        label: this.REPLENISHMENT_MANAGE_OTHERS,
        value: this.REPLENISHMENT_MANAGE_OTHERS,
      },
      {
        label: this.REPLENISHMENT_ADD,
        value: this.REPLENISHMENT_ADD,
      },
      {
        label: this.SALES_GST_REPORT_VIEW,
        value: this.SALES_GST_REPORT_VIEW,
      },
      {
        label: this.PURCHASE_GST_REPORT_VIEW,
        value: this.PURCHASE_GST_REPORT_VIEW,
      },
      {
        label: this.SPRINT_VIEW,
        value: this.SPRINT_VIEW,
      }, {
        label: this.SPRINT_ADD,
        value: this.SPRINT_ADD,
      }, {
        label: this.SPRINT_EDIT,
        value: this.SPRINT_EDIT,
      }, {
        label: this.SPRINT_DELETE,
        value: this.SPRINT_DELETE,
      },
      {
        label: this.TIMESHEET_VIEW,
        value: this.TIMESHEET_VIEW,
      },
      {
        label: this.TIMESHEET_ADD,
        value: this.TIMESHEET_ADD,
      },
      {
        label: this.TIMESHEET_EDIT,
        value: this.TIMESHEET_EDIT,
      },
      {
        label: this.TIMESHEET_DELETE,
        value: this.TIMESHEET_DELETE,
      },
      {
        label: this.TIMESHEET_MANAGE_OTHERS,
        value: this.TIMESHEET_MANAGE_OTHERS,
      },
      {
        label: this.STATUS_HISTORY_VIEW,
        value: this.STATUS_HISTORY_VIEW,
      },
      {
        label: this.PAYMENT_HISTORY_VIEW,
        value: this.PAYMENT_HISTORY_VIEW,
      },
      {
        label: this.BILL_HISTORY_VIEW,
        value: this.BILL_HISTORY_VIEW,
      },
      {
        label: this.PURCHASE_ORDER_HISTORY_VIEW,
        value: this.PURCHASE_ORDER_HISTORY_VIEW,
      },
      {
        label: this.PROJECT_EDIT,
        value: this.PROJECT_EDIT,
      }
    ];
  }

  static permissionList = [
    {
      title: "Account",
      permission: [
        { name: this.ACCOUNT_VIEW, label: "Account View" },
      { name: this.ACCOUNT_ADD, label: "Account Add" },
      { name: this.ACCOUNT_EDIT, label: "Account Edit" },
      { name: this.ACCOUNT_DELETE, label: "Account Delete" }
    ],

    },

    {
      title: "Account Entry",
      permission: [

        { name: this.ACCOUNT_ENTRY_ADD, label: "Account Entry Add" },
        { name: this.ACCOUNT_ENTRY_DELETE, label: "Account Entry Delete" },
        { name: this.ACCOUNT_ENTRY_EDIT, label: "Account Entry Edit" },

        { name: this.ACCOUNT_ENTRY_VIEW, label: "Account Entry View" },
      ],
    },
    {
      title: "Activity",
      permission: [

        { name: this.ACTIVITY_ADD, label: "Activity Add" },
        { name: this.ACTIVITY_DELETE, label: "Activity Delete" },
        { name: this.ACTIVITY_EDIT, label: "Activity Edit" },
        { name: this.ACTIVITY_VIEW, label: "Activity View" },
      ],
    },

    {
      title: "Activity Type",
      permission: [

        { name: this.ACTIVITY_TYPE_ADD, label: "Activity Type Add" },
        { name: this.ACTIVITY_TYPE_DELETE, label: "Activity Type Delete" },
        { name: this.ACTIVITY_TYPE_EDIT, label: "Activity Type Edit" },

        { name: this.ACTIVITY_TYPE_VIEW, label: "Activity Type View" },
      ],
    },

    {
      title: "Admin Menu",
      permission: [
        { name: this.ACCOUNTS_VIEW, label: "Account View" },
        { name: this.JOB_VIEW, label: "Job View" },
        { name: this.PAGES_VIEW, label: "Pages View" },
        { name: this.PEOPLE_VIEW, label: "People View" },
        { name: this.PROJECT_VIEW, label: "Project View" },
        { name: this.LOCATION_VIEW, label: "Location View" },
        {name:this.MARKETING_VIEW, label: "Marketing View"}
      ],
    },
    {
      title: "Attendance",
      permission: [
        ,
        { name: this.ATTENDANCE_ADD, label: "Attendance Add" },
        { name: this.ATTENDANCE_DELETE, label: "Attendance Delete" },
        { name: this.ATTENDANCE_EDIT, label: "Attendance Edit" },

        { name: this.ATTENDANCE_MANAGE_OTHERS, label: "Attendance Manage Others" },

        { name: this.ATTENDANCE_VIEW, label: "Attendance View" },
        { name: this.USER_WEB_CHECKIN, label: "User Web Checkin" },
        { name: this.USER_MOBILE_CHECKIN, label: "User Mobile Checkin" },
        { name: this.ATTENDANCE_HISTORY_VIEW, label: "Attendance History View" },

      ],
    },

    {
      title: "Bill",
      permission: [
        { name: this.BILL_VIEW, label: "Bill View" },
        { name: this.BILL_ADD, label: "Bill Add" },
        { name: this.BILL_EDIT, label: "Bill Edit" },
        { name: this.BILL_DELETE, label: "Bill Delete" },
        { name: this.BILL_HISTORY_VIEW, label: "Bill History view" },
        { name: this.BILL_MANAGE_OTHERS, label: "Bill Manage Others" },
      ],
    },
    {
      title: "Brand",
      permission: [

        { name: this.BRAND_ADD, label: "Brand Add" },
        { name: this.BRAND_DELETE, label: "Brand Delete" },
        { name: this.BRAND_EDIT, label: "Brand Edit" },
        { name: this.BRAND_STATUS_UPDATE, label: "Brand Status Update" },
        { name: this.BRAND_VIEW, label: "Brand View" }, ,
      ],
    },
    {
      title: "Bulk Order",
      permission: [{ name: this.BULK_ORDER_VIEW, label: "Bulk Order View" }],
    },

    {
      title: "Company",
      permission: [

        { name: this.COMPANY_ADD, label: "Company Add" },
        { name: this.COMPANY_DELETE, label: "Company Delete" },
        { name: this.COMPANY_EDIT, label: "Company Edit" },

        { name: this.COMPANY_VIEW, label: "Company View" },
      ],
    },
    {
      title: "Category",
      permission: [

        { name: this.CATEGORY_ADD, label: "Category Add" },
        { name: this.CATEGORY_DELETE, label: "Category Delete" },
        { name: this.CATEGORY_EDIT, label: "Category Edit" },
        { name: this.CATEGORY_VIEW, label: "Category View" },

      ],
    },
    {
      title: "Candidate",
      permission: [
        { name: this.CANDIDATE_ADD, label: "Candidate Add" },
        { name: this.CANDIDATE_DELETE, label: "Candidate Delete" },
        { name: this.CANDIDATE_EDIT, label: "Candidate Edit" },
        { name: this.CANDIDATE_VIEW, label: "Candidate View" },
        { name: this.CANDIDATE_HISTORY_VIEW, label: "Candidate History View" },

      ],
    },
    {
      title: "Country",
      permission: [

        { name: this.COUNTRY_ADD, label: "Country Add" },
        { name: this.COUNTRY_DELETE, label: "Country Delete" },
        { name: this.COUNTRY_EDIT, label: "Country Edit" },

        { name: this.COUNTRY_VIEW, label: "Country View" },
      ],
    },
    {
      title: "Customer",
      permission: [

        { name: this.CUSTOMER_ADD, label: "Customer Add" },

        { name: this.CUSTOMER_DELETE, label: "Customer Delete" },
        { name: this.CUSTOMER_EDIT, label: "Customer Edit" },
        { name: this.CUSTOMER_IMPORT, label: "Customer Import" },
        { name: this.CUSTOMER_UPDATE_STATUS, label: "Customer Status Update" },
        { name: this.CUSTOMER_VIEW, label: "Customer View" },
      ],
    },
    {
      title: "DeviceInfo",
      permission: [{ name: this.DEVICE_INFO_STATUS_UPDATE, label: "Device Info Status Update" },],
    },
    {
      title: "Delivery Order",
      permission:[{ name: this.DELIVERY_ORDER_VIEW, label: "Delivery Order View" }],
    },
    {
      title: "Distribution",
      permission:[{ name: this.DISTRIBUTION_VIEW, label: "Distribution View" }],
    },
    {
      title: "Features",
      permission: [

        { name: this.FEATURE_ADD, label: "Feature Add" },
        { name: this.FEATURE_SAVE, label: "Feature Save" },
        { name: this.FEATURE_VIEW, label: "Feature View" },
      ],
    },
    {
      title: "Fine",
      permission: [

        { name: this.FINE_ADD, label: "Fine Add" },
        { name: this.FINE_DELETE, label: "Fine Delete" },
        { name: this.FINE_EDIT, label: "Fine Edit" },

        { name: this.FINE_MANAGE_OTHERS, label: "Fine Manage Others" },
        { name: this.FINE_VIEW, label: "Fine View" },
        { name: this.FINE_HISTORY_VIEW, label: "Fine History View" },

      ],
    },
    {
      title: "Gate Pass",
      permission: [
        { name: this.GATE_PASS_VIEW, label: "Gate Pass View" },
        { name: this.GATE_PASS_ADD, label: "Gate Pass Add" },
        { name: this.GATE_PASS_EDIT, label: "Gate Pass Edit" },
        { name: this.GATE_PASS_DELETE, label: "Gate Pass Delete" },

      ],
    },
    {
      title: "Inspection",
      permission: [{ name: this.INSPECTION_VIEW, label: "Inspection View" }],
    },
    {
      title: "Leads",
      permission: [
        { name: this.LEADS_VIEW, label: "Leads View" },
        { name: this.LEADS_ADD, label: "Leads Add" },
        { name: this.LEADS_EDIT, label: "Leads Edit" },
        { name: this.LEADS_DELETE, label: "Leads Delete" },
        {name : this.LEADS_MANAGE_OTHERS, label : "Manage Others"}
      ]
    },
    {
      title: "Media",
      permission: [{ name: this.MEDIA_VIEW, label: "Media View" }],
    },
    {
      title: "Mobile App Dashboard Menu",
      permission: [
        { name: this.MOBILEAPP_DASHBOARD_MENU_DELIVERY, label: "Show Delivery" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_DISTRIBUTION, label: "Show Distribution" },
        {name : this.MOBILEAPP_DASHBOARD_MENU_GEOFENCING ,label : "Show Geofencing"},
        { name: this.MOBILEAPP_DASHBOARD_MENU_INSPECTION, label: "Show Inspection" },
        {name : this.MOBILEAPP_DASHBOARD_MENU_MESSAGES, label : "Show Messages"},
        { name: this.MOBILEAPP_DASHBOARD_MENU_ORDER, label: "Show Order" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_ORDER_SUMMARY_VIEW, label: "Show Order Summary View" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_PRODUCT, label: "Show Product" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_PURCHASE, label: "Show Purchase" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_REPLENISH, label: "Show Replenishment" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_REPORTS, label: "Show Reports" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_TICKET, label: "Show Ticket" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_TRANSFER, label: "Show Transfer" },
        { name: this.MOBILEAPP_DASHBOARD_MENU_VISITOR, label: "Show Visitor" },



      ],
    },
    {
      title: "Order",
      permission: [
        { name: this.ORDER_MANAGE_OTHERS, label: "Manage Others" },
        { name: this.ORDER_ADD, label: "Order Add" },
        { name: this.ORDER_DELETE, label: "Order Delete" },
        { name: this.ORDER_EDIT, label: "Order Edit" },

        { name: this.ORDER_IMPORT, label: "Order Import" },

        { name: this.ORDER_TOTAL_VIEW, label: "Order Total View" },
        { name: this.ORDER_VIEW, label: "Order View" },
        { name: this.ORDER_CANCEL, label: "Order Cancel" },
        { name: this.ORDER_HISTORY_VIEW, label: "Order History View" }
      ],
    },
    {
      title: "Order Product",
      permission: [

        { name: this.ORDER_PRODUCT_ADD, label: "Order Product Add" },
        { name: this.ORDER_PRODUCT_CANCEL, label: "Order Product Cancel" },
        { name: this.ORDER_PRODUCT_DELETE, label: "Order Product Delete" },
        { name: this.ORDER_PRODUCT_EDIT, label: "Order Product Edit" },


        { name: this.ORDER_PRODUCT_VIEW, label: "Order Product View" },
      ],
    },


    {
      title: "Payment",
      permission: [
        { name: this.PAYMENT_VIEW, label: "Payment View" },
        {name : this.PAYMENT_EDIT, label : "Payment Edit"},
        {name : this.PAYMENT_MANAGE_OTHERS, label : "Payment Manage Others"},
        { name: this.PAYMENT_HISTORY_VIEW, label: "Payment History View" }


      ],

    },

    {
      title: "  Payment Account",
      permission: [

        { name: this.PAYMENT_ACCOUNT_ADD, label: "Payment Account Add" },

        { name: this.PAYMENT_ACCOUNT_DELETE, label: "Payment Account Delete" },
        { name: this.PAYMENT_ACCOUNT_EDIT, label: "Payment Account Edit" },
        { name: this.PAYMENT_ACCOUNT_VIEW, label: "Payment Account View" },

      ],
    },



    {
      title: "Portals",
      permission: [
        { name: this.ADMIN_PORTAL_VIEW, label: "Admin Portal View" },
        { name: this.SUPPORT_PORTAL_VIEW, label: "Support Portal View" }
      ],
    },


    {
      title: "Product",
      permission: [

        { name: this.PRODUCT_ADD, label: "Product Add" },

        { name: this.PRODUCT_BULK_UPDATE, label: "Product Bulk Update" },
        { name: this.PRODUCT_BULK_DELETE, label: "Product Bulk Delete" },
        { name: this.PRODUCT_DELETE, label: "Product Delete" },
        { name: this.PRODUCT_EDIT, label: "Product Edit" },
        { name: this.PRODUCT_SYNC, label: "Product sync" },

        { name: this.PRODUCT_UPDATE_STATUS, label: "Product Update Status" },
        { name: this.PRODUCT_VIEW, label: "Product View" },
        { name: this.PRODUCT_PRICE_VIEW, label: "Product Price View" },
        { name: this.PRODUCT_HISTORY_VIEW, label: "Product History View" },
        { name: this.SYNC_FROM_VENDOR_URL, label: "Sync from vendor URL" },
      ],
    },
    {
      title: "Product Price",
      permission: [
        { name: this.PRODUCT_PRICE_DELETE, label: "Product Price Delete" },
        { name: this.PRODUCT_PRICE_EDIT, label: "Product Price Edit" },
      ],
    },
    {
      title: "Project",
      permission: [ { name: this.PROJECT_EDIT, label: "Project Edit" },],
    },
    {
      title: "Product Category",
      permission: [

        { name: this.PRODUCT_CATEGORY_ADD, label: "Product Category Add" },
        {
          name: this.PRODUCT_CATEGORY_DELETE,
          label: "Product Category Delete",
        },
        { name: this.PRODUCT_CATEGORY_EDIT, label: "Product Category Edit" },



        {
          name: this.PRODUCT_CATEGORY_UPDATE,
          label: "Product Category Status Update",
        },
        { name: this.PRODUCT_CATEGORY_VIEW, label: "Product Category View" },
        { name: this.PRODUCT_CATEGORY_HISTORY_VIEW, label: "Product Category History View" },
      ],
    },
    {
      title: "Purchase Entry",
      permission: [

        { name: this.PURCHASE_ADD, label: "Purchase Add" },
        { name: this.PURCHASE_DELETE, label: "Purchase Delete" },
        { name: this.PURCHASE_EDIT, label: "Purchase Edit" },

        { name: this.PURCHASE_STATUS_UPDATE, label: "Purchase Status Update" },
        { name: this.PURCHASE_VIEW, label: "Purchase View" },
        { name: this.PURCHASE_DUE_DATE_UPDATE, label: "Purchase Due Date Edit" },
        { name: this.PURCHASE_HISTORY_VIEW, label: "Purchase History View" },
        { name: this.PURCHASE_MANAGE_OTHERS, label: "Purchase Manage Others" }

      ]
    },
    {
      title: "Purchase Order",
      permission: [

        { name: this.PURCHASE_ORDER_ADD, label: "Purchase Order Add" },
        { name: this.PURCHASE_ORDER_DELETE, label: "Purchase Order Delete" },
        { name: this.PURCHASE_ORDER_EDIT, label: "Purchase Order Edit" },
        { name: this.PURCHASE_ORDER_STATUS_UPDATE, label: "Purchase Order Status Update" },
        { name: this.PURCHASE_ORDER_VIEW, label: "Purchase Order View" },
        { name: this.PURCHASE_ORDER_HISTORY_VIEW, label: "Purchase Order History View" }


      ],
    },
    {
      title: "Replenishment",
      permission: [
        { name: this.REPLENISHMENT_ADD, label: "Replenishment Add" },
        { name: this.REPLENISHMENT_VIEW, label: "Replenishment View" },
        {name : this.REPLENISHMENT_EDIT,label : "Replenishment Edit"},
        { name: this.REPLENISHMENT_MANAGE_OTHERS, label: "Replenishment Manage Others" }
],
    },
    {
      title: "Reports",
      permission: [

        {
          name: this.ATTENDANCE_SUMMARY_REPORT_VIEW,
          label: "Attendance Summary Report View",
        },

        {
          name: this.ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT_VIEW,
          label: "Order And Sales Settlement Discrepancy Report View",

        },
        {
          name: this.ORDER_PRODUCT_GRAPH_REPORT_VIEW,
          label: "Order Product Graph Report View",
        },

        {
          name: this.ORDER_PRODUCT_REPORT_VIEW,
          label: "Order Product Report View",

        },
        {
          name: this.ORDER_REPORT_VIEW,
          label: "Order  Report View",

        },
        {
          name: this.ORDER_CANCELLED_REPORT_VIEW,
          label: "Order Cancelled  Report View",

        },
        {
          name: this.ORDER_PRODUCT_CANCELLED_REPORT_VIEW,
          label: "Order Product Cancelled  Report View",

        },
        {
          name: this.PURCHASE_GST_REPORT_VIEW,
          label: "Purchase GST Report View",
        },
        {
          name: this.PURCHASE_PRODUCT_REPORT_VIEW,
          label: "Purchase Products Report View",

        },

        {
          name: this.PURCHASE_RECOMMENDATION_REPORT_VIEW,
          label: "Purchase Recommended Products Report View",

        },
        {
          name: this.PURCHASE_REPORT_VENDOR_WISE_VIEW,
          label: "Purchase Report Vendor Wise View",

        },

        {
          name: this.REPORT_VIEW,
          label: "Report View",

        },
        {
          name: this.SALES_GST_REPORT_VIEW,
          label: "Sales GST Report View",
        },
        {
          name: this.SALES_SETTLEMENT_REPORT_VIEW,
          label: "Sales Settlement Report View",

        },
        {
          name: this.STOCK_REPORT_VIEW,
          label: "Stock Report View",

        },
        {
          name: this.STORE_PRODUCT_NO_ORDER_REPORT_VIEW,
          label: "Store Product No Order Report View",

        },

        {
          name: this.STORE_PRODUCT_NO_STOCK_REPORT_VIEW,
          label: "Store Product No Stock Report View",

        },
        {
          name: this.STORE_PRODUCT_STORE_PRODUCT_REPORT_VIEW,
          label: "Store Product Report View"
        },
        {
          name: this.STORE_PRODUCT_NEGATIVE_STOCK_REPORT_VIEW,
          label: "Store Product Negative Stock Report View"
        },
        {
          name: this.TRANSFER_PRODUCT_REPORT_VIEW,
          label: "Transfer Product Report View"
        },


      ],
    },
    {
      title: "Salary",
      permission: [
        {
          name: this.SALARY_VIEW,
          label: "Salary View",
        },
        {
          name: this.SALARY_EDIT,
          label: "Salary Edit",
        },

      ],
    },
    {
      title: "Sales Coin",
      permission: [
        {
          name: this.SALES_COIN_VIEW,
          label: "Sales Coin View",
        },
      ],
    },

    {
      title: "Sales Settlement",
      permission: [

        {
          name: this.SALE_SETTLEMENT_ADD, label: "Sale Settlement Add"
        },

        {
          name: this.SALE_SETTLEMENT_DELETE, label: "Sale Settlement Delete"
        },
        {
          name: this.SALE_SETTLEMENT_EDIT, label: "Sale Settlement Edit"
        },
        {
          name: this.SALE_SETTLEMENT_MANAGE_OTHERS, label: "Sale Settlement Manage  Others"
        },
        {
          name: this.SALE_SETTLEMENT_STATUS, label: "Sale Settlement Status"
        },
        {
          name: this.SALE_SETTLEMENT_STATUS_UPDATE, label: "Sale Settlement Status Update"
        },

        { name: this.SALE_SETTLEMENT_VIEW, label: "Sale Settlement View" },
        { name: this.SALE_SETTLEMENT_HISTORY_VIEW, label: "Sale Settlement History View" }
      ],
    },

    {
      title: "Scheduler Jobs ",
      permission: [

        { name: this.SCHEDULER_JOBS_ADD, label: "Scheduler Jobs Add" },

        { name: this.SCHEDULER_JOBS_DELETE, label: "Scheduler Jobs Delete" },
        { name: this.SCHEDULER_JOBS_EDIT, label: "Scheduler Jobs Edit" },
        {
          name: this.SCHEDULER_JOBS_LAST_EXECUTED_UPDATE,
          label: "Scheduler Jobs Last Executed Update",
        },
        { name: this.SCHEDULER_JOBS_VIEW, label: "Scheduler Jobs View" },
        { name: this.SCHEDULER_JOBS_HISTORY_VIEW, label: "Scheduler Jobs History View" },
      ],
    },
    {
      title: "Settings",
      permission: [
        {
          name: this.SETTINGS_VIEW,
          label: "Settings View",
        },

      ],
    },

    {
      title: "Sprint",
      permission: [

        { name: this.SPRINT_VIEW, label: "Sprint View" },
        { name: this.SPRINT_ADD, label: "sprint Add" },
        { name: this.SPRINT_EDIT, label: "Sprint Edit" },
        { name: this.SPRINT_DELETE, label: "Sprint Delete" },
      ],
    },
    {
      title: "Status",
      permission: [{ name: this.STATUS_HISTORY_VIEW, label: "Status History View" }],
    },
    {
      title: "Stock Entry",
      permission: [

        { name: this.STOCK_ENTRY_ADD, label: "Stock Entry Add" },
        { name: this.STOCK_ENTRY_DELETE, label: "Stock Entry Delete" },
        { name: this.STOCK_ENTRY_MANAGE_OTHERS, label: "Stock Entry Manage Others" },
        { name: this.STOCK_ENTRY_STATUS, label: "Stock Entry Status" },

        { name: this.STOCK_ENTRY_VIEW, label: "Stock Entry View" },
        { name: this.STOCK_ENTRY_HISTORY_VIEW, label: "Stock Entry History View" }

      ],
    },
    {
      title: "Stock Product Entry",
      permission: [

        {
          name: this.STOCK_PRODUCT_ENTRY_ADD,
          label: "Stock Product Entry Add",
        },
        {
          name: this.STOCK_PRODUCT_ENTRY_DELETE,
          label: "Stock Product Entry Delete",
        },
        {
          name: this.STOCK_PRODUCT_ENTRY_EDIT,
          label: "Stock Product Entry Edit",
        },

        {
          name: this.STOCK_PRODUCT_ENTRY_VIEW,
          label: "Stock Product Entry View",
        },
      ],
    },



    {
      title: "Location",
      permission: [

        { name: this.LOCATION_ADD, label: "Location Add" },

        { name: this.LOCATION_DELETE, label: "Location Delete" },
        { name: this.LOCATION_EDIT, label: "Location Edit" },
        { name: this.LOCATION_STATUS_UPDATE, label: "Location Status Update" },
        { name: this.LOCATION_VIEW, label: "Location View" },
        { name: this.LOCATION_HISTORY_VIEW, label: "Location History View" }
      ],
    },
    {
      title: "Ticket",
      permission: [
        { name: this.RECURRING_TASK_ADD, label: "Recurring Task Add" },
        { name: this.RECURRING_TASK_DELETE, label: "Recurring Task Delete" },
        { name: this.RECURRING_TASK_EDIT, label: "Recurring Task Edit" },

        { name: this.RECURRING_TASK_MANAGE_OTHERS, label: "Recurring Task Manage Others" },
        { name: this.RECURRING_TASK_VIEW, label: "Recurring Task View" },


      ],
    },
    {
      title: "Sync",
      permission: [{ name: this.SYNC_VIEW, label: "Sync View" }],
    },

    {
      title: "System Logs",
      permission: [{ name: this.SYSTEM_LOGS_VIEW, label: "System Logs View" }],
    },


    {
      title: "Tag",
      permission: [

        { name: this.TAG_ADD, label: "Tag Add" },

        { name: this.TAG_DELETE, label: "Tag Delete" },
        { name: this.TAG_EDIT, label: "Tag Edit" },
        { name: this.TAG_STATUS_UPDATE, label: "Tag Status Update" },
        { name: this.TAG_VIEW, label: "Tag View" },
      ],
    },
    {
      title: "Transfer",
      permission: [
        { name: this.TRANSFER_ADD, label: "Transfer Add" },
        { name: this.TRANSFER_DELETE, label: "Transfer Delete" },
        { name: this.TRANSFER_EDIT, label: "Transfer Edit" },
        { name: this.TRANSFER_MANAGE_OTHERS, label: "Transfer Manage Others" },
        { name: this.TRANSFER_STATUS, label: "Transfer Status" },


        { name: this.TRANSFER_VIEW, label: "Transfer View" },
        { name: this.TRANSFER_HISTORY_VIEW, label: "Transfer History View" }

      ],
    },

    {
      title: "Transfer Product",
      permission: [
        { name: this.TRANSFER_PRODUCT_ADD, label: "Transfer Product Add" },

        { name: this.TRANSFER_PRODUCT_DELETE, label: "Transfer Product Delete" },
        { name: this.TRANSFER_PRODUCT_EDIT, label: "Transfer Product Edit" },
      ],
    },

    {
      title: "Ticket",
      permission: [
        { name: this.TICKET_ADD, label: "Ticket Add" },
        { name: this.TICKET_DELETE, label: "Ticket Delete" },
        { name: this.TICKET_EDIT, label: "Ticket Edit" },

        { name: this.TICKET_MANAGE_OTHERS, label: "Ticket Manage Others" },
        { name: this.TICKET_VIEW, label: "Ticket View" },
        { name: this.TICKET_HISTORY_VIEW, label: "Ticket History View" }

      ],
    },
    {
      title: "Time Sheet",
      permission: [
        { name: this.TIMESHEET_ADD, label: "Timesheet Add" },
        { name: this.TIMESHEET_DELETE, label: "Timesheet Delete" },
        { name: this.TIMESHEET_EDIT, label: "Timesheet Edit" },

        { name: this.TIMESHEET_MANAGE_OTHERS, label: "Timesheet Manage Others" },
        { name: this.TIMESHEET_VIEW, label: "Timesheet View" },


      ],
    },

    {
      title: "Users",
      permission: [

        { name: this.USER_ADD, label: "User Add" },
        { name: this.USER_DELETE, label: "User Delete" },
        { name: this.USER_EDIT, label: "User Edit" },
        { name: this.USER_VIEW, label: "User View" },
        { name: this.USER_STATUS_UPDATE, label: "User Status Update" },
        { name: this.USER_HISTORY_VIEW, label: "User History View" },
        { name: this.USER_MANAGE_OTHERS, label: "User Manage Others" }

      ],
    },



    {
      title: "Vendor",
      permission: [
        { name: this.VENDOR_ADD, label: "Vendor Add" },
        { name: this.VENDOR_DELETE, label: "Vendor Delete" },
        { name: this.VENDOR_EDIT, label: "Vendor Edit" },
        { name: this.VENDOR_STATUS_UPDATE, label: "Vendor Status Update" },
        { name: this.VENDOR_VIEW, label: "Vendor View" },
        { name: this.VENDOR_HISTORY_VIEW, label: "Vendor History View" }

      ],
    },
    {
      title: "Vendor Product",
      permission: [
        { name: this.SUPPLIER_PRODUCT_ADD, label: "Vendor Product Add" },
        { name: this.SUPPLIER_PRODUCT_BULK_DELETE, label: "Bulk Delete" },
        {
          name: this.SUPPLIER_PRODUCT_BULK_UPDATE_STATUS,
          label: "Bulk Update Status",
        },


        {
          name: this.SUPPLIER_PRODUCT_EXPORT_TO_PRODUCT,
          label: "Export To Product",
        },
        {
          name: this.SUPPLIER_PRODUCT_IMPORT_VENDOR_PRODUCT,
          label: "Import Vendor Product",
        },
        {
          name: this.SUPPLIER_PRODUCT_SYNC_ALL_PRODUCTS,
          label: "Sync All Products",
        },
        {
          name: this.SUPPLIER_PRODUCT_SYNC_PRODUCTS_FROM_VENDOR,
          label: "Sync Products From Vendor",
        },
        {
          name: this.SUPPLIER_PRODUCT_UPDATE_IMPORT_STATUS,
          label: "Update Import Status",
        },
        {
          name: this.SUPPLIER_PRODUCT_DELETE,
          label: "Vendor Product Delete",
        },
        { name: this.SUPPLIER_PRODUCT_EDIT, label: "Vendor Product Edit" },

        { name: this.SUPPLIER_PRODUCT_VIEW, label: "Vendor Product View" },


      ],
    },
    {
      title: "Wishlist",
      permission: [

        { name: this.WISHLIST_ADD, label: "Wishlist Add" },
        { name: this.WISHLIST_DELETE, label: "Wishlist Delete" },
        { name: this.WISHLIST_EDIT, label: "Wishlist Edit" },

        { name: this.WISHLIST_VIEW, label: "Wishlist View" },
      ],
    },
    {
      title: "Visitor",
      permission: [
        { name: this.VISITOR_ADD, label: "Visitor Add" },
        { name: this.VISITOR_DELETE, label: "Visitor Delete" },
        { name: this.VISITOR_EDIT, label: "Visitor Edit" },

        { name: this.VISITOR_VIEW, label: "Visitor View" },
        { name: this.VISITOR_HISTORY_VIEW, label: "Visitor History View" }
      ],
    },



  ];
}

export default Permission;
