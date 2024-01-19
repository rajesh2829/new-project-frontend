import React from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import ObjectName from "../../../helpers/ObjectName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Currency from "../../../lib/Currency";
import StatusText from "../../../components/StatusText";


const BillTab = (props) => {
  let { history, purchase_id, account_id } = props;

  return (
    <>
      <ReduxTable
        id={"bill"}
        disableHeader
        apiURL={`${endpoints().billAPI}/search`}
        params={{
          objectName: ObjectName.BILL,
          purchase_id: purchase_id ? purchase_id : "",
          account_id: account_id ? account_id : ""
        }}
        history={history}
        totalAmount
        message="You can start by clicking on Add New"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
      >
        <ReduxColumn
          field="bill_number"
          width="120px"
          minWidth="120px"
          className="text-center"
          maxWidth="220px"
          type="link"
          sortBy="bill_number"
          isClickable="true"
          renderField={(row) => (
            <Link to={`/bill/detail/${row.id}`}>{row.bill_number}</Link>
          )}>
          Bill#
        </ReduxColumn>
        <ReduxColumn
          field="invoice_number"
          className="text-center"
          width="80px"
          minWidth="100px"
          maxWidth="80px"
          sortBy="invoice_number">
          Invoice Number
        </ReduxColumn>
        <ReduxColumn
          field="bill_date"
          className="text-center"
          width="80px"
          minWidth="100px"
          maxWidth="80px"
          sortBy="bill_date">
          Date
        </ReduxColumn>
        <ReduxColumn
          field="account_name"
          sortBy="account_name"
          minWidth="100px"
          maxWidth="100px">
          Account
        </ReduxColumn>
        <ReduxColumn
          field="net_amount"
          className="text-right"
          renderField={(row) => <span>{Currency.Format(row.net_amount)}</span>}
          width="80px"
          minWidth="110px"
          maxWidth="80px"
          sortBy="net_amount"
        >
          Amount
        </ReduxColumn>

        <ReduxColumn
          field="status"
          sortBy="status"
          width="80px"
          minWidth="110px"
          maxWidth="80px"
          className="brand-all"
          renderField={(row) => (
            <StatusText backgroundColor={row.colorCode} status={row.status} />
          )}>
          Status
        </ReduxColumn>
      </ReduxTable>
    </>
  )

}
export default BillTab;