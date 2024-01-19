import React from "react";
import { Navbar } from "reactstrap";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { Layout } from "../../helpers/Page";

const Header = (props) => {
  const { settings, permission, layout } = props;

  const {
    enable_header_logo,
    enable_header_login_button,
    enable_header_register_button,
  } = permission;

  const { portalLogo, portalName } = settings;

  return (
    <div>
      <Navbar className={`navbar navbar-expand-lg text-white bg-dark`}>
        <div
          className={`${layout && layout == Layout.BLOCK_FIXED_LAYOUT
            ? `container`
            : ` container-fluid`
            }`}
        >
          <div className="d-flex justify-content-center align-items-center mb-2">
            {enable_header_logo == "true" && (
              <Logo src={portalLogo} altText={portalName} label={portalName} />
            )}
          </div>
          <div className=" portalLogo d-flex justify-content-center align-items-center">
            {enable_header_login_button == "true" && <Button label="Login" />}
            {enable_header_register_button == "true" && (
              <Button color="#F50514" label="Register" />
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
