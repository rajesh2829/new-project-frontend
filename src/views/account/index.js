/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import * as statusConstant from "../../components/constants/status";
import "../../scss/_custom.scss";

// Components
import PageTitle from "../../components/PageTitle";

// Helper
import { isLoggedIn } from "../../lib/Helper";

// Action
import AddAccountModal from "./components/AddAccountModal";
import VendorListPage from "./components/VendorList";
import NavTab from "../../components/NavTab";

import classNames from "classnames";
import Account from "../../helpers/Account";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import Vendor from "../../helpers/Vendor";
import Url from "../../lib/Url";

// Tabs Constants
export const Tabs = {
  CUSTOMER_TAB: "Customers",
  EMPLOYEE_TAB: "Employees",
  VENDOR_TAB: "Vendors",
  ALL: "All",
};

const VendorList = (props) => {
  let pathName = props?.history?.location?.pathname?.replace(/\/\d+$/, "")
  const { history, CustomerCount, EmployeeCount, VendorCount, AllCount } = props;

  const search = window.location.search;
  const pathParams = new URLSearchParams(search);
  const searchItem = pathParams.get("search");
  const param = new URLSearchParams(props.history.location.search);
  const role = param.get("tab");
  const [addVendorModal, setAddVendorModal] = useState();
  const [activeTab, setActiveTab] = useState(pathName == "/vendor" ? Tabs.VENDOR_TAB : Tabs.CUSTOMER_TAB);
  const [searchitem, setSearchTerm] = useState(searchItem);
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });
  const [status, setStatus] = useState("");
  const [name, setName] = useState()
  const [rows, setRows] = useState();

  // Sort by Option
  const sortByOption = [
    {
      value: "vendorName:ASC",
      label: "Name",
    },
    {
      value: "updatedAt:DESC",
      label: "Most Recent",
    },
  ];
  // Use Effect
  useEffect(() => {
    isLoggedIn();
  }, []);

  // Add Product Category modal handler
  const handleAddVendor = () => {
    setAddVendorModal(!addVendorModal);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (tabStatus) => {
    setStatus(tabStatus);
    historyPush(tabStatus)
    setSearchTerm(searchItem);
  };

  const historyPush = (status) => {
    if (status === Tabs.ALL) {
      pathName == "/accounts" ? props.history.push(`/accounts?tab=${status}&status=${Url.GetParam("status")}`)
        : pathName == "/customers" ? props.history.push(`/customers?tab=${status}&status=${Url.GetParam("status")}`)
          : props.history.push(`/vendor?tab=${status}&status=${Url.GetParam("status")}`);
    } else {
      pathName == "/accounts" ? props.history.push(`/accounts?tab=${status}&status=${Url.GetParam("status")}`)
        : pathName == "/customers" ? props.history.push(`/customers?tab=${status}&status=${Url.GetParam("status")}`)
          : props.history.push(`/vendor?tab=${status}&status=${Url.GetParam("status")}`);
    }
  }

  const _handleStatusChange = (e) => {
    if (e == Tabs.CUSTOMER_TAB) {
      toggleTab(Tabs.CUSTOMER_TAB);
      handleStatusChange(Tabs.CUSTOMER_TAB);
    }

    if (e == Tabs.EMPLOYEE_TAB) {
      toggleTab(Tabs.EMPLOYEE_TAB);
      handleStatusChange(Tabs.EMPLOYEE_TAB);
    }

    if (e == Tabs.ALL) {
      toggleTab(Tabs.ALL);
      handleStatusChange(Tabs.ALL);
    }
  };

  const customerTabChange = () => {
    toggleTab(Tabs.CUSTOMER_TAB);
    _handleStatusChange(Tabs.CUSTOMER_TAB);
  };

  const employeeTabChange = () => {
    toggleTab(Tabs.EMPLOYEE_TAB);
    _handleStatusChange(Tabs.EMPLOYEE_TAB);
  };

  const vendorTabChange = () => {
    toggleTab(Tabs.VENDOR_TAB);
    _handleStatusChange(Tabs.VENDOR_TAB);
  };

  const allTabChange = () => {
    toggleTab(Tabs.ALL);
    _handleStatusChange(Tabs.ALL);
  }

  const NavTabList = pathName === "/accounts"
    ? [
      { label: Tabs.CUSTOMER_TAB, onClick: customerTabChange, count: CustomerCount, className: classNames({ active: activeTab === Tabs.CUSTOMER_TAB }) },
      { label: Tabs.EMPLOYEE_TAB, onClick: employeeTabChange, count: EmployeeCount, className: classNames({ active: activeTab === Tabs.EMPLOYEE_TAB }) },
      { label: Tabs.VENDOR_TAB, onClick: vendorTabChange, count: VendorCount, className: classNames({ active: activeTab === Tabs.VENDOR_TAB }) },
      { label: Tabs.ALL, onClick: allTabChange, count: AllCount, className: classNames({ active: activeTab === Tabs.ALL }) }
    ]
    : "";

  return (
    <>
      <PageTitle
        label={pathName == "/accounts" ? "Accounts" : pathName == "/customers" ? "Customers" : "Vendors"}
        buttonHandler={(_e) => {
          try {
            setRows("")
            setEditorState("");
            handleAddVendor();
          } catch (error) {
            console.log(error);
          }

        }}
        buttonLabel="Add New"
      />

      {/* Add Product Category modal */}
      <AddAccountModal
        type={pathName == "/vendor" ? Account.TYPE_VENDOR : pathName == "/customers" ? Account.TYPE_CUSTOMER : ""}
        toggle={addVendorModal}
        onModalClose={handleAddVendor}
        rows={rows}
        setRows={setRows}
        editorState={editorState}
        setEditorState={setEditorState}
        name={name}
        pathName={pathName}
        activeTab={activeTab}
      />

      <div className="bg-white mt-3 card-body">
        <NavTab list={NavTabList} />

        <TabContent activeTab={activeTab}>
          {activeTab == Tabs.CUSTOMER_TAB && (
            <TabPane tabId={Tabs.CUSTOMER_TAB}>
              <VendorListPage
                id={"activeCustomers"}
                tab={activeTab}
                type={Account.TYPE_CUSTOMER}
                status={Vendor.STATUS_ACTIVE_VALUE}
                searchItem={searchitem}
                sortByOption={sortByOption}
                history={history}
                pathName={pathName}
                onModalClose={handleAddVendor}
                setRows={setRows}
                setEditorState={setEditorState}
              />
            </TabPane>
          )}
          {activeTab == Tabs.EMPLOYEE_TAB && (
            <TabPane tabId={Tabs.EMPLOYEE_TAB}>
              {/* <InActiveVendorTab /> */}
              <VendorListPage
                id={"activeEmployees"}
                tab={activeTab}
                searchItem={searchitem}
                status={Vendor.STATUS_ACTIVE_VALUE}
                type={Account.TYPE_EMPLOYEE}
                sortByOption={sortByOption}
                history={history}
                pathName={pathName}
                onModalClose={handleAddVendor}
                setRows={setRows}
                setEditorState={setEditorState}
              />
            </TabPane>
          )}
          {activeTab == Tabs.VENDOR_TAB && (
            <TabPane tabId={Tabs.VENDOR_TAB}>
              {/* <InActiveVendorTab /> */}
              <VendorListPage
                id={"activeVendors"}
                tab={activeTab}
                searchItem={searchitem}
                type={Account.TYPE_VENDOR}
                status={Vendor.STATUS_ACTIVE_VALUE}
                sortByOption={sortByOption}
                history={history}
                pathName={pathName}
                onModalClose={handleAddVendor}
                setRows={setRows}
                setEditorState={setEditorState}
              />
            </TabPane>
          )}
          {activeTab == Tabs.ALL && (
            <TabPane tabId={Tabs.ALL}>
              {/* <InActiveVendorTab /> */}
              <VendorListPage
                id={"allVendor"}
                tab={activeTab}
                searchItem={searchitem}
                sortByOption={sortByOption}
                status={Vendor.STATUS_ACTIVE_VALUE}
                history={history}
                pathName={pathName}
                onModalClose={handleAddVendor}
                setRows={setRows}
                setEditorState={setEditorState}

              />
            </TabPane>
          )}
        </TabContent>
      </div>
    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
const mapStateToProps = (state) => {
  const { vendor } = state.table;
  const reduxTable = state.table;
  // Get All vendor count

  const CustomerCount =
    reduxTable["activeCustomers"] && reduxTable["activeCustomers"].isFetching == false
      ? reduxTable["activeCustomers"].totalCount
      : 0;
  const EmployeeCount =
    reduxTable["activeEmployees"] && reduxTable["activeEmployees"].isFetching == false
      ? reduxTable["activeEmployees"].totalCount
      : 0;
  const VendorCount =
    reduxTable["activeVendors"] &&
      reduxTable["activeVendors"].isFetching == false
      ? reduxTable["activeVendors"].totalCount
      : 0;

  const AllCount =
    reduxTable["allVendor"] && reduxTable["allVendor"].isFetching == false
      ? reduxTable["allVendor"].totalCount
      : 0;
  const sort = vendor && !vendor.isFetching ? vendor.sort : statusConstant.SORT;

  const sortDir =
    vendor && !vendor.isFetching ? vendor.sortDir : statusConstant.SORT_DIR;

  const pageSize =
    vendor && !vendor.isFetching ? vendor.pageSize : statusConstant.PAGESIZE;

  const currentPage =
    vendor && !vendor.isFetching ? vendor.currentPage : statusConstant.PAGE;

  const search = vendor && !vendor.isFetching ? vendor.search : "";

  const status =
    vendor && !vendor.isFetching ? vendor.status : statusConstant.ACTIVE;

  return {
    sort,
    sortDir,
    pageSize,
    currentPage,
    search,
    status,
    AllCount,
    CustomerCount,
    EmployeeCount,
    VendorCount,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VendorList);