// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { CompanyUserCreateError, receiveCreateCompanyUser, requestCreateCompanyUser } from "../actions/companyUser";
import Toast from "../components/Toast";
import { fetchList } from "../actions/table";
import { User } from "../helpers/User";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class CompanyUserService {

  static async get(id) {
    try {
      if (id) {
        const response = await apiClient.get(`${endpoints().userAPI}/${id}`);
        const data = response && response.data;
        if (data) return data;
      };
    } catch (err) {
      console.log(null, err);
    }
  }

  static async getLoggedInUser() {
    try {
      const response = await apiClient.get(`${endpoints().userAPI}/`);
      
      return response && response.data;

    } catch (err) {
      console.log(null, err);
    }
  }

  // Search results
  static async search() {
    try {
      let response = await apiClient.get(`${endpoints().userAPI}/search`);
      const data = response && response.data && response.data.data
      return data;
    } catch (err) {
      console.log(null, err);
    }
  }

  static slackUpdate = (id, data) => {
    apiClient
      .put(`${endpoints().userAPI}/slack/update/${id}`, data)
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
          Toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };

  static async create(data, params) {
    return async (dispatch) => {
      dispatch(requestCreateCompanyUser());

      try {
        const response = await apiClient
          .post(`${endpoints().userAPI}`, data);
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        } dispatch(
          fetchList(User.ALL_USERS_TAB, `${endpoints().userAPI}/search`, params.values.page ? params.values.page : 1,params.values.pageSize ? params.values.pageSize : 25,params)
        );
        dispatch(
          fetchList(
            User.ACTIVE_USER_TAB,
            `${endpoints().userAPI}/search`,
            params.values.page ? params.values.page : 1,
            params.values.pageSize ? params.values.pageSize : 25,
            {
              status: User.STATUS_ACTIVE_VALUE,
              search: Url.GetParam("search"),
              pagination: true,
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDIr"),
            },
          )
        );
        dispatch(
          fetchList(
            User.INACTIVE_USER_TAB,
            `${endpoints().userAPI}/search`,
            params.values.page ? params.values.page : 1,
            params.values.pageSize ? params.values.pageSize : 25,
            {
              status: User.STATUS_INACTIVE_VALUE,
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDIr"),
            },
            params
          )
        );
        dispatch(receiveCreateCompanyUser());
      } catch (error) {
        dispatch(CompanyUserCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
      }
    };
  }

}
export default CompanyUserService;
