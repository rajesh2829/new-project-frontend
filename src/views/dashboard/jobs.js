import { faAddressCard, faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import PageTitle from "../../components/PageTitle";
import StatisticsCountCard from "../../components/StatisticsCountCard";
import { isBadRequest } from "../../lib/Http";

const JobsDashboard = () => {

  const [countDetail, setCountDetail] = useState();

  useEffect(() => {
    getDashboardCount();
  }, []);

  const getDashboardCount = async () => {
    try {
      const response = await apiClient.get(`${endpoints().jobDasboardAPI}/Job`);
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
          icon={<FontAwesomeIcon icon={faAddressCard} />}
          className={"text-white"}
          label="Jobs"
          count={countDetail && countDetail.jobCount}
          redirectUrl="/jobs/jobslist"
        />
      </div>
    </div>
  );
};

export default JobsDashboard;
