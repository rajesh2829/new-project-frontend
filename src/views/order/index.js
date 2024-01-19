import React, { useEffect, useState } from "react";

// Components
import PageTitle from "../../components/PageTitle";
import * as statusConstant from "../../components/constants/status";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Nav,
  TabContent,
  TabPane
} from "reactstrap";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import OutlineButton from "../../components/OutlineButton";
import Currency from "../../lib/Currency";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import { getUserRole } from "../../services/UserService";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "../../components/AddButton";

import AvatarCard from "../../components/AvatarCard";
import DateSelector from "../../components/Date";
import AddModal from "../../components/Modal";
import SaveButton from "../../components/SaveButton";
import SelectStore from "../../components/SelectStore";
import SelectType from "../../components/SelectType";
import ShiftSelect from "../../components/ShiftSelect";
import StatusText from "../../components/StatusText";
import Tab from "../../components/Tab";
import UserSelect from "../../components/UserSelect";
import ObjectName from "../../helpers/ObjectName";
import { UserType } from "../../helpers/UserType";
import DateTime from "../../lib/DateTime";
import OrderService from "../../services/OrderService";
import OrderProductList from "./components/orderProductList";
import Action from "../../components/Action";
import OrderProductService from "../../services/OrderProductService";
import { hasPermission } from "../../services/UserRolePermissionService";
import Permission from "../../helpers/Permission";
import { Order } from "../../helpers/Order";

// Tabs Constants
export const Tabs = {
  ACTIVE: "Active",
  ALL: "All",
  DRAFT: "Draft",
  COMPLETED: "Completed",
  ORDERS: "Orders",
  ORDER_PRODUCTS: "Order Products",
  DELIVERY_ORDERS: "Delivery Orders",
  DELIVERY_ORDER_PRODUCTS: "Delivery Order Product",
};

