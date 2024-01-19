import {
  productTagDeleteError,
  productTagUpdateError,
  requestDeleteProductTag,
  requestUpdateProductTag,
  requestUpdateTagStatus,
  TagStatusUpdateError,

} from "../actions/storeProductTag";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";


class TagService {
  static search = async (params) => {

    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(`${endpoints().tagApi}/search`, queryString)

    return response;
  };

  static list = async (params) => {

    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(`${endpoints().tagApi}/list`, queryString)

    return response;
  };

  static delete(id, params) {
    return (dispatch) => {
      dispatch(requestDeleteProductTag());
      apiClient
        .delete(`${endpoints().tagApi}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "allTags",
              `${endpoints().tagApi}/search`,
              Url.GetParam("page") ? Url.GetParam("page") : 1,
               Url.GetParam("pageSize")  ? Url.GetParam("pageSize")  : 25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(productTagDeleteError(error));
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
  }

  static get = async (id) => {
    const response = await apiClient.get(`${endpoints().tagTypeApi}/${id}`);
    return response;
  };

  static create = (data, params, toggle) => {
    return (dispatch) => {
      dispatch(requestUpdateProductTag());
      apiClient
        .post(`${endpoints().tagApi}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            toggle()
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "allTags",
              `${endpoints().tagApi}/search`,
              Url.GetParam("page") ? Url.GetParam("page") : 1,
              Url.GetParam("pageSize")  ? Url.GetParam("pageSize")  : 25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(productTagUpdateError(error));
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
  }

  static update = (id, data, params, toggle) => {
    return (dispatch) => {
      dispatch(requestUpdateProductTag());
      apiClient
        .put(`${endpoints().tagApi}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            toggle()
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "allTags",
              `${endpoints().tagApi}/search`,
               Url.GetParam("page") ? Url.GetParam("page") : 1,
               Url.GetParam("pageSize")  ? Url.GetParam("pageSize")  : 25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(productTagUpdateError(error));
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
  }

  static updateStatus(id, status, type) {
    const sort = Url.GetParam("sort");
    const sortDir = Url.GetParam("sortDir");
    let data = {};
    data.status = status;
    return (dispatch) => {
      dispatch(requestUpdateTagStatus);
      apiClient
        .put(`${endpoints().tagApi}/status/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList("allTags", `${endpoints().tagApi}/search`, 1, 25, {
              sort: sort || "",
              sortDir: sortDir || "",
              status: Url.GetParam("status"),
              search: Url.GetParam("search"),
              type: type
            })
          );
        })
        .catch((error) => {
          dispatch(TagStatusUpdateError(error));

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

  static async getOption(params) {
    try {
      let tagList = [];
      const response = await TagService.list(params);
      const productTag = response.data.data;
      if (ArrayList.isNotEmpty(productTag)) {
        productTag.forEach((productTag) => {
          tagList.push({
            id: productTag.id,
            value: productTag.id,
            label: productTag.name,
            amount:productTag.default_amount
          });
        });
      }

      return tagList;

    } catch (err) {
      console.log(err);
    }
  }

}

export default TagService;
