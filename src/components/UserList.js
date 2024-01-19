import React from "react";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";

import ReduxTable, { ReduxColumn } from "./reduxTable";

import { endpoints } from "../api/endPoints";
import "../views/user/portalUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import MoreDropdown from "./authentication/moreDropdown";
import { User } from "../helpers/User";
import DateTime from "../lib/DateTime";
import UserService from "../services/UserService";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";

export const Tabs = {
  ACTIVE: "Active",
  ALL: "All",
  INACTIVE: "InActive",
};

const UserList = (props) => {
  const { tableId, setRowValue, rowValue, setDetail, detail, _toggle, isQuickButton } = props;
  const dispatch = useDispatch();
  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  return (
    <>
      <ReduxTable
        id={props.tableId}
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().userAPI}/search`}
        newTableHeading
        params={props.params}
        icon={<FontAwesomeIcon icon={faUser} />}
        message="You can start by clicking add."
        sortByOptions={sortByOption}
        history={props.history}
        roleList={props?.userRoleList}
        showRoleFilter
        paramsToUrl={true}
        bulkSelect
        customStatus={{
          status:
            props.tableId === Tabs.ACTIVE
              ? User.STATUS_ACTIVE_VALUE
              : props.tableId === Tabs.INACTIVE
                ? User.STATUS_INACTIVE_VALUE
                : "",
        }}
        onBulkSelect={props.handleBulkSelect}
      >
        <ReduxColumn
          field="first_name"
          type="link"
          isClickable="true"
          sortBy="name"
          width="350px"
          maxWidth="250px"
          minWidth="250px"
          renderField={(row) => (
            <>
              <Link to={`/user/${row.id}`}>
                <UserCard
                  customSize={parseInt(50, 10)}
                  firstName={row.first_name}
                  url={row.avatarUrl}
                  mobileNumber={row.mobileNumber1}
                  email={row.email}
                  lastName={row.last_name}
                  status={
                    row.status == User.STATUS_INACTIVE_VALUE
                      ? `(${User.STATUS_INACTIVE_TEXT})`
                      : ""
                  }
                />
              </Link>
            </>
          )}
        >
          Name
        </ReduxColumn>
        <ReduxColumn
          field="role_name"
          width="100px"
          maxWidth="90px"
          minWidth="90px"
          sortBy="role"
        >
          Role
        </ReduxColumn>
        <ReduxColumn
          field="last_loggedin_at"
          width="100px"
          maxWidth="90px"
          minWidth="90px"
          sortBy="last_loggedin_at"
          className="text-center"
          renderField={(row) => (
            <span>
              {row?.last_loggedin_at
                ? DateTime.UTCtoLocalTime(row?.last_loggedin_at)
                : ""}
            </span>
          )}
        >
          Last Loggedin At
        </ReduxColumn>
        <ReduxColumn
          field="date_of_joining"
          width="100px"
          maxWidth="90px"
          minWidth="90px"
          sortBy="date_of_joining"
          className="text-center"
          renderField={(row) => (
            <span>
              {row?.date_of_joining
                ? DateTime.getDate(row?.date_of_joining)
                : ""}
            </span>
          )}
        >
          Date Of Joining
        </ReduxColumn>
        <ReduxColumn
          field="date_of_leaving"
          width="100px"
          maxWidth="90px"
          minWidth="90px"
          sortBy="date_of_leaving"
          renderField={(row) => (
            <span>
              {row?.date_of_leaving
                ? DateTime.getDate(row?.date_of_leaving)
                : ""}
            </span>
          )}
        >
          Date Of Leaving
        </ReduxColumn>
        <ReduxColumn
          field="leave_balance"
          width="100px"
          maxWidth="90px"
          className="text-center"
          minWidth="90px"
          sortBy="leave_balance"
          renderField={(row) => (
            <span>
              {row?.leave_balance
                ? row?.leave_balance
                : ""}
            </span>
          )}
        >
          Leave Balance
        </ReduxColumn>
        <ReduxColumn
          field="last_check_in"
          className="text-center"
          width="100px"
          maxWidth="90px"
          minWidth="90px"
          sortBy="last_check_in"
          renderField={(row) => (
            <span>
              {row?.last_check_in !== "" ? DateTime.UTCtoLocalTimeAndMmmFormat(row.last_check_in)
                : ""}
            </span>
          )}
        >
          Last Check In
        </ReduxColumn>
        <ReduxColumn
          width="70px"
          field="Action"
          disableOnClick
          renderField={(row) => (
            <div className="col-4 text-center landing-group-dropdown">
              <MoreDropdown>
                {isQuickButton && (
                  <DropdownItem
                    onClick={() => {
                      setRowValue(row);
                      _toggle();
                    }}
                  >
                    Quick View
                  </DropdownItem>
                )}

                {row.status !== User.STATUS_ACTIVE_VALUE ? (
                  <DropdownItem
                    onClick={async () => {
                      const data = { status: User.STATUS_ACTIVE_TEXT };
                      dispatch(
                        await UserService.statusUpdate(row.id, data, {
                          pagination: true,
                          tableId: tableId,
                          ...props.params,
                        })
                      );
                    }}
                  >
                    Make as Active
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={async () => {
                      const data = { status: User.STATUS_INACTIVE_TEXT };
                      dispatch(
                        await UserService.statusUpdate(row.id, data, {
                          tableId: tableId,
                          pagination: true,
                          ...props.params,
                        })
                      );
                    }}
                  >
                    Make as InActive
                  </DropdownItem>
                )}
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default UserList;
