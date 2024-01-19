

// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { jobDeleteError, requestDeleteJob, requestUpdateJob } from "../actions/schedulerJob";
import { JobUpdateError } from "../actions/jobs";
import { isBadRequest } from "../lib/Http";
import { fetchList } from "../actions/table";
import Url from "../lib/Url";
class SchedulerJobService {
    static async search() {
        const response = await apiClient.get(`${endpoints().schedulerJobAPI}/list?pagination=false`);
        const data = response.data.data;
        return data;
    }

    static async get(id){
        const response = await apiClient.get(`${endpoints().schedulerJobAPI}/${id}`);
        const data = response.data;
        return data;
    }

    static async getIdByUrl(url){
        const response = await apiClient.get(`${endpoints().schedulerJobAPI}/list?api_url=${url}`);
        return response;
    }


    static async jobRun(api_url, Id, product_id){
        const response = await apiClient.post(`${api_url}?id=${Id}&product_id=${product_id}`)
        if (response && response.data) {
            Toast.success(response.data.message);
          }
    }


    static async bulkUpdate(bodydata, params) {
      try {
          return (dispatch) => {
              dispatch(requestUpdateJob());
              apiClient
                .put(`${endpoints().schedulerJobAPI}/bulkUpdate`, bodydata)
                .then((response) => {
                  let successMessage;
                  if (response && response.data) {
                    successMessage = response.data.message;
                    Toast.success(successMessage);
                  }
                })
                .then(() => {
                  dispatch(
                    fetchList("schedulerJob",`${endpoints().schedulerJobAPI}/list`, 1,25,{status:Url.GetParam("status") ,search:Url.GetParam("search") })
                  );
                })
                .catch((error) => {
                  dispatch(JobUpdateError(error));
          
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

  static async bulkDeleteSchedulerJob(ids) {
    return (dispatch) => {
      dispatch(requestDeleteJob());
      apiClient
        .put(`${endpoints().schedulerJobAPI}/bulkDelete`, ids)
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
              "schedulerJob",
              `${endpoints().schedulerJobAPI}/list`,
              Url.GetParam("page") ? Url.GetParam("page") : 1,
              Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
              {
                status: Url.GetParam("status"),
              }
            )
          );
        })
        .catch((error) => {
          dispatch(JobUpdateError(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
              Toast.error(errorMessage);
            }
            console.error(errorMessage);
          }
        });
    };
  }


  static async update(id, data,schedulerDetail,callback) {
    try {
      apiClient
        .put(`${endpoints().schedulerJobAPI}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            schedulerDetail && schedulerDetail()
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
            Toast.error(error.response.data.message);
            console.error(errorMessage);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(id) {
    try {
      apiClient
        .delete(`${endpoints().schedulerJobAPI}/${id}`)
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
              "schedulerJob",
              `${endpoints().schedulerJobAPI}/list`,
              1,
              25,
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
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  static async  deleteJob(id) {
    return (dispatch) => {
      dispatch(requestDeleteJob());
  
      apiClient
        .delete(`${endpoints().schedulerJobAPI}/${id}`)
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
              "schedulerJob",
              `${endpoints().schedulerJobAPI}/list`,
              1,
              25,
              {
 
            search:Url.GetParam("search"),
            status:Url.GetParam("status"),

              }
            )
          );
        })
        .catch((error) => {
          dispatch(jobDeleteError(error));
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





}

export default SchedulerJobService;

