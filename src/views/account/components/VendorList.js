import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { EditorState, convertFromRaw } from "draft-js";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import MoreDropdown from "../../../components/authentication/moreDropdown";

// Lib
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";

// API
import { endpoints } from "../../../api/endPoints";

// Helpers
import Vendor, { typeOption, vendorStatusOptions } from "../../../helpers/Vendor";
import Account from "../../../helpers/Account";


const VendorListPage = (props) => {
  let pathName = props?.history?.location?.pathname
  const { id, tab, type, status, sortByOption, history, searchItem, showStatus } = props;

  let params = {};

  if (pathName == "/customers") {
    params.type = Account.TYPE_CUSTOMER
  }
  if (pathName == "/vendor") {
    params.type = Account.TYPE_VENDOR
  }

  return (
    <>
      <ReduxTable
        id={id}
        showHeader
        newTableHeading
        searchPlaceholder="Search Vendor"
        icon={<FontAwesomeIcon icon={faTruck} />}
        message="You can start by clicking on Add New"
        apiURL={
          pathName === "/accounts"
            ? `${endpoints().accountAPI}/search`
            : pathName === "/customers"
              ? `${endpoints().accountAPI}/search`
              : `${endpoints().accountAPI}/vendorSearch`
        }
        sortByOptions={sortByOption}
        onRowClick
        showTypeFilter
        customTypeOption={typeOption}
        showStatusFilter
        customStatusOption={vendorStatusOptions}
        params={{
          tab: tab ? tab : "",
          status: status ? status : Url.GetParam("status"),
          type: type ? type : "",
          ...params
        }}
        history={history}
        paramsToUrl={true}
      >
        <ReduxColumn
          field="vendorName"
          type="link"
          width="310px"
          minWidth="310px"
          maxWidth="310px"
          isClickable="true"
          sortBy="vendorName"
          renderField={(row) => (
            <Link to={`${pathName}/${row.id}`}>{row.vendorName}</Link>
          )}
        >
          Name
        </ReduxColumn>
        <ReduxColumn
          field="type"
          width="310px"
          minWidth="310px"
          maxWidth="310px"
          sortBy="type"
        >
          Type
        </ReduxColumn>
        {showStatus && (<ReduxColumn
          field="status"
          sortBy="status"
          width="120px"
          minWidth="120px"
          maxWidth="120px"
          renderField={(row) => (
            <div
              className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase align-middle  mx-auto ${row.status && row.status === Vendor.STATUS_ACTIVE ? "bg-success "
                : row.status === Vendor.STATUS_INACTIVE
                  ? "bg-secondary"
                  : ""
                }`}
            >
              <p>{row.status}</p>
            </div>
          )}
        >
          Status
        </ReduxColumn>)}
        {props.pathName == "/vendor" && <ReduxColumn
          minWidth="100px"
          maxWidth="100px"
          sortBy="LastPurchasedAt"
          className="text-center"
          renderField={(row) => (
            <span>{row?.LastPurchasedAt ? DateTime.getDate(row.LastPurchasedAt) : ""}</span>
          )}>
          Last Purchased At
        </ReduxColumn>}
        {props.pathName == "/vendor" && <ReduxColumn
          minWidth="100px"
          maxWidth="100px"
          className="text-center"
          field="lastPurchaseCostPrice"
        >
          Last Purchase Cost Price
        </ReduxColumn>}
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
                        props.setRows(row);
                        row?.notes && props.setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(row?.notes))));
                        props.onModalClose();
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
          Action
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default VendorListPage;
