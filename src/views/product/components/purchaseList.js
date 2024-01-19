import React from "react";
import { endpoints } from "../../../api/endPoints";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import Currency from "../../../lib/Currency";
import DateTime from "../../../lib/DateTime";
import { Link } from "react-router-dom";

const PurchaseList = (props) => {

    const { product_id } = props;
    const sortByOptions = [
        {
            value: "id:DESC",
            label: "Most Recent",
        },
    ];

    return (
        <>
            <ReduxTable
                id="purchase"
                apiURL={`${endpoints().purchaseProductAPI}/search`}
                params={{ product_id: product_id }}
                showHeader
                newTableHeading
                searchPlaceholder="Search"
                sortByOptions={sortByOptions}
            >
                <ReduxColumn
                    field="purchase_number"
                    className="text-center"
                    renderField={(row) => (
                        <Link to={`/purchase/${row.purchase_id}`}
                            target="_blank"
                        >{row.purchase_number}</Link>
                    )}
                >
                    Purchase#
                </ReduxColumn>
                <ReduxColumn
                    field="purchase_date"
                    sortBy="purchase_date"
                    className="text-center"
                    renderField={(row) => <span>{DateTime.getDate(row.purchase_date)}</span>}
                >
                    Date
                </ReduxColumn>
                <ReduxColumn
                    field="vendor_name"
                    sortBy="vendor_name"
                    className="text-center"
                >
                    Vendor Name
                </ReduxColumn>
                <ReduxColumn
                    field="quantity"
                    sortBy="quantity"
                    className="text-center"
                >
                    Quantity
                </ReduxColumn>
                <ReduxColumn
                    field="unit_price"
                    sortBy="unit_price"
                    className="text-right"
                    renderField={(row) => (
                        <span>{Currency.Format(row.unit_price)}</span>
                    )}
                >
                    Unit Price
                </ReduxColumn>
                <ReduxColumn
                    field="amount"
                    sortBy="amount"
                    className="text-right"
                    renderField={(row) => (
                        <span>{Currency.Format(row.netAmount)}</span>
                    )}
                >
                    Amount
                </ReduxColumn>
            </ReduxTable>
        </>
    );
}


export default PurchaseList;