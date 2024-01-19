import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { ReactComponent as Sidebaricon } from "../assets/img/dotsMenu.svg";
import ImageList from "./ImageItem";
import OutsideAlerter from "./OutSideClickAlerter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./header/style.scss";

const AppNav = (props) => {
  const {
    title,
    isOutSideClick,
    leftNavigationBackgroundColor,
    leftNavigationTextColor,
    leftNavigationTextHoverColor,
  } = props;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOutSideClick) setIsActive(!isOutSideClick);
  }, [isOutSideClick]);

  const mobileNav = () => {
    props.handleAppNavOpen();
  };

  return (
    <OutsideAlerter>
      <nav
        id="quickMenuPopOver"
        className={classnames(
          "quickMenu align-items-center mt-2",
          isActive ? "expanded " : "collapsed"
        )}
      >
        <div className="row nav-link-show d-md-flex d-lg-none d-flex">
          <div
            className="quickMenuIcon align-items-center mt-2"
            onClick={() => setIsActive(!isActive)}
          >
            <Sidebaricon />
          </div>
          {/* {isActives ? ( */}
          <div className="ml-1 mt-1 " onClick={mobileNav}>

            <FontAwesomeIcon
              icon={faBars}
              className="d-block d-sm-none"
              style={{ fontSize: "28px" }}
            />

          </div>

        </div>
        <div className="nav-link-show  py-4 d-md-flex d-lg-none ">
          <div
            className={("quickMenuContent", isActive ? "main-menu" : "d-none")}
            style={{
              backgroundColor: props?.leftNavigationBackgroundColor?.leftNavigationBackgroundColor,
              color: props?.leftNavigationTextColor?.leftNavigationTextColor
            }}
          >
            <div onClick={() => setIsActive(!isActive)}>
              <div id="menu">
                <h6 className="font-weight-bold my-3 mx-2">{title}</h6>
                <ImageList
                  leftNavigationTextColor={leftNavigationTextColor}
                  leftNavigationTextHoverColor={leftNavigationTextHoverColor}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </OutsideAlerter>
  );
};

export default AppNav;