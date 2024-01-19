import Notifications from "react-notification-system-redux";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";

const Action = {
  REQUEST_TABLE_LIST: "REQUEST_TABLE_LIST",
  RECEIVE_TABLE_LIST: "RECEIVE_TABLE_LIST",
  FETCH_TABLE_LIST_FAIL: "FETCH_TABLE_LIST_FAIL",
  SET_TABLE_PAGE: "SET_TABLE_PAGE",
  CLEAR_TABLE_LIST: "CLEAR_TABLE_LIST",
}
/**
 * Request table list
 *
 * @param {*} id
 */
function requestTableList(id) {
  return { type: Action.REQUEST_TABLE_LIST, id };
}
/**
 * Receive table list
 *
 * @param {*} id
 * @param {*} payload
 */
function receiveTableList(id, payload) {
  return { type: Action.RECEIVE_TABLE_LIST, id, payload };
}

/**
 * Fetch table list fail
 *
 * @param {*} id
 */
function fetchTableListFail(id) {
  return { type: Action.FETCH_TABLE_LIST_FAIL, id };
}

/**
 * Clear table list
 *
 * @param {*} id
 */
export function clearTableList(id) {
  return { type: Action.CLEAR_TABLE_LIST, id };
}

/**
 * Set table page
 *
 * @param {*} id
 * @param {*} payload
 */
export function setTablePage(id, payload) {
  return { type: Action.SET_TABLE_PAGE, id, payload };
}

/**
 * Fetch list
 *
 * @param {*} id
 * @param {*} apiUrl
 * @param {*} page
 * @param {*} pageSize
 * @param {*} params
 */
export function fetchList(id, apiUrl, page, pageSize, params = {}) {
  const queryString = [];
  if (page) {
    queryString.push(`page=${page}`);
  }

  if (pageSize) {
    queryString.push(`pageSize=${pageSize}`);
  }
  
  const queryStringArray = Object.entries(params);

  if (queryStringArray.length > 0) {
    queryStringArray.forEach(([key, value]) => {
      if (value !== null && value !== "") {
        queryString.push(`${key}=${encodeURIComponent(value)}`);
      }
    });
  }

  apiUrl = `${apiUrl}?${queryString.join("&")}`;

  return (dispatch) => {
    dispatch(requestTableList(id));

    return apiClient
      .get(`${apiUrl}`)
      .then((response) => response.data)
      .then((list) => {
        dispatch(receiveTableList(id, list));
      })
      .catch((error) => {
        dispatch(fetchTableListFail(id));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
        if (error.status >= HttpStatus.BAD_REQUEST) {
          dispatch(
            Notifications.error({
              title: `Fetch List ${id} fail`,
              message: "error",
              autoDismiss: 3,
            })
          );
          throw new Error("Bad response from server");
        }
      });
  };
}
