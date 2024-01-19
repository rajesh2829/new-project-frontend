import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
// Endpoints
import { endpoints } from "../../../api/endPoints";
// Lib
import Currency from "../../../lib/Currency";
// Helpers
import ObjectName from "../../../helpers/ObjectName";
// services
import StatusService from "../../../services/StatusService";
// Font Awesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import StatusText from "../../../components/StatusText";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
const BillList = (props) => {
  const { history, section, StoreSelectModal, setRowValue, apiUrl } = props;
  const [statusList, setStatusList] = useState([]);
  useEffect(() => {
    getStatus();
  }, []);

  //Sort By Option Values
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "account_name:ASC",
      label: "Name",
    },
  ];

  const getStatus = async () => {
    const status = await StatusService.search(ObjectName.BILL, "");
    const value = [];
    status.forEach((statusValue) => {
      value.push({
        value: statusValue.label,
        label: statusValue.label,
        id: statusValue.value,
      });
      setStatusList(value);
    });
  };

  return (
    <>
      <ReduxTable
        id={"bill"}
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        apiURL={apiUrl ? apiUrl : `${endpoints().billAPI}/search`}
        params={{
          section: section ? section : "",
          objectName: ObjectName.BILL,
        }}
        paramsToUrl={true}
        history={history}
        sortByOptions={sortByOption}
        totalAmount
        message="You can start by clicking on Add New"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        statusOption={statusList}
        showStatusFilter
        showDateFilter
        showAccountFilter
        showGstStatusFilter
        objectName={ObjectName.BILL_GST_STATUS}
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
          )}
        >
          Bill#
        </ReduxColumn>
        <ReduxColumn
          field="invoice_number"
          className="text-center"
          width="80px"
          minWidth="100px"
          maxWidth="80px"
          sortBy="invoice_number"
        >
          Invoice Number
        </ReduxColumn>
        <ReduxColumn
          field="bill_date"
          className="text-center"
          width="80px"
          minWidth="100px"
          maxWidth="80px"
          sortBy="bill_date"
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="account_name"
          sortBy="account_name"
          minWidth="100px"
          maxWidth="100px"
        >
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
          )}
        >
          Status
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          disableOnClick
          width="70px"
          renderField={(row) => (
            <>
              <div className="d-flex justify-content-center align-items-center row">
                <div className="text-dark landing-group-dropdown">
                  <MoreDropdown>
                    <DropdownItem
                      onClick={() => {
                        setRowValue(row);
                        StoreSelectModal();
                      }}
                    >
                      Quick View
                    </DropdownItem>
                  </MoreDropdown>
                </div>
              </div>
            </>
          )}
        >
          Actions
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};
export default BillList;
