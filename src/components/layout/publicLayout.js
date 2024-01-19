import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
//Service
import { getSettingsValue } from "../../services/SettingService";
//Defatult Icon
import DefaultPortalIcon from "../../assets/img/oneportalFavicon.png";
// Components
import PublicNavigation from "../header/publicNavigation";
import { isNotEmpty } from "../../lib/String";
import Footer from "../Footer";
import Toastcontainer from "../ToastContainer";
import CompanyService from "../../services/CompanyService";

const PublicLayout = ({ children, match, settings }) => {
  const [settingsData, setSettingData] = useState({});
  const [companyName, setCompanyName] = useState();
  const [companyDetail, setCompanyDetail] = useState();

  const {
    headerColor,
    portalLogo,
    portalName,
    portalFavIcon,
    headerTextColor,
    footerColor,
    footerTextColor,
    footerCopyRightsText,
  } = settingsData;
  const getSetting = async (settings) => {
    const data = await getSettingsValue(settings);
    setSettingData(data);
  };
  useEffect(() => {
    if (isNotEmpty(settings)) {
      getSetting(settings);
    }
  }, [settings]);

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const getCompanyDetails = async () => {
    const data = await CompanyService.CompanyDetail();
    setCompanyName(data.company_name);
    setCompanyDetail(data);
  };

  //Set PortalName
  let name = document.getElementById("portalName");
  if (companyName) {
    name.innerHTML = companyName;
  }

  //SetPortal Favicon
  const favIcon = document.getElementById("portalFavIcon");

  if (portalFavIcon && favIcon.href !== portalFavIcon) {
    favIcon.href = portalFavIcon;
  } else favIcon.href = DefaultPortalIcon;

  return (
    <>
      <PublicNavigation
        match={match}
        portalName={companyName}
        portalLogo={
          portalLogo
            ? portalLogo
            : companyDetail && companyDetail?.portal_logo_media_url
        }
        portalLogoRedirectUrl={"http://google.com"}
        headerColor={
          headerColor
            ? headerColor
            : companyDetail && companyDetail?.portal_header_color
        }
        headerTextColor={headerTextColor}
      />
      <Toastcontainer />
      {children}
      <Footer
        footerColor={footerColor}
        footerTextColor={footerTextColor}
        footerCopyRightsText={footerCopyRightsText}
        facebookUrl={"/dashboard"}
        instagramUrl={"/dashboard"}
        linkedInUrl={"/dashboard"}
        twitterUrl={"/dashboard"}
        youtubeUrl={"/dashboard"}
      />
    </>
  );
};

const PublicPageLayoutRoute = ({ component: Component, settings, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PublicLayout {...matchProps} {...settings}>
          <Component {...settings} {...matchProps} />
        </PublicLayout>
      )}
    />
  );
};

export default PublicPageLayoutRoute;
