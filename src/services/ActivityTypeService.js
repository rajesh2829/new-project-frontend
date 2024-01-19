import ActivityTypeAdd from "../actions/activityType";
import project from "../actions/project";
import PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { ActivityType } from "../helpers/Project";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";

class ActivityTypeService {

  // Update Purchase Order

  static update = async (id, data ,cb) => {
    apiClient.put(`${endpoints().activityTypeApi}/${id}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
        }
        return cb(res?.data?.message)
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

  // Add Purchase Order
  static add = (data, params) => {


    return (dispatch) => {
      dispatch(ActivityTypeAdd.requestAddActivityType());

      apiClient
        .post(endpoints().activityTypeApi, data)
        .then((response) => {

          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }

        })
        .then(() => {
          dispatch(
            fetchList(
              "activityType",
              `${endpoints().activityTypeApi}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(ActivityTypeAdd.receiveAddProduct());
        })
        .catch((error) => {
          dispatch(ActivityTypeAdd.activitytypeCreateError(error));

          if (isBadRequest(error)) {
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
  }





  static delete = (id) => {
    try {

      return (dispatch) => {
        dispatch(ActivityTypeAdd.requestDeleteActivityType());

        apiClient
          .delete(`${endpoints().activityTypeApi}/${id}`)
          .then((response) => {


            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("activityType", `${endpoints().activityTypeApi}/search`, 1, 25)
            );
          })
          .catch((error) => {
            dispatch(ActivityTypeAdd.receiveActivityTypeDeleteError(error));
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
      console.log(error)
    }

  }
  static async get(id) {
    try {
      const response = await apiClient.get(`${endpoints().activityTypeApi}/${id}`);
      const data = response?.data;
      return data;
    } catch (err) {

      console.log(err);
    }
  }
  static updateStatus = (id, data, params) => {
    return (dispatch) => {

      dispatch(ActivityTypeAdd.requestUpdateStatusActivityType);
      apiClient
        .put(`${endpoints().activityTypeApi}/status/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList("activityType", `${endpoints().activityTypeApi}/search`, 1, 25, params)
          );
        })
        .catch((error) => {
          dispatch(ActivityTypeAdd.activitytypeUpdateStatusError(error));
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
    };
  }

  static search = async () => {
    try {
      let response = await apiClient.get(`${endpoints().activityTypeApi}/search`);
      return response
    } catch (err) {
      console.log(err);
    }
  };

}
export default ActivityTypeService;
