import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";




class DeviceInfoService{
    static async statusUpdate(id, data,cb) {
        try {
          if (id && data) {
           await apiClient
              .put(`${endpoints().UserDeviceInfoApi}/status/${id}`, data)
              .then((response) => {
                let successMessage;
                if (response && response.data) {
                  successMessage = response.data.message;
                  Toast.success(successMessage)
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
        } catch (err) {
          console.log(err);
        }
      }
}
export default DeviceInfoService;