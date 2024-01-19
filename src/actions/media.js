import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import Media from "../helpers/Media";
import Toast from "../components/Toast";
import Url from "../lib/Url";

// Action Constants
export const Action = {
  // Update Product Media Status
  REQUEST_UPDATE_PRODUCT_MEDIA_STATUS: "REQUEST_UPDATE_PRODUCT_MEDIA_STATUS",
  RECEIVE_UPDATE_PRODUCT_MEDIA_STATUS: "RECEIVE_UPDATE_PRODUCT_STATUS",
  PRODUCT_MEDIA_UPDATE_ERROR_STATUS: "PRODUCT_UPDATE_ERROR_STATUS",
  // Update Product Media Feature
  REQUEST_UPDATE_PRODUCT_MEDIA_FEATURE: "REQUEST_UPDATE_PRODUCT_MEDIA_STATUS",
  RECEIVE_UPDATE_PRODUCT_MEDIA_FEATURE: "RECEIVE_UPDATE_PRODUCT_STATUS",
  PRODUCT_MEDIA_UPDATE_ERROR_FEATURE: "PRODUCT_UPDATE_ERROR_STATUS",

  // Update Product Media Feature
  REQUEST_UPDATE_MEDIA: "REQUEST_UPDATE_MEDIA",
  RECEIVE_UPDATE_MEDIA: "RECEIVE_UPDATE_PRODUCT",
  MEDIA_UPDATE_ERROR: "MEDIA_UPDATE_ERROR",

  // Update Product Media Feature
  REQUEST_UPDATE_MEDIA: "REQUEST_UPDATE_MEDIA",
  RECEIVE_UPDATE_MEDIA: "RECEIVE_UPDATE_MEDIA",
  MEDIA_UPDATE_ERROR: "MEDIA_UPDATE_ERROR",

  // Update Product Media Feature
  REQUEST_DELETE_MEDIA: "REQUEST_DELETE_MEDIA",
  RECEIVE_DELETE_MEDIA: "RECEIVE_DELETE_MEDIA",
  MEDIA_DELETE_ERROR: "MEDIA_DELETE_ERROR",

  /* Save Action MEDIA */
  REQUEST_SAVE_MEDIA: "REQUEST_SAVE_MEDIA",
  RECEIVE_SAVE_MEDIA: "RECEIVE_SAVE_MEDIA",
  MEDIA_SAVE_ERROR: "MEDIA_SAVE_ERROR",

  /* Delete Action MEDIA */
  REQUEST_DELETE_MEDIA: "REQUEST_DELETE_MEDIA",
  RECEIVE_DELETE_MEDIA: "RECEIVE_DELETE_MEDIA",
  MEDIA_DELETE_ERROR: "MEDIA_DELETE_ERROR",

  // Bulk Update Media
  REQUEST_BULK_UPDATE_MEDIA: "REQUEST_BULK_UPDATE_MEDIA",
  RECEIVE_BULK_UPDATE_MEDIA: "RECEIVE_BULK_UPDATE_MEDIA",
  MEDIA_BULK_UPDATE_ERROR: "MEDIA_BULK_UPDATE_ERROR",
};

/**
 * Request for deleting Image
 */
export function requestSaveImage() {
  return {
    type: Action.REQUEST_SAVE_MEDIA,
  };
}

/**
 * Receive for deleting Image
 */
export function receiveSaveImage() {
  return {
    type: Action.RECEIVE_SAVE_MEDIA,
  };
}

/**
 * Receive for error receive Image
 */
export function mediaReceiveError(error) {
  return {
    type: Action.MEDIA_SAVE_ERROR,
    error,
  };
}

/**
 * Create PortalUser
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function saveImage(data, params, tableId, toggle) {
  // Save Images
  return (dispatch) => {
    dispatch(requestSaveImage());

    return apiClient
      .post(`${endpoints().mediaAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          toggle();
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            `${tableId}`,
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            params
          )
        );
        dispatch(
          fetchList(
            "mediaPrivate",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            {sort : Url.GetParam("sort"), visibility: Media.VISIBILITY_PRIVATE,sortDir:Url.GetParam("sortDir")},
          

          )
        );
        dispatch(
          fetchList(
            "mediaPublic",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            

            {sort : Url.GetParam("sort") ,sortDir:Url.GetParam("sortDir"), visibility: Media.VISIBILITY_PUBLIC },
          )
        );
        dispatch(receiveSaveImage());
      })
      .catch((error) => {
        dispatch(mediaReceiveError(error));
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
 * Request for Update Image
 */
export function requestUpdaeImage() {
  return {
    type: Action.REQUEST_SAVE_MEDIA,
  };
}

/**
 * Create PortalUser
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updateImage(data, params, tableId, id) {
  // Save Images
  return (dispatch) => {
    dispatch(requestSaveImage());

    return apiClient
      .put(`${endpoints().mediaAPI}/${id}`, data)
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
            `${tableId}`,
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            params
          )
        );
        dispatch(receiveSaveImage());
      })
      .catch((error) => {
        dispatch(mediaReceiveError(error));
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
 * Request for updating productMediafeature
 */
