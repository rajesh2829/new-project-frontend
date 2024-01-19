// API Client
// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { PageCreateError, PageDeleteError, PageUpdateError, receiveCreatePage, requestCreatePage, requestDeletePage, requestUpdatePage } from "../actions/page";
import { fetchList } from "../actions/table";

class PageService {
  static async getById(id) {
    try {

      const response = await apiClient.get(`${endpoints().pageAPI}/${id}`);
      const data = response && response.data;
      if (data) return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getBlockByPageUrl(url) {
    try {

      if (!url) {
        return null;
      }
      const pageId = await getPageIdByUrl(url);
      const response = await apiClient.get(`${endpoints().pageBlockAPI}/${pageId}`);
      const lists = response && response.data;
      return lists;
    } catch (err) {
      console.log(err);
    }
  }
  static async getBlockAttributesById(blockId, pageId) {

    if (!blockId && !pageId) {
      return null;
    }

    const response = await apiClient.get(
      `${endpoints().pageBlockAttributeAPI}/${blockId}?pageId=${pageId}`
    );

    const lists = response && response.data;
    return lists;
  };

  // Delete

  static async delete(id, params) {
    try {

      return (dispatch) => {
        dispatch(requestDeletePage());

        apiClient
          .delete(`${endpoints().pageAPI}/${id}`)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("page", `${endpoints().pageAPI}/search`, 1, 25, { params, pagination: true })
            );
          })
          .catch((error) => {
            dispatch(PageDeleteError(error));
            if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              Toast.error(errorMessage);
            }
          });
      };
    } catch (err) {
      console.log(err);
    }
  }


  static async create(data, params, toggle) {
    try {

      return (dispatch) => {
        dispatch(requestCreatePage());

        return apiClient
          .post(`${endpoints().pageAPI}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              toggle();
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("page", `${endpoints().pageAPI}/search`, 1, 25, { params, pagination: true })
            );
            dispatch(receiveCreatePage());
          })
          .catch((error) => {
            dispatch(PageCreateError(error));

            if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }

              Toast.error(errorMessage);
              console.error(errorMessage);
            }
          });
      };
    } catch (err) {
      console.log(err);
    }
  }

  // create
  static async update(id, data, params) {
    try {

      return (dispatch) => {
        dispatch(requestUpdatePage());
        apiClient
          .put(`${endpoints().pageAPI}/${id}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("page", `${endpoints().pageAPI}/search`, 1, 25, { params, pagination: true })
            );
          })
          .catch((error) => {
            dispatch(PageUpdateError(error));

            if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              Toast.error(error.response.data.message);
              console.error(errorMessage);
            }
          });
      };
    } catch (err) {
      console.log(err);
    }
  }
}

export default PageService;











