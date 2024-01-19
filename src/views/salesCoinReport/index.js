import React from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { endpoints } from "../../api/endPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../components/PageTitle";
import UserCard from "../../components/UserCard";
import BreadCrumb from "../../components/Breadcrumb";

const SalesCoinReport = (props) => {

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: "Sales Coin Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <PageTitle label="Sales Coins Report" />
      <ReduxTable
        id="salesCoinReport"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().salesCoinReportAPI}`}
        newTableHeading
        icon={<FontAwesomeIcon icon={faUser} />}
        message="You can start by clicking add."
        history={props.history}
        paramsToUrl={true}
        showUserFilter
        showDateFilter
        sortByDropdown
      >
        <ReduxColumn field="user" sort="user"
          renderField={(row) => (
            <>
              <UserCard
                customSize={parseInt(50, 10)}
                firstName={row.firstName}
                url={row.image}
                lastName={row.lastName}
              />
            </>
          )}
        >
          User
        </ReduxColumn>
        <ReduxColumn className="text-center" field="salesCoinCount" sort="salesCoinCount">
          Sales Coins
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default SalesCoinReport;
