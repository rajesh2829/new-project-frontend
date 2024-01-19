import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import  Url  from "../lib/Url";
import * as storeConstant from "../helpers/StoreList";

/* Delete Store */
const REQUEST_DELETE_STORE = "REQUEST_DELETE_STORE";
const RECEIVE_DELETE_STORE = "RECEIVE_DELETE_STORE";
const STORE_DELETE_ERROR = "STORE_DELETE_ERROR";

const REQUEST_DELETE_TEAM = "REQUEST_DELETE_TEAM";
const RECEIVE_DELETE_TEAM = "RECEIVE_DELETE_TEAM";
const TEAM_DELETE_ERROR = "TEAM_DELETE_ERROR";

/* Add Store */
const REQUEST_ADD_STORE = "REQUEST_ADD_STORE";
const RECEIVE_ADD_STORE = "RECEIVE_ADD_STORE";
const STORE_ADD_ERROR = "STORE_ADD_ERROR";

/* Add Store */
const REQUEST_ADD_TEAM = "REQUEST_ADD_TEAM";
const RECEIVE_ADD_TEAM = "RECEIVE_ADD_TEAM";
const TEAM_ADD_ERROR = "TEAM_ADD_ERROR";

/* Update Store */
const REQUEST_UPDATE_STORE = "REQUEST_UPDATE_STORE";
const RECEIVE_UPDATE_STORE = "RECEIVE_UPDATE_STORE";
const STORE_UPDATE_ERROR = "STORE_UPDATE_ERROR";

/* Update Store Status */
const REQUEST_UPDATE_STORE_STATUS = "REQUEST_UPDATE_STORE_STATUS";
const RECEIVE_UPDATE_STORE_STATUS = "RECEIVE_UPDATE_STORE_STATUS";
const STORE_UPDATE_ERROR_STATUS = "STORE_UPDATE_ERROR_STATUS";



export function requestDeleteTeam() {
  return {
    type: REQUEST_DELETE_TEAM,
  };
}

/**
 * Receive for deleting Store
 */
export function receiveDeleteTeam() {
  return {
    type: RECEIVE_DELETE_TEAM,
  };
}

/**
 * Receive for error deleting Store
 */
export function teamDeleteError(error) {
  return {
    type: TEAM_DELETE_ERROR,
    error,
  };
}
/**
 * Delete Team

 */
