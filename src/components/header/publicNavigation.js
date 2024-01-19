import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler } from "reactstrap";
import * as commonConstant from "../../common/constants";
import Logo from "../Logo";

const PublicHeader = ({
  portalName,
  headerColor,
  headerTextColor,
  portalLogo,
  portalLogoRedirectUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsData, setSettingData] = useState({});
  const toggle = () => setIsOpen(!isOpen);
  portalLogo = portalLogo ? portalLogo : "";

  return (
    <div>
      <Navbar
        className={`navbar navbar-expand-lg text-white`}
        light
        expand="md"
        style={{
          backgroundColor: headerColor
            ? headerColor
            : commonConstant.DEFAULT_HEADER_COLOR,
          color: headerTextColor,
        }}
      >
        <div className={["justify-content-stretch container-fluid"].join(" ")}>
          <Logo
            src={portalLogo}
            link={portalLogoRedirectUrl}
            altText={portalName}
            label={portalName}
          />
          {/* <NavbarToggler onClick={toggle} className="ml-auto" /> */}

          <Collapse isOpen={isOpen} navbar>
            {/* <UserNavDropdown
                headerTextColor={headerTextColor}
                enable={props.enable}
              /> */}
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default PublicHeader;
