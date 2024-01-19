import React, { useEffect, useState } from "react";
//Service
import { getSettingsValue } from "../../services/SettingService";
//API
import { apiClient } from "../../apiClient";

//Defatult Icon
import DefaultPortalIcon from "../../assets/img/oneportalFavicon.png";
//Common
import { isBadRequest } from "../../lib/Http";
import { endpoints } from "../../api/endPoints";
//Context
import UserProvider from "../../context/userContext/userProvider";
//Helpers
import {
  clearAllCookies,
  COOKIE_SESSION_TOKEN,
} from "../../lib/Cookie";
import  Cookies,{ isLoggedIn, setCookie } from "../../lib/Helper";
import { isNotEmpty } from "../../lib/String";

import CompanyService from "../../services/CompanyService";
//Nav Header
import AppNav from "../AppNav";
//Components
import Footer from "../Footer";
import Header from "../header";
import OutsideAlerter from "../OutSideClickAlerter";
import SideBarNavigation from "../sidebarNavigation";
import Toastcontainer from "../ToastContainer";

const AdminLayout = (props) => {
  const { settings, navList, history, showProjectSelector, projectNavList } =
    props;
   
  const [portalList, setPortalList] = useState([]);
  const [default_id, setDefaultProjectId] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [companyDetail, setCompanyDetail] = useState(null);
  const [companyNames, setCompanyName] = useState();

  const [settingsData, setSettingData] = useState({});
  const defaultId = (values) =>{

    setDefaultProjectId(values);
  };

  isLoggedIn();
  // Login By Admin
  // const handlePortalChange = async (id) => {
  //   return apiClient
  //     .get(`${endpoints().companyAPI}/loginByAdmin/${id}`)
  //     .then(async (response) => {
  //       if (response && response.data) {
  //         const { token, role, userId, portalUrl, companyId } = response.data;
  //         await clearAllCookies();
  //         setCookie(COOKIE_SESSION_TOKEN, token);

  //         if (portalUrl) {
  //           window.location.replace(`${portalUrl}/dashboard`);
  //         } else {
  //           window.location.replace("/dashboard");
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       if (isBadRequest(error)) {
  //         let errorMessage;
  //         const errorRequest = error.response.request;
  //         if (errorRequest && errorRequest.response) {
  //           errorMessage = JSON.parse(errorRequest.response).message;
  //         }
  //         console.error(errorMessage);
  //       }
  //     });
  // };

  const getSetting = async (settings) => {
    const data = await getSettingsValue(settings);
    setSettingData(data);
  };

  // Get company list
  // const fetchCompanyList = async () => {
    // const data = await CompanyService.search();
  //   let list = [];
  //   data && data.length > 0 && data.forEach((companyList) => {
  //     list.push({
  //       value: companyList.id,
  //       label: companyList.company_name,
  //       id: companyList.id,
  //     });
  //   });
  //   setCompanyList(list)
  // };

  // Get company detail of login company
  // const fetchCompanyDetail = async () => {
  //   let data = await CompanyService.getCompanyDetail();
  //   if (data) {
  //     setCompanyName(data.company_name);
  //   }
  //   setCompanyDetail(data);
  // };

  // useEffect(() => {
  //   fetchCompanyList();
  //   fetchCompanyDetail();
  // }, []);

  useEffect(() => {
    if (isNotEmpty(settings.settings)) {
      getSetting(settings);
    }
  }, [settings]);

  const {
    headerColor,
    portalLogo,
    portalName,
    portalFavIcon,
    headerTextColor,
    footerColor,
    footerTextColor,
    footerCopyRightsText,
    leftNavigationBackgroundImage,
    leftNavigationTextColor,
    leftNavigationTextHoverColor,
    leftNavigationBackgroundColor,
    instagram_url,
    youtube_url,
    twitter_url,
    linkedIn_url,
    facebook_url,
    portalLogoUrl,
  } = settingsData;

  const logo = portalLogo ? portalLogo : "";
  const portalNames = portalName ? portalName : "";
  //Set PortalName
  let name = document.getElementById("portalName");
  if (companyNames) {
    name.innerHTML = companyNames;
  }

  // Company logo
  let companyLogoUrl = companyDetail?.company_logo;

  // Company Name
  let companyName = companyDetail?.company_name;

  let PortalName = settingsData?.portalName;

  useEffect(() => {
    let sessionToken = Cookies.get(COOKIE_SESSION_TOKEN);
    if (!sessionToken) {
      getCompanyDetails();
    }
  }, []);

  // const getCompanyDetails = async () => {
  //   const data = await CompanyService.CompanyDetail();
  //   setCompanyName(data.company_name);
  // };

  //SetPortal Favicon
  const favIcon = document.getElementById("portalFavIcon");

  if (companyLogoUrl && favIcon.href !== companyLogoUrl) {
    favIcon.href = companyLogoUrl;
  } else favIcon.href = DefaultPortalIcon;

  return (
    <div className="app">
      <UserProvider>
        <div className="app-body">
          <Toastcontainer />
          <main
            className="main drawer-container"
            style={{ position: "relative" }}
          >
            <div>
              <OutsideAlerter>
                <AppNav
                  leftNavigationBackgroundColor={leftNavigationBackgroundColor}
                  leftNavigationTextColor={leftNavigationTextColor}
                  leftNavigationTextHoverColor={leftNavigationTextHoverColor}

                />
              </OutsideAlerter>
              <Header
                headerColor={headerColor}
                companyLogo={portalLogoUrl && portalLogoUrl}
                companyName={PortalName}
                headerTextColor={headerTextColor}
                // handlePortalChange={handlePortalChange}
                portalList={portalList}
                companyList={companyList}
                leftNavigationBackgroundColor={leftNavigationBackgroundColor}
                leftNavigationTextColor={leftNavigationTextColor}
                leftNavigationTextHoverColor={leftNavigationTextHoverColor}
              />
            </div>
            <SideBarNavigation
              projectId={default_id}
              showProjectSelector={showProjectSelector}
              history={history}
              navList={projectNavList ? projectsNavList : navList}
              settings={settingsData}
              leftNavigationBackgroundImage={leftNavigationBackgroundImage}
              leftNavigationTextColor={leftNavigationTextColor}
              leftNavigationTextHoverColor={leftNavigationTextHoverColor}
              leftNavigationBackgroundColor={leftNavigationBackgroundColor}
              defaultId={(e) => {
                defaultId(e);
              }}
            />
          </main>
        </div>
        <Footer
          footerColor={footerColor}
          footerTextColor={footerTextColor}
          footerCopyRightsText={footerCopyRightsText}
          facebookUrl={facebook_url}
          instagramUrl={instagram_url}
          linkedInUrl={linkedIn_url}
          twitterUrl={twitter_url}
          youtubeUrl={youtube_url}
          portalName={portalNames}
        />
      </UserProvider>
    </div>
  );
};

export default AdminLayout;
