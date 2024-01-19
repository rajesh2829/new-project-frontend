import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/EndPoints";
import * as adminConstants from "../constants/Support";

/**
 * Request for deleting Portal
 */
export function requestDeletePortal() {
  return {
    type: adminConstants.REQUEST_DELETE_PORTAL,
  };
}

/**
 * Receive for deleting Portal
 */
export function receiveDeletePortal() {
  return {
    type: adminConstants.RECEIVE_DELETE_PORTAL,
  };
}

/**
 * Receive for error deleting Portal
 */
export function PortalDeleteError(error) {
  return {
    type: adminConstants.PORTAL_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Portal
 *
 * @param id
 * @returns {function(*): *}
 */
export function deletePortal(id, params, company_id) {
  return (dispatch) => {
    dispatch(requestDeletePortal());

    apiClient
      .delete(`${endpoints().portalAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("portal", `${endpoints().portalAPI}/searchByCompany/${company_id}`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(PortalDeleteError(error));
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
 * Request for creating Portal
 */
export function requestCreatePortal() {
  return {
    type: adminConstants.REQUEST_CREATE_PORTAL,
  };
}

/**
 * Receive for receive Portal
 */
export function receiveCreatePortal() {
  return {
    type: adminConstants.RECEIVE_CREATE_PORTAL,
  };
}

/**
 * Receive for error creating Portal
 */
export function PortalCreateError(error) {
  return {
    type: adminConstants.PORTAL_CREATE_ERROR,
    error,
  };
}

/**
 * Create Portal
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createPortal(data, params, toggle, company_id) {
  return (dispatch) => {
    dispatch(requestCreatePortal());

    return apiClient
      .post(`${endpoints().portalAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        toggle();
      })
      .then(() => {
        dispatch(
          fetchList("portal", `${endpoints().portalAPI}/searchByCompany/${company_id}`, 1, 25, params)
        );
        dispatch(receiveCreatePortal());
      })
      .catch((error) => {
        dispatch(PortalCreateError(error));

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
 * Request for updating Portal
 */
export function requestUpdatePortal() {
  return {
    type: adminConstants.REQUEST_UPDATE_PORTAL,
  };
}

/**
 * Receive for updating Portal
 */
export function receiveUpdatePortal() {
  return {
    type: adminConstants.RECEIVE_UPDATE_PORTAL,
  };
}

/**
 * Receive for error updating Portal
 */
export function PortalUpdateError(error) {
  return {
    type: adminConstants.PORTAL_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Portal details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updatePortal(id, data, params, getPortalDetail) {
  return (dispatch) => {
    dispatch(requestUpdatePortal());
    apiClient
      .put(`${endpoints().portalAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        getPortalDetail();
      })
      .catch((error) => {
        dispatch(PortalUpdateError(error));

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
