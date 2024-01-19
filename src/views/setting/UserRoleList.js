import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Text from "../../components/Text";
import PageTitle from "../../components/PageTitle";
import {
  Button,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

//Config
import { endpoints } from "../../api/endPoints";
import Link from "../../components/Link";

// Action
import * as API from "../../actions/userSetting";
import UserRolePermission from "./components/UserRolePermission";
import UserRoleDetail from "./UserRoleDetail";
import RoleSetting from "./RoleSetting";

import AddModal from "../../components/Modal";
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeleteModal from "../../components/DeleteModal";
import { User } from "../../helpers/User";
import BreadCrumb from "../../components/Breadcrumb";
// import UserList from "./userList";
import UserList from "../../components/UserList";
import Url from "../../lib/Url";
// import UserList from "../user/userList";

const UserRole = (props) => {
  const { history, activeTab, match } = props;
  const dispatch = useDispatch();

  //Tab constants
  const TAB_GENERAL = "General";
  const TAB_PERMISSIONS = "Permissions";
  const TAB_SETTING = "Settings";
  const TAB_USERS = "Users"

  const [isOpen, setIsOpen] = useState(false);
  const [activeTabs, setActiveTab] = useState(Url.GetParam("tab") || TAB_GENERAL);

  const [currentData, setCurrentData] = useState();
  const [Role, setRole] = useState();
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const sortByOption = [
    {
      value: "role_name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  // Toggling the tabs and modals in respective tab
  const handleTabs = (tab) => {
    setActiveTab(tab);
    props.history.push(`?tab=${tab}`)
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Create Portal
   *
   * @param data
   */
  const userRoleCreate = (Values) => {
    const data = new FormData();
    data.append("role_name", Values.role_name.trim() || "");
    data.append("status", Values.status);
    dispatch(API.createUserRole(data, {}, toggle));
  };
  const selectedId = match && match.params && match.params.id;

  const initialValues = {
    role_name: "",
    status: "Active",
  };

  const addRoleForm = (
    <div className="mt-2 mb-3">
      <div>
        <Text
          name="role_name"
          label="Role Name"
          placeholder="Enter Role Name..."
          error=""
          fontBolded
          required={true}
        />
      </div>
    </div>
  );

  const roleFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button type="submit" label="" className="ml-3 h6-5-important">
          Create
        </Button>
      </div>
    </div>
  );

  const roleDelete = async (id, params) => {
    dispatch(API.deleteUserRole(id, params));
  };



  return (
    <>
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Role"
        id={currentData?.id}
        label={Role}
        deleteFunction={roleDelete}
      />

      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Create a New Role"
        modalBody={addRoleForm}
        modalFooter={roleFooter}
        initialValues={initialValues}
        onSubmit={(values) => {
          userRoleCreate(values);
        }}
        hideDefaultButtons
      />

      {/* /.page-heading */}
      <PageTitle
        label="Roles"
        buttonHandler={(e) => {
          toggle();
        }}
        buttonLabel="Add New"
      />
      <div className="mt-4">
        <ReduxTable
          id="userRole"
          showHeader
          searchPlaceholder="Search"
          apiURL={`${endpoints().userRoleAPI}/search`}
          newTableHeading
          history={props.history}
          paramsToUrl={true}
          sortByOptions={sortByOption}
        >
          <ReduxColumn
            type="link"
            isClickable="true"
            field="role_name"
            sortBy="role_name"
            renderField={(row) => (
              <Link text={row.role_name} url={`roles/${row.id}`} />
            )}
          >
            Name
          </ReduxColumn>
          <ReduxColumn
            className="column-status"
            field="status"
            sortBy="status"
            width="130px"
            minWidth="130px"
            maxWidth="120px"
            renderField={(row) => (
              <div
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ml-3 mx-auto ${row.status && row.status === User.STATUS_ACTIVE_TEXT
                  ? "bg-success"
                  : row.status === User.STATUS_INACTIVE_TEXT
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
            width="100px"
            disableOnClick
            renderField={(row) => (
              <div className="col-4 mx-auto landing-group-dropdown">
                <MoreDropdown>
                  {row.status == User.STATUS_ACTIVE_TEXT ? (
                    <DropdownItem
                      onClick={() => {
                        dispatch(
                          API.updateUserRole(
                            row.id,
                            User.STATUS_INACTIVE_TEXT
                          )
                        );
                      }}
                    >
                      Make as InActive
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => {
                        dispatch(
                          API.updateUserRole(
                            row.id,
                            User.STATUS_ACTIVE_TEXT
                          )
                        );
                      }}
                    >
                      Make as Active
                    </DropdownItem>
                  )}
                </MoreDropdown>
              </div>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
export default UserRole;
