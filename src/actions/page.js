import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

// Action Constants
export const Action = {
  // Delete Page
  REQUEST_DELETE_PAGE : "REQUEST_DELETE_PAGE",
  RECEIVE_DELETE_PAGE : "RECEIVE_DELETE_PAGE",
  PAGE_DELETE_ERROR : "PAGE_DELETE_ERROR",
  // Add Page
  REQUEST_CREATE_PAGE : "REQUEST_CREATE_PAGE",
  RECEIVE_CREATE_PAGE : "RECEIVE_CREATE_PAGE",
  PAGE_CREATE_ERROR : "PAGE_CREATE_ERROR",
  // Update Page
  REQUEST_UPDATE_PAGE : "REQUEST_UPDATE_PAGE",
  RECEIVE_UPDATE_PAGE : "RECEIVE_UPDATE_PAGE",
  PAGE_UPDATE_ERROR : "PAGE_UPDATE_ERROR",
  // Create Page Block
  REQUEST_CREATE_PAGE_BLOCK : "REQUEST_CREATE_PAGE_BLOCK",
  RECEIVE_CREATE_PAGE_BLOCK : "RECEIVE_CREATE_PAGE_BLOCK",
  PAGE_BLOCK_CREATE_ERROR : "PAGE_BLOCK_CREATE_ERROR",
  // Delete Page Block
  REQUEST_DELETE_PAGE_BLOCK : "REQUEST_DELETE_PAGE_BLOCK",
  RECEIVE_DELETE_PAGE_BLOCK : "RECEIVE_DELETE_PAGE_BLOCK",
  PAGE_BLOCK_DELETE_ERROR : "PAGE_BLOCK_DELETE_ERROR",
  // Update Page Block
  REQUEST_UPDATE_PAGE_BLOCK : "REQUEST_UPDATE_PAGE_BLOCK",
  RECEIVE_UPDATE_PAGE_BLOCK : "RECEIVE_UPDATE_PAGE_BLOCK",
  PAGE_BLOCK_UPDATE_ERROR : "PAGE_BLOCK_UPDATE_ERROR",
};

/**
 * Request for deleting Page
 */
export function requestDeletePage() {
  return {
    type: Action.REQUEST_DELETE_PAGE,
  };
}

/**
 * Receive for deleting Page
 */
export function receiveDeletePage() {
  return {
    type: Action.RECEIVE_DELETE_PAGE,
  };
}

/**
 * Receive for error deleting Page
 */
export function PageDeleteError(error) {
  return {
    type: Action.PAGE_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Page
 *
 * @param id
 * @returns {function(*): *}
 */


/**
 * Request for creating Page
 */
export function requestCreatePage() {
  return {
    type: Action.REQUEST_CREATE_PAGE,
  };
}

/**
 * Receive for receive Page
 */
export function receiveCreatePage() {
  return {
    type: Action.RECEIVE_CREATE_PAGE,
  };
}

/**
 * Receive for error creating Page
 */
export function PageCreateError(error) {
  return {
    type: Action.PAGE_CREATE_ERROR,
    error,
  };
}

/**
 * Create Page
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */


/**
 * Request for updating Page
 */
export function requestUpdatePage() {
  return {
    type: Action.REQUEST_UPDATE_PAGE,
  };
}

/**
 * Receive for updating Page
 */
export function receiveUpdatePage() {
  return {
    type: Action.RECEIVE_UPDATE_PAGE,
  };
}

/**
 * Receive for error updating Page
 */
export function PageUpdateError(error) {
  return {
    type: Action.PAGE_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Page details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */

//Page Component API
/**
 * Request for creating Page
 */
export function requestCreatePageBlock() {
  return {
    type: Action.REQUEST_CREATE_PAGE_BLOCK,
  };
}

/**
 * Receive for receive Page Block
 */
export function receiveCreatePageBlock() {
  return {
    type: Action.RECEIVE_CREATE_PAGE_BLOCK,
  };
}

/**
 * Receive for error creating Page Block
 */
export function PageBlockCreateError(error) {
  return {
    type: Action.PAGE_BLOCK_CREATE_ERROR,
    error,
  };
}

/**
 * Create Page Block
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createPageBlock(data, id, params) {
  if (id) {
    params.pageId = id;
  }
  return (dispatch) => {
    dispatch(requestCreatePageBlock());

    return apiClient
      .post(`${endpoints().pageBlockAPI}`, data)
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
            "pageBlock",
            `${endpoints().pageBlockAPI}/search`,
            1,
            25,
            { params, pagination: true }
          )
        );
        dispatch(receiveCreatePageBlock());
      })
      .catch((error) => {
        dispatch(PageBlockCreateError(error));

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
 * Request for deleting Page Block
 */
export function requestDeletePageBlock() {
  return {
    type: Action.REQUEST_DELETE_PAGE_BLOCK,
  };
}

/**
 * Receive for deleting Page Block
 */
export function receiveDeletePageBlock() {
  return {
    type: Action.RECEIVE_DELETE_PAGE_BLOCK,
  };
}

/**
 * Receive for error deleting Page Block
 */
export function PageBlockDeleteError(error) {
  return {
    type: Action.PAGE_BLOCK_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Page Block
 *
 * @param id
 * @returns {function(*): *}
 */
export function deletePageBlock(id, pageId, params) {
  if (pageId) {
    params.pageId = pageId;
  }
  return (dispatch) => {
    dispatch(requestDeletePageBlock());

    apiClient
      .delete(`${endpoints().pageBlockAPI}/${id}`)
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
            "pageBlock",
            `${endpoints().pageBlockAPI}/search`,
            1,
            25,
            { params, pagination: true }
          )
        );
      })
      .catch((error) => {
        dispatch(PageBlockDeleteError(error));
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
 * Request for updating Page
 */
export function requestUpdatePageBlock() {
  return {
    type: Action.REQUEST_UPDATE_PAGE_BLOCK,
  };
}

/**
 * Receive for updating Page
 */
export function receiveUpdatePageBlock() {
  return {
    type: Action.RECEIVE_UPDATE_PAGE_BLOCK,
  };
}

/**
 * Receive for error updating Page
 */
export function PageBlockUpdateError(error) {
  return {
    type: Action.PAGE_BLOCK_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Page Block
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updatePageBlock(id, data, pageId, params) {
  if (pageId) {
    params.pageId = pageId;
  }
  return (dispatch) => {
    dispatch(requestUpdatePageBlock());
    apiClient
      .put(`${endpoints().pageBlockAPI}/${id}`, data)
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
            "pageBlock",
            `${endpoints().pageBlockAPI}/search`,
            1,
            25,
            { params, pagination: true }
          )
        );
      })
      .catch((error) => {
        dispatch(PageBlockUpdateError(error));

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
