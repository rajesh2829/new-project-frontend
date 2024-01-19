// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { DEFAULT_API_KEY } from "../configs";
import { requestUpdateCompany, CompanyUpdateError, receiveUpdatedCompanyStatus, companyUpdateStatusError, CompanyDeleteError, requestDeleteCompany } from "../actions/company";
import { isBadRequest } from "../lib/Http";
import Toast from "../components/Toast";
import { fetchList } from "../actions/table";
import { Status } from "../helpers/Company";

class CompanyService {
  // Search results
  static async search() {
    try {
      let response = await apiClient.get(`${endpoints().companyAPI}/search`);
      const data = response && response.data && response.data.data;
      return data;
    } catch (err) {
      console.log(null, err);
    }
  }

  //get company detail based on company id
  static async get(companyId) {
    let apiUrl = ""
    if (companyId) {
      apiUrl = `${endpoints().companyAPI}?company_id=${companyId}`
    } else {
      apiUrl = `${endpoints().companyAPI}`
    }
    const response = await apiClient.get(apiUrl);
    return response && response?.data;
  }

  // Get company Url based on company
  static async CompanyDetail(id) {
    apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
    const response = await apiClient.get(`${endpoints().publicAPI}`);
    return response && response?.data;
  }

  //get company detail based on company id
  static async updateCompany(id, data) {
    try {
      const response = await apiClient.put(`${endpoints().companyAPI}/${id}`, data);

      if (response && response.data) {
        Toast.success(response.data.message);
      }

      return response && response?.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(id, params, history, dispatch) {
    try {


      apiClient
        .delete(`${endpoints().companyAPI}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            history.goBack();
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "company",
              `${endpoints().companyAPI}/search`,
              1,
              25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(CompanyDeleteError(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
          }
        });
    } catch (err) {
      console.log(null, err);
    }
  }


  static async create(data, toggle, params, dispatch) {
    try {
      // return (dispatch) => {

      return apiClient
        .post(`${endpoints().companyAPI}`, data)
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
            fetchList("All", `${endpoints().companyAPI}/search`, 1, 25, params)
          );
          dispatch(
            fetchList(
              "InActive",
              `${endpoints().companyAPI}/search`,
              1,
              25,
              { status: Status.INACTIVE },
              params
            )
          );
          dispatch(
            fetchList(
              "Active",
              `${endpoints().companyAPI}/search`,
              1,
              25,
              { status: Status.ACTIVE },
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
            Toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
      // };
    } catch (err) {
      console.log(null, err);
    }
  }

  static async update(id, data, params, dispatch) {
    try {
      dispatch(requestUpdateCompany());
      apiClient
        .put(`${endpoints().companyAPI}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList("All", `${endpoints().companyAPI}/search`, 1, 25, params)
          );
          dispatch(
            fetchList(
              "Active",
              `${endpoints().companyAPI}/search`,
              1,
              25,
              { status: Status.ACTIVE },
              params
            )
          );
          dispatch(
            fetchList(
              "InActive",
              `${endpoints().companyAPI}/search`,
              1,
              25,
              { status: Status.INACTIVE },
              params
            )
          );
        })
        .catch((error) => {
          dispatch(CompanyUpdateError(error));

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
    } catch (err) {
      console.log(null, err);
    }
  }



  static async updateStatus(id, data, params) {
    try {
      return (dispatch) => {
        dispatch(receiveUpdatedCompanyStatus());
        apiClient
          .put(`${endpoints().companyAPI}/status/${id}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("All", `${endpoints().companyAPI}/search`, 1, 25, params)
            );
            dispatch(
              fetchList(
                "Active",
                `${endpoints().companyAPI}/search`,
                1,
                25,
                { status: Status.ACTIVE },
                params
              )
            );
            dispatch(
              fetchList(
                "InActive",
                `${endpoints().companyAPI}/search`,
                1,
                25,
                { status: Status.INACTIVE },
                params
              )
            );
          })
          .catch((error) => {
            dispatch(companyUpdateStatusError(error));

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
      console.log(null, err);
    }
  }
}

export default CompanyService;

