import ActivityTypeAdd from "../actions/activityType";
import FineAdd from "../actions/fine";
import project from "../actions/project";
import PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { ActivityType } from "../helpers/Project";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";

class fineService {
  // Update Purchase Order

  static update = async (id, data, callback) => {
    apiClient
      .put(`${endpoints().fineApi}/${id}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
          return callback(res.data.message);
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
    return data;
  };
  static async get(id) {
    try {
      if (id) {
        let response = await apiClient.get(`${endpoints().fineApi}/${id}`);

        return response;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  // Add Purchase Order
  static add = (data, params, callback) => {
    return (dispatch) => {
      dispatch(FineAdd.requestAddFine);

      apiClient
        .post(endpoints().fineApi, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);

            return callback(response.data.id);
          }
        })
        .then(() => {
          dispatch(
            fetchList("fines", `${endpoints().fineApi}/search`, 1, 25, params)
          );
          dispatch(FineAdd.receiveAddFine());
        })
        .catch((error) => {
          dispatch(FineAdd.fineCreateError(error));

          if (
            error.response &&
            error.response.status >= HttpStatus.BAD_REQUEST
          ) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }

            Toast.error(errorMessage);
            // toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };
  };

  static updateStatus = (id, data, params) => {
    try {
      apiClient
        .put(`${endpoints().fineApi}/status/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
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
    } catch (err) {
      console.log(err);
    }
  };

  static delete = (id) => {
    try {
      return (dispatch) => {
        dispatch(FineAdd.requestDeleteFine);

        apiClient
          .delete(`${endpoints().fineApi}/${id}`)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .catch((error) => {
            dispatch(FineAdd.receiveFineDeleteError(error));
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
    } catch (error) {
      console.log(error);
    }
  };
}
export default fineService;
