import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import Text from "../../components/Text";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import AddModal from "../../components/Modal";

import BrandService from "../../services/BrandService";
import NavTab from "../../components/NavTab";
import classNames from "classnames";
import BrandListpage from './components/brandList';
// Brand Tab Constants
export const Tabs = {
  ACTIVE: "Active",
  INACTIVE: "InActive",
  ALL: "All",
};

const [activeBrand, inactiveBrand, allBrand] = [
  "activeBrand",
  "inActiveBrand",
  "allBrand",
];

const Brands = (props) => {
  const { history, ActiveBrand, InactiveBrand, AllBrand,
    AllCurrentPage,
    AllCurrentPageSize,
    InActiveCurrentPage,
    InActiveCurrentPageSize,
    ActiveCurrentPage,
    ActiveCurrentPageSize } = props;
  const param = new URLSearchParams(props.history.location.search);
  const role = param.get("tab");
  const search = window.location.search;
  const pathParams = new URLSearchParams(search);
  const searchItem = pathParams.get("search") ? pathParams.get("search") : "";
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(role ? role : Tabs.ACTIVE);
  const [status, setStatus] = useState("");
  const [searchitem, setSearchTerm] = useState(searchItem);

  const dispatch = useDispatch();

  const getParamsStatus = () => {
    const status = Url.GetParam("section");
    setStatus(status);
  };


  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    isLoggedIn();
    getParamsStatus();
  }, [props]);

  const _toggle = (id) => {
    setIsOpen(!isOpen);
  };

  /**
   * Add Brand
   *
   * @param data
   */
  const addBrand = async (data) => {
    const params = {
      AllCurrentPage: AllCurrentPage,
      AllCurrentPageSize: AllCurrentPageSize,
      InActiveCurrentPage: InActiveCurrentPage,
      InActiveCurrentPageSize: InActiveCurrentPageSize,
      ActiveCurrentPage: ActiveCurrentPage,
      ActiveCurrentPageSize: ActiveCurrentPageSize,
      pagination: true,
      sort: Url.GetParam("sort"),
      sortDir: Url.GetParam("sortDir"),
    };
    dispatch(await BrandService.create(data, { params }, _toggle));
  };

  const addBrandForm = (
    <Text
      name="name"
      label="Name"
      placeholder="Enter Brand Name..."
      error=""
      fontBolded
      required={true}
    />
  );

  const brandFooter = (
    <Button type="submit" label="Add" className="ml-3 h6-5-important" />
  );

  const handleStatusChange = (tabStatus) => {
    setStatus(tabStatus);
    historyPush(tabStatus)
    setSearchTerm(searchItem);
  };

  const historyPush = (status) => {
    if (status === Tabs.ALL) {
      props.history.push(`/brands?tab=${status}`);
    } else {
      props.history.push(`/brands?tab=${status}&status=${status}`);
    }
  }

  const _handleStatusChange = (e) => {
    if (e == Tabs.ACTIVE) {
      toggleTab(Tabs.ACTIVE);
      handleStatusChange(Tabs.ACTIVE);
    }

    if (e == Tabs.INACTIVE) {
      toggleTab(Tabs.INACTIVE);
      handleStatusChange(Tabs.INACTIVE);
    }

    if (e == Tabs.ALL) {
      toggleTab(Tabs.ALL);
      handleStatusChange(Tabs.ALL);
    }
  };

  const activeTabChange = () => {
    toggleTab(Tabs.ACTIVE);
    _handleStatusChange(Tabs.ACTIVE);
  };

  const inActiveTabChange = () => {
    toggleTab(Tabs.INACTIVE);
    _handleStatusChange(Tabs.INACTIVE);
  };

  const allTabChange = () => {
    toggleTab(Tabs.ALL);
    _handleStatusChange(Tabs.ALL);
  }

  const NavTabList = [
    { label: Tabs.ACTIVE, onClick: activeTabChange, count: ActiveBrand, className: classNames({ active: activeTab === Tabs.ACTIVE }) },
    { label: Tabs.INACTIVE, onClick: inActiveTabChange, count: InactiveBrand, className: classNames({ active: activeTab === Tabs.INACTIVE }) },
    { label: Tabs.ALL, onClick: allTabChange, count: AllBrand, className: classNames({ active: activeTab === Tabs.ALL }) }
  ];

  return (
    <>
      <PageTitle
        label="Brands"
        buttonHandler={() => {
          _toggle();
        }}
        buttonLabel="Add New"
      />
      <AddModal
        modalTitle="Add Brand"
        modalBody={addBrandForm}
        modalFooter={brandFooter}
        isOpen={isOpen}
        toggle={_toggle}
        toggleModalClose={_toggle}
        initialValues={{
          name: "",
        }}
        onSubmit={(values) => {
          addBrand(values);
        }}
        hideDefaultButtons
      />

      <div className="bg-white mt-3 card-body">

        <NavTab list={NavTabList} />

        <TabContent activeTab={activeTab}>
          {activeTab == Tabs.ACTIVE && (
            <TabPane tabId={Tabs.ACTIVE}>
              <BrandListpage
                id={"activeBrand"}
                tab={activeTab}
                status={"Active"}
                searchItem={searchitem}
                history={history}
              />
            </TabPane>
          )}
          {activeTab == Tabs.INACTIVE && (
            <TabPane tabId={Tabs.INACTIVE}>
              {/* <InActiveVendorTab /> */}
              <BrandListpage
                id={"inActiveBrand"}
                tab={activeTab}
                searchItem={searchitem}
                status={"InActive"}
                history={history}
              />
            </TabPane>
          )}
          {activeTab == Tabs.ALL && (
            <TabPane tabId={Tabs.ALL}>
              {/* <InActiveVendorTab /> */}
              <BrandListpage
                id={"allBrand"}
                tab={activeTab}
                searchItem={searchitem}
                history={history}
                showStatus
              />
            </TabPane>
          )}
        </TabContent>

      </div>

    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;

  // Get active brands count
  const ActiveBrand =
    reduxTable["activeBrand"] && reduxTable["activeBrand"].isFetching == false
      ? reduxTable["activeBrand"].totalCount
      : 0;

  // Get inactive brans count
  const InactiveBrand =
    reduxTable["inActiveBrand"] && reduxTable["inActiveBrand"].isFetching == false
      ? reduxTable["inActiveBrand"].totalCount
      : 0;

  // Get AllBrand count
  const AllBrand =
    reduxTable["allBrand"] && reduxTable["allBrand"].isFetching == false
      ? reduxTable["allBrand"].totalCount
      : 0;

  const AllCurrentPage =
    reduxTable[allBrand] && !reduxTable[allBrand].isFetching ? reduxTable[allBrand].currentPage : 1;

  const AllCurrentPageSize =
    reduxTable[allBrand] && !reduxTable[allBrand].isFetching ? reduxTable[allBrand].pageSize : 25;

  const InActiveCurrentPage =
    reduxTable[inactiveBrand] && !reduxTable[inactiveBrand].isFetching ? reduxTable[inactiveBrand].currentPage : 1;

  const InActiveCurrentPageSize =
    reduxTable[inactiveBrand] && !reduxTable[inactiveBrand].isFetching ? reduxTable[inactiveBrand].pageSize : 25;

  const ActiveCurrentPage =
    reduxTable[activeBrand] && !reduxTable[activeBrand].isFetching ? reduxTable[activeBrand].currentPage : 1;

  const ActiveCurrentPageSize =
    reduxTable[activeBrand] && !reduxTable[activeBrand].isFetching ? reduxTable[activeBrand].pageSize : 25;

  return {
    ActiveBrand,
    InactiveBrand,
    AllBrand,
    AllCurrentPage,
    AllCurrentPageSize,
    InActiveCurrentPage,
    InActiveCurrentPageSize,
    ActiveCurrentPage,
    ActiveCurrentPageSize

  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
