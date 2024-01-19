import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import * as activityConstant from "../helpers/UserActivity";

// Action Constants
export const Action = {
  // Add Activity
  REQUEST_ADD_ACTIVITY : "REQUEST_ADD_ACTIVITY",
  RECEIVE_ADD_ACTIVITY : "RECEIVE_ADD_ACTIVITY",
  ACTIVITY_ADD_ERROR : "ACTIVITY_ADD_ERROR",
  // Update Activity
  REQUEST_UPDATE_ACTIVITY : "REQUEST_UPDATE_ACTIVITY",
  RECEIVE_UPDATE_ACTIVITY : "RECEIVE_UPDATE_ACTIVITY",
  ACTIVITY_UPDATE_ERROR : "ACTIVITY_UPDATE_ERROR",

  REQUEST_DELETE_ACTIVITY : "REQUEST_DELETE_ACTIVITY",
  RECEIVE_DELETE_ACTIVITY : "RECEIVE_DELETE_ACTIVITY",
  ACTIVITY_DELETE_ERROR : "ACTIVITY_DELETE_ERROR",
};

export function requestAddActivity() {
  return {
    type: Action.REQUEST_ADD_ACTIVITY,
  };
}
export function receiveActivity() {
  return {
    type: Action.RECEIVE_ADD_ACTIVITY,
  };
}
/**
 * Create Test Case
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

// Request update activity type
export function requestUpdateActivity() {
  return {
    type: Action.REQUEST_UPDATE_ACTIVITY,
  };
}
//error while updating
export function activityUpdateError(error) {
  return {
    type: Action.ACTIVITY_UPDATE_ERROR,
    error,
  };
}

// Request update activity type
export function requestDeleteActivity() {
  return {
    type: Action.REQUEST_DELETE_ACTIVITY,
  };
}
//error while updating
export function activityDeleteError(error) {
  return {
    type: Action.ACTIVITY_DELETE_ERROR,
    error,
  };
}

//update activity type data


