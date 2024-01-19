import Address from "../actions/address";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";

class AddressService {
  static add = (data, params, toggle,getUserDetail,) => {
    return async (dispatch) => {
      try {
        const response = await apiClient.post(
          `${endpoints().addressAPI}`,
          data
        );
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
        toggle();
        getUserDetail && getUserDetail()
        dispatch(
          fetchList("address", `${endpoints().addressAPI}/search`, 1, 25, {
            pagination: true,
            object_id: params.object_id,
            objectName: params.objectName,
          })
        );
      } catch (error) {
        if (isBadRequest(error)) {
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
  };

  static update = (id, data, params, toggle,getUserDetail) => {

    return async (dispatch) => {
      try {
        apiClient
          .put(`${endpoints().addressAPI}/${id}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
            toggle();
            getUserDetail && getUserDetail()
            dispatch(
              fetchList("address", `${endpoints().addressAPI}/search`, 1, 25, {
                pagination: true,
                object_id: params.object_id,
                objectName:params.objectName,
    
              })
            );
          });
       
      } catch (error) {
        if (isBadRequest(error)) {
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
  };

  static Delete = (id, params) => {
    return (dispatch) => {
      dispatch(Address.requestDeleteAddress());

      apiClient
        .delete(`${endpoints().addressAPI}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList("address", `${endpoints().addressAPI}/search`, 1, 25, {
              pagination: true,
              object_id: params.object_id,
              objectName:params.objectName,
            })
          );
        })
        .catch((error) => {
          dispatch(Address.receiveAddressDeleteError(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
          }
        });
    };
  };

  static get = async (id, objectName, object_id) => {
    if (objectName && object_id) {
      const data = await apiClient.get(
        `${
          endpoints().addressAPI
        }/search?objectName=${objectName}&&object_id=${object_id}`
      );
      return data;
    } else if (id != null) {
      const data = await apiClient.get(`${endpoints().addressAPI}/${id}`);
      return data;
    }
  };

  static search = async () => {
    const data = await apiClient.get(`${endpoints().addressAPI}/search`);
    return data;
  };
  static list = async () => {
    const data = await apiClient.get(`${endpoints().addressAPI}/list`);
    return data;
  };
}
export default AddressService;
