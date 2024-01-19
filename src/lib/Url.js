import { apiClient } from "../apiClient";
import { MEDIA_PATH_SETTING } from "./Constants";

class Url {
  static GetParam(e) {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get(e) || "";
  }
  // Remove Empty query params

  static UpdateUrl = (params, props) => {

    try{
    const currentPage = window.location.pathname;
    let queryString = "";

    queryString = "?";

    const searchParams = new URLSearchParams(params);
    const url = `${currentPage}${queryString}${searchParams.toString()}`;
    if (props.history) {
      props.history.push(url), {
        data: params,
      };
    }
  }catch(err){
    console.log(err);
  }
  }
  static removeEmptyParams(query) {
    return query.replace(/\w+=&/g, "").replace(/&\w+=$/, "");
  }

  static async get(url, queryString) {
    let apiUrl;

    if (queryString && queryString.length > 0) {
      apiUrl = `${url}?${queryString.join("&")}`;
    } else {
      apiUrl = `${url}`;
    }
    const response = await apiClient.get(apiUrl);
    return response;
  }
}
export default Url;

// * @returns {String}
// */
export function getUrlPath(n) {
  let currentPath = window.location.pathname;
  if (n) currentPath = currentPath.split("/")[n];
  return currentPath;
}
/**
 * Get Redirect Url

 * @param name
 */
export function getRedirectUrl() {
  const urlParams = window.location.search;
  const redirectUrlArray = urlParams.split("redirect=");
  return urlParams === null
    ? ""
    : redirectUrlArray && redirectUrlArray[1]
    ? decodeURIComponent(redirectUrlArray[1])
    : "";
}

/**
 * Get params by name
 */
export function getParamsByName(e) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(e);
}
/**
 * Remove params by name
 */
export function removeParamsByName(name) {
  const search = window.location.search;
  const params = new URLSearchParams(search.slice(1));
  return params.delete(name);
}
/**
 * Get Formatted Price
 *
 * @param price
 * @returns {string}
 */
export const getBaseUrlParam = () => {
  const baseUrl = window.location.origin;
  return baseUrl ? `baseUrl=${baseUrl}` : "";
};

//   /String to URL
export const getStringToUrl = (str) => {
  if (!str) {
    return null;
  }
  try {
    str = str
      .toLowerCase()
      .replace("/", "")
      .replace(/\s+/g, " ")
      .replace(/ /g, "-")
      .replace(/_/g, "-")
      .replace(/[^\w-]+/g, "");
    return str;
  } catch (e) {
    return "";
  }
};

/**
 * Get Url Parameter

 * @param name
 */
export function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : name === "email"
    ? decodeURIComponent(results[1])
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Update Url Value and Value Pass For Url
export const UpdateUrl = (params, props) => {
  const currentPage = window.location.pathname;
  let queryString = "";

  queryString = "?";

  const searchParams = new URLSearchParams(params);
  const url = `${currentPage}${queryString}${searchParams.toString()}`;
  if (props.history) {
    props.history.push(`${Url.removeEmptyParams(url)}`, {
      data: params,
    });
  }
};
