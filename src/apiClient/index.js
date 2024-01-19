import axios from "axios";
import { isBadRequest } from "../lib/Http";
import { API_URL, DEFAULT_API_KEY } from "../configs";
// History
import history from "../history";
// Cookie
import { COOKIE_SESSION_TOKEN, clearAllCookies } from "../lib/Cookie";
// Helper
import Cookie from "../lib/Helper";
import { HttpStatus } from "../helpers/HttpStatus";
import { getRedirectUrl } from "../lib/Url";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    common: {
      //set token for authorization
      Authorization: Cookie.get(COOKIE_SESSION_TOKEN),
    },
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === HttpStatus.UNAUTHORIZED) {
      logOut()
    }
    if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
      pageNotFound()
    }
    return Promise.reject(error);
  }
);

function pageNotFound(){
  window.location.replace("/page-not-found");


}

function logOut(){
  let redirectUrl = getRedirectUrl()
  let url = redirectUrl ? `/login?redirect=${redirectUrl}` : "/login"
  clearAllCookies()
  history.push(url)
}

export function get(url, callback) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookie.get(COOKIE_SESSION_TOKEN),
      Pragma: "no-cache",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    })
    .then((result) => callback(null, result))
    .catch((err) => callback(err));
}

// Call Post API Public API
export function apiClientPostPublic(apiUrl, data, callback) {
  apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
  apiClient
    .post(`${apiUrl}`, data)
    .then((response) => {
      let token;
      let userId;
      let role;
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        token = response.data.token;
        userId = response.data.userId;
        role = response.data.role;
      }
      return callback(null, token, role, userId);
    })
    .catch((error) => {
      let errorMessage;
      if (error && error.response && error.response.status === 401) {
        history.push("/login");
      } else if (isBadRequest(error)) {
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
        return callback(errorMessage);
      }
    });
}

// Call Get Api
export function apiClientGet(apiUrl, callback) {
  apiClient
    .get(`${apiUrl}`)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      let errorMessage;
      if (error && error.response && error.response.status === 401) {
        window.location.replace("/login");
      } else if (isBadRequest(error)) {
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
        return callback(errorMessage);
      }
    });
}
