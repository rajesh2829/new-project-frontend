import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import * as portalUserConstant from "../../helpers/PortalDetail";

//Service
import { getUserRole } from "../../services/UserSettingService";

//Page
import UserList from "./userList";

const user = (props) => {
  const { history, data, match } = props;
  const [activeTab, setActiveTab] = useState(
    portalUserConstant.PORTAL_USER_SUB_TAB
  );
  const [userRole, setUserRole] = useState([]);

  const toggle = (tab) => {
    setActiveTab(tab);
    history.push(`/portal-setting/${tab}`);
  };

  const getUserRoleValue = async () => {
    const roleData = await getUserRole();
    setUserRole(roleData);
  };

  useEffect(() => {
    getUserRoleValue();
  }, []);

  return (
    <>
      <Nav tabs className="admin-tabs">
        {/* User Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === portalUserConstant.PORTAL_USER_SUB_TAB,
            })}
            onClick={() => {
              toggle(portalUserConstant.PORTAL_USER_SUB_TAB);
            }}
          >
            {portalUserConstant.PORTAL_USER_SUB_TAB}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* User Tab */}
        <TabPane
          tabId={portalUserConstant.PORTAL_USER_SUB_TAB}
          className="w-100"
        >
          <UserList
            role={userRole}
            match={match}
            data={data}
            history={history}
          />
        </TabPane>
      </TabContent>
    </>
  );
};

export default user;
