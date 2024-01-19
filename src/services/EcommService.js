import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";



class EcommService {

    static create(data,callback) {

        apiClient.post(`${endpoints().BookMyWaterCanApi}/create`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
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
              Toast.error(error.response.data.message);
              console.error(errorMessage);
            }
          });
    }

    static async category(params){
      try {
        let queryString = await ArrayList.toQueryString(params);
        let { data } = await Url.get(`${endpoints().EcommCategory}/list`, queryString)
        return data;
      } catch (error) {
        console.log(error)
      }
    }

}

export default EcommService;