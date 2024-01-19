import { apiClient } from "../apiClient";
// Components
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { HttpStatus } from "../helpers/HttpStatus";

const Action = {
    /* Setting List */
    REQUEST_SETTINGS_LIST: "REQUEST_SETTINGS_LIST",
    RECEIVE_SETTINGS_LIST: "RECEIVE_SETTINGS_LIST",
    FETCH_SETTINGS_LIST_FAIL: "FETCH_SETTINGS_LIST_FAIL",
}
/**
 * Request for Settings list
 */
function requestSettings() {
  return {
    type: Action.REQUEST_SETTINGS_LIST,
  };
}

/**
 * Receive for Settings list
 */
function receiveSettings({ data: payload }) {
  return {
    type: Action.RECEIVE_SETTINGS_LIST,
    payload,
  };
}

/**
 * Settings list fails
 */
function fetchSettingsFail() {
  return {
    type: Action.FETCH_SETTINGS_LIST_FAIL,
    payload: [],
  };
}

/**
 * Fetch Settings
 */
export function fetchSettings() {
  return (dispatch) => {
    dispatch(requestSettings());
    return apiClient
      .get(`${endpoints().settingAPI}`)
      .then((response) => response)
      .then((response) => {
        dispatch(receiveSettings(response));
      })
      .catch((error) => {
        dispatch(fetchSettingsFail());

        if (error.status >= HttpStatus.BAD_REQUEST) {
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
