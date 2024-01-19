import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";
import ObjectName from "../helpers/ObjectName";

class MediaService {
  static async saveImage(data, showToastMessage = true) {
    try {
        return apiClient
            .post(`${endpoints().mediaAPI}`, data)
            .then((response) => {
                if (response && response.data) {
                    if (showToastMessage) {
                        toast.success(response.data.message);
                    }
                    return response.data;
                }
            })
            .catch((error) => {
                if (isBadRequest(error)) {
                    let errorMessage;
                    const errorRequest = error.response.request;
                    if (errorRequest && errorRequest.response) {
                        errorMessage = JSON.parse(errorRequest.response).message;
                    }
                    toast.error(error.response.data.message);
                    console.error(errorMessage);
                }
            });
    } catch (err) {
        console.log(null, err);
    }
}


  // Get
  static async get(id, callback) {
    try {
      if (id) {
        apiClient
          .get(`${endpoints().mediaAPI}/get/${id}`)
          .then((response) => {
            const data = response && response.data;
            return callback(null, data);
          })
          .catch((error) => {
            if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              console.error(errorMessage);
            }
            return callback(error, null);
          });
      }
    } catch (err) {
      console.log(err);
      return callback(err, null);
    }
  }


  static async search(objectName, objectId,) {
    try {
      const response = await apiClient.get(`${endpoints().mediaAPI}/search?objectName=${objectName}&&object_id=${objectId}`)

      const data = response && response?.data?.data;

      return data;

    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }

    };


  }
  // Update
  static async update(id, data, toggle, callback) {
    try {
      if (id && data) {
        apiClient
          .put(`${endpoints().mediaAPI}/${id}`, data)
          .then((response) => {
            if (response.data) {
             toast.success(response.data.message);     
              callback && callback(response)

            }
          })
        toggle()
          .catch((error) => {
            if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              toast.error(errorMessage);
              console.error(errorMessage);
            }
          });
      }
    } catch (err) {
      console.log(err);
      return callback(err, null);
    }
  }

  // Delete
  static async delete(id, callback) {
    try {
      if (id) {
       await  apiClient
          .delete(`${endpoints().mediaAPI}/${id}`)


          .then((response) => {
            if (response.data) {
              toast.success(response.data.message);
              return callback && callback();
            }
            // window.location.replace("/media");
          })

          .catch((error) => {
            if (isBadRequest(error)) {
              let errorMessage;
              const errorRequest = error.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              toast.error(errorMessage);
              console.error(errorMessage);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  }










}

export default MediaService;
