import React from "react";
import { NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SideNavBarItem = (props) => {
  const { key, activeTab, tabName, listId, activeSubTab } = props;

  return (
    <>
      <Link id={key} to={`/docs/${listId}/${tabName}`}>
        <NavItem key={key}>
          <NavLink
            className={classNames({
              active: activeSubTab === tabName,
            })}
          >
            {tabName}
            <span className="float-right">
              {/* <ChevronRight />
               */}

              <FontAwesomeIcon
                icon={faChevronRight}
              />
            </span>
          </NavLink>
        </NavItem>
      </Link>
    </>
  );
};
export default SideNavBarItem;
