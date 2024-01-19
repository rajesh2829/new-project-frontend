import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";


class MessageChannelUser {

    static create (data,callback){

        apiClient
        .post(`${endpoints().MessageChannelUserApi}/create`, data)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            Toast.success(res?.data?.message);
            return callback(res)
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

export default MessageChannelUser;