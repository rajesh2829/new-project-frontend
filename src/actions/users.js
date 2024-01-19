//API
import { apiClient } from "../apiClient";
//Common
import { isBadRequest } from "../lib/Http";
//Components
import toast from "../components/Toast";
import { endpoints } from "../api/EndPoints";
import * as userConstant from "./Constant";

/**
 * Request for user details
 */
function requestUserDetail() {
  return { type: userConstant.REQUEST_USER_DETAIL };
}

/**
 * Update User details
 *
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateUser(data) {
  apiClient
    .put(`${endpoints().userAPI}`, data)
    .then((response) => {
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
      }
    })
    .catch((error) => {
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
}

/**
 * Get user details
 *
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Receive user details
 */
function receiveUserDetail(payload) {
  return { type: userConstant.RECEIVE_USER_DETAIL, payload };
}

/**
 * Receive user details fail
 */
function fetchUserDetailFail(error) {
  return { type: userConstant.FETCH_USER_DETAIL_FAIL, error };
}

export function fetchUserDetail() {
  return (dispatch) => {
    dispatch(requestUserDetail());

    return apiClient
      .get(`${endpoints().userAPI}`)
      .then((response) => {
        dispatch(receiveUserDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserDetailFail(error));

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