export function requestUpdateProductMediaFeature() {
  return {
    type: Action.REQUEST_UPDATE_PRODUCT_MEDIA_FEATURE,
  };
}

/**
 * Receive for error creating Product Media feature
 */

export function productMediaFeatureUpdateError(error) {
  return {
    type: Action.PRODUCT_MEDIA_UPDATE_ERROR_FEATURE,
    error,
  };
}

/**
 * Receive for receive Media feature
 */

export function receiveUpdateProductMediaFeature() {
  return {
    type: Action.RECEIVE_UPDATE_PRODUCT_MEDIA_FEATURE,
  };
}

/**
 * Request for updating status
 */
export function requestUpdateProductMediaStatus() {
  return {
    type: Action.REQUEST_UPDATE_PRODUCT_MEDIA_STATUS,
  };
}

/**
 * Receive for error creating status
 */

export function productMediaStatusUpdateError(error) {
  return {
    type: Action.RECEIVE_UPDATE_PRODUCT_MEDIA_STATUS,
    error,
  };
}

/**
 * Receive for receive status
 */

export function receiveUpdateProductMediaStatus() {
  return {
    type: Action.RECEIVE_UPDATE_PRODUCT_MEDIA_STATUS,
  };
}

export function updateImageStatus(id, updateData, tableId, params,toggle) {
  // Save Images
  return async (dispatch) => {
    dispatch(requestUpdateProductMediaStatus);

    try {
      const response = await apiClient.put(
        `${endpoints().mediaAPI}/${id}`,
        updateData
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
        toggle();
      }
      dispatch(
        fetchList(`${tableId}`, `${endpoints().mediaAPI}/search`, 1, 25, params)
      );
      dispatch(receiveUpdateProductMediaStatus);
    } catch (error) {
      dispatch(mediaReceiveError(error));
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };
}
/**
 * Request for deleting Media
 */
export function requestDeleteMedia() {
  return {
    type: Action.REQUEST_DELETE_MEDIA,
  };
}

/**
 * Receive for deleting Media
 */
export function receiveDeleteMedia() {
  return {
    type: Action.RECEIVE_DELETE_MEDIA,
  };
}

/**
 * Receive for error deleting Media
 */
export function MediaDeleteError(error) {
  return {
    type: Action.MEDIA_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Media
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteMedia(id, params, tableId) {
  return (dispatch) => {
    dispatch(requestDeleteMedia());

    apiClient
      .delete(`${endpoints().mediaAPI}/${id}`)
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
            "mediaPrivate",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            { visibility: Media.VISIBILITY_PRIVATE },
            params
          )
        );
        dispatch(
          fetchList(
            "mediaPublic",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            { visibility: Media.VISIBILITY_PUBLIC },
            params
          )
        );
        dispatch(
          fetchList(
            "mediaArchive",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            { archive: true },
            params
          )
        );
        dispatch(
          fetchList(
            `${tableId}`,
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(MediaDeleteError(error));
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
 * Request for deleting Media
 */
export function requestUpdateMedia() {
  return {
    type: Action.REQUEST_UPDATE_MEDIA,
  };
}

/**
 * Receive for deleting Media
 */
export function receiveUpdateMedia() {
  return {
    type: Action.RECEIVE_UPDATE_MEDIA,
  };
}

/**
 * Receive for error deleting Media
 */
export function MediaUpdateError(error) {
  return {
    type: Action.MEDIA_UPDATE_ERROR,
    error,
  };
}

export function updateMedia(id, visibility, params) {
  const search = Url.GetParam("search");
  const sort = Url.GetParam("sort");
  const sortDir = Url.GetParam("sortDir");
  let data = {};
  data.visibility = visibility;
  return (dispatch) => {
    dispatch(requestUpdateMedia());
    apiClient
      .put(`${endpoints().mediaAPI}/${id}`, data)
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
            "mediaArchive",
            `${endpoints().mediaAPI}/search`,
            params.ArchiveMediaCurrentPage || 1,
            params.ArchiveMediaPageSize || 25,
            {
              visibility: Media.VISIBILITY_ARCHIVE
                ? Media.VISIBILITY_ARCHIVE
                : Media.VISIBILITY_PUBLIC
                ? Media.VISIBILITY_PUBLIC
                : Media.VISIBILITY_PRIVATE,
              search: search == null ? "" : search,
              sort: sort,
              sortDir: sortDir,
            },
            params
          )
        );
        dispatch(
          fetchList(
            "mediaPrivate",
            `${endpoints().mediaAPI}/search`,
            params.privateMediaCurrentPage || 1,
            params.PrivateMediaPageSize || 25,
            {
              visibility: Media.VISIBILITY_PRIVATE
                ? Media.VISIBILITY_PRIVATE
                : Media.VISIBILITY_PUBLIC
                ? Media.VISIBILITY_PUBLIC
                : Media.VISIBILITY_ARCHIVE,
              search: search == null ? "" : search,
              sort: sort,
              sortDir: sortDir,
            },
            params
          )
        );
        dispatch(
          fetchList(
            "mediaPublic",
            `${endpoints().mediaAPI}/search`,
            params.publicMediaCurrentPage || 1,
            params.PublicMediaPageSize || 25,
            {
              visibility: Media.VISIBILITY_PUBLIC
                ? Media.VISIBILITY_PUBLIC
                : Media.VISIBILITY_PRIVATE
                ? Media.VISIBILITY_PRIVATE
                : Media.VISIBILITY_ARCHIVE,
              search: search == null ? "" : search,
              sort: sort,
              sortDir: sortDir,
            },
            params
          )
        );
      })
      .catch((error) => {
        dispatch(MediaUpdateError(error));

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
 * Request for deleting Media
 */
export function requestDeleteMediaByID() {
  return {
    type: Action.REQUEST_DELETE_MEDIA,
  };
}

/**
 * Receive for deleting Media
 */
export function receiveDeleteMediaByID() {
  return {
    type: Action.RECEIVE_DELETE_MEDIA,
  };
}

/**
 * Receive for error deleting Media
 */
export function MediaDeleteErrorById(error) {
  return {
    type: Action.MEDIA_DELETE_ERROR,
    error,
  };
}

export function deleteMediaById(id, params, callback) {
  // Save Images
  return async (dispatch) => {
    dispatch(requestDeleteMediaByID);

    try {
      const response = await apiClient.delete(`${endpoints().mediaAPI}/${id}`);
      callback && callback(response)
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
      }
      dispatch(
        fetchList("media", `${endpoints().mediaAPI}/search`, 1, 25, params)
      );
      dispatch(receiveDeleteMediaByID);
    } catch (error) {
      dispatch(MediaDeleteErrorById(error));
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };
}

/**
 * Create PortalUser
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createMedia(data, params, toggle) {
  // Save Images
  return (dispatch) => {
    dispatch(requestSaveImage());

    return apiClient
      .post(`${endpoints().mediaAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          toggle();
        }
      })
      .then(() => {
        dispatch(
          fetchList("media", `${endpoints().mediaAPI}/search`, 1, 25, params)
        );
        dispatch(receiveSaveImage());
      })
      .catch((error) => {
        dispatch(mediaReceiveError(error));
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

// Request Bulk Update Media
export function requestBulkUpdateMedia() {
  return { type: Action.REQUEST_BULK_UPDATE_MEDIA };
}
// Receive Bulk Update Media
export function receiveBulkUpdateMedia() {
  return { type: Action.RECEIVE_BULK_UPDATE_MEDIA };
}
// Bulk Update Media Error
export function bulkUpdateMediaError() {
  return { type: Action.MEDIA_BULK_UPDATE_ERROR };
}

export function bulkUpdateMedia(data, toggle, params) {
  try {
    return (dispatch) => {
      dispatch(requestBulkUpdateMedia());
      apiClient
        .put(`${endpoints().mediaAPI}/bulk/update`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          toggle();
        })
        .then(() => {
          dispatch(
            fetchList(
              "mediaArchive",
              `${endpoints().mediaAPI}/search`,
              1,
              25,
              { visibility: Media.VISIBILITY_ARCHIVE },
              params
            )
          );
          dispatch(
            fetchList(
              "mediaPrivate",
              `${endpoints().mediaAPI}/search`,
              1,
              25,
              { visibility: Media.VISIBILITY_PRIVATE },
              params
            )
          );
          dispatch(
            fetchList(
              "mediaPublic",
              `${endpoints().mediaAPI}/search`,
              1,
              25,
              { visibility: Media.VISIBILITY_PUBLIC },
              params
            )
          );
          dispatch(receiveBulkUpdateMedia());
        })
        .catch((error) => {
          dispatch(bulkUpdateMediaError(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
              Toast.error(errorMessage);
            }
            console.error(errorMessage);
          }
        });
    };
  } catch (err) { }
}

export function bulkDelete(Ids, toggle, params) {
  try {
    apiClient
      .put(`${endpoints().mediaAPI}/bulk/delete`, Ids)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
        toggle();
      })
      .then(() => {
        dispatch(
          fetchList(
            "mediaArchive",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            { visibility: Media.VISIBILITY_ARCHIVE },
            params
          )
        );
        dispatch(
          fetchList(
            "mediaPrivate",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            { visibility: Media.VISIBILITY_PRIVATE },
            params
          )
        );
        dispatch(
          fetchList(
            "mediaPublic",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            { visibility: Media.VISIBILITY_PUBLIC },
            params
          )
        );
      })
      .catch((error) => {
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
  } catch (err) {
    console.log(err);
  }
}
