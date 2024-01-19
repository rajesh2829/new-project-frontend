import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Action
import * as API from "../../../actions/userSetting";
import Form from "../../../components/Form";

// Components
import DefaultContent from "../../../components/content/defaultContent";
import SubTitle from "../../../components/SubTitle";
import SingleCheckbox from "../../../components/SingleCheckbox";
import Spinner from "../../../components/Spinner";

//Config
import { endpoints } from "../../../api/endPoints";
import { getRoleNameById } from "../../../services/UserSettingService";

// contstants
import Permission from "../../../helpers/Permission";
import { Collapse, Row } from "reactstrap";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserRolePermission = (props) => {
  const { match } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [permissionList, setPermissionList] = useState([]);
  const [roleName, setRoleName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState([]);
  const [nameToggle, setNameToggle] = useState(true);
  const [permissionToggle, setPermissionToggle] = useState([]);

  const sortByOption = [
    {
      value: "role_permission:ASC",
      label: "Name"
    },
    {
      value: "id:DESC",
      label: "Most Recent"
    }
  ];

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
    setCurrentData("");
  };

  /**
   * Create Creation
   *
   * @param values
   */
  const userRolePermissionCreate = (data) => {
    dispatch(API.createRolePermission(data, match.params.id, {}, () => { }));

    toggle();
  };

  /**
   * Delte Creation
   *
   * @param data
   */
  const userRolePermissionDelete = (id) => {
    dispatch(
      API.deleteRolePermission(id, match.params.id, {}, () => {
        getRolePermissions(props.match.params.id);
      })
    );
    toggle();
  };

  const getRoleName = async (id) => {
    const roleName = await getRoleNameById(id);
    setRoleName(roleName);
  };

  useEffect(() => {
    getRoleName(match.params.id);
    getRolePermissions(props.match.params.id);
  }, []);

  //Get Role Permission
  const getRolePermissions = async (roleId) => {
    setIsLoading(true);
    const lists = await API.search(roleId);
    setPermissionList(lists);
    setIsLoading(false);
  };

  // handle check box value
  const handleCheckBoxValue = (value, name) => {
    // convert object to array
    let array = Object.entries(value);
    let checkBoxData = {};
    // forEach the selected permission
    array.forEach((result) => {
      // if selected name is equal to field name
      if (result[0] === name) {
        // push permission name
        checkBoxData.label = result[0];
        // push permission value
        checkBoxData.value = result[1];
      }
    });
    // permission post Api
    userRolePermissionCreate(checkBoxData);
  };

  useEffect(() => {
    const allIndices = Permission.permissionList.map(
      (_, index) => index
    );
    setActiveAccordion(allIndices);
  }, []);

  // Invitial values
  const initialValues = {
    company_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.COMPANY_VIEW)
        ? true
        : false,
    company_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.COMPANY_ADD)
        ? true
        : false,
    company_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.COMPANY_EDIT)
        ? true
        : false,
    company_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.COMPANY_DELETE
        )
        ? true
        : false,
    user_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.USER_VIEW)
        ? true
        : false,
        user_manage_others:
        permissionList &&
          permissionList.find((option) => option.value === Permission.USER_MANAGE_OTHERS)
          ? true
          : false,
    user_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.USER_ADD)
        ? true
        : false,
    user_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.USER_EDIT)
        ? true
        : false,
    user_delete:
      permissionList &&
        permissionList.find((option) => option.value === Permission.USER_DELETE)
        ? true
        : false,
    user_status_update:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.USER_STATUS_UPDATE
        )
        ? true
        : false,
    stock_entry_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_ENTRY_VIEW
        )
        ? true
        : false,
    stock_entry_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_ENTRY_ADD
        )
        ? true
        : false,
    stock_entry_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_ENTRY_DELETE
        )
        ? true
        : false,
    stock_entry_status:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_ENTRY_STATUS
        )
        ? true
        : false,
    stock_product_entry_Add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_PRODUCT_ENTRY_ADD
        )
        ? true
        : false,
    stock_product_entry_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_PRODUCT_ENTRY_VIEW
        )
        ? true
        : false,
    stock_product_entry_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_PRODUCT_ENTRY_DELETE
        )
        ? true
        : false,
    stock_product_entry_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_PRODUCT_ENTRY_EDIT
        )
        ? true
        : false,
    stock_entry_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.STOCK_ENTRY_MANAGE_OTHERS
        )
        ? true
        : false,
    report_menu_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.REPORT_VIEW)
        ? true
        : false,
    settings_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.SETTINGS_VIEW)
        ? true
        : false,
    sprint_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.SPRINT_VIEW)
        ? true
        : false,
    sprint_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.SPRINT_ADD)
        ? true
        : false,
    sprint_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.SPRINT_EDIT)
        ? true
        : false,
    sprint_delete:
      permissionList &&
        permissionList.find((option) => option.value === Permission.SPRINT_DELETE)
        ? true
        : false,
    bill_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BILL_VIEW)
        ? true
        : false,
    bill_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BILL_ADD)
        ? true
        : false,
    bill_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BILL_EDIT)
        ? true
        : false,
    bill_delete:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BILL_DELETE)
        ? true
        : false,
    sale_settlement_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SALE_SETTLEMENT_ADD
        )
        ? true
        : false,
    sale_settlement_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SALE_SETTLEMENT_EDIT
        )
        ? true
        : false,
    sale_settlement_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SALE_SETTLEMENT_VIEW
        )
        ? true
        : false,
    sale_settlement_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SALE_SETTLEMENT_DELETE
        )
        ? true
        : false,
    sale_settlement_status_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SALE_SETTLEMENT_STATUS_UPDATE
        )
        ? true
        : false,
    sale_settlement_status:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SALE_SETTLEMENT_STATUS
        )
        ? true
        : false,
    sale_settlement_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SALE_SETTLEMENT_MANAGE_OTHERS
        )
        ? true
        : false,
    location_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.LOCATION_ADD)
        ? true
        : false,
    location_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.LOCATION_EDIT)
        ? true
        : false,
    location_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.LOCATION_VIEW)
        ? true
        : false,
    location_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.LOCATION_DELETE
        )
        ? true
        : false,
    location_status_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.LOCATION_STATUS_UPDATE
        )
        ? true
        : false,
    category_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.CATEGORY_ADD)
        ? true
        : false,
    category_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.CATEGORY_EDIT)
        ? true
        : false,
    category_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.CATEGORY_VIEW)
        ? true
        : false,
    category_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CATEGORY_DELETE
        )
        ? true
        : false,

    product_category_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_CATEGORY_ADD
        )
        ? true
        : false,
    product_category_update:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_CATEGORY_UPDATE
        )
        ? true
        : false,
    brand_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BRAND_ADD)
        ? true
        : false,
    brand_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BRAND_EDIT)
        ? true
        : false,
    brand_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BRAND_VIEW)
        ? true
        : false,
    brand_delete:
      permissionList &&
        permissionList.find((option) => option.value === Permission.BRAND_DELETE)
        ? true
        : false,
    brand_status_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.BRAND_STATUS_UPDATE
        )
        ? true
        : false,
    purchase_order_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PURCHASE_ORDER_ADD
        )
        ? true
        : false,
    purchase_order_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PURCHASE_ORDER_EDIT
        )
        ? true
        : false,
    purchase_order_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PURCHASE_ORDER_VIEW
        )
        ? true
        : false,
    purchase_order_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PURCHASE_ORDER_DELETE
        )
        ? true
        : false,
    purchase_order_status_update:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PURCHASE_ORDER_STATUS_UPDATE
        )
        ? true
        : false,
    purchase_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PURCHASE_ADD)
        ? true
        : false,
    purchase_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PURCHASE_EDIT)
        ? true
        : false,
    purchase_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PURCHASE_VIEW)
        ? true
        : false,
    purchase_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PURCHASE_DELETE
        )
        ? true
        : false,
    purchase_status_update:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PURCHASE_STATUS_UPDATE
        )
        ? true
        : false,
    tag_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.TAG_ADD)
        ? true
        : false,
    tag_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.TAG_EDIT)
        ? true
        : false,
    tag_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.TAG_VIEW)
        ? true
        : false,
    tag_delete:
      permissionList &&
        permissionList.find((option) => option.value === Permission.TAG_DELETE)
        ? true
        : false,
    tag_status_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.TAG_STATUS_UPDATE
        )
        ? true
        : false,
    product_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PRODUCT_VIEW)
        ? true
        : false,
    product_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PRODUCT_ADD)
        ? true
        : false,
    product_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PRODUCT_EDIT)
        ? true
        : false,
    product_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_DELETE
        )
        ? true
        : false,
    product_price_edit: permissionList &&
      permissionList.find(
        (option) => option.value === Permission.PRODUCT_PRICE_EDIT
      )
      ? true
      : false,
      product_price_delete: permissionList &&
      permissionList.find(
        (option) => option.value === Permission.PRODUCT_PRICE_DELETE
      )
      ? true
      : false,
    product_update_status:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_UPDATE_STATUS
        )
        ? true
        : false,
    product_bulk_update:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_BULK_UPDATE
        )
        ? true
        : false,
    product_bulk_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_BULK_DELETE
        )
        ? true
        : false,
    product_price_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_PRICE_VIEW
        )
        ? true
        : false,
    product_sync:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PRODUCT_SYNC)
        ? true
        : false,
    sync_from_vendor_url:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SYNC_FROM_VENDOR_URL
        )
        ? true
        : false,
    customer_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.CUSTOMER_VIEW)
        ? true
        : false,
    customer_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.CUSTOMER_ADD)
        ? true
        : false,
    customer_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.CUSTOMER_EDIT)
        ? true
        : false,
    customer_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CUSTOMER_DELETE
        )
        ? true
        : false,
    customer_import:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CUSTOMER_IMPORT
        )
        ? true
        : false,
    customer_update_status:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CUSTOMER_UPDATE_STATUS
        )
        ? true
        : false,
    product_category_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_CATEGORY_VIEW
        )
        ? true
        : false,
    product_category_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_CATEGORY_ADD
        )
        ? true
        : false,
    product_category_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_CATEGORY_EDIT
        )
        ? true
        : false,
    product_category_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_CATEGORY_DELETE
        )
        ? true
        : false,
    product_category_update:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.PRODUCT_CATEGORY_UPDATE
        )
        ? true
        : false,
    country_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.COUNTRY_VIEW)
        ? true
        : false,
    country_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.COUNTRY_ADD)
        ? true
        : false,
    country_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.COUNTRY_EDIT)
        ? true
        : false,
    country_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.COUNTRY_DELETE
        )
        ? true
        : false,
    candidate_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CANDIDATE_DELETE
        )
        ? true
        : false,
    candidate_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CANDIDATE_VIEW
        )
        ? true
        : false,
    candidate_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CANDIDATE_EDIT
        )
        ? true
        : false,
    candidate_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.CANDIDATE_ADD
        )
        ? true
        : false,
        candidate_history_view:
        permissionList &&
          permissionList.find(
            (option) => option.value === Permission.CANDIDATE_HISTORY_VIEW
          )
          ? true
          : false,
    order_product_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ORDER_PRODUCT_VIEW
        )
        ? true
        : false,
    order_product_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ORDER_PRODUCT_ADD
        )
        ? true
        : false,
    order_product_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ORDER_PRODUCT_EDIT
        )
        ? true
        : false,
    order_product_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ORDER_PRODUCT_DELETE
        )
        ? true
        : false,
    order_product_cancel:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ORDER_PRODUCT_CANCEL
        )
        ? true
        : false,
    order_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.ORDER_VIEW)
        ? true
        : false,
    delivery_order_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.DELIVERY_ORDER_VIEW)
        ? true
        : false,
    distribution_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.DISTRIBUTION_VIEW)
        ? true
        : false,
    order_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.ORDER_ADD)
        ? true
        : false,
    order_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.ORDER_EDIT)
        ? true
        : false,
    order_delete:
      permissionList &&
        permissionList.find((option) => option.value === Permission.ORDER_DELETE)
        ? true
        : false,
    order_cancel:
      permissionList &&
        permissionList.find((option) => option.value === Permission.ORDER_CANCEL)
        ? true
        : false,
    order_import:
      permissionList &&
        permissionList.find((option) => option.value === Permission.ORDER_IMPORT)
        ? true
        : false,
    order_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ORDER_MANAGE_OTHERS
        )
        ? true
        : false,
    order_total_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ORDER_TOTAL_VIEW
        )
        ? true
        : false,
    vendor_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.VENDOR_VIEW)
        ? true
        : false,
    vendor_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.VENDOR_ADD)
        ? true
        : false,
    vendor_edit:
      permissionList &&
        permissionList.find((option) => option.value === Permission.VENDOR_EDIT)
        ? true
        : false,
    vendor_delete:
      permissionList &&
        permissionList.find((option) => option.value === Permission.VENDOR_DELETE)
        ? true
        : false,
    vendor_status_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.VENDOR_STATUS_UPDATE
        )
        ? true
        : false,
    supplier_product_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SUPPLIER_PRODUCT_VIEW
        )
        ? true
        : false,
    supplier_product_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SUPPLIER_PRODUCT_ADD
        )
        ? true
        : false,
    supplier_product_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SUPPLIER_PRODUCT_EDIT
        )
        ? true
        : false,
    supplier_product_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SUPPLIER_PRODUCT_DELETE
        )
        ? true
        : false,
    supplier_product_bulk_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SUPPLIER_PRODUCT_BULK_DELETE
        )
        ? true
        : false,
    supplier_product_bulk_update_status:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.SUPPLIER_PRODUCT_BULK_UPDATE_STATUS
        )
        ? true
        : false,
    supplier_product_export_to_product:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.SUPPLIER_PRODUCT_EXPORT_TO_PRODUCT
        )
        ? true
        : false,
    supplier_product_import_vendor_product:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.SUPPLIER_PRODUCT_IMPORT_VENDOR_PRODUCT
        )
        ? true
        : false,
    supplier_product_sync_all_products:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.SUPPLIER_PRODUCT_SYNC_ALL_PRODUCTS
        )
        ? true
        : false,
    supplier_product_sync_products_from_vendor:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.SUPPLIER_PRODUCT_SYNC_PRODUCTS_FROM_VENDOR
        )
        ? true
        : false,
    supplier_product_update_import_status:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.SUPPLIER_PRODUCT_UPDATE_IMPORT_STATUS
        )
        ? true
        : false,
    feature_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.FEATURE_VIEW)
        ? true
        : false,
    feature_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.FEATURE_ADD)
        ? true
        : false,
    feature_save:
      permissionList &&
        permissionList.find((option) => option.value === Permission.FEATURE_SAVE)
        ? true
        : false,
    scheduler_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SCHEDULER_JOBS_VIEW
        )
        ? true
        : false,
    scheduler_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SCHEDULER_JOBS_ADD
        )
        ? true
        : false,
    scheduler_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SCHEDULER_JOBS_EDIT
        )
        ? true
        : false,
    scheduler_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SCHEDULER_JOBS_DELETE
        )
        ? true
        : false,
    scheduler_last_executed_update:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.SCHEDULER_JOBS_LAST_EXECUTED_UPDATE
        )
        ? true
        : false,
    media_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.MEDIA_VIEW)
        ? true
        : false,
    system_logs_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.SYSTEM_LOGS_VIEW
        )
        ? true
        : false,
    inventory_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.INVENTORY_VIEW
        )
        ? true
        : false,
    inventory_add:
      permissionList &&
        permissionList.find((option) => option.value === Permission.INVENTORY_ADD)
        ? true
        : false,
    inventory_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.INVENTORY_EDIT
        )
        ? true
        : false,
    inventory_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.INVENTORY_DELETE
        )
        ? true
        : false,
    activity_type_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACTIVITY_TYPE_VIEW
        )
        ? true
        : false,
    activity_type_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACTIVITY_TYPE_ADD
        )
        ? true
        : false,
    activity_type_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACTIVITY_TYPE_EDIT
        )
        ? true
        : false,
    activity_type_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACTIVITY_TYPE_DELETE
        )
        ? true
        : false,
    account_entry_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACCOUNT_ENTRY_VIEW
        )
        ? true
        : false,
    account_entry_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACCOUNT_ENTRY_ADD
        )
        ? true
        : false,
    account_entry_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACCOUNT_ENTRY_EDIT
        )
        ? true
        : false,
    account_entry_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ACCOUNT_ENTRY_DELETE
        )
        ? true
        : false,
    attendance_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ATTENDANCE_VIEW
        )
        ? true
        : false,
    attendance_add:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ATTENDANCE_ADD
        )
        ? true
        : false,
    attendance_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ATTENDANCE_EDIT
        )
        ? true
        : false,
    attendance_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ATTENDANCE_DELETE
        )
        ? true
        : false,
    attendance_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ATTENDANCE_MANAGE_OTHERS
        )
        ? true
        : false,
    user_web_checkin:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.USER_WEB_CHECKIN
        )
        ? true
        : false,
    user_mobile_checkin:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.USER_MOBILE_CHECKIN
        )
        ? true
        : false,
    attendance_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.ATTENDANCE_SUMMARY_REPORT_VIEW
        )
        ? true
        : false,
    account_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACCOUNT_VIEW)
        ? true
        : false,
    marketing_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.MARKETING_VIEW)
        ? true
        : false,
    account_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACCOUNT_ADD)
        ? true
        : false,
    account_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACCOUNT_EDIT)
        ? true
        : false,
    account_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACCOUNT_DELETE)
        ? true
        : false,
    bill_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_VIEW)
        ? true
        : false,
    bill_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_ADD)
        ? true
        : false,
    bill_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_EDIT)
        ? true
        : false,
    bill_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_DELETE)
        ? true
        : false,
    bulk_order_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BULK_ORDER_VIEW)
        ? true
        : false,
    leads_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.LEADS_ADD)
        ? true
        : false,
    leads_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.LEADS_VIEW)
        ? true
        : false,
    leads_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.LEADS_EDIT)
        ? true
        : false,
    leads_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.LEADS_DELETE)
        ? true
        : false,
    transfer_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TRANSFER_VIEW)
        ? true
        : false,
    transfer_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TRANSFER_ADD)
        ? true
        : false,
    transfer_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TRANSFER_EDIT)
        ? true
        : false,
    transfer_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.TRANSFER_DELETE
        )
        ? true
        : false,
    transfer_status:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.TRANSFER_STATUS
        )
        ? true
        : false,
    transfer_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.TRANSFER_MANAGE_OTHERS
        )
        ? true
        : false,
    transfer_product_add:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.TRANSFER_PRODUCT_ADD
        )
        ? true
        : false,
    transfer_product_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.TRANSFER_PRODUCT_EDIT
        )
        ? true
        : false,
    transfer_product_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.TRANSFER_PRODUCT_DELETE
        )
        ? true
        : false,
    bill_status_update:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.BILL_STATUS_UPDATE
        )
        ? true
        : false,
    ticket_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TICKET_DELETE)
        ? true
        : false,
    ticket_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TICKET_VIEW)
        ? true
        : false,
    ticket_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TICKET_ADD)
        ? true
        : false,
    ticket_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TICKET_EDIT)
        ? true
        : false,
    ticket_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.TICKET_MANAGE_OTHERS
        )
        ? true
        : false,
    fine_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.FINE_DELETE)
        ? true
        : false,
    fine_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.FINE_VIEW)
        ? true
        : false,
    fine_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.FINE_ADD)
        ? true
        : false,
    fine_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.FINE_EDIT)
        ? true
        : false,
    fine_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.FINE_MANAGE_OTHERS
        )
        ? true
        : false,
    wishlist_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.WISHLIST_VIEW)
        ? true
        : false,
    wishlist_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.WISHLIST_ADD)
        ? true
        : false,
    wishlist_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.WISHLIST_EDIT)
        ? true
        : false,
    wislist_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.WISHLIST_DELETE
        )
        ? true
        : false,
    purchase_order_status:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PURCHASE_ORDER_STATUS
        )
        ? true
        : false,
    activity_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.ACTIVITY_DELETE
        )
        ? true
        : false,
    activity_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACTIVITY_VIEW)
        ? true
        : false,
    activity_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACTIVITY_ADD)
        ? true
        : false,
    activity_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACTIVITY_EDIT)
        ? true
        : false,
    report_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.REPORT_VIEW)
        ? true
        : false,
    accounts_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.ACCOUNTS_VIEW)
        ? true
        : false,
    job_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.JOB_VIEW)
        ? true
        : false,
    pages_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.PAGES_VIEW)
        ? true
        : false,
    people_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.PEOPLE_VIEW)
        ? true
        : false,

    project_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.PROJECT_VIEW)
        ? true
        : false,
    payment_account_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PAYMENT_ACCOUNT_VIEW
        )
        ? true
        : false,
    payment_account_add:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PAYMENT_ACCOUNT_ADD
        )
        ? true
        : false,
    payment_account_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PAYMENT_ACCOUNT_EDIT
        )
        ? true
        : false,
    payment_account_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PAYMENT_ACCOUNT_DELETE
        )
        ? true
        : false,
    replenishment_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.REPLENISHMENT_VIEW)
        ? true
        : false,
        replenishment_edit:
        permissionList &&
          permissionList.find((option) => option.value == Permission.REPLENISHMENT_EDIT)
          ? true
          : false,
    replenishment_manage_others:
      permissionList &&
        permissionList.find((option) => option.value == Permission.REPLENISHMENT_MANAGE_OTHERS)
        ? true
        : false,
        replenishment_add:
        permissionList &&
          permissionList.find((option) => option.value == Permission.REPLENISHMENT_ADD)
          ? true
          : false,
    admin_portal_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.ADMIN_PORTAL_VIEW
        )
        ? true
        : false,
    support_portal_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.SUPPORT_PORTAL_VIEW
        )
        ? true
        : false,
    order_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.ORDER_REPORT_VIEW
        )
        ? true
        : false,
    order_product_graph_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.ORDER_PRODUCT_GRAPH_REPORT_VIEW
        )
        ? true
        : false,
    order_product_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.ORDER_PRODUCT_REPORT_VIEW
        )
        ? true
        : false,
    purchase_report_vendor_wise_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PURCHASE_REPORT_VENDOR_WISE_VIEW
        )
        ? true
        : false,
    purchase_recommendation_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PURCHASE_RECOMMENDATION_REPORT_VIEW
        )
        ? true
        : false,
    purchase_product_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PURCHASE_PRODUCT_REPORT_VIEW
        )
        ? true
        : false,
    sales_settelement_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.SALES_SETTLEMENT_REPORT_VIEW
        )
        ? true
        : false,
    stock_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.STOCK_REPORT_VIEW
        )
        ? true
        : false,
    store_product_no_order_report_view:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value == Permission.STORE_PRODUCT_NO_ORDER_REPORT_VIEW
        )
        ? true
        : false,
    store_product_no_stock_report_view:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value == Permission.STORE_PRODUCT_NO_STOCK_REPORT_VIEW
        )
        ? true
        : false,
    store_product_stock_product_report_view:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value == Permission.STORE_PRODUCT_STORE_PRODUCT_REPORT_VIEW
        )
        ? true
        : false,
    store_product_negative_stock_report_view:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value == Permission.STORE_PRODUCT_NEGATIVE_STOCK_REPORT_VIEW
        )
        ? true
        : false,
    transfer_product_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.TRANSFER_PRODUCT_REPORT_VIEW
        )
        ? true
        : false,
    visitor_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.VISITOR_VIEW)
        ? true
        : false,
    visitor_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.VISITOR_ADD)
        ? true
        : false,
    visitor_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.VISITOR_EDIT)
        ? true
        : false,
    visitor_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.VISITOR_DELETE)
        ? true
        : false,

    gate_pass_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.GATE_PASS_VIEW)
        ? true
        : false,
    gate_pass_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.GATE_PASS_ADD)
        ? true
        : false,
    gate_pass_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.GATE_PASS_EDIT)
        ? true
        : false,
    gate_pass_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.GATE_PASS_DELETE)
        ? true
        : false,
    order_sales_settlement_discrepancy:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value ==
            Permission.ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT_VIEW
        )
        ? true
        : false,
    payment_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.PAYMENT_VIEW)
        ? true
        : false,
        payment_edit:
        permissionList &&
          permissionList.find((option) => option.value === Permission.PAYMENT_EDIT)
          ? true
          : false,
        payment_manage_others:
        permissionList &&
          permissionList.find((option) => option.value === Permission.PAYMENT_MANAGE_OTHERS)
          ? true
          : false,
    sync_view:
      permissionList &&
        permissionList.find((option) => option.value === Permission.SYNC_VIEW)
        ? true
        : false,
    inspection_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.INSPECTION_VIEW
        )
        ? true
        : false,
    mobileapp_dashboard_menu_product:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_PRODUCT
        )
        ? true
        : false,
    mobileapp_dashboard_menu_replenish:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.MOBILEAPP_DASHBOARD_MENU_REPLENISH
        )
        ? true
        : false,
    mobileapp_dashboard_menu_reports:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.MOBILEAPP_DASHBOARD_MENU_REPORTS
        )
        ? true
        : false,

    mobileapp_dashboard_menu_order:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_ORDER
        )
        ? true
        : false,
    mobileapp_dashboard_menu_delivery:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_DELIVERY
        )
        ? true
        : false,
    mobileapp_dashboard_menu_distribution:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_DISTRIBUTION
        )
        ? true
        : false,
        mobileapp_dashboard_menu_geofencing:
        permissionList &&
          permissionList.find(
            (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_GEOFENCING
          )
          ? true
          : false,
    mobileapp_dashboard_menu_order_summary_view:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_ORDER_SUMMARY_VIEW
        )
        ? true
        : false,
    mobileapp_dashboard_menu_ticket:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_TICKET
        )
        ? true
        : false,
    mobileapp_dashboard_menu_transfer:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.MOBILEAPP_DASHBOARD_MENU_TRANSFER
        )
        ? true
        : false,
    mobileapp_dashboard_menu_inspection:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.MOBILEAPP_DASHBOARD_MENU_INSPECTION
        )
        ? true
        : false,
    mobileapp_dashboard_menu_messages:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.MOBILEAPP_DASHBOARD_MENU_MESSAGES
        )
        ? true
        : false,
    mobileapp_dashboard_menu_purchase:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value === Permission.MOBILEAPP_DASHBOARD_MENU_PURCHASE
        )
        ? true
        : false,
    mobileapp_dashboard_menu_visitor:
      permissionList &&
        permissionList.find(
          (option) => option.value === Permission.MOBILEAPP_DASHBOARD_MENU_VISITOR
        )
        ? true
        : false,
    recurring_task_delete:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.RECURRING_TASK_DELETE
        )
        ? true
        : false,
    recurring_task_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.RECURRING_TASK_VIEW
        )
        ? true
        : false,
    recurring_task_add:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.RECURRING_TASK_ADD
        )
        ? true
        : false,
    recurring_task_edit:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.RECURRING_TASK_EDIT
        )
        ? true
        : false,
    recurring_task_manage_others:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.RECURRING_TASK_MANAGE_OTHERS
        )
        ? true
        : false,
    sales_gst_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.SALES_GST_REPORT_VIEW
        )
        ? true
        : false,
    purchase_gst_report_view:
      permissionList &&
        permissionList.find(
          (option) => option.value == Permission.PURCHASE_GST_REPORT_VIEW
        )
        ? true
        : false,
    bill_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_DELETE)
        ? true
        : false,
    bill_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_VIEW)
        ? true
        : false,
    bill_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_ADD)
        ? true
        : false,
    bill_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.BILL_EDIT)
        ? true
        : false,
    timesheet_add:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TIMESHEET_ADD)
        ? true
        : false,
    timesheet_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TIMESHEET_VIEW)
        ? true
        : false,
    timesheet_edit:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TIMESHEET_EDIT)
        ? true
        : false,
    timesheet_delete:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TIMESHEET_DELETE)
        ? true
        : false,
    timesheet_manage_others:
      permissionList &&
        permissionList.find((option) => option.value == Permission.TIMESHEET_MANAGE_OTHERS)
        ? true
        : false,
    attendance_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.ATTENDANCE_HISTORY_VIEW)
      ? true
      : false,
    bill_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.BILL_HISTORY_VIEW)
      ? true
      : false,
      bill_manage_others: permissionList &&
      permissionList.find((option) => option.value == Permission.BILL_MANAGE_OTHERS)
      ? true
      : false,
    fine_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.FINE_HISTORY_VIEW)
      ? true
      : false,
    order_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.ORDER_HISTORY_VIEW)
      ? true
      : false,
    payment_history_view:
      permissionList &&
        permissionList.find((option) => option.value == Permission.PAYMENT_HISTORY_VIEW)
        ? true
        : false,
    product_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.PRODUCT_HISTORY_VIEW)
      ? true
      : false,
    product_category_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.PRODUCT_CATEGORY_HISTORY_VIEW)
      ? true
      : false,
    purchase_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.PURCHASE_HISTORY_VIEW)
      ? true
      : false,
    purchase_due_date_update: permissionList &&
      permissionList.find((option) => option.value == Permission.PURCHASE_DUE_DATE_UPDATE)
      ? true
      : false,
      purchase_manage_others: permissionList &&
      permissionList.find((option) => option.value == Permission.PURCHASE_MANAGE_OTHERS)
      ? true
      : false,
    purchase_order_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.PURCHASE_ORDER_HISTORY_VIEW)
      ? true
      : false,
    sale_settlement_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.SALE_SETTLEMENT_HISTORY_VIEW)
      ? true
      : false,
    scheduler_jobs_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.SCHEDULER_JOBS_HISTORY_VIEW)
      ? true
      : false,
    status_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.STATUS_HISTORY_VIEW)
      ? true
      : false,
    stock_entry_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.STOCK_ENTRY_HISTORY_VIEW)
      ? true
      : false,
    location_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.LOCATION_HISTORY_VIEW)
      ? true
      : false,
    transfer_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.TRANSFER_HISTORY_VIEW)
      ? true
      : false,
    ticket_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.TICKET_HISTORY_VIEW)
      ? true
      : false,
    user_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.USER_HISTORY_VIEW)
      ? true
      : false,
    vendor_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.VENDOR_HISTORY_VIEW)
      ? true
      : false,
    visitor_history_view: permissionList &&
      permissionList.find((option) => option.value == Permission.VISITOR_HISTORY_VIEW)
      ? true
      : false,

    device_info_status_update: permissionList &&
      permissionList.find((option) => option.value == Permission.DEVICE_INFO_STATUS_UPDATE)
      ? true
      : false,
    salary_edit: permissionList &&
      permissionList.find((option) => option.value == Permission.SALARY_EDIT)
      ? true
      : false,
      salary_view: permissionList &&
      permissionList.find((option) => option.value == Permission.SALARY_VIEW)
      ? true
      : false,
      sales_coin_view: permissionList &&
      permissionList.find((option) => option.value == Permission.SALES_COIN_VIEW)
      ? true
      : false,
    project_edit: permissionList && permissionList && permissionList.find((option) => option.value == Permission.PROJECT_EDIT)
      ? true
      : false,
    order_cancelled_report_view:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value ==
            Permission.ORDER_CANCELLED_REPORT_VIEW
        )
        ? true
        : false,
    order_product_cancelled_report_view:
      permissionList &&
        permissionList.find(
          (option) =>
            option.value ==
            Permission.ORDER_CANCELLED_REPORT_VIEW
        )
        ? true
        : false,
  };

  // spinner
  if (isLoading) {
    return <Spinner />;
  }
  const toggleAccordion = (index) => {
    setActiveAccordion((prevAccordion) => {
      if (prevAccordion.includes(index)) {
        return prevAccordion.filter((item) => item !== index);
      } else {
        return [...prevAccordion, index];
      }
    });
  };

  return (
    <>
      <Form initialValues={initialValues}>
        <DefaultContent>
          {Permission.permissionList.map((role, index) => {
            const isActive = activeAccordion.includes(index);

            return (
              <div className="card" key={index}>
                <div
                  className="card-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <div>
                    <p className="pull-right cursor-pointer">
                      {!isActive ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                    </p>
                  </div>
                  <h5>{role.title}</h5>
                </div>

                <Collapse isOpen={isActive}>
                  <div className="form-wrapper p-3">
                    {role.permission.map((permission) => (
                      <div className="field-wrapper" key={permission.name}>
                        <SingleCheckbox
                          name={permission.name}
                          label={permission.label}
                          className="accepted-terms mb-1 pb-0 mr-3"
                          handleOnChangeSubmit={(value, name) =>
                            handleCheckBoxValue(value, name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            );
          })}
        </DefaultContent>
      </Form>
    </>
  );
};
export default UserRolePermission;
