import React, { useEffect, useState } from "react";

// Components
import ReportTable from "./components/ReportTable";
import Spinner from "../../components/Spinner";
import ReportFilter from "./components/reportFilter";
import UserCard from "../../components/UserCard";
import PageTitle from "../../components/PageTitle";

// End Points
import { endpoints } from "../../api/endPoints";

// API client
import { apiClient } from "../../apiClient";

// Lib
import Url from "../../lib/Url";
import ArrayList from "../../lib/ArrayList";

// helpers
import { User } from "../../helpers/User";
import BreadCrumb from "../../components/Breadcrumb";

const AttendanceSummaryReport = (props) => {
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(Url.GetParam("pageSize"));
  const [totalCount, setTotalCount] = useState();
  const [params, setParams] = useState({});
  const [param, setParam] = useState({});

  useEffect(() => {
    getDetails(params);
  }, [page]);

  if (isLoading) {
    return <Spinner />;
  }
  const getDetails = async (values) => {
    let params = {};
    params.user_id = values?.user_id ? values?.user_id : Url.GetParam("user_id");
    params.startDate = values?.startDate ? values?.startDate : Url.GetParam("startDate");
    params.endDate = values?.endDate ? values?.endDate : Url.GetParam("endDate");
    params.page = page ? page : ""
    params.pageSize = Url.GetParam("pageSize")
    params.pagination = true
    try {
      const queryString = [];
      let response;
      if (params) {
        Object.keys(params).forEach((param) => {
          queryString.push(`${param}=${params[param]}`);
        });
      }
      if (queryString && queryString.length > 0) {
        response = await apiClient.get(
          `${endpoints().attendanceAPI}/search?${queryString.join("&")}`
        );
      }

      let paramdata = response.data;
      setPageSize(paramdata?.pageSize)
      setTotalCount(paramdata?.totalCount);
      let data = response.data.data;

      // setParams(response.data)
      let attendance = [];
      if (ArrayList.isNotEmpty(data)) {
        data.forEach((list) => {
          const userNames = (
            <UserCard
              first_name={list.userName}
              lastName={list.LastName}
              firstName={list.firstName}
              media_url={list.media_url}
            />
          );

          attendance.push({
            userName: userNames,
            id: list.user,
            total: list.total,
            absent: list.absent,
            leave: list.leave,
            additional: list.additional,
            status: list.status,
            worked: list.worked,
            name: list.userName,
            late_hours: list.late_hours,
            additional_hours: list.additional_hours,
            startDate: list.startDate,
            endDate: list.endDate,
          });
        });
      }
      const getReportList = attendance.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setDetail(getReportList);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const breadcrumbList = [
    { label: "Home", link: "/attendanceSummaryReport" },
    {
      label: "Reports",
      link: "/Reports",
    },
    {
      label: "Attendance Summary Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Attendance Summary Report" />
      </div>
      <ReportFilter
        history={props.history}
        initialParam={param}
        handleChange={getDetails}
        setPage={setPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
        props={props}
      />
      <ReportTable
        detail={detail}
        setPage={setPage}
        page={page}
        params={params}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  );
};

export default AttendanceSummaryReport;
