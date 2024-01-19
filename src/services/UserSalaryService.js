// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";
import { useHistory } from "react-router-dom";
import { requestDeleteUserSalary } from "../actions/user";
import { fetchList } from "../actions/table";
class UserSalaryService {
  static async create(data, id,history) {
    try {
      if (data) {
        apiClient
          .post(`${endpoints().UsersalaryAPI}/create`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              history.push(`/user/${id}?tab=Salary`);
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

  static search = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(
      `${endpoints().UsersalaryAPI}/search`,
      queryString
    );
    return response;
  };

  static update(id, data) {
    try {
      if (id && data) {
        apiClient
          .put(`${endpoints().UsersalaryAPI}/${id}`, data)
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

  static delete(id) {
    try {
      return (dispatch) => {
        dispatch(requestDeleteUserSalary());

        apiClient
          .delete(`${endpoints().UsersalaryAPI}/del/${id}`)
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

  static async get(id) {
    try {
      const response = await apiClient.get(
        `${endpoints().UsersalaryAPI}/get/${id}`
      );
      const data = response.data;

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserSalaryService;
