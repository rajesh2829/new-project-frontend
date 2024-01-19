// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import Account from "../helpers/Account";
import { fetchList } from "../actions/table";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";




class CommentService {

  static async add(id, data,callback) {
    try {
      if (id && data) {
        apiClient
          .post(`${endpoints().Comment}/${id}`, data)
          .then((res) => {
            if (res.status == SUCCESS_RESPONSE) {
              Toast.success(res?.data?.message);
              return callback(res)
            }
          })
          .catch((err) => {
            if (isBadRequest(err)) {
              let errorMessage;
              const errorRequest = err.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              Toast.error(errorMessage);
            }
          });
      }

    } catch (err) {
      console.log(err);
    }
  }
  static async search(params) {
    try {
      let queryString = await ArrayList.toQueryString(params);
      let response = await Url.get(`${endpoints().Comment}/search`, queryString)
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static update = async (id, comment_id, data) => {
    await apiClient.put(`${endpoints().Comment}/${comment_id}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
        }
      })
      .catch((err) => {
        if (isBadRequest(err)) {
          let errorMessage;
          const errorRequest = err.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
        }
      });
    return data;
  };

  static delete = async (id, data) => {

    try {


      await apiClient
        .delete(`${endpoints().Comment}/${id}/${data}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
          }
        });

    } catch (error) {
      console.log(error)
    }

  }

}

export default CommentService;

