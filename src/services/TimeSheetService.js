import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";


class TimeSheetService {
    static create(data,callback) {

        apiClient.post(`${endpoints().TimeSheetAPI}/create`, data)
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

    static delete (id,callback){
        apiClient
        .delete(`${endpoints().TimeSheetAPI}/delete/${id}`)
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

    static async search(params) {
      let queryString = await ArrayList.toQueryString(params);
      let { data } = await Url.get(
        `${endpoints().TimeSheetAPI}/search`,
        queryString
      );
      return data;
    }

    static statusUpdate(id, data) {
      try {
        if (id && data) {
          apiClient
            .put(`${endpoints().TimeSheetAPI}/status/${id}`, data)
            .then((response) => {
              let successMessage;
              if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
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
}

export default TimeSheetService;