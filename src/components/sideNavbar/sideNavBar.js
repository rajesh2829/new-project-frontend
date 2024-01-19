import React from "react";
import { Nav, NavItem } from "reactstrap";

// Component
import SideNavBarItem from "./sideNavBarItem";

const SideNavBar = (props) => {
  const { activeTab, data, navList, navItemLabel } = props;

  // Return User Nav List
  return (
    <Nav tabs vertical pills>
      <NavItem className="p-3 pt-4">
        <h5 className="text-left font-weight-bold">{navItemLabel}</h5>
      </NavItem>

      {/* Nav List Start */}
      {navList &&
        navList.length > 0 &&
        navList.map((navListItem, key) => (
          <SideNavBarItem
            key={key}
            data={data}
            activeTab={activeTab}
            tabName={navListItem.name}
            defaultSubTab={navListItem.defaultSubTab}
            defaultSubSection={navListItem && navListItem.defaultSubSection}
            match={props.match}
            link={navListItem.link}
          />
        ))}
      {/* Nav List End */}
    </Nav>
  );
};

export default SideNavBar;
