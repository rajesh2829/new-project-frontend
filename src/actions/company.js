import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { Status } from "../helpers/Company";

// Action Constants
export const Action = {
  // Delete Company
  REQUEST_DELETE_COMPANY: "REQUEST_DELETE_COMPANY",
  RECEIVE_DELETE_COMPANY: "RECEIVE_DELETE_COMPANY",
  COMPANY_DELETE_ERROR: "COMPANY_DELETE_ERROR",
  // Add Company
  REQUEST_CREATE_COMPANY: "REQUEST_CREATE_COMPANY",
  RECEIVE_CREATE_COMPANY: "RECEIVE_CREATE_COMPANY",
  COMPANY_CREATE_ERROR: "COMPANY_CREATE_ERROR",
  // Update Company
  REQUEST_UPDATE_COMPANY: "REQUEST_UPDATE_COMPANY",
  RECEIVE_UPDATE_COMPANY: "RECEIVE_UPDATE_COMPANY",
  COMPANY_UPDATE_ERROR: "COMPANY_UPDATE_ERROR",

  // Company Status Update
  RECEIVE_UPDATE_COMPANY_STATUS: "RECEIVE_UPDATE_COMPANY_STATUS",
  COMPANY_UPDATE_ERROR_STATUS: "COMPANY_UPDATE_ERROR_STATUS",
}

/**
 * Request for deleting Company
 */
export function requestDeleteCompany() {
  return {
    type: Action.REQUEST_DELETE_COMPANY,
  };
}

/**
 * Receive for deleting Company
 */
export function receiveDeleteCompany() {
  return {
    type: Action.RECEIVE_DELETE_COMPANY,
  };
}

/**
 * Receive for error deleting Company
 */
export function CompanyDeleteError(error) {
  return {
    type: Action.COMPANY_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Company
 *
 * @param id
 * @returns {function(*): *}
 */


/**
 * Request for creating Company
 */
export function requestCreateCompany() {
  return {
    type: Action.REQUEST_CREATE_COMPANY,
  };
}

/**
 * Receive for receive Company
 */
export function receiveCreateCompany() {
  return {
    type: Action.RECEIVE_CREATE_COMPANY,
  };
}

/**
 * Receive for error creating Company
 */
export function CompanyCreateError(error) {
  return {
    type: Action.COMPANY_CREATE_ERROR,
    error,
  };
}

/**
 * Create Company
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
/**
 * Request for updating Company
 */
export function requestUpdateCompany() {
  return {
    type: Action.REQUEST_UPDATE_COMPANY,
  };
}

/**
 * Receive for updating Company
 */
export function receiveUpdateCompany() {
  return {
    type: Action.RECEIVE_UPDATE_COMPANY,
  };
}

/**
 * Receive for error updating Company
 */
export function CompanyUpdateError(error) {
  return {
    type: Action.COMPANY_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Company details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */


/* update the Company status */
export function receiveUpdatedCompanyStatus() {
  return {
    type: Action.RECEIVE_UPDATE_COMPANY_STATUS,
  };
}

/**
 * Receive for error updating Company
 */
export function companyUpdateStatusError(error) {
  return {
    type: Action.COMPANY_UPDATE_ERROR_STATUS,
    error,
  };
}

/**
 * Update Company details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function UpdateCompanyStatus(id, data, params) {
  return (dispatch) => {
    dispatch(receiveUpdatedCompanyStatus());
    apiClient
      .put(`${endpoints().companyAPI}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("All", `${endpoints().companyAPI}/search`, 1, 25, params)
        );
        dispatch(
          fetchList(
            "Active",
            `${endpoints().companyAPI}/search`,
            1,
            25,
            { status: Status.ACTIVE },
            params
          )
        );
        dispatch(
          fetchList(
            "InActive",
            `${endpoints().companyAPI}/search`,
            1,
            25,
            { status: Status.INACTIVE },
            params
          )
        );
      })
      .catch((error) => {
        dispatch(companyUpdateStatusError(error));

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
