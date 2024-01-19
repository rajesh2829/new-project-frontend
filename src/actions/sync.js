// import toast from "../components/toast";
import { fetchList } from "./table";
import { endpoints } from "../api/endPoints"; 

// Services
import syncService from "../services/SyncService";

/**
 * Request for sync
 */
const Actions ={
   REQUEST_SYNC_LIST : "REQUEST_SYNC_LIST",
   RECEIVE_SYNC_LIST : "RECEIVE_SYNC_LIST",
   SYNC_LIST_ERROR : "SYNC_LIST_ERROR",
}


export function requestSyncList() {
  return {
    type: Actions.REQUEST_SYNC_LIST
  };
}

/**
 * Receive sync list
 */
export function receiveSyncList() {
  return {
    type: Actions.RECEIVE_SYNC_LIST
  };
}

/**
 * Receive error
 */
export function syncListError(error) {
  return {
    type: Actions.SYNC_LIST_ERROR,
    error
  };
}

/**
 * Filter sync list
 *
 * @param params
 */
export function filterSyncList(params) {
  return dispatch => {
    dispatch(requestSyncList());
    dispatch(
      fetchList(
        "sync",
        `${endpoints().sync}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveSyncList());
  };
}

/**
 * bulk update  sync list
 *
 * @param data
 * @param params
 */
export function bulkUpdateSync(data, params) {
  return async dispatch => {
    const response = await syncService.bulkUpdateSync(data);

    dispatch(requestSyncList());
    dispatch(
      fetchList(
        "sync",
        `${endpoints().sync}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveSyncList());

    return response;
  };
}

/**
 * update sync
 *
 * @param objectId
 * @param data
 * @param params
 */
export function updateSync(objectId, data, params) {
  return async dispatch => {
    const response = await syncService.updateSync(objectId, data);

    dispatch(requestSyncList());
    dispatch(
      fetchList(
        "sync",
        `${endpoints().sync}/search`,
        1,
        25,
        params ? params : {}
      )
    );
    dispatch(receiveSyncList());

    return response;
  };
}
