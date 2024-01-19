import React, { useEffect, useRef, useState } from "react";

// Components
import PageTitle from "../../components/PageTitle";

// End Points
import { endpoints } from "../../api/endPoints";

// API client
import { apiClient } from "../../apiClient";

import ReportTable from "./ReportTable";
import BreadCrumb from "../../components/Breadcrumb";
import Url from "../../lib/Url";
import AttendanceReportFilter from "./AttendanceReportFilter";

const attendanceReport = (props) => {
  const [detail, setDetail] = useState([]);
  const [detailValue, setDetailValue] = useState([]);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(Url.GetParam("pageSize"));

  useEffect(() => {
    getDetails(params);
  }, [page]);

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/attendanceReport" },
    {
      label: "Reports",
      link: "/Reports"
    },
    {
      label: "Attendance Report",
      link: ""
    }
  ];

  const getDetails = async (params) => {
    setIsLoading(true);

    const queryString = [];
    let apiUrl;
    if (params) {
      Object.keys(params).forEach((param) => {
        queryString.push(`${param}=${params[param]}`);
      });
    }

    if (queryString && queryString.length > 0) {
      apiUrl = `${endpoints().attendanceReportAPI}?${queryString.join(
        "&"
      )}`;
    } else {
      apiUrl = `${endpoints().attendanceReportAPI}`;
    }

    const response = await apiClient.get(apiUrl);

    setDetail(response.data.data);
    setDetailValue(response.data);
    setIsLoading(false);
  };

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-2">
        <PageTitle label="Attendance Report" />
      </div>

      <div className="card card-body">
        <AttendanceReportFilter
          getDetails={getDetails}
          setPage={setPage}
          setPageSize={setPageSize}
          setParams={setParams}
          pageSize={pageSize}
          params={params}
          history={props.history}
        />
      </div>

      <div>
        <ReportTable
          detail={detail}
          detailValue={detailValue}
          setPage={setPage}
          page={page}
        />
      </div>
    </>
  );
};

export default attendanceReport;
