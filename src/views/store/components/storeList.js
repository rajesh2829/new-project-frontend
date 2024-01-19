import React from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import * as storeConstant from "../../../helpers/StoreList";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import AvatarCard from "../../../components/AvatarCard";
import { endpoints } from "../../../api/endPoints";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import Currency from "../../../lib/Currency";

const StoreListPage = (props) => {
  const { id, setRowValue, _toggle } = props;

  const sortByOptions = [
    {
      value: "name:ASC",
      label: "Name",
    },
  ];

  const statusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "InActive",
      label: "InActive",
    },
    {
      value: "",
      label: "All",
    },
  ];

  return (
    <div>
      <ReduxTable
        id={id}
        showHeader
        searchPlaceholder="Search..."
        apiURL={`${endpoints().locationAPI}/search`}
        newTableHeading
        params={{}}
        sortByOptions={sortByOptions}
        paramsToUrl={true}
        statusOptions={statusOptions}
        showStatusOptions={true}
        history={props.history}
        icon={<FontAwesomeIcon icon={faStore} />}
        message="You can start by clicking on Add Order"
      >
        <ReduxColumn
          field="name"
          type="link"
          isClickable="true"
          sortBy="name"
          minWidth="550px"
          maxWidth="550px"
          width="500px"
          renderField={(row) => (
            <>
              <Link to={`/location/${row.id}`}>
                <AvatarCard firstName={row.name} url={row.image} />
              </Link>
            </>
          )}
        >
          Name
        </ReduxColumn>
        <ReduxColumn
          sortBy="minimum_cash_in_store"
          className="text-center"
          minWidth="120px"
          maxWidth="120px"
          width="500px"
          renderField={(row) => <span>{Currency.Format(row.minimum_cash_in_store)}</span>}>
          Minimum Cash
        </ReduxColumn>
        <ReduxColumn
          sortBy="cash_in_location"
          className="text-center"
          minWidth="120px"
          maxWidth="120px"
          width="500px"
          renderField={(row) => <span>{Currency.Format(row.cash_in_location)}</span>}>
          Cash in Location
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          width={"120px"}
          minWidth="120px"
          maxWidth="120px"
          className="column-status"
          renderField={(row) => (
            <div
              className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.status &&
                row.status === storeConstant.LOCATION_STATUS_ACTIVE
                ? "bg-success"
                : row.status === storeConstant.LOCATION_STATUS_INACTIVE
                  ? "bg-secondary"
                  : ""
                }`}
            >
              <p>{row.status}</p>
            </div>
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
                        _toggle();
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
    </div>
  );
};

export default StoreListPage;