const Orders = (props) => {
  const { history } = props;
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") || Tabs.ORDERS
  );
  const [isOpen, setIsOpen] = useState(false);
  const [orderIds, setOrderIds] = useState([])
  const [salesExecutiveOption, setSalesExecutiveOption] = useState([])
  const [orderProductIds, setOrderProductIds] = useState([])
  let enableProductEdit = hasPermission(Permission.ORDER_PRODUCT_EDIT);

  let pathName = props?.history?.location?.pathname.replace(/\/\d+$/, "");

  const dispatch = useDispatch();
  const orderSortOptions = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "date:ASC",
      label: "Date",
    },
  ];

  useEffect(() => {
    isLoggedIn();
    getSalesExecutiveList();
  }, []);

  const toggleTab = (tab) => {
    setActiveTab(tab);

  };

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const _handleTabChange = (tab) => {

    if (pathName == "/deliveryOrders") {
      if (tab == "DeliveryOrderProduct") {
        props.history.push(
          `/deliveryOrders?tab=${tab}&&type=${Order.TYPE_DELIVERY}&&startDate=${DateTime.toISOStringDate(new Date())}&&endDate=${DateTime.toISOStringDate(new Date())}`);
      } else {
        props.history.push(
          `/deliveryOrders?tab=${tab}&&type=${Order.TYPE_DELIVERY}&&startDate=${DateTime.toISOStringDate(new Date())}&&endDate=${DateTime.toISOStringDate(new Date())}`);
      }
    } else {
      props.history.push(
        `/orders?tab=${tab}&&startDate=${DateTime.toISOStringDate(new Date())}&&endDate=${DateTime.toISOStringDate(new Date())}`);
    }
  };

  const _handleAddOrder = async () => {

    if (pathName == "/deliveryOrders") {
      history.push("/location/deliveryOrders/details")
    } else {
      history.push("/location/orders/details");
    }
  };

  const getSalesExecutiveList = async () => {
    const roleData = await getUserRole();
    setSalesExecutiveOption(roleData);
  };

  const onBulkSelect = (ids) => {
    setOrderIds({ orderIds: ids })
  }

  const paymentType = [
    {
      label: "Cash",
      value: 1,
    },
    {
      label: "Upi",
      value: 2,
    },
  ];

  const typeOptions = [
    {
      label: "Store",
      value: 1,
    },
    {
      label: "Delivery",
      value: 2,
    },
  ];

  let bulkUpdateForm = (
    <>
      <DateSelector label="Date" name="date" />
      <SelectStore name="location" label="Location" />
      <UserSelect label="Sales Executive" name="sales_executive" customUserOption={salesExecutiveOption} />
      <ShiftSelect label="Shift" />
      <SelectType customTypeOption={paymentType} name="paymentType" label="Payment Type" />
    </>
  );

  let bulkUpdateFooter = (
    <SaveButton />
  )

  const handleSubmit = async (values) => {
    let data = new FormData();
    data.append("date", values && values?.date ? values?.date : "")
    data.append("location", values && values?.location?.value ? values?.location?.value : "")
    data.append("shift", values && values?.shift?.value ? values?.shift?.value : "")
    data.append("sales_executive", values && values?.sales_executive?.value ? values?.sales_executive?.value : "")
    data.append("paymentType", values && values?.paymentType?.value ? values?.paymentType?.value : "")
    data.append("orderIds", orderIds?.orderIds)

    dispatch(await OrderService.bulkUpdate(data, toggle()))
    dispatch(
      fetchList("Orders", `${endpoints().orderAPI}/search`, Url.GetParam("page") ? Url.GetParam("page") : 1, Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25, {
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
        shift: Url.GetParam("shift"),
        location: Url.GetParam("location"),
        startDate: Url.GetParam("startDate"),
        endDate: Url.GetParam("endDate"),
        status: Url.GetParam("status"),
        user: Url.GetParam("user"),
        paymentType: Url.GetParam("paymentType"),
        search: Url.GetParam("search"),
        type: Url.GetParam("type"),

      })
    );
  }

  const handleUpdateFromProduct = async () => {
    let data = new FormData();
    data.append("orderProductIds", orderProductIds && JSON.stringify(orderProductIds))
    dispatch(await OrderProductService.bulkUpdateFromProduct(data, (res) => {
      if (res) {
        dispatch(
          fetchList(
            "OrderProduct",
            `${endpoints().orderProductAPI}/search`,
            1,
            25,
            {
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDir"),
              startDate: Url.GetParam("startDate"),
              endDate: Url.GetParam("endDate"),
              brand: Url.GetParam("brand"),
              category: Url.GetParam("category"),
              category: Url.GetParam("category"),
              product: Url.GetParam("product"),
              location: Url.GetParam("location"),
              status: Url.GetParam("status"),
            },
          )
        );
        setOrderProductIds({ orderProductIds: [] })
      }

    }))
  }

  const actionOptions = [
    {
      label: "Update From Product",
      value: "Update From Product"
    }
  ]

  const handleChange = async (e) => {
    if (e == "Update From Product") {
      handleUpdateFromProduct()
    }

  }

  const handleBulkSelect = (ids) => {
    setOrderProductIds({ orderProductIds: ids })

  }

  let renderStoreTable = (tableId, params) => {
    let data = params;

    return (
      <>
        <ReduxTable
          id={tableId}
          showHeader
          newTableHeading
          apiURL={`${endpoints().orderAPI}/search`}
          searchPlaceholder="Search"
          params={data}
          sortByOptions={orderSortOptions}
          paramsToUrl={true}
          history={props.history}
          bulkSelect
          onBulkSelect={onBulkSelect}
          autoRefresh
          ShowOrderFilter
          showStoreFilter
          showDateFilter
          showStatusFilter
          showUserFilter
          userType={{
            userType: UserType.SALES_EXECUTIVE
          }}
          showShiftFilter
          showPaymentTypeFilter
          showTypeFilter
          customTypeOption={typeOptions}
          icon={<FontAwesomeIcon icon={faCartShopping} />}
          message="You can start by clicking on Add Order"
        >
          <ReduxColumn
            width="130px"
            minWidth="100px"
            maxWidth="90px"
            field="order_number"
            sortBy="order_number"
            type="link"
            isClickable="true"
            className="text-center"
            renderField={(row) => (
              <Link to={pathName == "/deliveryOrders" ? `/deliveryOrder/${row.id}` : `/order/${row.id}`}>{row.order_number}</Link>
            )}
          >
            Order#
          </ReduxColumn>
          <ReduxColumn
            width="100px"
            className="text-center"
            minWidth="90px"
            maxWidth="90px"
            sortBy="date"
            renderField={(row) => (
              <span>{DateTime.getDateTimeByUserProfileTimezone(row.date)}</span>
            )}
          >
            Date
          </ReduxColumn>
          <ReduxColumn
            field="locationName"
            className="ellipsis"
            sortBy="locationName"
          >
            Location
          </ReduxColumn>
          {pathName == "/deliveryOrders" ? (
            <ReduxColumn
              field="assignee"
              className="ellipsis"
              sortBy="assignee"
              renderField={(row) => (
                <>

                  <AvatarCard
                    firstName={row?.delivery_executive_firstName}
                    lastName={row?.delivery_executive_lastName}
                    url={row?.delivery_executive_media_url}
                  />

                </>
              )}
            >
              Assignee
            </ReduxColumn>
          ) : (
            <ReduxColumn
              field="salesExecutive"
              className="ellipsis"
              sortBy="salesExecutive"
              renderField={(row) => (
                <>

                  <AvatarCard
                    firstName={row?.salesExecutiveFirstName}
                    lastName={row?.salesExecutiveSecondName}
                    url={row?.salesExecutiveMediaUrl}
                  />

                </>
              )}
            >
              Sales Executive
            </ReduxColumn>

          )}

          <ReduxColumn
            field="shift"
            className="ellipsis text-center"
            sortBy="shift"
          >
            Shift
          </ReduxColumn>
          <ReduxColumn
            field="type"
            className="ellipsis text-center"
            sortBy="payment_type"
          >
            Type
          </ReduxColumn>
          <ReduxColumn
            field="cash_amount"
            width="90px"
            minWidth="100px"
            sortBy="cash_amount"
            className="text-right"
            renderField={(row) => (
              <span>{Currency.Format(row?.cash_amount)}</span>
            )}
          >
            Cash Amount
          </ReduxColumn>
          <ReduxColumn
            field="upi_amount"
            width="90px"
            minWidth="100px"
            className="text-right"
            sortBy="upi_amount"
            renderField={(row) => (
              <span>{Currency.Format(row?.upi_amount)}</span>
            )}
          >
            UPI Amount
          </ReduxColumn>
          <ReduxColumn
            field="amount"
            width="90px"
            minWidth="100px"
            className="text-right"
            sortBy="total_amount"
            renderField={(row) => (
              <span>{Currency.Format(row.total_amount)}</span>
            )}
          >
            Total Amount
          </ReduxColumn>
          <ReduxColumn
            field="status"
            sortBy="status"
            width={"120px"}
            minWidth="120px"
            maxWidth="120px"
            className="column-status"
            renderField={(row) => (
              <StatusText backgroundColor={pathName == "/deliveryOrders" ? row?.DeliveryStatusDetail?.color_code : row?.statusDetail?.color_code} status={pathName == "/deliveryOrders" ? row?.DeliveryStatusDetail?.name : row?.status} />
            )}
          >
            Status
          </ReduxColumn>
        </ReduxTable>
      </>
    );
  };

  return (
    <>
      <AddModal
        modalTitle="Bulk Update"
        modalBody={bulkUpdateForm}
        modalFooter={bulkUpdateFooter}
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        initialValues={{
          date: "",
          location: "",
          sales_executive: "",
          shift: "",
          paymentType: "",
        }}
        onSubmit={handleSubmit}
        hideDefaultButtons
      />
      <div className="d-flex justify-content-between pb-3">
        <PageTitle label={pathName == "/deliveryOrders" ? "Delivery Orders" : "Orders"} />

        <div className="d-flex">
          {activeTab === Tabs.ORDERS || activeTab === Tabs.DELIVERY_ORDERS ? (
            <>
              <AddButton
                label={pathName == "/deliveryOrders" ? "Add New" : "New Order"}
                onClick={(_e) => {
                  _handleAddOrder();
                }}
              />
              <OutlineButton
                className="ml-2 "
                label="Bulk Update"
                onClick={() => {
                  toggle();
                }}
                backgroundColor="var(--bulkUpdate-button-bg-color)"
                borderColor="var(--bulkUpdate-button-border-color)"
                color="var(--bulkUpdate-button-text-color)"
                disabled={
                  orderIds &&
                    orderIds.orderIds &&
                    orderIds.orderIds.length > 0
                    ? false
                    : true
                }
              />
            </>
          ) : ("")}
          {activeTab === Tabs.ORDER_PRODUCTS && enableProductEdit && <Action dropdownLinks={actionOptions} handleChange={handleChange} />}
        </div>
      </div>

      <Nav tabs className="admin-tabs mb-1">
        <Tab
          name={pathName == "/deliveryOrders" ? Tabs.DELIVERY_ORDERS : Tabs.ORDERS}
          active={activeTab}
          navigation={pathName == "/deliveryOrders" ? "/deliveryOrders?tab=DeliveryOrders" : "/orders?tab=Orders"}
          count={props.orderCount}
          handleChange={(e) => _handleTabChange(e)}
          toggle={toggleTab}

        />
        <Tab
          name={pathName == "/deliveryOrders" ? Tabs.DELIVERY_ORDER_PRODUCTS : Tabs.ORDER_PRODUCTS}
          active={activeTab}
          count={props.orderProductCount}
          handleChange={(e) => _handleTabChange(e)}
          toggle={toggleTab}
          navigation={pathName == "/deliveryOrders" ? "/deliveryOrders?isWeb=true&tab=DeliveryOrderProduct" : "/orders?isWeb=true&tab=OrderProduct"}

        />
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* Order Tab */}
        {activeTab == Tabs.ORDERS || activeTab == Tabs.DELIVERY_ORDERS ? (
          <TabPane tabId={pathName == "/deliveryOrders" ? Tabs.DELIVERY_ORDERS : Tabs.ORDERS}>
            {renderStoreTable(Tabs.ORDERS, {
              tab: Tabs.ORDERS,
              objectName: ObjectName.ORDER,
            })}
          </TabPane>
        ) : ("")}

        {/* Order Product List */}
        {activeTab == Tabs.ORDER_PRODUCTS || activeTab == Tabs.DELIVERY_ORDER_PRODUCTS ? (
          <TabPane tabId={pathName == "/deliveryOrders" ? Tabs.DELIVERY_ORDER_PRODUCTS : Tabs.ORDER_PRODUCTS}>
            <OrderProductList history={history} handleBulkSelect={handleBulkSelect} />
          </TabPane>
        ) : ("")}
      </TabContent>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
// Map State to props
const mapStateToProps = (state) => {
  const { orders } = state.table;
  const reduxTable = state.table;

  const orderCount =
    reduxTable[Tabs.ORDERS] && reduxTable[Tabs.ORDERS].isFetching == false
      ? reduxTable[Tabs.ORDERS].totalCount
      : 0;

  const orderProductCount =
    reduxTable["OrderProduct"] && reduxTable["OrderProduct"].isFetching == false
      ? reduxTable["OrderProduct"].totalCount
      : 0;

  const sort = orders && !orders.isFetching ? orders.sort : statusConstant.SORT;

  const sortDir =
    orders && !orders.isFetching ? orders.sortDir : statusConstant.SORT_DIR;

  const pageSize =
    orders && !orders.isFetching ? orders.pageSize : statusConstant.PAGESIZE;

  const currentPage =
    orders && !orders.isFetching ? orders.currentPage : statusConstant.PAGE;

  const search = orders && !orders.isFetching ? orders.search : "";

  const status =
    orders && !orders.isFetching ? orders.status : statusConstant.ACTIVE;

  return {
    sort,
    sortDir,
    pageSize,
    currentPage,
    search,
    status,
    orderCount,
    orderProductCount,
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(Orders);
