
import React, { useState } from "react";
import { Table, TabPane } from "reactstrap";

// Components
import PageTitle from "../../components/PageTitle";

//css
import "../../scss/_custom.scss";
import Url from "../../lib/Url";

import BreadCrumb from "../../components/Breadcrumb";
import VendorBarChart from "./components/vendorBarChart";
import PurchaseFilter from "./components/Filter";

const activeStore = "activeStore";

const Report = (props) => {
  const param = new URLSearchParams(props.history.location.search);
  const role = param.get("section");
  const search = window.location.search;
  const pathParams = new URLSearchParams(search);
  const searchItem = pathParams.get("search");
  const { history, } = props;

  //Filter
  const [paramm, setParam] = useState({
    vendor: Url.GetParam("vendor") && Url.GetParam("vendor"),
    startDate: Url.GetParam("startDate") && Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate") && Url.GetParam("endDate"),

  });

  const [graphData, setGraphData] = useState();
  const [resetValue, setResetValue] = useState(false);
  const [defaultGraph, setDefaultGraph] = useState(true);


  const handleClose = () => {
    toggleSidebar();
    setParam("");
  };

  // get filter params
  const getFilterParams = (data) => {
    const startDate = Url.GetParam("startDate") ? Url.GetParam("startDate") : "";
    const endDate = Url.GetParam("endDate") ? Url.GetParam("endDate") : "";
    if (startDate) {
      data.startDate = startDate;
    }
    if (endDate) {
      data.endDate = endDate;
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

  const handleFilterChange = async (data, params) => {
    setParam(params);
    setDefaultGraph(false);
    setGraphData(data);
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: "Purchase Summary Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Purchase Summary Report" />
      </div>
      <PurchaseFilter
        initialParam={paramm}
        getFilterParams={(e) => {
          getFilterParams(e);
        }}
        handleClose={handleClose}
        handleFilterChange={handleFilterChange}
        handleReset={handleReset}
        history={history}
      />
      {/* Graph Table Start */}
      <Table hover responsive className="table-outline text-break">
        <TabPane className="w-100">
          <VendorBarChart
            defaultGraph={defaultGraph}
            graphData={graphData}
            history={history}
            params={paramm}
          />
        </TabPane>
      </Table>
      {/* Graph Table End */}
    </>
  );
};

export default Report