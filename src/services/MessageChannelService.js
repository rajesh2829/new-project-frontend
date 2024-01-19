import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";
import Url from "../lib/Url";




class MessageChannelService{

    static create (data,callback){

        apiClient
        .post(`${endpoints().MessageChannelApi}/create`, data)
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

    static async search(params) {
      try {
        let queryString = await ArrayList.toQueryString(params);
        let response = await Url.get(`${endpoints().MessageChannelApi}/search`, queryString)
        return response;
      } catch (err) {
        console.log(err);
        return callback(err, []);
      }
    }
}

export default MessageChannelService;