

// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { JobsCreateError, JobUpdateError, receiveAddJob, requestAddJob, requestDeleteJob, requestUpdateJob } from "../actions/jobs";
import { fetchList } from "../actions/table";
class JobService {
    static async get(id) {
        try {
            if (id) {
                const response = await apiClient.get(`${endpoints().jobAPI}/${id}`);
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async delete(id, params,dispatch,callback) {
        try {
                apiClient
                    .delete(`${endpoints().JobApi}/${id}`)
                    .then((response) => {
                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            Toast.success(successMessage);
                            return callback && callback (response)
                        }
                    })
                    .then(() => {
                        dispatch(
                            fetchList("Job", `${endpoints().JobApi}/search`, 1, 25, params)
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
        } catch (err) {
            console.log(err);
        }
    }


    static async create(data, params,toggle,dispatch) {
        try {
    
                return apiClient
                  .post(`${endpoints().JobApi}`, data)
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
                      fetchList("job", `${endpoints().JobApi}/list`, 1, 25, params)
                    );
                    dispatch(receiveAddJob());
                  })
                  .catch((error) => {
                    dispatch(JobsCreateError(error));
            
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
              
        } catch (err) {
            console.log(err);
        }
    }

    static async update(id, data, params,dispatch) {
        try {
                apiClient
                  .put(`${endpoints().JobApi}/${id}`, data)
                  .then((response) => {
                    let successMessage;
                    if (response && response.data) {
                      successMessage = response.data.message;
                      Toast.success(successMessage);
                    }
                  })
                  .then(() => {
                    dispatch(
                      fetchList("job", `${endpoints().JobApi}/list`, 1, 25, params)
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
        } catch (err) {
            console.log(err);
        }
    }
}
export default JobService;

