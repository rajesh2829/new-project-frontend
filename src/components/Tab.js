import classnames from "classnames";
import React, { } from "react";
import {
  NavItem,
  NavLink,
} from "reactstrap";
import CountBadge from "./CountBadge";

const Tab = (props) => {
  const { name, active, count, toggle, handleChange, navigation } = props;

  return (
    <a href={navigation} style={{ textDecoration: "none", color: "inherit" }} target="_blank" onClick={(e) => e.preventDefault()}>
      <NavItem>
        <NavLink
          className={classnames({
            active: active === name,
          })}
          onClick={() => {
            toggle(name);
            handleChange && handleChange(name);
          }}
        >
          {name}
          <CountBadge
            count={count}
            isActive={classnames({
              active: active === name,
            })}
          />
        </NavLink>
      </NavItem>
    </a>
  );
};

export default Tab;
