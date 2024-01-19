import React from "react";
import { Nav, NavItem } from "reactstrap";
import * as userConstant from "../../../helpers/Nav";
// Component
import SideNavBarItem from "./SideNavBarItem";

const SideNavBar = (props) => {
  const { activeTab, data } = props;

  const userNavList = userConstant.getUserNavList();

  // Return User Nav List
  return (
    <Nav tabs vertical pills>
      <NavItem className="d-none d-sm-block p-3 pt-4">
        <h5 className="text-left font-weight-bold">Settings</h5>
      </NavItem>

      {/* Nav List Start */}
      {userNavList &&
        userNavList.length > 0 &&
        userNavList.map((userNavItem, key) => (
          <SideNavBarItem
            key={key}
            data={data}
            activeTab={activeTab === userNavItem.url && userNavItem.name}
            tabName={userNavItem.name}
            URL={userNavItem.url}
            defaultSubTab={userNavItem.defaultSubTab}
            defaultSubSection={userNavItem && userNavItem.defaultSubSection}
            match={props.match}
          />
        ))}
      {/* Nav List End */}
    </Nav>
  );
};

export default SideNavBar;