export function deleteTeam(id, params, storeId) {
  return (dispatch) => {
    dispatch(requestDeleteTeam());

    apiClient
      .delete(`${endpoints().storeUserAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList( "team", `${endpoints().storeUserAPI}/search`, 1, 25,{ pagination: true , location: storeId })
        );
      })
      .catch((error) => {
        dispatch(teamDeleteError(error));
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
 * Request for deleting Store
 */
export function requestDeleteStore() {
  return {
    type: REQUEST_DELETE_STORE,
  };
}

/**
 * Receive for deleting Store
 */
export function receiveDeleteStore() {
  return {
    type: RECEIVE_DELETE_STORE,
  };
}

/**
 * Receive for error deleting Store
 */
export function storeDeleteError(error) {
  return {
    type: STORE_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Store
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteStore(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteStore());

    apiClient
      .delete(`${endpoints().locationAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("stores", `${endpoints().locationAPI}/search`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(storeDeleteError(error));
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

export function requestAddTeam() {
  return {
    type: REQUEST_ADD_TEAM,
  };
}

/**
 * Receive for receive Team
 */
export function receiveAddTeam() {
  return {
    type: RECEIVE_ADD_TEAM,
  };
}

/**
 * Receive for error creating Team
 */
export function teamCreateError(error) {
  return {
    type: TEAM_ADD_ERROR,
    error,
  };
}


export function addTeam(id, data, _toggle) {
  return (dispatch) => {
    dispatch(requestAddTeam());
    apiClient
      .post(`${endpoints().storeUserAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        _toggle();

      })
      .then(() => {
        dispatch(
          fetchList("team", `${endpoints().storeUserAPI}/search`, 1, 25,{ pagination: true , location: id })
        );
      })
      .catch((error) => {
        dispatch(teamCreateError(error));

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
 * Request for creating Store
 */
export function requestAddStore() {
  return {
    type: REQUEST_ADD_STORE,
  };
}

/**
 * Receive for receive Store
 */
export function receiveAddStore() {
  return {
    type: RECEIVE_ADD_STORE,
  };
}

/**
 * Receive for error creating Store
 */
export function storeCreateError(error) {
  return {
    type: STORE_ADD_ERROR,
    error,
  };
}

/**
 * Create Store
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addStore(data, params, callback) {
  return (dispatch) => {
    dispatch(requestAddStore());

    return apiClient
      .post(`${endpoints().locationAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          callback(true);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "Location",
            `${endpoints().locationAPI}/search`,
            1,
            25,
            {}
          )
        );
        dispatch(
          fetchList(
            "activeStore",
            `${endpoints().locationAPI}/search`,
            1,
            25,
            { status: storeConstant.LOCATION_STATUS_ACTIVE },
            { pagination: true }
          )
        );
        dispatch(
          fetchList(
            "inactiveStore",
            `${endpoints().locationAPI}/search`,
            1,
            25,
            { status: storeConstant.LOCATION_STATUS_INACTIVE },
            { pagination: true }
          )
        );
        dispatch(receiveAddStore());
      })
      .catch((error) => {
        dispatch(storeCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
          callback(false);
        }
      });
  };
}

/**
 * Request for updating Store
 */
export function requestUpdateStore() {
  return {
    type: REQUEST_UPDATE_STORE,
  };
}

/**
 * Receive for updating Store
 */
export function receiveUpdateStore() {
  return {
    type: RECEIVE_UPDATE_STORE,
  };
}

/**
 * Receive for error updating Store
 */
export function storeUpdateError(error) {
  return {
    type: STORE_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Store details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateStore(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateStore());
    apiClient
      .put(`${endpoints().locationAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("stores", `${endpoints().locationAPI}/search`, 1, 25, { pagination: true })
        );
        dispatch(
          fetchList("Location", `${endpoints().locationAPI}/search`, 1, 25, { })
        );
      })
      .catch((error) => {
        dispatch(storeUpdateError(error));

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

// _getProductCDetails() {
//   this.setState({ isLoading: true });
//   apiClient
//     .get(`${endpoints().categoryAPI}/search`)
//     .then(response => {
//       const productCategoryList = response.data.data;

//       this.setState({
//         productCategoryList: productCategoryList
//           ? productCategoryList
//           : this.state.productCategoryList,
//         isLoading: false
//       });
//     })
//     .catch(error => {
//       if (isBadRequest(error)) {
//         let errorMessage;
//         const errorRequest = error.response.request;
//         if (errorRequest && errorRequest.response) {
//           errorMessage = JSON.parse(errorRequest.response).message;
//         }
//         console.error(errorMessage);
//         this.setState({
//           isLoading: false
//         });
//       }
//     });
// }

/* update the location status */

/**
 * Receive for updating Store status
 */
export function receiveUpdatedStoreStatus() {
  return {
    type: RECEIVE_UPDATE_STORE_STATUS,
  };
}

/**
 * Request for updating Store status
 */
export function requestUpdatedStoreStatus() {
  return {
    type: REQUEST_UPDATE_STORE_STATUS,
    error,
  };
}

/**
 * Receive for Error updating Store status
 */
export function storeUpdateStatusError() {
  return {
    type: STORE_UPDATE_ERROR_STATUS,
  };
}

export function updateStoreStatus(id, status, params) {
  let data = {};
  data.status = status;
  return (dispatch) => {
    dispatch(receiveUpdatedStoreStatus());
    apiClient
      .put(`${endpoints().locationAPI}/status/${id}`, data)
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
            "allStores",
            `${endpoints().locationAPI}/search`,
            1,
            25,
            { pagination: true }
          )
        );
        dispatch(
          fetchList(
            "activeStore",
            `${endpoints().locationAPI}/search`,
            1,
            25,
            { status: storeConstant.LOCATION_STATUS_ACTIVE },
            { pagination: true }
          )
        );
        dispatch(
          fetchList(
            "inactiveStore",
            `${endpoints().locationAPI}/search`,
            1,
            25,
            { status: storeConstant.LOCATION_STATUS_INACTIVE },
            { pagination: true }
          )
        );
        dispatch(receiveUpdatedStoreStatus());
      })
      .catch((error) => {
        dispatch(storeUpdateStatusError(error));

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
