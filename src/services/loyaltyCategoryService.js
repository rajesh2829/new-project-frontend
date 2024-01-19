import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest } from "../lib/Http";

class LoyaltyCategoryService {
  static add = (data, callback) => {

    apiClient
      .post(`${endpoints().loyaltyCategory}/create`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage)
        }
      })
      .catch((error) => {

        if (
          error.response &&
          error.response.status >= HttpStatus.BAD_REQUEST
        ) {
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

  static update = async (id, data, callback) => {
    apiClient
      .put(`${endpoints().loyaltyCategory}/update/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage)
        }
      })
      .catch((error) => {

        if (
          error.response &&
          error.response.status >= HttpStatus.BAD_REQUEST
        ) {
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

  
  static async get(id) {
    try {
      if (id) {
        const response = await apiClient.get(`${endpoints().loyaltyCategory}/${id}`);
        return response && response.data && response.data.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(id,callback) {
    apiClient
      .delete(`${endpoints().loyaltyCategory}/delete/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage)
        }
      })
      .catch((error) => {

        if (
          error.response &&
          error.response.status >= HttpStatus.BAD_REQUEST
        ) {
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
  static search = async () => {
    const data = await apiClient.get(`${endpoints().loyaltyCategory}/search`);
    return data;
  };
}
export default LoyaltyCategoryService;
