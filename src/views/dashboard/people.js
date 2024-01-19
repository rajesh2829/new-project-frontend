import { faBoxOpen, faCartShopping, faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import PageTitle from "../../components/PageTitle";
import StatisticsCountCard from "../../components/StatisticsCountCard";
import { isBadRequest } from "../../lib/Http";

const PeopleDashboard = () => {

  const [countDetail, setCountDetail] = useState();

  useEffect(() => {
    getDashboardCount();
  }, []);

  const getDashboardCount = async () => {
    try {
      const response = await apiClient.get(`${endpoints().storeDasboardAPI}`);
      const data = response && response.data;
      setCountDetail(data);
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  return (
    <div>
      <PageTitle label="Dashboard" />
      <div
        className={["d-flex mx-4 justify-content-start"].join(" ")}
      >
        <StatisticsCountCard
          label="Attendance"
          icon={<FontAwesomeIcon icon={faClipboardList} />}
          className={"text-white"}
          count={countDetail && countDetail.attendanceCount}
          redirectUrl="/attendance"
        />
        <StatisticsCountCard
          icon={<FontAwesomeIcon icon={faUser} />}
          className={"text-white"}
          label="Users"
          count={countDetail && countDetail.userCount}
          redirectUrl="/users"
        />

      </div>
    </div>
  );
};

export default PeopleDashboard;
