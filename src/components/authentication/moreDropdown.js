import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { MoreIconVertical } from "../../assets/icons/index";

const MoreDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const styles = { position: "absolute", marginLeft: "" };

  return (
    <div
      className="dropdown-wrapper more-dropdown"
      style={{ position: "relative" }}
    >
      <Dropdown
        id={props.id}
        className={props.className}
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle>
          {props.plusIcon ? (
            <i className="text-dark fa fa-plus mt-4 ml-3" />
          ) : (
            // <MoreIconVertical />
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-muted" onClick={props.onClick && props.onClick} />
          )}
        </DropdownToggle>
        <DropdownMenu right>{props.children}</DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MoreDropdown;
