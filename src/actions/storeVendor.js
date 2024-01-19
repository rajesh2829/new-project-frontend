import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import Vendor from "../helpers/Vendor";
import  Url  from "../lib/Url";

// Action Constants
export const Action = {
  // Delete Vendor
  REQUEST_DELETE_VENDOR: "REQUEST_DELETE_VENDOR",
  RECEIVE_DELETE_VENDOR: "RECEIVE_DELETE_VENDOR",
  VENDOR_DELETE_ERROR: "VENDOR_DELETE_ERROR",
  // Add Vendor
  REQUEST_ADD_VENDOR: "REQUEST_ADD_VENDOR",
  RECEIVE_ADD_VENDOR: "RECEIVE_ADD_VENDOR",
  VENDOR_ADD_ERROR: "VENDOR_ADD_ERROR",
  // Update Vendor
  REQUEST_UPDATE_VENDOR: "REQUEST_UPDATE_VENDOR",
  RECEIVE_UPDATE_VENDOR: "RECEIVE_UPDATE_VENDOR",
  VENDOR_UPDATE_ERROR: "VENDOR_UPDATE_ERROR",
  // Update Vendor Status
  REQUEST_UPDATE_VENDOR_STATUS: "REQUEST_UPDATE_VENDOR_STATUS",
  RECEIVE_UPDATE_VENDOR_STATUS: "RECEIVE_UPDATE_VENDOR_STATUS",
  VENDOR_UPDATE_ERROR_STATUS: "VENDOR_UPDATE_ERROR_STATUS",
};

export const Tabs = {
  ACTIVE: "Active",
  INACTIVE: "InActive",
  ALL: "All",
};

/**
 * Request for deleting vendor
 */
export function requestDeleteVendor() {
  return {
    type: Action.REQUEST_DELETE_VENDOR,
  };
}

/**
 * Receive for deleting VENDOR
 */
export function receiveDeleteVendor() {
  return {
    type: Action.RECEIVE_DELETE_VENDOR,
  };
}

/**
 * Receive for error deleting vendor
 */
export function vendorDeleteError(error) {
  return {
    type: Action.VENDOR_DELETE_ERROR,
    error,
  };
}

/**
 * Delete vendor
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteVendor(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteVendor());

    apiClient
      .delete(`${endpoints().accountAPI}/${id}`)
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
            "activevendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            { status: Vendor.STATUS_ACTIVE },
            params
          )
        );
        dispatch(
          fetchList(
            "inactivevendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            { status: Vendor.STATUS_INACTIVE },
            params
          )
        );
        dispatch(
          fetchList(
            "allvendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(vendorDeleteError(error));
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
 * Request for creating vendor
 */
export function requestAddVendor() {
  return {
    type: Action.REQUEST_ADD_VENDOR,
  };
}

/**
 * Receive for receive vendor
 */
export function receiveAddPortal() {
  return {
    type: Action.RECEIVE_ADD_VENDOR,
  };
}

/**
 * Receive for error creating vendor
 */
export function vendorCreateError(error) {
  return {
    type: Action.VENDOR_ADD_ERROR,
    error,
  };
}

/**
 * Create vendor
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addVendor(data, params, toggle,pathName) {
  const section = Url.GetParam("section");
  const pageSize=Url.GetParam("pageSize");
  return async (dispatch) => {
    dispatch(requestAddVendor());

    try {
      const response = await apiClient.post(`${endpoints().accountAPI}`, data);
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
        toggle();
      }
      if(params.activeTab === Tabs.ACTIVE){
      dispatch(
        fetchList(
          "activeVendor",
          pathName === "/accounts" ? `${endpoints().accountAPI}/search` : pathName === "/customers" ? `${endpoints().accountAPI}/search` : `${endpoints().accountAPI}/vendorSearch`,
          1,
          pageSize,
          {
            status:Vendor.STATUS_ACTIVE_VALUE,  
            ...params,     
          }
        )
      );
        }else if(params.activeTab === Tabs.INACTIVE){
      dispatch(
        fetchList(
          "inActiveVendor",
          pathName === "/accounts" ? `${endpoints().accountAPI}/search` :pathName === "/customers" ? `${endpoints().accountAPI}/search`: `${endpoints().accountAPI}/vendorSearch`,
          1,
          pageSize,
          {
            status:Vendor.STATUS_INACTIVE_VALUE,   
            ...params,    
          }
        )
      );
        }else if(params.activeTab === Tabs.ALL){
      dispatch(
        fetchList(
          "allVendor",
          pathName === "/accounts" ? `${endpoints().accountAPI}/search` :pathName === "/customers" ? `${endpoints().accountAPI}/search`: `${endpoints().accountAPI}/vendorSearch`,
          1,
          pageSize,
          {
            ...params,
          }
        )
      );
        }
      dispatch(receiveAddPortal());
    } catch (error) {
      dispatch(vendorCreateError(error));

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
 * Request for updating vendor
 */
export function requestUpdateVendor() {
  return {
    type: Action.REQUEST_UPDATE_VENDOR,
  };
}

/**
 * Receive for updating vendor
 */
export function receiveUpdateVendor() {
  return {
    type: Action.RECEIVE_UPDATE_VENDOR,
  };
}

/**
 * Receive for error updating vendor
 */
export function vendorUpdateError(error) {
  return {
    type: Action.VENDOR_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Releaase details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateVendor(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateVendor());
    apiClient
      .put(`${endpoints().accountAPI}/${id}`, data)
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
            "activevendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            { status:  Vendor.STATUS_ACTIVE },
            params
          )
        );
        dispatch(
          fetchList(
            "inactivevendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            { status: Vendor.STATUS_INACTIVE },
            params
          )
        );
        dispatch(
          fetchList(
            "allvendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(vendorUpdateError(error));

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
 * Receive for updating vendor
 */
export function receiveStatusUpdateVendor() {
  return {
    type: Action.REQUEST_UPDATE_VENDOR_STATUS,
  };
}

/**
 * Receive for error updating vendor
 */
export function vendorStatusUpdateError(error) {
  return {
    type: Action.VENDOR_UPDATE_ERROR_STATUS,
    error,
  };
}

/**
 * Update status details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateVendorStatus(id, status, params) {
  let data = {};
  data.status = status;
  const section = Url.GetParam("section");
  const sort = Url.GetParam("sort");
  const sortDir = Url.GetParam("sortDir");
  return (dispatch) => {
    dispatch(receiveStatusUpdateVendor());
    apiClient
      .put(`${endpoints().accountAPI}/status/${id}`, data)
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
            "activevendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            {
              status: Vendor.STATUS_ACTIVE,
              sort: section == "Active" ? Url.GetParam("sort") : "",
              sortDir: section == "Active" ? Url.GetParam("sortDir") : "",
            },
            params
          )
        );
        dispatch(
          fetchList(
            "inactivevendors",
            `${endpoints().accountAPI}/search`,
            1,
            25,
            {
              status: Vendor.STATUS_INACTIVE,
              sort: section == "InActive" ? Url.GetParam("sort") : "",
              sortDir: section == "InActive" ? Url.GetParam("sortDir") : "",
            },
            params
          )
        );
        dispatch(
          fetchList("allvendors", `${endpoints().accountAPI}/search`, 1, 25, {
            sort: section == "All" ? Url.GetParam("sort") : "",
            sortDir: section == "All" ? Url.GetParam("sortDir") : "",
          })
        );
      })
      .catch((error) => {
        dispatch(vendorStatusUpdateError(error));

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
