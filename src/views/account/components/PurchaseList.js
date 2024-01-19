import React from "react";
import { Link } from "react-router-dom";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import Currency from "../../../lib/Currency";


const PurchaseList = (props) => {
    const { id, params, apiURL, showPurchaseNumber, showPurchaseOrderNumber, dateField, dateSort, sortByOptions, history } = props;

    return (
        <>
            <ReduxTable
                id={id}
                newTableHeading
                searchPlaceholder="Search"
                apiURL={apiURL}
                sortByOptions={sortByOptions}
                params={params}
                history={history}
                paramsToUrl={true}
                showDateFilter
                totalAmount={props.totalAmount}
            >
                {showPurchaseNumber && <ReduxColumn
                    field="purchaseNumber"
                    sortBy="purchase_number"
                    className="text-center"
                    renderField={(row) => (
                        <Link to={`/purchase/${row.id}`}>{row.purchaseNumber}</Link>
                    )}
                >
                    Purchase#
                </ReduxColumn>}
                {showPurchaseOrderNumber && <ReduxColumn
                    field="purchase_order_number"
                    sortBy="purchase_order_number"
                    className="text-center"
                    renderField={(row) => (
                        <Link to={`/purchaseOrder/detail/${row.id}`}>
                            {row.purchase_order_number}
                        </Link>
                    )}
                >
                    PO#
                </ReduxColumn>}
                <ReduxColumn
                    field={dateField}
                    className="text-center"
                    sortBy={dateSort}
                >
                    Date
                </ReduxColumn>
                <ReduxColumn
                    field="net_amount"
                    className="text-right"
                    sortBy="amount"
                    renderField={(row) => (
                        <span>{Currency.Format(row.net_amount)}</span>
                    )}
                >
                    Amount
                </ReduxColumn>

            </ReduxTable>
        </>
    );
}

export default PurchaseList;