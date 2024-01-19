import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

// Icon
import { ChevronRight } from "../../assets/icons";
import "../../scss/_custom.scss";

const SideNavBarItem = (props) => {
  const { key, activeTab, tabName, link } = props;

  return (
    <Link id={key} to={link}>
      <NavItem key={key} className="side-navbar">
        <NavLink
          className={classnames({
            active: activeTab === tabName,
          })}
        >
          {tabName}
          <span className="float-right">
            <ChevronRight />
          </span>
        </NavLink>
      </NavItem>
    </Link>
  );
};

export default SideNavBarItem;
