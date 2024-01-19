import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { endpoints } from '../../../api/endPoints'
import ReduxTable, { ReduxColumn } from '../../../components/reduxTable'
import ObjectName from '../../../helpers/ObjectName'
import Currency from '../../../lib/Currency'
import AccountEntryService from '../../../services/AccountEntryService'

const BillList = (props) => {
  const { row, toggle } = props
  const id = row.id

  const dispatch = useDispatch();

  const billUpdate = async (bill_id) => {
    try {
      const data = new FormData();
      data.append("bill_id", bill_id);
      dispatch(await AccountEntryService.update(id, data,))
      toggle(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ReduxTable
        disableHeader
        id={"bill"}
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        apiURL={`${endpoints().billAPI}/search`}
        params={{
          objectName: ObjectName.BILL
        }}
        paramsToUrl={true}
        history={props.history}
        message="You can start by clicking on Add New"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
      >
        <ReduxColumn
          field="bill_number"
          width="80px"
          minWidth="80px"
          className="text-center"
          maxWidth="220px"
          type="link"
          sortBy="bill_number"
          isClickable="true"
          renderField={(row) => (
            <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => billUpdate(row.bill_number)}>{row.bill_number}</span>
          )}>

          Bill#
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
      </ReduxTable>

    </div>
  )
}

export default BillList