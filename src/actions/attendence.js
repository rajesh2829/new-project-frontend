import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import Url from "../lib/Url";
// Request for creating Bank data
/* Add Bank*/
const REQUEST_ADD_ATTENDENCE = "REQUEST_ADD_ATTENDENCE";
const RECEIVE_ADD_ATTENDENCE = "RECEIVE_ADD_ATTENDENCE";
const ATTENDENCE_ADD_ERROR = "ATTENDENCE_ADD_ERROR";

// Delete Bank
const REQUEST_DELETE_ATTENDENCE = "REQUEST_DELETE_ATTENDENCE";
const RECEIVE_DELETE_ATTENDENCE = "RECEIVE_DELETE_ATTENDENCE";
const ATTENDENCE_DELETE_ERROR = "ATTENDENCE_DELETE_ERROR";

// Update Attendance
const REQUEST_UPDATE_ATTENDANCE = "REQUEST_UPDATE_ATTENDANCE";
const RECEIVE_UPDATE_ATTENDANCE = "RECEIVE_UPDATE_ATTENDANCE";
const ATTENDANCE_UPDATE_ERROR = "ATTENDANCE_UPDATE_ERROR";
// Request Update Attendance
export function requestUpdateAttendance() { return { type: REQUEST_UPDATE_ATTENDANCE } };
// Receive Update Attendance
export function receiveUpdateAttendance() { return { type: RECEIVE_UPDATE_ATTENDANCE } };
// Update Attendance Error
export function updateAttendanceError() { return { type: ATTENDANCE_UPDATE_ERROR } };

// Bulk Update Attendance 
const REQUEST_BULK_UPDATE_ATTENDANCE = "REQUEST_BULK_UPDATE_ATTENDANCE";
const RECEIVE_BULK_UPDATE_ATTENDANCE = "RECEIVE_BULK_UPDATE_ATTENDANCE";
const ATTENDANCE_BULK_UPDATE_ERROR = "ATTENDANCE_BULK_UPDATE_ERROR";
// Request Bulk Update Attendance
export function requestBulkUpdateAttendance() { return { type: REQUEST_BULK_UPDATE_ATTENDANCE } };
// Receive Bulk Update Attendance
export function receiveBulkUpdateAttendance() { return { type: RECEIVE_BULK_UPDATE_ATTENDANCE } };
// Bulk Update Attendance Error
export function bulkUpdateAttendanceError() { return { type: ATTENDANCE_BULK_UPDATE_ERROR } };

// Bulk Delete Attendance 
const REQUEST_BULK_DELETE_ATTENDANCE = "REQUEST_BULK_DELETE_ATTENDANCE";
const RECEIVE_BULK_DELETE_ATTENDANCE = "RECEIVE_BULK_DELETE_ATTENDANCE";
const ATTENDANCE_BULK_DELETE_ERROR = "ATTENDANCE_BULK_DELETE_ERROR";

/* Delete Attendance */
export const REQUEST_DELETE_ATTENDANCE = "REQUEST_DELETE_ATTENDANCE";
export const RECEIVE_DELETE_ATTENDANCE = "RECEIVE_DELETE_ATTENDANCE";
export const ATTENDANCE_DELETE_ERROR = "ATTENDANCE_DELETE_ERROR";

// Request Bulk Delete Attendance
export function requestBulkDeleteAttendance() { return { type: REQUEST_BULK_DELETE_ATTENDANCE } };
// Receive Bulk Delete Attendance
export function receiveBulkDeleteAttendance() { return { type: RECEIVE_BULK_DELETE_ATTENDANCE } };
// Bulk Delete Attendance Error
export function bulkDeleteAttendanceError() { return { type: ATTENDANCE_BULK_DELETE_ERROR } };


/**
 * Request for deleting Attendance
 */
export function requestDeleteAttendance() {
  return {
    type: REQUEST_DELETE_ATTENDANCE,
  };
}

/**
 * Receive for deleting Attendance
 */
export function receiveDeleteAttendance() {
  return {
    type: RECEIVE_DELETE_ATTENDANCE,
  };
}

/**
 * Receive for error deleting Attendance
 */

export function requestAddAttendence() {
  return {
    type: REQUEST_ADD_ATTENDENCE
  }
};
// Reveive response
export function receivedAddResponse() {
  return {
    type: RECEIVE_ADD_ATTENDENCE
  }
}
// Error
export function addAttendenceError() {
  return {
    type: ATTENDENCE_ADD_ERROR
  }
};

/**
 * Request for deleting Page
 */
export function requestDeleteAttendence() {
  return {
    type: REQUEST_DELETE_ATTENDENCE,
  };
}

/**
 * Receive for deleting Page
 */
export function receiveDeleteAttendence() {
  return {
    type: RECEIVE_DELETE_ATTENDENCE,
  };
}

/**
* Receive for error deleting Page
*/
export function attendanceDeleteError(error) {
  return {
    type: ATTENDENCE_DELETE_ERROR,
    error,
  };
}





/**
 * Delete Transfer
 *
 *  @param id
 * @returns {function(*): *}
 */
// Attendance Bulk Update action
