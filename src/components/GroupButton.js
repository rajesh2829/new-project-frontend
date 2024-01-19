import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

const GroupDropdownButton = (props) => {
  const { buttonClass } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const styles = { position: "absolute" };

  return (
    <div className="dropdown-wrapper more-dropdown" style={styles}>
      <Dropdown
        id={props.id}
        className={props.className}
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle>
          <div className={buttonClass}>{props.buttonLabel}</div>
        </DropdownToggle>
        <DropdownMenu right>{props.children}</DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default GroupDropdownButton;
