import React, { useEffect, useState } from "react";
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
import { apiClient } from "../../apiClient";
import Action from "../../components/Action";
import { isBadRequest } from "../../lib/Http";
// import UserList from "../user/userList"

const UserRoleDetails = (props) => {

  const { history, match } = props;  
  const dispatch = useDispatch();

  //Tab constants
  const TAB_GENERAL = "General";
  const TAB_PERMISSIONS = "Permissions";
  const TAB_SETTING = "Settings";
  const TAB_USERS = "Users"
const [userRoleDetail, setUserRoleDetail] = useState();
const [deleteModal,setDeleteModal]=useState();
const [activeTabs, setActiveTab] = useState(Url.GetParam("tab")||TAB_GENERAL);
const [currentData, setCurrentData] = useState();

const handleDelete = (id, params) => {
  try {
    dispatch(API.deleteUserRole(id, params));
    props.history.push("/admin/roles");
  } catch (err) {
    console.log(err);
  }
};
const handleTabs = (tab) => {
  setActiveTab(tab);
  props.history.push(`?tab=${tab}`)
};

  useEffect(() => {
    if (match.params.id) {
      getUserRoleDetails(match.params.id);
    }
  }, [props]);
  const getUserRoleDetails = () => {
    let id = props.match.params.id;

    try {
      return apiClient
        .get(`${endpoints().userRoleAPI}/${id}`)
        .then((response) => {
          const data = response.data;
          setUserRoleDetail(data);
        })
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            console.error(errorMessage);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard" },
    { label: "Roles", link: "/admin/roles" },
    { label:userRoleDetail?.data?.role_name, link: "" },
  ];
  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }
  
  };

  return (
        <>

      <BreadCrumb list={breadcrumbList} />
       
       <div className="d-flex justify-content-between">
         <PageTitle
              label={userRoleDetail?.data?.role_name}
            />
 

 <DeleteModal
          isOpen={deleteModal}
          title={`Delete role`}
          label={userRoleDetail?.data?.role_name}
          id={match.params.id}
          toggle={() => {
            setDeleteModal(false);
          }}
          deleteFunction={handleDelete}
        />
<div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div></div>
        <div>
          {/* Nav Section for userRole detail tabs navigation */}
          <Nav tabs className="admin-tabs mt-2">
            {/* userRoleDetail Tab */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTabs === TAB_GENERAL,
                })}
                onClick={() => {
                  handleTabs(TAB_GENERAL);
                }}
              >
                {TAB_GENERAL}
              </NavLink>
            </NavItem>

            {/* userRolepermissions Tab */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTabs === TAB_PERMISSIONS,
                })}
                onClick={() => {
                  handleTabs(TAB_PERMISSIONS);
                }}
              >
                {TAB_PERMISSIONS}
              </NavLink>
            </NavItem>

            {/* userRolepermissions Tab */}
            
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTabs === TAB_USERS,
                })}
                onClick={() => {
                  handleTabs(TAB_USERS);
                }}
              >
                {TAB_USERS}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTabs === TAB_SETTING,
                })}
                onClick={() => {
                  handleTabs(TAB_SETTING);
                }}
              >
                {TAB_SETTING}
              </NavLink>
            </NavItem>
          </Nav>
        
          {/* UserRoleTab sections */}
          <TabContent activeTab={activeTabs}>
            <TabPane tabId={TAB_GENERAL}>
              {/* Detail tab */}
              <UserRoleDetail
                history={history}
                
                match={match}
                activeTab={activeTabs}
              />
            </TabPane>

            {/* Permission Tab */}
            <TabPane tabId={TAB_PERMISSIONS}>
              <UserRolePermission
                history={history}
               
                match={match}
                activeTab={activeTabs}
              />
            </TabPane>

            {/* Settings Tab */}
            <TabPane tabId={TAB_SETTING}>
              <RoleSetting
                roleId={props.match.params.id}
                history={history}
                match={match}
                activeTab={activeTabs}
              />
              
            </TabPane>

            <TabPane tabId={TAB_USERS}>
                <UserList tableId="roleUserList" params={{ role:props?.match?.params?.id,
                status: User.STATUS_ACTIVE_VALUE}} props={props} history={history}
                />
            </TabPane>






          </TabContent>
        </div>
      
    </>
  );
};
export default UserRoleDetails;
