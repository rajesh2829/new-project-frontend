import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { endpoints } from "../../api/endPoints";
import AvatarCard from "../../components/AvatarCard";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Url from "../../lib/Url";
import DateTime from "../../lib/DateTime";

const StockEntryReport = (props) => {

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/Report",
    },
    {
      label: "StockEntry Report",
      link: "",
    },
  ];

  const sortByOption = [
    {
      value: "product_count",
      label: "Product Count",
    },
    {
      value: "name",
      label: "Name",
    },
    {
      value: "date:DESC",
      label: "Date",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="row mx-1 justify-content-between mb-2">
        <PageTitle label="StockEntry Report" />
      </div>
      <ReduxTable
        id="stockEntryReport"
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        apiURL={`${endpoints().stockEntryReportApi}/search`}
        params={{
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
          location: Url.GetParam("location"),
          startDate: Url.GetParam("startDate"),
          endDate: Url.GetParam("endDate"),
        }}
        paramsToUrl={true}
        history={props.history}
        sortByOptions={sortByOption}
        showDateFilter
        showStoreFilter
        showUserFilter
        showShiftFilter
        message="You can start by clicking on Add New"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
      >
        <ReduxColumn
          field="date"
          sortBy="date"
          className="text-center"
          renderField={(row) => <span>{DateTime.getDate(row.date)}</span>}
        >
          Date
        </ReduxColumn>

        <ReduxColumn
          field="user_name"
          sortBy="name"
          renderField={(row) => (
            <>
              <div className="d-flex text-break">
                <AvatarCard
                  id="avatar"
                  firstName={row.first_name}
                  lastName={row.last_name}
                  url={row.media_url}
                />
              </div>
            </>
          )}
        >
          User
        </ReduxColumn>

        <ReduxColumn field="location" sortBy="location">
          Location
        </ReduxColumn>

        <ReduxColumn
          field="product_count"
          sortBy="product_count"
          className="text-center"
        >
          Product Count
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default StockEntryReport;
