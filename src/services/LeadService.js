import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";



class LeadService{

    static create (data, setIsSubmit,callback){
        apiClient
        .post(`${endpoints().LeadApi}/create`, data)
        .then((response) => {
            let successMessage;
            if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
                setIsSubmit(true)
                callback && callback(response)
            }
        })
        .catch((err) => {
            if (isBadRequest(err)) {
                let errorMessage;
                const errorRequest = err.response.request;
                if (errorRequest && errorRequest.response) {
                    errorMessage = JSON.parse(errorRequest.response).message;
                }
                setIsSubmit(true)
                Toast.error(errorMessage);
            }
        });

    }

    static update(id, data,cb) {
                apiClient
                    .put(`${endpoints().LeadApi}/update/${id}`, data)
                    .then((response) => {
                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            Toast.success(successMessage);
                            return cb(successMessage)
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

    static async get(id) {
        try {
            if (id) {
                const response = await apiClient.get(`${endpoints().LeadApi}/${id}`);
                const data = response.data.data;
                return data;
            }

        } catch (err) {
            console.log(err);
        }
    }

    static statusUpdate (id,data,cb){
        apiClient
        .put(`${endpoints().LeadApi}/status/${id}`, data)
        .then((response) => {
            let successMessage;
            if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
                return cb(successMessage)
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

    static delete = (id, cb) => {
        apiClient
            .delete(`${endpoints().LeadApi}/delete/${id}`)
            .then((response) => {
                let successMessage;
                if (response && response.data) {
                    successMessage = response.data.message;
                    Toast.success(successMessage);
                    return cb(successMessage)
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
}
export default LeadService;