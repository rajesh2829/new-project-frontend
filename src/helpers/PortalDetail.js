export const Tab = {
  // Portal Side Nav Tabs
  PORTAL_GENERAL_TAB: "General",
  PORTAL_FEATURES_TAB: "Features",
  PORTAL_COMPANY_PROFILE_TAB: "Company Profile",
  PORTAL_THEME_TAB: "Themes",
  PORTAL_USERS_TAB: "Users",
  PORTAL_SYSTEM_TAB: "Systems",
  PORTAL_THEMES_TAB: "Themes",
  PORTAL_EMAIL_TEMPLATE_TAB: "Email Templates",
  // General Tab Sub Tabs
  PORTAL_DETAIL_TAB: "Details",
  GENERAL_GENERAL_SUB_TAB: "General",
};

//Social Themes Tab
export const PORTAL_SOCIAL_THEME_FACEBOOK_URL = "facebook_url";
export const PORTAL_SOCIAL_THEME_INSTAGRAM_URL = "instagram_url";
export const PORTAL_SOCIAL_THEME_TWITTER_URL = "twitter_url";
export const PORTAL_SOCIAL_THEME_LINKEDIN_URL = "linkedIn_url";
export const PORTAL_SOCIAL_THEME_YOUTUBE_URL = "youtube_url";

// User Tab Sub Tabs
export const PORTAL_USER_SUB_TAB = "Users";
export const PORTAL_USER_ROLE_SUB_TAB = "Role";
export const PORTAL_USER_PERMISSIONS_SUB_TAB = "Permission";

// User Tab Sub Tabs
export const SETTINGS_ENABLE_PROJECTS = "enable_projects";
export const SETTINGS_ENABLE_STORE = "enable_store";
export const SETTINGS_ENABLE_USERS = "enable_users";
export const SETTINGS_ENABLE_PRODUCTS = "enable_products";
export const SETTINGS_ENABLE_ACCOUNT = "enable_account";
export const SETTINGS_ENABLE_JOBS = "enable_jobs";
export const SETTINGS_ENABLE_PAGES = "enable_pages";

/**
 * Get Portal Detail Side Nav List
 *
 * @returns {Array}
 */
export function getPortalNavList() {
  let portalSettingNavList = [];
  // Return Portal Detail Nav Object
  const getPortalNavObject = (tab, subtab = "", subSection = "") => {
    return {
      name: tab,
      defaultSubTab: subtab,
      defaultSubSection: subSection,
    };
  };
  // Check Admin User
  portalSettingNavList = [
    ...portalSettingNavList,
    getPortalNavObject(Tab.PORTAL_GENERAL_TAB, Tab.PORTAL_DETAIL_TAB),
    getPortalNavObject(Tab.PORTAL_FEATURES_TAB, Tab.PORTAL_DETAIL_TAB),
    getPortalNavObject(Tab.PORTAL_COMPANY_PROFILE_TAB, Tab.PORTAL_DETAIL_TAB),
    getPortalNavObject(Tab.PORTAL_THEME_TAB, Tab.PORTAL_DETAIL_TAB),
    getPortalNavObject(Tab.PORTAL_USERS_TAB, Tab.PORTAL_DETAIL_TAB),
  ];
  // Return Portal Details Nav List
  return portalSettingNavList;
}


