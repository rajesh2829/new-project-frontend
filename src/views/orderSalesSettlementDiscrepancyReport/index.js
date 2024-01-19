import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
//Config
import { endpoints } from "../../api/endPoints";
import ProductCard from "../product/components/productCard";
import BreadCrumb from "../../components/Breadcrumb";
import UserShiftDate from "./UserShiftDate";


import Currency from "../../lib/Currency";
import NumberDisplay from "../../components/NumberDisplay";
const orderSalesSettlementDiscrepancyReport = (props) => {
  const { history } = props;

  //Sort By Option Values
  const sortByOption = [
    {
      value: "location:Asc",
      label: "location",
    },
     {
      value: "shift:Asc",
      label: "Shift",
    }
  ];

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: " Order And Sales Settlement Discrepancy Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />

      <div className="row mx-1 justify-content-between mb-2">
        <PageTitle label="Order And Sales Settlement Discrepancy Report" />
      </div>
      <ReduxTable
        id="orderSalesSettlementDiscrepancyReport"
        searchPlaceholder="Search"
        newTableHeading
        showHeader
        apiURL={`${endpoints().orderSalesSettlementAPI}/search`}
        sortByOptions={sortByOption}
        paramsToUrl={true}
        history={history}
        params={{}}
        showStoreFilter
        showUserFilter
        showDateFilter
        showShiftFilter
      >
        <ReduxColumn field="location" sortBy="location"
          disableOnClick
          renderField={(row) => (
            <UserShiftDate
              data={row}
            />
          )}
          className="text-center">
          Location
        </ReduxColumn>

        <ReduxColumn
          field="totalOrderCash"
          disableOnClick
          className="text-right"
          renderField={(row) => (
            <span>{Currency.Format(row.totalOrderCash)}</span>
          )}
        >
          Total Order Amount(Cash)
        </ReduxColumn>

        <ReduxColumn
          field="totalSaleCash"
          className="text-right"
          disableOnClick
          renderField={(row) => (
            <span>{Currency.Format(row.totalSaleCash)}</span>
          )}
        >
          Total SalesSettlement Amount (Cash)
        </ReduxColumn>

        <ReduxColumn
          field="total_discrepancy_cash"
          className="text-right"
          disableOnClick
          renderField={(row) => (
            <NumberDisplay number={row.total_discrepancy_cash} />

          )}
        >
          Total Discrepancy Cash
        </ReduxColumn>
        <ReduxColumn
          field="totalOrderUpi"
          className="text-right"
          disableOnClick
          renderField={(row) => (
            <span>{Currency.Format(row.totalOrderUpi)}</span>
          )}
        >
          Total Order Amount(Upi)
        </ReduxColumn>


        <ReduxColumn
          field="totalSaleUpi"
          className="text-right"
          disableOnClick
          renderField={(row) => (
            <span>{Currency.Format(row.totalSaleUpi)}</span>
          )}
        >
          Total SalesSettlement Amount (Upi)
        </ReduxColumn>
        <ReduxColumn
          field="total_discrepancy_upi"
          className="text-right"
          disableOnClick
          renderField={(row) => (
            <NumberDisplay number={row.total_discrepancy_upi} />
          )}
        >
          Total Discrepancy Upi
        </ReduxColumn>
        <ReduxColumn
          field="totalDraftOrderAmount"
          className="text-right"
          disableOnClick
          renderField={(row) => (
            <span>{Currency.Format(row.totalDraftOrderAmount)}</span>
          )}
        >
          Total Draft Order Amount
        </ReduxColumn>
      </ReduxTable>

    </>
  );
};

export default orderSalesSettlementDiscrepancyReport;
