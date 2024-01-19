// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { requestAddActivityType } from "../actions/userActivityType";
import { activityDeleteError, receiveActivity, requestAddActivity, requestDeleteActivity } from '../actions/activity';
import { fetchList } from "../actions/table";

class ActivityService {
    static create(data, params) {
      try {
        return (dispatch) => {
            dispatch(requestAddActivity());
            return apiClient
              .post(`${endpoints().activityAPI}`, data)
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
                    "activity",
                    `${endpoints().activityAPI}/search`,
                    1,
                    25,
                    params
                  )
                );
                dispatch(receiveActivity());
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
          };
      } catch (error) {
          console.log(error)
      }
      }
    static update(id, data) {
        try {
            if (id && data) {
                apiClient
                    .put(`${endpoints().activityAPI}/${id}`, data)
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

        } catch (err) {
            console.log(err);
        }
    }


    static async get(id) {
        try {
            if (id) {
                let response = await apiClient
                    .get(`${endpoints().activityAPI}/${id}`);

                return response;
            }

        } catch (err) {
            console.log(err);
            return null;
        }
    }

    static delete(id, setIsDeleteModal, params) {
        return (dispatch) => {
          dispatch(requestDeleteActivity());
          apiClient
            .delete(`${endpoints().activityAPI}/${id}`)
            .then((response) => {
              let successMessage;
              if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
              }
              setIsDeleteModal(false)
            })
            .then(() => {
              dispatch(
                fetchList(
                  "activity",
                  `${endpoints().activityAPI}/search`,
                  1,
                  25,
                  params
                )
              );
            })
            .catch((error) => {
              dispatch(activityDeleteError(error));
            });
        };
      }
      
//update activity type data
static bulkDelete(ids, setIsDeleteModal, params) {
    return (dispatch) => {
      dispatch(requestDeleteActivity());
      apiClient
        .post(`${endpoints().activityAPI}/bulkDelete`, {ids : ids})
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          setIsDeleteModal(true)
        })
        .then(() => {
          dispatch(
            fetchList(
              "activity",
              `${endpoints().activityAPI}/search`,
              1,
              25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(activityDeleteError(error));
        });
    };
  }


}

export default ActivityService;

