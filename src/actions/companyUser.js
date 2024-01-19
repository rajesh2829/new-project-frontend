import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import {
  clearAllCookies,
  COOKIE_SESSION_TOKEN,
  COOKIE_TIME_ZONE
} from "../lib/Cookie";
import Cookies, {  setCookie } from "../lib/Helper";
import { User } from "../helpers/User";
import { getRolePermissionList } from "../actions/userSetting";
import Permission from "../lib/Permission";

/* Delete PORTAL_USER */
const REQUEST_DELETE_PORTAL_USER = "REQUEST_DELETE_PORTAL_USER";
const RECEIVE_DELETE_PORTAL_USER = "RECEIVE_DELETE_PORTAL_USER";
const PORTAL_USER_DELETE_ERROR = "PORTAL_USER_DELETE_ERROR";

/* Add PORTAL_USER */
const REQUEST_CREATE_PORTAL_USER = "REQUEST_CREATE_PORTAL_USER";
const RECEIVE_CREATE_PORTAL_USER = "RECEIVE_CREATE_PORTAL_USER";
const PORTAL_USER_CREATE_ERROR = "PORTAL_USER_CREATE_ERROR";

/* Update PORTAL_USER */
const REQUEST_UPDATE_PORTAL_USER = "REQUEST_UPDATE_PORTAL_USER";
const RECEIVE_UPDATE_PORTAL_USER = "RECEIVE_UPDATE_PORTAL_USER";
const PORTAL_USER_UPDATE_ERROR = "PORTAL_USER_UPDATE_ERROR";

/**
 * Request for deleting companyUser
 */
export function requestDeleteCompanyUser() {
  return {
    type: REQUEST_DELETE_PORTAL_USER,
  };
}

/**
 * Receive for deleting companyUser
 */
export function receiveDeleteCompanyUser() {
  return {
    type: RECEIVE_DELETE_PORTAL_USER,
  };
}

/**
 * Receive for error deleting companyUser
 */
export function CompanyUserDeleteError(error) {
  return {
    type: PORTAL_USER_DELETE_ERROR,
    error,
  };
}

/**
 * Delete companyUser
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteCompanyUser(id, params, history) {
  return (dispatch) => {
    dispatch(requestDeleteCompanyUser());

    apiClient
      .delete(`${endpoints().userAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          history.push("/users");
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "companyUser",
            `${endpoints().userAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(CompanyUserDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}

/**
 * Request for creating companyUser
 */
export function requestCreateCompanyUser() {
  return {
    type: REQUEST_CREATE_PORTAL_USER,
  };
}

/**
 * Receive for receive companyUser
 */
export function receiveCreateCompanyUser() {
  return {
    type: RECEIVE_CREATE_PORTAL_USER,
  };
}

/**
 * Receive for error creating companyUser
 */
export function CompanyUserCreateError(error) {
  return {
    type: PORTAL_USER_CREATE_ERROR,
    error,
  };
}

/**
 * Create companyUser
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createCompanyUser(data, params) {
  return (dispatch) => {
    dispatch(requestCreateCompanyUser());

    return apiClient
      .post(`${endpoints().userAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(User.ALL_USERS_TAB, `${endpoints().userAPI}/search`, 1, 25, params)
        );
        dispatch(
          fetchList(
            User.ACTIVE_USER_TAB,
            `${endpoints().userAPI}/search`,
            1,
            25,
            { status: User.STATUS_ACTIVE_VALUE },
            params
          )
        );
        dispatch(
          fetchList(
            User.INACTIVE_USER_TAB,
            `${endpoints().userAPI}/search`,
            1,
            25,
            { status: User.STATUS_INACTIVE_VALUE },
            params
          )
        );
        dispatch(receiveCreateCompanyUser());
      })
      .catch((error) => {
        dispatch(CompanyUserCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };
}

/**
 * Request for updating companyUser
 */
export function requestUpdateCompanyUser() {
  return {
    type: REQUEST_UPDATE_PORTAL_USER,
  };
}

/**
 * Receive for updating companyUser
 */
export function receiveUpdateCompanyUser() {
  return {
    type: RECEIVE_UPDATE_PORTAL_USER,
  };
}

/**
 * Receive for error updating companyUser
 */
export function CompanyUserUpdateError(error) {
  return {
    type: PORTAL_USER_UPDATE_ERROR,
    error,
  };
}

/**
 * Update companyUser details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateCompanyUser(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateCompanyUser());
    apiClient
      .put(`${endpoints().userAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(User.ALL_USERS_TAB, `${endpoints().userAPI}/search`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(CompanyUserUpdateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}
export const BANNER_IMAGE = "TEXT";


function setHeader(){
  if (Cookies.get(COOKIE_SESSION_TOKEN)) {
    apiClient.defaults.headers.common.Authorization = Cookies.get(
      COOKIE_SESSION_TOKEN
    );
  }
}
// Login By Admin
export function loginByAdmin(userId, history) {
  return apiClient
    .post(`${endpoints().userAPI}/loginByAdmin/${userId}`)
    .then(async (response) => {
      if (response && response.data) {
        const { token, role, time_zone } = response.data;
        clearAllCookies();
        setCookie(COOKIE_SESSION_TOKEN, token);
        setHeader();

        if (time_zone) {
          setCookie(COOKIE_TIME_ZONE, time_zone)
        }
        const permissionList = await getRolePermissionList(role);
        
        var values = permissionList.map(obj => obj.value)

        // Convert the array to a comma-separated string
        var valuesString = values.join(',');

        localStorage.setItem(Permission.USER_ROLE, valuesString);

        history.push("/dashboard");
        window.location.reload();
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
    });
}

export function searchUserData(pageSize, params) {
  return (dispatch) => {
    dispatch(
      fetchList(
        User.ACTIVE_USER_TAB,
        `${endpoints().userAPI}/search`,
        1,
        pageSize,
        {
          pagination: true,
          section: User.STATUS_ACTIVE_TEXT,
          status: User.STATUS_ACTIVE_VALUE
        }
      )
    )
    dispatch(
      fetchList(
        User.INACTIVE_USER_TAB,
        `${endpoints().userAPI}/search`,
        1,
        pageSize,
        {
          pagination: true,
          section: User.STATUS_INACTIVE_TEXT,
          status: User.STATUS_INACTIVE_VALUE,
        }
      )
    )
    dispatch(
      fetchList(
        User.ALL_USERS_TAB,
        `${endpoints().userAPI}/search`,
        1,
        pageSize,
        params,
        {
          pagination: true,
          section: User.STATUS_ALL_TEXT
        }
      )
    )
    //dispatch(receivedResponse());
  };
}
