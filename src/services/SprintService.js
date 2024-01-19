import { receiveCreateSprint, requestCreateSprint, requestUpdateSprint, sprintCreateError, SprintUpdateError } from "../actions/sprint";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class SprintService {

    // Create Sprint
    static async create(data, params) {
        return async (dispatch) => {
            dispatch(requestCreateSprint());

            try {
                const response = await apiClient.post(
                    `${endpoints().sprintAPI}`,
                    data
                );
                let successMessage;
                if (response && response.data) {
                    successMessage = response.data.message;
                    Toast.success(successMessage);
                }
                dispatch(
                    fetchList(
                        "sprint",
                        `${endpoints().sprintAPI}/search`,
                        params.CurrentPage?params.CurrentPage:1,
                        params.CurrentPageSize?params.CurrentPageSize:25,
                        params
                    )
                );
                dispatch(receiveCreateSprint());
            } catch (error) {
                dispatch(sprintCreateError(error));

                if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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

    //Search
    static search = async (params) => {

        let queryString = await ArrayList.toQueryString(params);
        let response = await Url.get(`${endpoints().sprintAPI}/search`, queryString)
    
        return response;
      };

    // Update Sprint
    static async update(id, data, params) {
        try{
            apiClient
              .put(`${endpoints().sprintAPI}/${id}`, data)
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
              })
          }catch(err){
              console.log(err);
          }
    }

    // Delete Sprint
    static async delete(id) {
        try {
            apiClient
                .delete(`${endpoints().sprintAPI}/${id}`)
                .then((response) => {
                    if (response.status == HttpStatus.OK) {
                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            Toast.success(successMessage);
                        }
                        props.history.push("/setting/Sprint");
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
                        let errorMessage;
                        
                        const errorRequest = error.response.request;
                        if (errorRequest && errorRequest.response) {
                            errorMessage = JSON.parse(errorRequest.response).message;
                        }
                        Toast.error(errorMessage)

                    }
                });
        } catch (err) {
            console.log(err);
        }

    }
    static updateStatus = (id, data,params) => {
    
        try{
              apiClient
                .put(`${endpoints().sprintAPI}/status/${id}`, data)
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
                })
            }catch(err){
                console.log(err);
            }
            
          }
          static getSprintList = async () => {
            const sprintList = [];
            await apiClient
              .get(`${endpoints().sprintAPI}/list`)
              .then((response) => {
                const data = response.data.data;
                if (data && data.length > 0) {
                  data.forEach((sprintData) => {
                    sprintList.push({
                      value: sprintData.name,
                      label: sprintData.name,
                    });
                  });
                  
                }
              });
            return  sprintList;
          };

}

export default SprintService;