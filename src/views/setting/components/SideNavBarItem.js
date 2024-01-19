import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
// Icon
import "../../../scss/_custom.scss";

const SideNavBarItem = (props) => {
  const { key, activeTab, tabName ,URL} = props;

  return (
    <Link id={key} to={`/setting/${URL}`}>
      <NavItem key={key} className="side-navbar">
        <NavLink
          className={classnames({
            active: activeTab === tabName,
          })}
        >
          {tabName}

          <span className="float-right">
          <FontAwesomeIcon icon={faChevronRight}/>
          </span>
        </NavLink>
      </NavItem>
    </Link>
  );
};

export default SideNavBarItem;
