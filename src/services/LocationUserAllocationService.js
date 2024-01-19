import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";

class LocationUserAllocationService{

    static create (data, callback){
        apiClient
        .post(`${endpoints().LocationUserAllocationAPI}/create`, data)
        .then((response) => {
            let successMessage;
            if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
                return callback(successMessage)
            }
        })
        .catch((error) => {
            if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
                let errorMessage;
                const errorRequest = error.response.request;
                if (errorRequest && errorRequest.response) {
                    errorMessage = JSON.parse(errorRequest.response).message;
                }
                Toast.error(errorMessage);
                console.error(errorMessage);
            }
            return error;
        });
    }

    static delete (id,callback){
        apiClient
        .delete(`${endpoints().LocationUserAllocationAPI}/delete/${id}`)
        .then((response) => {
          let successMessage
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
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
            Toast.error(errorMessage);
          }
        });
    }

    static bulkCreate (data, callback){
      apiClient
      .post(`${endpoints().LocationUserAllocationAPI}/bulkCreate`, data)
      .then((response) => {
          let successMessage;
          if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              return callback(successMessage)
          }
      })
      .catch((error) => {
          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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

  static update(id,data, callback){
    apiClient
      .put(`${endpoints().LocationUserAllocationAPI}/update/${id}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
          return callback(res?.data?.message)
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


}
export default LocationUserAllocationService;