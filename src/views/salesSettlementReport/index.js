
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Table, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import * as tabConstant from "../../helpers/StoreList";
import { PAGESIZE, SORT_DIR, PAGE } from "../../helpers/Status";

// Components
import PageTitle from "../../components/PageTitle";
import ActiveStore from "./components/salesBarChart";

//css
import "../../scss/_custom.scss";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";

import Filter from "./components/Filter";
import BreadCrumb from "../../components/Breadcrumb";
import { searchSalesData } from "../../actions/report";

const activeStore = "activeStore";

const Report = (props) => {
  const param = new URLSearchParams(props.history.location.search);
  const role = param.get("section");
  const search = window.location.search;
  const pathParams = new URLSearchParams(search);
  const searchItem = pathParams.get("search");
  const { history, searchTerm, InactiveBrand, activeStore, AllStore } = props;
  const [searchitem, setSearchTerm] = useState(searchItem);
  const dispatch = useDispatch();

  //Filter
  const [paramm, setParam] = useState({
    location: Url.GetParam("location") && Url.GetParam("location"),
    type: Url.GetParam("type") && Url.GetParam("type"),
    shift: Url.GetParam("shift") && Url.GetParam("shift"),
    startDate: Url.GetParam("startDate") && Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate") && Url.GetParam("endDate"),
    paymentType: Url.GetParam("paymentType") && Url.GetParam("paymentType"),
  });

  const [graphData, setGraphData] = useState();
  const [showOrderFilter, setShowOrderFilter] = useState(false);
  const [resetValue, setResetValue] = useState(false);
  const [defaultGraph, setDefaultGraph] = useState(true);
  const toggleSidebar = useCallback(() =>
    setShowOrderFilter((value) => !value)
  );
  useEffect(() => {
    getSalesInitialData();
  }, []);

  const getSalesInitialData = async () => {

    let params = new Object();

    let location = Url.GetParam("location") && Url.GetParam("location");

    let type = Url.GetParam("type") && Url.GetParam("type");

    let shift = Url.GetParam("shift") && Url.GetParam("shift");

    let startDate = Url.GetParam("startDate") && Url.GetParam("startDate");

    let endDate = Url.GetParam("endDate") && Url.GetParam("endDate");

    let paymentType = Url.GetParam("paymentType") && Url.GetParam("paymentType");


    if (location) {
      params.location = location
    }

    if (type) {
      params.type = type
    }

    if (shift) {
      params.shift = shift
    }

    if (startDate) {
      params.startDate = startDate
    }

    if (endDate) {
      params.endDate = endDate
    }

    if (paymentType) {
      params.paymentType = paymentType
    }

    getFilterParams(params);

    let response = await searchSalesData(params);

    handleChange(response, params)
  };

  const handleClose = () => {
    toggleSidebar();
    setParam("");
  };

  // // get filter params
  const getFilterParams = (data) => {
    const location = data.location ? data.location : "";
    const type = data.type ? data.type : "";
    const startDate = data.startDate ? data.startDate : "";
    const endDate = data.endDate ? data.endDate : "";
    const shift = data.shift ? data.shift : "";
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort ? selectedSort : "id";
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir ? selectedSortDir : SORT_DIR;
    const paymentType = data.paymentType ? data.paymentType : "";

    data.sort = sort;

    data.sortDir = sortDir;

    if (startDate) {
      data.startDate = startDate;
    }

    if (endDate) {
      data.endDate = endDate;
    }

    if (location) {
      data.location = location;
    }

    if (type) {
      data.type = type;
    }

    if (shift) {
      data.shift = shift;
    }

    if (paymentType) {
      data.paymentType = paymentType;
    }

    // saleUrlPush(data);
    setParam(data);
  };

  // Handle Reset
  const handleReset = () => {
    setResetValue(true);
    if (resetValue === true) {
      setParam("");
    }
  };

  // Use Effect
  useEffect(() => {
    isLoggedIn();
    const {
      startDate,
      endDate,
      location,
      pageSize,
      sort,
      sortDir,
      search,
      page,
      type,
      shift,
      paymentType,
    } = getParams();

    const data = {
      startDate,
      endDate,
      location,
      pageSize,
      sort,
      sortDir,
      search,
      page,
      type,
      shift,
      paymentType,
    };

    setParam(data);
  }, []);

  const getParams = () => {
    const location = Url.GetParam("location") || "";
    const startDate = Url.GetParam("startDate") || "";
    const shift = Url.GetParam("shift") || "";
    const endDate = Url.GetParam("endDate") || "";
    const selectedPageSize = Url.GetParam("pageSize");
    const pageSize = selectedPageSize ? selectedPageSize : PAGESIZE;
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort ? selectedSort : "id";
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir ? selectedSortDir : SORT_DIR;
    const searchTerm = Url.GetParam("search");
    const search = searchTerm ? searchTerm : "";
    const selectedPage = Url.GetParam("page");
    const page = selectedPage ? selectedPage : PAGE;
    const type = Url.GetParam("type") || "";
    const paymentType = Url.GetParam("paymentType") || "";

    const data = {
      startDate,
      location,
      endDate,
      pageSize,
      sort,
      sortDir,
      search,
      page,
      type,
      shift,
      paymentType,
    };
    return data;
  };
  const handleFilterChange = async (data, params) => {
    setParam(params);
    if (!params.location && params.type) {
      setDefaultGraph(false);
      setGraphData(data);
    } else if (!params.location && !params.type) {
      setDefaultGraph(true);
      setGraphData(data);
    } else {
      setDefaultGraph(false);
      setGraphData(data);
    }
  };

  const handleChange = async (data, params) => {
    if (params.location && params.type) {
      setDefaultGraph(false);
      setGraphData(data);
    } else if (!params.location && !params.type) {
      setDefaultGraph(true);
      setGraphData(data);
    } else {
      setDefaultGraph(false);
      setGraphData(data);
    }
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: "Sales Settlement Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Sales Settlement Report" />
      </div>
      <Filter
        initialParam={paramm}
        getFilterParams={(e) => {
          getFilterParams(e);
        }}
        handleClose={handleClose}
        handleFilterChange={handleFilterChange}
        handleReset={handleReset}
        toggleSidebar={toggleSidebar}
        showOrderFilter={showOrderFilter}
        history={history}
      />
      {/* Graph Table Start */}
      <Table hover responsive className="table-outline text-break">
        <TabPane tabId={tabConstant.ALL_STORE_TAB} className="w-100">
          <ActiveStore
            defaultGraph={defaultGraph}
            graphData={graphData}
            history={history}
            searchTerm={searchitem}
            params={paramm}
          />
        </TabPane>
      </Table>
      {/* Graph Table End */}
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;

  //Get Active stores
  const ActiveStore =
    reduxTable[activeStore] && reduxTable[activeStore].isFetching == false
      ? reduxTable[activeStore].totalCount
      : 0;
  return {
    ActiveStore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Report);
