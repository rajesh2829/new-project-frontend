import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";
import { fetchList } from "./table";

export const Shift = {
    // Create Shift 
    REQUEST_CREATE_USER_SHIFT : "REQUEST_CREATE_USER_SHIFT",
    RECEIVE_CREATE_USER_SHIFT : "RECEIVE_CREATE_USER_SHIFT",
    USER_SHIFT_CREATE_ERROR : "USER_SHIFT_CREATE_ERROR",
     // Update Shift
    REQUEST_UPDATE_SHIFT : "REQUEST_UPDATE_SHIFT",
    RECEIVE_UPDATE_SHIFT : "RECEIVE_UPDATE_SHIFT",
    SHIFT_UPDATE_ERROR : "SHIFT_UPDATE_ERROR",
    // Delete User Role Permission
    REQUEST_DELETE_SHIFT : "REQUEST_DELETE_SHIFT",
    RECEIVE_DELETE_SHIFT : "RECEIVE_DELETE_SHIFT",
    SHIFT_DELETE_ERROR : "SHIFT_DELETE_ERROR",
    }
    export function requestCreateShift() {
        return {
          type: Shift.REQUEST_CREATE_USER_SHIFT,
        };
      }
      
      /**
       * Receive for receive Shift
       */
      export function receiveCreateShift() {
        return {
          type: Shift.RECEIVE_CREATE_USER_SHIFT,
        };
      }
      
      /**
       * Receive for error creating Shift
       */
      export function ShiftCreateError(error) {
        return {
          type: Shift.USER_SHIFT_CREATE_ERROR,
          error,
        };
      }
      
      
      /**
       * Create Permission
       *
       * @param data
       * @returns {function(*): Promise<AxiosResponse<any>>}
       */
       export function createShift(data, params) {
        return async (dispatch) => {
          dispatch(requestCreateShift());
      
          try {
            console.log(data);
            const response = await apiClient.post(
              `${endpoints().shiftAPI}`,
              data
            );
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              toast.success(successMessage);
            }
            dispatch(
              fetchList(
                "shift",
                `${endpoints().shiftAPI}/search`,
                1,
                25,
                params
              )
            );
            dispatch(receiveCreateShift());
          } catch (error) {
            dispatch(ShiftCreateError(error));
      
            if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              toast.error(errorMessage);
              console.error(errorMessage);
            }
          }
        };
      }
      
      /**
       * Request for updating Shift
       */
       export function requestUpdateShift() {
        return {
          type: Shift.REQUEST_UPDATE_SHIFT,
        };
      }
      
      /**
       * Receive for updating Shift
       */
      export function receiveUpdateShift() {
        return {
          type: Shift.RECEIVE_UPDATE_SHIFT,
        };
      }
      
      /**
       * Receive for error updating Shift
       */
      export function ShiftUpdateError(error) {
        return {
          type: Shift.SHIFT_UPDATE_ERROR,
          error,
        };
      }
      
      /**
       * Update Shift details
       *
       * @param id
       * @param data
       * @returns {function(...[*]=)}
       */
      export function updateShift(id, data, params) {
        console.log(data);
        return (dispatch) => {
          dispatch(requestUpdateShift());
          apiClient
            .put(`${endpoints().shiftAPI}/${id}`, data)
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
                  "shift",
                  `${endpoints().shiftAPI}/search`,
                  1,
                  25,
                  params
                )
              );
            })
            .catch((error) => {
              dispatch(ShiftUpdateError(error));
      
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
       * Request for deleting Shift
       */
      export function requestDeleteShift() {
        return {
          type: Shift.REQUEST_DELETE_SHIFT,
        };
      }
      
      /**
       * Receive for deleting Shift
       */
      export function receiveDeleteShift() {
        return {
          type: Shift.RECEIVE_DELETE_SHIFT,
        };
      }
      
      /**
       * Receive for error deleting Shift
       */
      export function ShiftDeleteError(error) {
        return {
          type: Shift.SHIFT_DELETE_ERROR,
          error,
        };
      }
      
      /**
       * Delete Shift
       *
       * @param id
       * @returns {function(*): *}
       */
      export function deleteShift(id, roleId, params, callback) {
        if (roleId) {
          params.role_id = roleId;
        }
        return (dispatch) => {
          dispatch(requestDeleteShift());
      
          apiClient
            .delete(`${endpoints().shiftAPI}/${id}`)
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
                  "shift",
                  `${endpoints().shiftAPI}/search`,
                  1,
                  25,
                  params
                )
              );
              return callback();
            })
            .catch((error) => {
              dispatch(ShiftDeleteError(error));
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