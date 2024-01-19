import React from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import BreadCrumb from "../../components/Breadcrumb";
import { endpoints } from "../../api/endPoints";
import Currency from "../../lib/Currency";

const AccountEntryReportList = (props) => {
  const { history } = props;

  const sortOptions = [
    {
      value: "name:ASC",
      label: "Name",
    },
  ];

  // Breadcrumb list
  const breadcrumbList = [
    { label: "Home", link: "/account/dashboard" },
    { label: "Report", link: "/accountReports" },
    { label: "AccountEntryReport", link: "" },
  ];

  return (
    <div>
      <BreadCrumb list={breadcrumbList} />

      <ReduxTable
        id="accountEntryReport"
        sortByOptions={sortOptions}
        showHeader
        newTableHeading
        showDateFilter
        showTagFilter
        tagPlaceholder="Select Category"
        tagFilterType={{
          type: "Account Entry Category",
        }}
        apiURL={`${endpoints().accountEntryReportAPI}/search`}
        message="You can start by clicking Add New"
        paramsToUrl={true}
        params={{
          type: "Account Entry Category",
        }}
        history={history}
        searchPlaceholder="Search"
      >
        <ReduxColumn
          field="name"
          width="200px"
          maxWidth="170px"
          minWidth="170px"
        >
          Category
        </ReduxColumn>
        <ReduxColumn
          field="amount"
          width="200px"
          maxWidth="170px"
          minWidth="170px"
          className="text-right"
          renderField={(row) => <span>{Currency.Format(row.amount)}</span>}
        >
          Amount
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

export default AccountEntryReportList;
