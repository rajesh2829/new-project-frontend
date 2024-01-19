import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

// Action Constants
export const Action = {
  // Delete Documents
  REQUEST_DELETE_DOCS : "REQUEST_DELETE_DOCS",
  RECEIVE_DELETE_DOCS : "RECEIVE_DELETE_DOCS",
  DOCS_DELETE_ERROR : "DOCS_DELETE_ERROR",
  // Create Documents
  REQUEST_CREATE_DOCS : "REQUEST_CREATE_DOCS",
  RECEIVE_CREATE_DOCS : "RECEIVE_CREATE_DOCS",
  DOCS_CREATE_ERROR : "DOCS_CREATE_ERROR",
  // Update Documents
  REQUEST_UPDATE_DOCS : "REQUEST_UPDATE_DOCS",
  RECEIVE_UPDATE_DOCS : "RECEIVE_UPDATE_DOCS",
  DOCS_UPDATE_ERROR : "DOCS_UPDATE_ERROR",
};

// Docs based API
/**
 * Request for deleting docsPage
 */
export function requestDeletDocsPage() {
  return {
    type: Action.REQUEST_DELETE_DOCS,
  };
}

/**
 * Receive for deleting docsPage
 */
export function receiveDeleteDocsPage() {
  return {
    type: Action.RECEIVE_DELETE_DOCS,
  };
}

/**
 * Receive for error deleting docsPage
 */
export function DocsPageDeleteError(error) {
  return {
    type: Action.DOCS_DELETE_ERROR,
    error,
  };
}

/**
 * Delete docsPage
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteDocsPage(id, params) {
  return (dispatch) => {
    dispatch(requestDeletDocsPage());

    apiClient
      .delete(`${endpoints().docsAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("docsPage", `${endpoints().docsAPI}/search`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(DocsPageDeleteError(error));
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
 * Request for creating docsPage
 */
export function requestCreateDocsPage() {
  return {
    type: Action.REQUEST_CREATE_DOCS,
  };
}

/**
 * Receive for receive docsPage
 */
export function receiveCreateDocsPage() {
  return {
    type: Action.RECEIVE_CREATE_DOCS,
  };
}

/**
 * Receive for error creating docsPage
 */
export function DocsPageCreateError(error) {
  return {
    type: Action.DOCS_CREATE_ERROR,
    error,
  };
}

/**
 * Create docsPage
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createDocsPage(data, params) {
  return (dispatch) => {
    dispatch(requestCreateDocsPage());

    return apiClient
      .post(`${endpoints().docsAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("docsPage", `${endpoints().docsAPI}/search`, 1, 25, params)
        );
        dispatch(receiveCreateDocsPage());
      })
      .catch((error) => {
        dispatch(DocsPageCreateError(error));

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
 * Request for updating docsPage
 */
export function requestUpdateDocsPage() {
  return {
    type: Action.REQUEST_UPDATE_DOCS,
  };
}

/**
 * Receive for updating docsPage
 */
export function receiveUpdatedocsPage() {
  return {
    type: Action.RECEIVE_UPDATE_DOCS,
  };
}

/**
 * Receive for error updating docsPage
 */
export function DocsPageUpdateError(error) {
  return {
    type: Action.DOCS_UPDATE_ERROR,
    error,
  };
}

/**
 * Update docsPage details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateDocsPage(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateDocsPage());
    apiClient
      .put(`${endpoints().docsAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("docsPage", `${endpoints().docsAPI}/search`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(DocsPageUpdateError(error));

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
export function createDocs(data, arg1) {
  throw new Error("Function not implemented.");
}
