import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { Status } from "../helpers/Customer";
import  Url  from "../lib/Url";

export const Action = {
  // Delete Customer
  REQUEST_DELETE_CUSTOMER : "REQUEST_DELETE_CUSTOMER",
  RECEIVE_DELETE_CUSTOMER : "RECEIVE_DELETE_CUSTOMER",
  CUSTOMER_DELETE_ERROR : "CUSTOMER_DELETE_ERROR",
  // Add customer
  REQUEST_ADD_CUSTOMER : "REQUEST_ADD_CUSTOMER",
  RECEIVE_ADD_CUSTOMER : "RECEIVE_ADD_CUSTOMER",
  CUSTOMER_ADD_ERROR : "CUSTOMER_ADD_ERROR",
  // Update customers
  REQUEST_UPDATE_CUSTOMER : "REQUEST_UPDATE_CUSTOMER",
  RECEIVE_UPDATE_CUSTOMER : "RECEIVE_UPDATE_CUSTOMER",
  CUSTOMER_UPDATE_ERROR : "CUSTOMER_UPDATE_ERROR",
  //update customer status
  REQUEST_UPDATE_CUSTOMER_STATUS : "REQUEST_UPDATE_CUSTOMER_STATUS",
  RECEIVE_UPDATE_CUSTOMER_STATUS : "RECEIVE_UPDATE_CUSTOMER_STATUS",
  CUSTOMER_UPDATE_ERROR_STATUS : "CUSTOMER_UPDATE_ERROR_STATUS",
};

/**
 * Request for deleting customer
 */

export function requestdeleteCustomer() {
  return {
    type: Action.REQUEST_DELETE_CUSTOMER,
  };
}

/**
 * Receive for deleting customer
 */

export function receivedeleteCustomer() {
  return {
    type: Action.RECEIVE_DELETE_CUSTOMER,
  };
}

/**
 * Receive for error deleting customer
 */
export function cusromerDeleteError(error) {
  return {
    type: Action.CUSTOMER_DELETE_ERROR,

    error,
  };
}

/**
  
   * Delete customer
   *
   * @param id
   * @returns {function(*): *}
   */

export function deleteCustomer(id, params) {
  return (dispatch) => {
    dispatch(requestdeleteCustomer());
    apiClient
      .delete(`${endpoints().customerAPI}/${id}`)
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
            "customer",
            `${endpoints().customerAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(cusromerDeleteError(error));
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
 * Request for creating customer
 */
export function requestAddCustomer() {
  return {
    type: Action.REQUEST_ADD_CUSTOMER,
  };
}

/**
 * Receive for receive customer
 */
export function receiveAddPortal() {
  return {
    type: Action.RECEIVE_ADD_CUSTOMER,
  };
}

/**
 * Receive for error creating customer
 */

export function customerCreateError(error) {
  return {
    type: Action.CUSTOMER_ADD_ERROR,

    error,
  };
}

/**
  
   * Create customer
   *
   * @param data
   * @returns {function(*): Promise<AxiosResponse<any>>}
  
   */

export function addCustomer(data, params) {
  const section = Url.GetParam("section");
  return (dispatch) => {
    dispatch(requestAddCustomer());
    return apiClient
      .post(`${endpoints().customerAPI}`, data)
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
              "allCustomer",
              `${endpoints().customerAPI}/search`,
              1,
              25,
              {status: Url.GetParam("status"), pagination:true }
            )
          );

        dispatch(receiveAddPortal());
      })
      .catch((error) => {
        dispatch(customerCreateError(error));
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
 * Request for updating customer
 */

export function requestUpdateCustomer() {
  return {
    type: Action.REQUEST_UPDATE_CUSTOMER,
  };
}

/**
 * Receive for updating customer
 */

export function receiveUpdateCustomer() {
  return {
    type: Action.RECEIVE_UPDATE_CUSTOMER,
  };
}

/**
 * Receive for error updating customer
 */

export function customerUpdateError(error) {
  return {
    type: Action.CUSTOMER_UPDATE_ERROR,
    error,
  };
}

/**
  
   * Update customer details
   *
   * @param id
   * @param data
   * @returns {function(...[*]=)}
  
   */

export function updateCustomer(id, data, getCustomerDetail,params,cb) {
  return (dispatch) => {
    dispatch(requestUpdateCustomer());

    apiClient

      .put(`${endpoints().customerAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          getCustomerDetail();
          cb(successMessage)
        }
      })
      .catch((error) => {
        dispatch(customerUpdateError(error));
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

export function receiveStatusUpdateCustomer() {
  return {
    type: Action.REQUEST_UPDATE_CUSTOMER_STATUS,
  };
}

export function customerStatusUpdateError(error) {
  return {
    type: Action.CUSTOMER_UPDATE_ERROR_STATUS,
    error,
  };
}
export function updateCustomerStatus(id, status) {
  let data = {};
  data.status = status;
  return (dispatch) => {
    dispatch(receiveStatusUpdateCustomer());
    apiClient
      .put(`${endpoints().customerAPI}/status/${id}`, data)
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
            "activeCustomer",
            `${endpoints().customerAPI}/search`,
            1,
            25,
            { status: Status.ACTIVE }
          )
        );
        dispatch(
          fetchList(
            "inactiveCustomer",
            `${endpoints().customerAPI}/search`,
            1,
            25,
            { status: Status.INACTIVE }
          )
        );
        dispatch(
          fetchList(
            "allCustomer",
            `${endpoints().customerAPI}/search`,
            1,
            25,
            {}
          )
        );
      })
      .catch((error) => {
        dispatch(customerStatusUpdateError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
        }
      });
  };
}
