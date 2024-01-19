import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import * as schedulerConstant from "../helpers/SchedulerJob";

/**
 * Request for deleting Job
 */
export function requestDeleteJob() {
  return {
    type: schedulerConstant.REQUEST_DELETE_JOB,
  };
}

/**
 * Receive for deleting Job
 */
export function receiveDeleteJob() {
  return {
    type: schedulerConstant.RECEIVE_DELETE_JOB,
  };
}

/**
 * Receive for error deleting job
 */
export function jobDeleteError(error) {
  return {
    type: schedulerConstant.JOB_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Job
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteJob(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteJob());

    apiClient
      .delete(`${endpoints().schedulerJobAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "schedulerJob",
            `${endpoints().schedulerJobAPI}/list`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(jobDeleteError(error));
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
 * Request for creating job
 */
export function requestAddSchedulerJob() {
  return {
    type: schedulerConstant.REQUEST_CREATE_JOB,
  };
}

/**
 * Receive for receive Scheduler Job
 */
export function receiveAddSchedulerJob() {
  return {
    type: schedulerConstant.RECEIVE_CREATE_JOB,
  };
}

/**
 * Receive for error creating job
 */
export function jobCreateError(error) {
  return {
    type: schedulerConstant.JOB_CREATE_ERROR,
    error,
  };
}

/**
 * Create Scheduler Jov
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addSchedulerJob(data, params) {
  return (dispatch) => {
    dispatch(requestAddSchedulerJob());

    return apiClient
      .post(`${endpoints().schedulerJobAPI}/`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "schedulerJob",
            `${endpoints().schedulerJobAPI}/list`,
            1,
            25,
            params,{
              pagination:true
            }
          )
        );
        dispatch(receiveAddSchedulerJob());
      })
      .catch((error) => {
        dispatch(jobCreateError(error));

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
 * Request for updating Job
 */
export function requestUpdateJob() {
  return {
    type: schedulerConstant.REQUEST_UPDATE_JOB,
  };
}

/**
 * Receive for updating Job
 */
export function receiveUpdateJob() {
  return {
    type: schedulerConstant.RECEIVE_UPDATE_JOB,
  };
}

/**
 * Receive for error updating job
 */
export function jobUpdateError(error) {
  return {
    type: schedulerConstant.JOB_UPDATE_ERROR,
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
export function updateJob(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateJob());
    apiClient
      .put(`${endpoints().schedulerJobAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
     
      .catch((error) => {
        dispatch(jobUpdateError(error));

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

/**
 * Update Sync Time and Date 
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateSync(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateJob());
    apiClient
      .put(`${endpoints().schedulerJobAPI}/${id}`, data)
      .then(() => {
        dispatch(
          fetchList(
            "schedulerJob",
            `${endpoints().schedulerJobAPI}/list`,
            params.CurrentPage || 1,
            params.CurrentPageSize || 25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(jobUpdateError(error));

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
