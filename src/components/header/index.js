import React from "react";

//Pages
import UserNavigation from "./userNavigation";

const Header = (props) => {
  const {
    headerColor,
    companyLogo,
    companyName,
    headerTextColor,
    handlePortalChange,
    portalList,
    companyList,
    leftNavigationBackgroundColor,
    leftNavigationTextColor,
    leftNavigationTextHoverColor
  } = props;
  return (
    <div>
      <UserNavigation
        pathName={"/dashboard"}
        logoRedirectUrl={"/dashboard"}
        headerColor={headerColor}
        companyLogo={companyLogo}
        companyName={companyName}
        headerTextColor={headerTextColor}
        portalList={portalList}
        companyList={companyList}
        leftNavigationBackgroundColor={leftNavigationBackgroundColor}
        leftNavigationTextColor={leftNavigationTextColor}
        leftNavigationTextHoverColor={leftNavigationTextHoverColor}
        // handlePortalChange={(e) => {
        //   handlePortalChange(e);
        // }}
      />
    </div>
  );
};

export default Header;
