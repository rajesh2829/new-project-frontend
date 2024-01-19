import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { endpoints } from "../../api/endPoints";
import PageTitle from "../../components/PageTitle";
import AvatarCard from "../../components/AvatarCard";
import BreadCrumb from "../../components/Breadcrumb";
import { Collapse } from "reactstrap"; // Import the Collapse component
import UserCard from "../../components/UserCard";

const orderCancelledReport = (props) => {
  let { history } = props;
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report"
    },
    {
      label: "Order Cancelled Report",
      link: ""
    }
  ];

  const [activeAccordion, setActiveAccordion] = useState({});

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
      <PageTitle label="Order Cancelled Report" />
      <ReduxTable
        id={"orderCancelledReport"}
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        icon={<FontAwesomeIcon icon={faTruck} />}
        message="You can start by clicking on Add New"
        apiURL={`${endpoints().orderCancelledReportAPI}/search`}
        params={{}}
        history={history}
        paramsToUrl={true}
        showDateFilter
        showStoreFilter
        showShiftFilter
        showSalesExecutiveFilter
        sortByDropdown
      >
        <ReduxColumn
          minWidth="170px"
          isClickable={false}
          className="text-left"
          field="location"
          sortBy="location"
          renderField={(row) => (
            <span>
              {row.locationName}
            </span>
          )}
        >
          Location 
        </ReduxColumn>
        <ReduxColumn
          minWidth="170px"
          isClickable={false}
          className="text-center"
          field="location"
          sortBy="location"
          renderField={(row) => (
            <>
              <UserCard
                firstName={row.firstName}
                lastName={row.lastName}
                url={row.media_url}
              />
            </>
          )}
        >
          Name 
        </ReduxColumn>
        <ReduxColumn
          minWidth="170px"
          isClickable={false}
          className="text-center"
          field="totalCount"
          sortBy="count"
          renderField={(row) => (
            <span>
              {row.count}
            </span>
          )}
          >
          Count
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

export default orderCancelledReport;
