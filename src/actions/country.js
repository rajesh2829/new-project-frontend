import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

export const Action = {
  // Add Country
  REQUEST_CREATE_COUNTRY : "REQUEST_CREATE_COUNTRY",
  RECEIVE_CREATE_COUNTRY : "RECEIVE_CREATE_COUNTRY",
  COUNTRY_CREATE_ERROR : "COUNTRY_CREATE_ERROR",
  // Delete Country
  REQUEST_DELETE_COUNTRY : "REQUEST_DELETE_COUNTRY",
  RECEIVE_DELETE_COUNTRY : "RECEIVE_DELETE_COUNTRY",
  COUNTRY_DELETE_ERROR : "COUNTRY_DELETE_ERROR",
  // Update Country
  REQUEST_UPDATE_COUNTRY : "REQUEST_UPDATE_COUNTRY",
  RECEIVE_UPDATE_COUNTRY : "RECEIVE_UPDATE_COUNTRY",
  COUNTRY_UPDATE_ERROR : "COUNTRY_UPDATE_ERROR",
};

/**
 * Request for creating country
 */
export function requestAddCountry() {
  return {
    type: Action.REQUEST_CREATE_COUNTRY,
  };
}

/**
 * Receive for receive Scheduler country
 */
export function receiveAddCountry() {
  return {
    type: Action.RECEIVE_CREATE_COUNTRY,
  };
}

/**
 * Receive for error creating country
 */
export function countryCreateError(error) {
  return {
    type: Action.COUNTRY_CREATE_ERROR,
    error,
  };
}

/**
 * Create country
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addCountry(data,toggle, params) {
  return (dispatch) => {
    dispatch(requestAddCountry());

    return apiClient
      .post(`${endpoints().countryAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          toggle()
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "country",
            `${endpoints().countryAPI}/search`,
            1,
            25,
            params
          )
        );
        dispatch(receiveAddCountry());
      })
      .catch((error) => {
        dispatch(countryCreateError(error));

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
 * Request for Deleting country
 */
 export function requestDeleteCountry() {
   return {
    type : Action.REQUEST_DELETE_COUNTRY,
  };
}

/**
 * Receive for deleting country
 */
 export function receiveDeleteCountry() {
  return {
    type: Action.RECEIVE_DELETE_COUNTRY,
  };
}

/**
 * Receive for error deleting country
 */
 export function countryDeleteError(error) {
  return {
    type: Action.COUNTRY_DELETE_ERROR,
    error,
  };
}

/**
 * Delete country
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
 export function deleteCountry(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteCountry());

    apiClient
      .delete(`${endpoints().countryAPI}/${id}`)
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
            "country",
            `${endpoints().countryAPI}/search`,
            1,
            25,
            params
          )
        );
        dispatch(receiveDeleteCountry());
      })
      .catch((error) => {
        dispatch(countryDeleteError(error));

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
 * Request for Updating country
 */
export function requestUpdateCountry() {
  return {
    type : Action.REQUEST_UPDATE_COUNTRY,
  };
}

/**
 * Receive for deleting country
 */
export function receiveUpdateCountry() {
  return {
    type: Action.RECEIVE_UPDATE_COUNTRY,
  };
}

/**
 * Receive for error deleting country
 */
export function countryUpdateError(error) {
  return {
    type: Action.COUNTRY_UPDATE_ERROR,
    error,
  };
}

/**
 * Update country
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updateCountry(id, data) {
  return (dispatch) => {
    dispatch(requestUpdateCountry());

    apiClient
      .post(`${endpoints().countryAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .catch((error) => {
        dispatch(countryUpdateError(error));
        
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
