import React from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { endpoints } from "../../api/endPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb";
import DateTime from "../../lib/DateTime";
import Currency from "../../lib/Currency";
import AvatarCard from "../../components/AvatarCard";
import { Order } from "../../helpers/Order";

const OrderReport = (props) => {

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: "Order Report",
      link: "",
    },
  ];

  return (
    <>
    <BreadCrumb list={breadcrumbList} />
    <PageTitle label="Order Report"/>
      <ReduxTable
        id="orderReport"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().orderReportAPI}`}
        newTableHeading
        icon={<FontAwesomeIcon icon={faUser} />}
        message="You can start by clicking add."
        history={props.history}
        paramsToUrl={true}
        showDateFilter
        showStoreFilter
        sortByDropdown
        showUserFilter
        showShiftFilter
      >
        <ReduxColumn field="order_number" sortBy="order_number" className="text-center"
          renderField={(row) => (
            <Link to={row?.type && row?.type == Order.TYPE_DELIVERY ? `/deliveryOrder/${row.id}` : `/order/${row.id}`}>{row.order_number}</Link>
          )}
        >
          Order#
        </ReduxColumn>
        <ReduxColumn className="text-center" field="date" sortBy="date" renderField={(row) => <>{DateTime.getDate(row.date)}</>}>
          Date
        </ReduxColumn>
        <ReduxColumn field="location" sortBy="location" className="text-center"
        >
          Location
        </ReduxColumn>
        <ReduxColumn
          field="salesExecutive"
          className="ellipsis"
          sortBy="salesExecutive"
          renderField={(row) => (
            <>
              <AvatarCard
                firstName={row?.firstName}
                lastName={row?.lastname}
                url={row?.image_url}
              />
            </>
          )}
        >
          Sales Executive
        </ReduxColumn>
        <ReduxColumn field="shift" sortBy="shift" className="text-center"
        >
          Shift
        </ReduxColumn>
        <ReduxColumn field="total_amount" sortBy="total_amount"
         renderField={(row) => (
            <span className="float-right">{Currency.Format(row.total_amount)}</span>
          )}
        >
          Amount
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default OrderReport;
