import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

// Action Constants
export const Action = {
  // Delete Job
  REQUEST_DELETE_JOB : "REQUEST_DELETE_JOB",
  RECEIVE_DELETE_JOB : "RECEIVE_DELETE_JOB",
  JOB_DELETE_ERROR : "JOB_DELETE_ERROR",
  // Add Job
  REQUEST_ADD_JOB : "REQUEST_ADD_JOB",
  RECEIVE_ADD_JOB : "RECEIVE_ADD_JOB",
  JOB_ADD_ERROR : "JOB_ADD_ERROR",
  // Update Job
  REQUEST_UPDATE_JOB : "REQUEST_UPDATE_JOB",
  RECEIVE_UPDATE_JOB : "RECEIVE_UPDATE_JOB",
  JOB_UPDATE_ERROR : "JOB_UPDATE_ERROR",
};

/**
 * Request for deleting Job
 */
export function requestDeleteJob() {
  return {
    type: Action.REQUEST_DELETE_JOB,
  };
}

/**
 * Receive for deleting Job
 */
export function receiveDeleteJob() {
  return {
    type: Action.RECEIVE_DELETE_JOB,
  };
}

/**
 * Receive for error deleting Job
 */
export function jobDeleteError(error) {
  return {
    type: Action.JOB_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Job
 *
 * @param id
 * @returns {function(*): *}
 */


/**
 * Request for creating Job
 */
export function requestAddJob() {
  return {
    type: Action.REQUEST_ADD_JOB,
  };
}

/**
 * Receive for receive Job
 */
export function receiveAddJob() {
  return {
    type: Action.RECEIVE_ADD_JOB,
  };
}

/**
 * Receive for error creating Job
 */
export function JobsCreateError(error) {
  return {
    type: Action.JOB_ADD_ERROR,
    error,
  };
}

/**
 * Create Job
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */


/**
 * Request for updating Job
 */
export function requestUpdateJob() {
  return {
    type: Action.REQUEST_UPDATE_JOB,
  };
}

/**
 * Receive for updating Job
 */
export function receiveUpdateJob() {
  return {
    type: Action.RECEIVE_UPDATE_JOB,
  };
}

/**
 * Receive for error updating Job
 */
export function JobUpdateError(error) {
  return {
    type: Action.JOB_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Job details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */

