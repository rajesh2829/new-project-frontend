import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";
import Url from "../lib/Url";



class TicketTestService {

    static create (data,cb){

        apiClient
        .post(`${endpoints().TicketTest}/create`, data)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            Toast.success(res?.data?.message);
            return cb(res)
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

    static async search (params){
        let queryString = await ArrayList.toQueryString(params);
        let { data } = await Url.get(
          `${endpoints().TicketTest}/search`,
          queryString
        );
        return data;

    }

    static update (id,data,cb){

      apiClient
      .put(`${endpoints().TicketTest}/update/${id}`, data)
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
              console.error(errorMessage);
          }
      });


    }

    static async delete(data, callback) {
      await apiClient
        .post(`${endpoints().TicketTest}/delete`,data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            return callback(successMessage);
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
export default TicketTestService;