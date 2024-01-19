import React, { useEffect, useState } from "react";
import { Navbar } from "reactstrap";
import * as commonConstant from "../../common/constants";

//Lib
import Logo from "../Logo";

//components
import UserNavDropdown from "./userNavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { Link } from "react-router-dom";
import MessagesService from "../../services/MessagesService";
import CountBadge from "../CountBadge";
import HeadNav from "./HeadNav";

const UserNavigation = (props) => {
  let {
    showNav,
    changeNavBarColor,
    allowAccess,
    headerColor,
    headerTextColor,
    companyName,
    companyLogo,
    logoRedirectUrl,
    leftNavigationBackgroundColor,
    leftNavigationTextColor,
    leftNavigationTextHoverColor,
  } = props;

  const [totalMessageCount, setTotalMessageCount] = useState();
  const [nav, setNav] = useState([])

  useEffect(() => {
    getMassageDetail();
  }, []);

  let getMassageDetail = async () => {
    let response = await MessagesService.search();
    let data = response && response?.data && response?.data?.totalMessageCount;
    setTotalMessageCount(data);
  };

  return (
    <>
      <Navbar
        className={`p-0 navbar navbar-expand-lg ${showNav} ${changeNavBarColor}`}
        style={{
          backgroundColor: headerColor
            ? headerColor
            : commonConstant.DEFAULT_HEADER_COLOR,
          color: headerTextColor,
        }}>
        <div className="container-fluid p-0 m-0">
          <div className="text-nowrap d-flex">
            <div className="logo-min-width logo-container" >
              <Logo
                src={companyLogo}
                link={logoRedirectUrl}
                altText={companyName}
                label={companyName}
                headerTextColor={headerTextColor}
                className="portal-logo"
              />
            </div>
            <HeadNav
              leftNavigationBackgroundColor={leftNavigationBackgroundColor}
              leftNavigationTextColor={leftNavigationTextColor}
              leftNavigationTextHoverColor={leftNavigationTextHoverColor}
              headerTextColor={headerTextColor} headerColor={headerColor}
            />
          </div>
          <div className="nav-wrapper d-flex align-items-center">
            <Link to={"/message"}>
              <FontAwesomeIcon
                className={totalMessageCount ? "" : "mr-3"}
                icon={faEnvelope}
                style={{ fontSize: "36px", color: "var(--page-userNavigation-FontAwesomeIcon-color)" }}
              />
            </Link>
            <CountBadge
              className="d-inline-block pl-2 pr-2 status rounded-pill mb-4 mr-3"
              count={totalMessageCount}
              badgeColor="red"
            />

            {/* /.utilities */}
            <UserNavDropdown
              headerTextColor={headerTextColor}
              enable={allowAccess ? allowAccess : true}
            />
          </div>
          {/* /.nav-wrapper */}
        </div>
      </Navbar>
    </>
  );
};

export default UserNavigation;
