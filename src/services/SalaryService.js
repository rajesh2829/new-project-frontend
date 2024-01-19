// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { activityDeleteError } from "../actions/userActivityType";
import { requestDeleteActivity } from "../actions/activity";
import { fetchList } from "../actions/table";

class SalaryService {
  static async create(data, toggle,setIsSubmit) {
      return async (dispatch) => {
         await apiClient
          .post(`${endpoints().salaryAPI}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
            toggle(true)
          })
          .then(() => {
            dispatch(
              fetchList(
                "salaryList",
                `${endpoints().salaryAPI}/search`,
                1,
                25,
              )
            );
          }).catch((err) => {
            if (isBadRequest(err)) {
              let errorMessage;
              const errorRequest = err.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
                setIsSubmit(true)
              }
              Toast.error(errorMessage);
            }
          });

      }
   
}

  static update(id, data) {
    try {
      if (id && data) {
        apiClient
          .put(`${endpoints().salaryAPI}/${id}`, data)
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

  static async get(salary_id) {
    try {
      const response = await apiClient.get(
        `${endpoints().salaryAPI}/${salary_id}`
      );

      const data = response.data;

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getfilterData(params) {
    let dataValue = {};
    try {
      await apiClient
        .post(`${endpoints().salaryAPI}/filterRoute`, params)
        .then((value) => {
          const data = value && value.data && value.data.data;
          for (let i = 0; i < data.length; i++) {
            dataValue = data[i];
          }
        });
      return dataValue;
    } catch (err) {
      console.log(err);
    }
  }

  static statusUpdate(id, data) {
    try {
      if (id && data) {
        apiClient
          .put(`${endpoints().salaryAPI}/status/${id}`, data)
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
  static bulkUpdate(data) {

    return (dispatch) => {
      apiClient
        .put(`${endpoints().salaryAPI}/bulk/update`, data)
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
              "salaryList",
              `${endpoints().salaryAPI}/search`,
              1,
              25,
            )
          );
        })
        .catch((error) => {
          console.log(error)
        });
    };
  }
}

export default SalaryService;
