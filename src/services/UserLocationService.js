import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";
import Url from "../lib/Url";


class UserLocationService {

    static update(id,data){
    apiClient
      .put(`${endpoints().userLocationAPI}/${id}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
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

    static async get (id,params){
      let queryString = await ArrayList.toQueryString(params);
      let response = await Url.get(`${endpoints().userLocationAPI}/${id}`, queryString)
      return response;
    }
}
export default UserLocationService;