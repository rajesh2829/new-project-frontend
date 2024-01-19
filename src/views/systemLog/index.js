import React, { useEffect, useState } from "react";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";

//Config
import { endpoints } from "../../api/endPoints";
import Url from "../../lib/Url";

import DateTime from "../../lib/DateTime"
import UserCard from "../../components/UserCard";
import { Link } from "react-router-dom";
import ObjectName from "../../helpers/ObjectName";

const SystemLog = (props) => {

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  return (
    <>
      {/* /.page-heading */}
      <PageTitle
        label="System Logs"
      />
      <div className="mt-4">
        <ReduxTable
          id="systemLog"
          showHeader
          searchPlaceholder="Search"
          paramsToUrl={true}
          history={props.history}
          apiURL={`${endpoints().systemLogAPI}`}
          newTableHeading
          params={{
            pageSize: Url.GetParam("pageSize"),
          }}
          sortByOptions={sortByOption}
          showUserFilter
          ShowObjectNameFilter
          showDateFilter
        >
          <ReduxColumn
            field="id"
            sortBy="id"
            width="140px"
          >
            Id
          </ReduxColumn>
          <ReduxColumn
            field="createdAt"
            sortBy="createdAt"
            width="140px"
            renderField={(row) => (
              <span>{DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}</span>
            )}
          >
            Date
          </ReduxColumn>
          <ReduxColumn
            className="text-wrap"
            field="userName" sortBy="user_id" width="200px"
            renderField={(row) => (
              <>

                <UserCard
                  customSize={parseInt(50, 10)}
                  firstName={row.first_name}
                  url={row.media_url}
                />

              </>
            )}
          >
            User
          </ReduxColumn>
          <ReduxColumn field="object_name" sortBy="object_name" width="90px" minwidth="140px" maxwidth="100px" >
            Object Name
          </ReduxColumn>
          <ReduxColumn field="objectId" className="text-center" sortBy="object_id" width="140px"
            renderField={(row) => (
              <Link to={row.object_name === ObjectName.ACTIVITY_TYPE 
                ? `/setting/ActivityTypes/${row.objectId}` 
                : row.object_name === ObjectName.ORDER 
                ? `/order/${row.objectId}` 
                : row.object_name === ObjectName.PRODUCT 
                ? `/product/${row.objectId}` 
                : row.object_name === ObjectName.USER 
                ? `/user/${row.objectId}` 
                : row.object_name === ObjectName.FINE 
                ? `/fine/${row.objectId}` 
                : row.object_name === ObjectName.SHIFT 
                ? `/setting/Shifts/${row.objectId}` 
                : row.object_name === ObjectName.PAYMENT
                ? `/payment/detail/${row.objectId}` 
                : row.object_name === ObjectName.LOCATION 
                ? `/location/${row.objectId}` 
                : row.object_name === ObjectName.ACCOUNT_ENTRY
                ? `/accountsEntry/details/${row.objectId}` 
                : row.object_name === ObjectName.ATTENDANCE 
                ? `/attendance/${row.objectId}`
                : row.object_name === ObjectName.BILL 
                ? `/bill/detail/${row.objectId}` 
                : row.object_name === ObjectName.PAYMENT_ACCOUNT 
                ? `/paymentAccount/detail?id=${row.objectId}` 
                : row.object_name === ObjectName.CATEGORY 
                ? `/category/${row.objectId}` 
                : row.object_name === ObjectName.CUSTOMER 
                ? `/customers/${row.objectId}` 
                : row.object_name === ObjectName.ORDER_PRODUCT 
                ? `/order/${row.objectId}` 
                : row.object_name === ObjectName.PROJECT 
                ? `/project/${row.objectId}`
                : row.object_name === ObjectName.PURCHASE 
                ? `/purchase/${row.objectId}` 
                : row.object_name === ObjectName.PURCHASE_ORDER
                ? `/purchaseOrder/detail/${row.objectId}` 
                : row.object_name === ObjectName.SALE_SETTLEMENT 
                ? `/SaleSettlement/${row.objectId}` 
                : row.object_name === ObjectName.SALARY 
                ? `/salary/detail/${row.objectId}` 
                : row.object_name === ObjectName.SCHEDULER_JOB 
                ? `/schedulerJobs/detail/${row.objectId}` 
                : row.object_name === ObjectName.SHIFT 
                ? `/setting/Shifts/${row.objectId}`
                : row.object_name === ObjectName.SPRINT 
                ? `/Sprint/${row.objectId}` 
                : row.object_name === ObjectName.STOCK_ENTRY 
                ? `/stockEntry/${row.objectId}` 
                : row.object_name === ObjectName.TICKET_TASK 
                ? `ticket/details/${row.objectId}` 
                : row.object_name === ObjectName.TRANSFER 
                ? `/transfer/${row.objectId}` 
                : row.object_name === ObjectName.TRANSFER_TYPE 
                ? `/setting/Transfer/type/${row.objectId}` 
                : row.ObjectName === ObjectName.ACTIVITY 
                ? `/activity/detail/${row.objectId}`
                : row.object_name === ObjectName.MEDIA 
                ? `/media/detail/${row.objectId}`
                : row.object_name === ObjectName.COMPANY 
                ? `/supportPortal/company/detail/${row.objectId}`
                : row.Object_name === ObjectName.PAGE 
                ? `/pages/pagelist/detail/${row.objectId}`
                : row.object_name === ObjectName.ACTIVITY 
                ? `/activity/detail/${row.objectId}`
                : row.object_name === ObjectName.VENDOR && `/vendor/${row.objectId}`
              }
              >
                {row.objectId}
              </Link>
            )}
          >
            Object ID
          </ReduxColumn>
          <ReduxColumn field="message" sortBy="message" minwidth="100px" width="140px">
            Message
          </ReduxColumn>

        </ReduxTable>
      </div>
    </>
  );
};
export default SystemLog;
