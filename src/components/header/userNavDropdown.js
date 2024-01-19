import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

//Assets
import { UserIcon } from "../../assets/icons";

//Context
import UserContext from "../../context/userContext/userContext";

//Components
import Permission from "../../helpers/Permission";

import Avatar from "../Avatar";
import PermissionLocalStorage from "../../lib/Permission";

const UserNavDropdown = React.memo(function UserNavDropdown(props) {
  const { headerTextColor, id } = props;
  const loginTextColor = !headerTextColor ? "text-dark" : "";

  const [showAdminPortalView, setShowAdminPortalView] = useState(false);
  const [showSupportPortalView, setShowSupportPortalView] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(PermissionLocalStorage.USER_ROLE);
    if (data) {
      setShowSupportPortalView(data.includes(Permission.SUPPORT_PORTAL_VIEW));
      setShowAdminPortalView(data.includes(Permission.ADMIN_PORTAL_VIEW));
    }
  }, []);

  return (
    <div
      id="avatarDiv"
      className="ml-auto d-flex cover flex-md-row flex-column"
    >
      <UserContext.Consumer>
        {(context) => (
          <>
            {context.userLoggedIn ? (
              <UncontrolledDropdown inNavbar>
                <DropdownToggle nav className="p-0">
                  {context.token && (
                    <Avatar
                      id="avatar"
                      firstName={context.user.firstName}
                      lastName={context.user.lastName}
                      size="xs"
                      fontSize={12}
                      url={context.user.avatarUrl}
                    />
                  )}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-right">
                  <DropdownItem tag={"li"} className={"edit-profile-item"}>
                    <div className="d-flex">
                      <div className="mr-2">
                        {context.token && (
                          <Avatar
                            firstName={context.user.firstName}
                            lastName={context.user.lastName}
                            size="customSize"
                            imageSize={"50"}
                            url={context.user.avatarUrl}
                          />
                        )}
                      </div>
                      <div className="edit-profile-actions">
                        <div className="edit-profile-name">
                          <strong>
                            {context.user.firstName} {context.user.lastName}
                          </strong>
                        </div>
                        <div>
                          <Link
                            to={{
                              pathname: `/edit/profile`,
                              state: {
                                userId: context.user.userId,
                              },
                            }}
                          >
                            Edit Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </DropdownItem>
                  <DropdownItem divider />
                  <div>
                    <Link
                      to="/dashboard"
                      style={{
                        color: "inherit",

                        textDecoration: "none",
                      }}
                      className={[
                        "edit-profile-name",
                        "text-decoration-none",
                        "text-dark d-block",
                      ].join(" ")}
                    >
                      <DropdownItem>My Dashboard</DropdownItem>
                    </Link>
                  </div>
                  <DropdownItem divider />
                  {showAdminPortalView ? (
                    <div>
                      <Link
                        to="/admin/dashboard"
                        style={{
                          color: "inherit",

                          textDecoration: "none",
                        }}
                      >
                        <DropdownItem>Admin Portal</DropdownItem>
                      </Link>
                      <DropdownItem divider />
                    </div>
                  ) : (
                    ""
                  )}
                  {showSupportPortalView ? (
                    <>
                      <Link
                        to="/supportPortal/dashboard"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <DropdownItem>Support Portal</DropdownItem>
                      </Link>
                      <DropdownItem divider />
                    </>
                  ) : (
                    ""
                  )}
                  <Link
                    onClick={context.logoutUser}
                    style={{ textDecoration: "none" }}
                  >
                    <DropdownItem id="sign-out">Sign Out</DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavLink
                id={id}
                href={"/login"}
                className={[
                  `${loginTextColor}`,
                  "font-weight-bold",
                  "d-inline-flex",
                  "login-btn",
                  "h6-5",
                ].join(" ")}
                style={{
                  color: headerTextColor,
                  textDecoration: "none",
                }}
              >
                <span id={id} className={["mr-2"].join(" ")}>
                  Portal Login
                </span>{" "}
                <UserIcon />
              </NavLink>
            )}
          </>
        )}
      </UserContext.Consumer>
    </div>
  );
});

export default UserNavDropdown;
