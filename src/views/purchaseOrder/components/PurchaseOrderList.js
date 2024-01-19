import React, { useState } from "react";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
import DateTime from "../../../lib/DateTime";
import { Link } from "react-router-dom";
import PurchaseOrder from "../../../helpers/PurchaseOrder";
import Currency from "../../../lib/Currency";
import Url from "../../../lib/Url";
import StatusText from "../../../components/StatusText";

const PurchaseOrdersList = (props) => {
  const {
    history,
    id,
    sortByOption,
    status,
    toggleSidebar,
    showStatus,
    objectName,
    params,
  } = props;
  return (
    <>
      <div className="tab-content-wrapper">
        <div className="mt-4">
          <ReduxTable
            id={id}
            newTableHeading
            searchPlaceholder="Search Purchase Order"
            icon={<FontAwesomeIcon icon={faBoxesPacking} />}
            apiURL={`${endpoints().purchaseOrderAPI}/search`}
            history={history}
            sortByOptions={sortByOption}
            paramsToUrl={true}
            selectedPageSize={Url.GetParam("pageSize")}
            // setPage={setPage}
            buttonOnClick={toggleSidebar}
            params={{
              // page : page ? page : PAGE,
              pageSize: Url.GetParam("pageSize"),
              objectName: objectName,
              vendor: params && params.vendor
            }}
            showHeader
            showStatusFilter
            showAccountFilter
            objectName={objectName}
            showDateFilter
          >
            <ReduxColumn
              className="text-center"
              field="purchase_order_number"
              sortBy="purchase_order_number"
              isClickable="true"
              type="link"
              width="110px"
              maxWidth="110px"
              minWidth="110px"
              renderField={(row) => (
                <Link to={`/purchaseOrder/detail/${row.id}`}>
                  {row.purchase_order_number}
                </Link>
              )}
            >
              PO#
            </ReduxColumn>
            <ReduxColumn
              sortBy="date"
              width="110px"
              maxWidth="110px"
              minWidth="110px"
              className="text-center"
              renderField={(row) => <span>{DateTime.getDate(row.date)}</span>}
            >
              Date
            </ReduxColumn>

            <ReduxColumn
              field="vendor_name"
              sortBy="vendor_name"
              width="110px"
              maxWidth="110px"
              minWidth="110px"
              className="text-center"
            >
              Vendor
            </ReduxColumn>
            <ReduxColumn
              field="amount"
              sortBy="amount"
              width="110px"
              maxWidth="110px"
              minWidth="110px"
              className="text-center"
              renderField={(row) => <span>{Currency.Format(row.amount)}</span>}
            >
              Amount
            </ReduxColumn>
            <ReduxColumn
              sortBy="delivery_date"
              width="110px"
              maxWidth="110px"
              minWidth="110px"
              className="text-center"
              renderField={(row) => <span>{row.delivery_date}</span>}
            >
              Delivery Date
            </ReduxColumn>
            <ReduxColumn
              className="ellipsis text-left"
              field="description"
              sortBy="description"
            >
              Description
            </ReduxColumn>
            {/* Owner column */}
            <ReduxColumn
              className="ellipsis text-left"
              field="owner_name"
              sortBy="owner_name"
            >
              Owner
            </ReduxColumn>
            {showStatus && (
              <ReduxColumn
                field="status"
                sortBy="status"
                width="110px"
                maxWidth="110px"
                minWidth="110px"
                renderField={(row) => (
                  <StatusText backgroundColor={row.statusColor} status={row.status} />
                )}
              >
                Status
              </ReduxColumn>
            )}
          </ReduxTable>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrdersList;
