const { endpoints } = require("../api/endPoints");
const { apiClient } = require("../apiClient");
const { default: Toast } = require("../components/Toast");
const { isBadRequest } = require("../lib/Http");
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";

class TimeSheetDetailService {
  static async create(data, callback) {
    await apiClient
      .post(`${endpoints().TimeSheetDetailAPI}/create`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage);
        }
      })
      .catch((error) => {
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
  }

  static async search(params) {
    let queryString = await ArrayList.toQueryString(params);
    let { data } = await Url.get(
      `${endpoints().TimeSheetDetailAPI}/search`,
      queryString
    );
    return data;
  }

  static async delete(data, callback) {
    await apiClient
      .post(`${endpoints().TimeSheetDetailAPI}/delete`,data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage);
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
  }

  static async update(id, data, callback) {
   await apiClient
        .put(`${endpoints().TimeSheetDetailAPI}/update/${id}`, data)
        .then((response) => {
            let successMessage;
            if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
                return callback(successMessage)
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
                console.error(errorMessage);
            }
        });
}


}

export default TimeSheetDetailService;
