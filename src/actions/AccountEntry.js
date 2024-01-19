import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

// Action Constants
export const Action = {
  // Delete AccountEntry
  REQUEST_DELETE_ACCOUNT_ENTRY: "REQUEST_DELETE_ACCOUNT_ENTRY",
  RECEIVE_DELETE_ACCOUNT_ENTRY: "RECEIVE_DELETE_ACCOUNT_ENTRY",
  ACCOUNT_ENTRY_DELETE_ERROR: "ACCOUNT_ENTRY_DELETE_ERROR",
  // Add ACCOUNT_ENTRY
  REQUEST_CREATE_ACCOUNT_ENTRY: "REQUEST_CREATE_ACCOUNT_ENTRY",
  RECEIVE_CREATE_ACCOUNT_ENTRY: "RECEIVE_CREATE_ACCOUNT_ENTRY",
  ACCOUNT_ENTRY_CREATE_ERROR: "ACCOUNT_ENTRY_CREATE_ERROR",
  // Update ACCOUNT_ENTRY
  REQUEST_UPDATE_ACCOUNT_ENTRY: "REQUEST_UPDATE_ACCOUNT_ENTRY",
  RECEIVE_UPDATE_ACCOUNT_ENTRY: "RECEIVE_UPDATE_ACCOUNT_ENTRY",
  ACCOUNT_ENTRY_UPDATE_ERROR: "ACCOUNT_ENTRY_UPDATE_ERROR",
  // Create ACCOUNT_ENTRY Block
  REQUEST_CREATE_ACCOUNT_ENTRY_BLOCK: "REQUEST_CREATE_ACCOUNT_ENTRY_BLOCK",
  RECEIVE_CREATE_ACCOUNT_ENTRY_BLOCK: "RECEIVE_CREATE_ACCOUNT_ENTRY_BLOCK",
  ACCOUNT_ENTRY_BLOCK_CREATE_ERROR: "ACCOUNT_ENTRY_BLOCK_CREATE_ERROR",
  // Delete ACCOUNT_ENTRY Block
  REQUEST_DELETE_ACCOUNT_ENTRY_BLOCK: "REQUEST_DELETE_ACCOUNT_ENTRY_BLOCK",
  RECEIVE_DELETE_ACCOUNT_ENTRY_BLOCK: "RECEIVE_DELETE_ACCOUNT_ENTRY_BLOCK",
  ACCOUNT_ENTRY_BLOCK_DELETE_ERROR: "ACCOUNT_ENTRY_BLOCK_DELETE_ERROR",
  // Update ACCOUNT_ENTRY Block
  REQUEST_UPDATE_ACCOUNT_ENTRY_BLOCK: "REQUEST_UPDATE_ACCOUNT_ENTRY_BLOCK",
  RECEIVE_UPDATE_ACCOUNT_ENTRY_BLOCK: "RECEIVE_UPDATE_ACCOUNT_ENTRY_BLOCK",
  ACCOUNT_ENTRY_BLOCK_UPDATE_ERROR: "ACCOUNT_ENTRY_BLOCK_UPDATE_ERROR",
};

/**
 * Request for creating AccountEntry
 */
export function requestCreateAccountEntry() {
  return {
    type: Action.REQUEST_CREATE_ACCOUNT_ENTRY,
  };
}

/**
 * Receive for receive AccountEntry
 */
export function receiveCreateAccountEntry() {
  return {
    type: Action.RECEIVE_CREATE_ACCOUNT_ENTRY,
  };
}

/**
 * Receive for error creating AccountEntry
 */
export function accountEntryCreateError(error) {
  return {
    type: Action.ACCOUNT_ENTRY_CREATE_ERROR,
    error,
  };
}

/**
 * Create Account Entry
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */


/**
 * Request for deleting AccountEntry
 */
export function requestDeleteAccountEntry() {
  return {
    type: Action.REQUEST_DELETE_ACCOUNT_ENTRY,
  };
}

/**
 * Receive for deleting AccountEntry
 */
export function receiveDeleteAccountEntry() {
  return {
    type: Action.RECEIVE_DELETE_ACCOUNT_ENTRY,
  };
}

/**
 * Receive for error deleting AccountEntry
 */
export function AccountEntryDeleteError(error) {
  return {
    type: Action.ACCOUNT_ENTRY_DELETE_ERROR,
    error,
  };
}

/**
 * Delete AccountEntry
 *
 * @param id
 * @returns {function(*): *}
 */


/**
 * Request for updating AccountEntry
 */
export function requestUpdateAccountEntry() {
  return {
    type: Action.REQUEST_UPDATE_ACCOUNT_ENTRY,
  };
}

/**
 * Receive for updating AccountEntry
 */
export function receiveUpdateAccountEntry() {
  return {
    type: Action.RECEIVE_UPDATE_ACCOUNT_ENTRY,
  };
}

/**
 * Receive for error updating AccountEntry
 */
export function AccountEntryUpdateError(error) {
  return {
    type: Action.ACCOUNT_ENTRY_UPDATE_ERROR,
    error,
  };
}

/**
 * Update AccountEntry details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */

