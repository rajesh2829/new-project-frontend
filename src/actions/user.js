import { apiClient } from "../apiClient";
import * as commonConstant from "../common/constants";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
// import * as Action from "./constants";
import { fetchList } from "./table";
import { User } from "../helpers/User";

// UserStatus Constants
export const Action = {
  // Update User Status Constants
  REQUEST_UPDATE_USER_STATUS: "REQUEST_UPDATE_USER_STATUS",
  RECEIVE_UPDATE_BRAND_STATUS: "RECEIVE_UPDATE_BRAND_STATUS",
  USER_UPDATE_ERROR_STATUS: "BRAND_UPDATE_ERROR_STATUS",

  /* Fetch user permission details */
  REQUEST_USER_PERMISSION_DETAIL: "REQUEST_USER_PERMISSION_DETAIL",
  RECEIVE_USER_PERMISSION_DETAIL: "RECEIVE_USER_PERMISSION_DETAIL",
  FETCH_USER_PERMISSION_DETAIL_FAIL:
    "FETCH_USER_PERMISSION_DETAIL_FAIL",

  // Add New User
  REQUEST_CREATE_NEW_USER: "REQUEST_CREATE_NEW_USER",
  RECEIVE_CREATE_NEW_USER: "RECEIVE_CREATE_NEW_USER",
  NEW_USER_CREATE_ERROR: "ERROR_CREATE_NEW_USER",

  /* Fetch user details */
  REQUEST_USER_DETAIL: "REQUEST_USER_DETAIL",
  RECEIVE_USER_DETAIL: "RECEIVE_USER_DETAIL",
  FETCH_USER_DETAIL_FAIL: "FETCH_USER_DETAIL_FAIL",

  //Delete UserSalary
  DELETE_USER_SALARY:"DELETE_USER_SALARY"
}


/**
 * Request for creating new user
 */
export function requestCreateNewUser() {
  return {
    type: Action.REQUEST_CREATE_NEW_USER,
  };
}

export function requestDeleteUserSalary() {
  return {
    type: Action.DELETE_USER_SALARY,
  };
}

/* update the status */
export function receiveUpdatedUserStatus() {
  return {
    type: Action.RECEIVE_UPDATE_BRAND_STATUS,
  };
}

/**
 * Receive for error updating Product
 */
export function UserUpdateStatusError(error) {
  return {
    type: Action.USER_UPDATE_ERROR_STATUS,
    error,
  };
}

/**
 * Receive for creating new user
 */
export function receiveCreateNewUser() {
  return {
    type: Action.RECEIVE_CREATE_NEW_USER,
  };
}

/**
 * Receive for error creating new user
 */
export function newUserCreateError(error) {
  return {
    type: Action.NEW_USER_CREATE_ERROR,
    error,
  };
}

/**
 * Create New User
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Request for user details
 */
function requestUserDetail() {
  return { type: Action.REQUEST_USER_DETAIL };
}

/**
 * Receive user details
 */
function receiveUserDetail(payload) {
  return { type: Action.RECEIVE_USER_DETAIL, payload };
}

/**
 * Receive user details fail
 */
function fetchUserDetailFail(error) {
  return { type: Action.FETCH_USER_DETAIL_FAIL, error };
}

/**
 * Request for user permission details
 */
function requestUserPermissionDetail() {
  return { type: Action.REQUEST_USER_PERMISSION_DETAIL };
}

/**
 * Receive user  permission details
 */
function receiveUserPermissionDetail(payload) {
  return { type: Action.RECEIVE_USER_PERMISSION_DETAIL, payload };
}

/**
 * Receive user permission details fail
 */
function fetchUserPermissionDetailFail(error) {
  return { type: Action.FETCH_USER_PERMISSION_DETAIL_FAIL, error };
}

/**
 * Get user details
 *
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function fetchUserDetail() {
  return (dispatch) => {
    dispatch(requestUserDetail());

    return apiClient
      .get(`/v1/user`)
      .then((response) => {
        dispatch(receiveUserDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserDetailFail(error));

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
 * Get user details
 *
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function fetchUserPermissionDetails(id) {
  return (dispatch) => {
    dispatch(requestUserPermissionDetail());

    return apiClient
      .get(`/v1/user`)
      .then((response) => {
        dispatch(receiveUserPermissionDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserPermissionDetailFail(error));

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

export function updateUserStatus(id, status, params) {
  let data = {};
  data.status = status;
  return (dispatch) => {
    dispatch(receiveUpdatedUserStatus());
    apiClient
      .put(`${endpoints().userAPI}/status/${id}`, data)
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
      })
      .catch((error) => {
        dispatch(UserUpdateStatusError(error));

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
