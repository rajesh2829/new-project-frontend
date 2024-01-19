// API call
import { apiClient } from "../apiClient";
// Configs
import { DEFAULT_API_KEY, endpoints } from "../api/EndPoints";
import * as settingConstant from "../setting/Constants";
// Helper
import { clearCookie, setCookie } from "./helper";

/**
 * Set the Setting value in the Cookie
 *
 * @param names
 * @param callBack
 */
export function setSettingCookieValue(names, callBack) {
  // Default API Key For Public API
  apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;

  // Call Setting Get Public API
  apiClient
    .get(`${endpoints().publicAPI}/setting/${names}`)
    .then((response) => {
      const settings = response.data;

      // If No Setting Data Return Null
      if (!settings) {
        return callBack();
      }

      settings.map((setting) => {
        const { name, value } = setting;

        // Set Cookie Value if Cookie Name Matches
        if (names.split(",").indexOf(name) > -1) {
          setCookie(name, value);
        }
      });

      return callBack();
    });
}

// Clear Setting Cookies Values
export function clearAllSettingsCookies() {
  // clearCookie(settingConstant.SETTINGS_METACX_CUSTOMER_ID);
  // clearCookie(settingConstant.SETTINGS_METACX_EXPERT_VIRTUAL_CUSTOMER_ID);
  // clearCookie(settingConstant.SETTINGS_METACX_VISITOR_VIRTUAL_CUSTOMER_ID);
  // clearCookie(settingConstant.SETTINGS_METACX_ADMIN_VIRTUAL_CUSTOMER_ID);
  return "";
}
