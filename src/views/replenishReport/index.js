import React from "react";
import { endpoints } from "../../api/endPoints";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import UserCard from "../../components/UserCard";
import DateTime from "../../lib/DateTime";
import BreadCrumb from "../../components/Breadcrumb";

const replenishReportPage = (props) => {
  let { history } = props;

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: "Replenish Report",
      link: "",
    },
  ];
  
  return (
    <div>
      <BreadCrumb list={breadcrumbList} />
      <ReduxTable
        id="replenishReport"
        showHeader
        newTableHeading
        apiURL={`${endpoints().replenishReportAPI}/search`}
        searchPlaceholder="Search"
        paramsToUrl={true}
        history={history}
        sortByDropdown
        params={{}}
        showSingleDateFilter
        showUserFilter
      >
        <ReduxColumn field="date" sortBy="date" className="text-center"  renderField={(row) => <>{DateTime.getDate(row.date)}</>}>
          Date
        </ReduxColumn>
        <ReduxColumn
          field="user"
          sortBy="user"
          renderField={(row) => (
            <UserCard
              firstName={row?.first_name}
              url={row?.media_url}
              lastName={row?.last_name}
            />
          )}
        >
          User
        </ReduxColumn>
        <ReduxColumn field="product_count" sortBy="product_count" className="text-center" renderField={(row) => (
           `${row.product_count}(${row.count})`
          )}>
          Product Count(Transfer Count)
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

export default replenishReportPage;
