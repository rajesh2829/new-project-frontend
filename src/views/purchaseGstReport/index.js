import React, { useEffect, useState } from "react";

// Components
import Spinner from "../../components/Spinner";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/Breadcrumb";
import PurchaseReportFilter from "./purchaseGstFilter";
import Table from "./Table";

// End Points
import { endpoints } from "../../api/endPoints";

// API client
import { apiClient } from "../../apiClient";

import Url from "../../lib/Url";

const PurchaseGstReport = (props) => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate")
  });
  const [detailData, setDetailData] = useState([]);
  const [detailValue, setDetailValue] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/account/dashboard" },
    {
      label: "Reports",
      link: "/accountReports"
    },
    {
      label: "Purchase GST Report",
      link: ""
    }
  ];

  const getDetails = async () => {
    let params = {};
    params.startDate = Url.GetParam("startDate");
    params.endDate = Url.GetParam("endDate");
    setIsLoading(true);

    const queryString = [];
    let response;
    if (params) {
      Object.keys(params).forEach((param) => {
        queryString.push(`${param}=${params[param]}`);
      });
    }
    if (queryString && queryString.length > 0) {
      response = await apiClient.get(
        `${endpoints().purchaseGstReportAPI}/search?${queryString.join("&")}`
      );
    }
    setDetailData(response.data.data);
    setDetailValue(response.data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="row mx-1 justify-content-between mb-2">
        <PageTitle label="Purchase GST Report" />
      </div>

      <div className="card ">
        <PurchaseReportFilter
          getDetails={getDetails}
          setParams={setParams}
          params={params}
          history={props.history}
        />
      </div>

      <div>
        <Table
          detail={detailData}
          setPage={setPage}
          page={page}
          detailValue={detailValue}
        />
      </div>
    </>
  );
};

export default PurchaseGstReport;
