import { apiClient } from "../apiClient";
import * as commonConstant from "../common/constants";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { getKeyValueByObject } from "../lib/Helper";

import { isEmpty } from "../lib/String";
import { Setting } from "../helpers/Setting";
import { DEFAULT_API_KEY } from "../configs";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";


export const getSetings = async (params) => {
  let queryString = await ArrayList.toQueryString(params)
  const data = await Url.get(`${endpoints().settingAPI}`, queryString)  
  return data?.data?.settings;
};
//Save Portal Setting
export const saveSetting = (data, companyId, callback) => {

  let apiUrl = ""
  if (companyId) {
    apiUrl = `${endpoints().settingAPI}/company?company_id=${companyId}`
  } else {
    apiUrl = `${endpoints().settingAPI}/company`
  }

  // Save settings
  return apiClient
    .put(apiUrl, data)
    .then((response) => {
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
      }

      if (callback) {
        return callback(null, response);
      }
    })
    .catch((error) => {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        console.error(errorMessage);
      }
      if (callback) {
        return callback(error, null);
      }
    });
};

//Get Portal Setting
export const getCompanySettings = async () => {
  let data = {};
  await apiClient.get(`${endpoints().settingAPI}`).then((response) => {
    data = response.data.settings;
  });
  return data;
};

export const getThemeList = async () => {
  const data = await Url.get(`${endpoints().settingAPI}/themeList`)  
  return data?.data
};

export const getMenuList = async () => {
  const data = await Url.get(`${endpoints().settingAPI}/menuList`)  
  return data?.data;

};
//

//Get Portal Setting Data
export const getSettingsValue = async (settings) => {
  const settingsValue = { ...settings };
  if (isEmpty(settings)) {
    return settingsValue;
  }
  const settingData = settings && settings.settings ? settings.settings : "";

  const portalDetails =
    settings && settings.portalDetail ? settings.portalDetail : "";
  //Set Portal Logo
  settingsValue.portalLogo =
    settingData &&
    getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_LOGO
    )
    ;

  settingsValue.portalLogoUrl = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTING_PORTAL_LOGO_MEDIA_URL
    )
    : "";

  settingData.forEach((data) => {
    if (data.name == "portal_name") {
      settingsValue.portalName =
        data.value
          ? data.value
          : commonConstant.DEFAULT_PORTAL_NAME;
    }
  });

  //Set Portal Favicon
  settingsValue.portalFavIcon = settingData
    ?
    getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_FAV_ICON
    )
    : "";

  //Set Portal HeaderColor
  settingsValue.headerColor = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_HEADER_COLOR
    )
    : "";

  //Set Portal Header Text Color
  settingsValue.headerTextColor = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_HEADER_TEXT_COLOR
    )
    : "";

  //Set Portal Footer Color
  settingsValue.footerColor = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_FOOTER_COLOR
    )
    : "";

  //Set Portal Footer Heading Color
  settingsValue.footerHeadingColor = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_FOOTER_HEADING_COLOR
    )
    : "";

  //Set Portal Footer Text Color
  settingsValue.footerTextColor = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_FOOTER_TEXT_COLOR
    )
    : "";

  //Set Portal Footer CopyRights Text
  settingsValue.footerCopyRightsText = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_FOOTER_COPY_RIGHTS_TEXT
    )
    : "";

  //Set Portal Left Navigation Background Color
  settingsValue.leftNavigationBackgroundImage = settingData
    ?
    await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_BACKGROUND_IMAGE
    )
    : "";
  settingsValue.leftNavigationBackgroundColor = settingData
    ?
    await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_BACKGROUND_COLOR
    )

    : "";

  //Set Portal Left Navigation Text Color
  settingsValue.leftNavigationTextColor = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_TEXT_COLOR
    )
    : "";

  //Set Portal Left Navigation Text Hover
  settingsValue.leftNavigationTextHoverColor = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_TEXT_HOVER_OVER_COLOR
    )
    : "";

  //Social Themes

  //Set Portal Facebook Url
  settingsValue.facebook_url = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.PORTAL_SOCIAL_THEME_FACEBOOK_URL
    )
    : "";
  //Set Portal Insatagram Url
  settingsValue.instagram_url = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.PORTAL_SOCIAL_THEME_INSTAGRAM_URL
    )
    : "";
  //Set Portal twitter url
  settingsValue.twitter_url = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.PORTAL_SOCIAL_THEME_TWITTER_URL
    )
    : "";
  //Set Portal LinkedIn url
  settingsValue.linkedIn_url = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.PORTAL_SOCIAL_THEME_LINKEDIN_URL
    )
    : "";
  //Set Portal Youtube Url
  settingsValue.youtube_url = settingData
    ? await getKeyValueByObject(
      settingData,
      Setting.PORTAL_SOCIAL_THEME_YOUTUBE_URL
    )
    : "";
  return settingsValue;
};
