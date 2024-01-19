import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { endpoints } from "../../api/endPoints";
import PageTitle from "../../components/PageTitle";
import DateTime from "../../lib/DateTime";
import AvatarCard from "../../components/AvatarCard";
import ProductCard from "../product/components/productCard";
import BreadCrumb from "../../components/Breadcrumb";
import { Collapse } from "reactstrap"; // Import the Collapse component

const orderProductCancelledReport = (props) => {
  let { history } = props;
  const [activeAccordion, setActiveAccordion] = useState({});

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: "Order Product Cancelled Report",
      link: "",
    },
  ];

  const toggleCollapse = (dataListId) => {
    setActiveAccordion((prevAccordion) => {
      return {
        ...prevAccordion,
        [dataListId]: !prevAccordion[dataListId]
      };
    });
  };

  return (
    <div>
      <BreadCrumb list={breadcrumbList} />
      <PageTitle label="Order Product Cancelled Report" />
      <ReduxTable
        id={"orderProductCancelledReport"}
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        icon={<FontAwesomeIcon icon={faTruck} />}
        message="You can start by clicking on Add New"
        apiURL={`${endpoints().orderProductCancelledReportAPI}/search`}
        params={{}}
        history={history}
        paramsToUrl={true}
        showDateFilter
        showStoreFilter
        sortByDropdown
        showProductFilter
      >
        <ReduxColumn field="location" sortBy="name" >
          Location
        </ReduxColumn>
        <ReduxColumn
          minWidth="170px"
          isClickable={false}
          className="text-center"
          field="count"
        >
          Count
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

export default orderProductCancelledReport;
