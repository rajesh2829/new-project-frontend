import {
  faBoxOpen,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import PageTitle from "../../components/PageTitle";
import StatisticsCountCard from "../../components/StatisticsCountCard";

const StoreDashboard = () => {
  const [storeCountDetail, setStateCountDetail] = useState();

  useEffect(() => {
    getDashboardCount();
  }, []);

  const getDashboardCount = async () => {
    try {
      const response = await apiClient.get(`${endpoints().storeDasboardAPI}`);
      const data = response && response.data;
      setStateCountDetail(data);
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
          icon={<FontAwesomeIcon icon={faCartShopping} />}
          className={"text-white"}
          label="Orders"
          count={storeCountDetail && storeCountDetail.orderCount}
          redirectUrl="/orders"
        />
        <StatisticsCountCard
          label="Products"
          icon={<FontAwesomeIcon icon={faBoxOpen} />}
          className={"text-white"}
          count={storeCountDetail && storeCountDetail.productCount}
          redirectUrl="/products"
        />
      </div>
    </div>
  );
};

export default StoreDashboard;
