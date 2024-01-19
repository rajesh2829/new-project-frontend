// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import {
  addAttendenceError,
  attendanceDeleteError,
  requestBulkDeleteAttendance,
  bulkUpdateAttendanceError,
  bulkDeleteAttendanceError,
  receiveBulkDeleteAttendance,
  requestBulkUpdateAttendance,
  receivedAddResponse,
  requestAddAttendence,
  requestDeleteAttendance,
  requestUpdateAttendance,
  updateAttendanceError,
} from "../actions/attendence";
import { fetchList } from "../actions/table";
import { isBadRequest } from "../lib/Http";
import Toast from "../components/Toast";
import Url from "../lib/Url";
import ArrayList from "../lib/ArrayList";

class AttendanceService {
  static async get(id) {
    try {
      if (id) {
        const response = await apiClient.get(
          `${endpoints().attendanceAPI}/${id}`
        );
        return response && response.data && response.data.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async create(data, params, callback, setIsSubmit) {
    return async (dispatch) => {
      dispatch(requestAddAttendence());

      apiClient
        .post(`${endpoints().attendanceAPI}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          return callback(response && response.data);
        })
        .then(() => {
          dispatch(
            fetchList(
              "attendance",
              `${endpoints().attendanceAPI}/list`,
              params?.page ? params?.page : 1,
              params?.pageSize ? params?.pageSize : 25,
              params
            )
          );

          dispatch(receivedAddResponse());
        })
        .catch((error) => {
          dispatch(addAttendenceError(error));

          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
            setIsSubmit(true);
            console.error(errorMessage);
          }
        });
    };
  }

  static async getAttendenceByUserId(params) {
    try {
      let queryString = await ArrayList.toQueryString(params);
      const { data } = await Url.get(
        `${endpoints().attendanceAPI}/list`,
        queryString
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async Checkin(data) {
    try {
      let response = await apiClient.post(
        `${endpoints().attendanceAPI}/checkIn`,
        data
      );

      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
      }
      return response;
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  }

  static async Checkout(data) {
    try {
      let response = await apiClient.post(
        `${endpoints().attendanceAPI}/checkOut`,
        data
      );

      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  }

  static async EarlyCheckout(data) {
    try {
      let response = await apiClient.post(
        `${endpoints().attendanceAPI}/earlyCheckout`,
        data
      );

      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  }


  static async CheckOutValidation(id) {
    try {
      let response = await apiClient.put(
        `${endpoints().attendanceAPI}/checkOut/Validation/${id}`
      );
      return response;
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  }
  static async update(id, data, params) {
    return (dispatch) => {
      dispatch(requestUpdateAttendance());
      apiClient
        .put(`${endpoints().attendanceAPI}/${id}`, data)
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
              "attendance",
              `${endpoints().attendanceAPI}/list`,
              params?.page ? params?.page : 1,
              params?.pageSize ? params?.pageSize : 25,
              params
            )
          );
          dispatch(receiveUpdateAttendance);
        })
        .catch((error) => {
          dispatch(updateAttendanceError(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
              Toast.error(errorMessage);
            }
            console.error(errorMessage);
          }
        });
    };
  }

  static async delete(id, toggle, params) {
    try {
      return (dispatch) => {
        dispatch(requestDeleteAttendance());
        apiClient
          .delete(`${endpoints().attendanceAPI}/delete/${id}`)
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
                "attendance",
                `${endpoints().attendanceAPI}/list`,
                params?.page ? params?.page : 1,
                params?.pageSize ? params?.pageSize : 25,
                params
              )
            );
          })
          .catch((error) => {
            dispatch(attendanceDeleteError(error));
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
    } catch (err) {}
  }
  static bulkUpdateAttendance(data, toggle) {
    return (dispatch) => {
      dispatch(requestBulkUpdateAttendance());
      apiClient
        .put(`${endpoints().attendanceAPI}/bulkUpdate`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          toggle();
        })
        .then(() => {
          dispatch(
            fetchList(
              "attendance",
              `${endpoints().attendanceAPI}/list`,
              1,
              25,
              {}
            )
          );
          dispatch(receiveBulkUpdateAttendance());
        })
        .catch((error) => {
          dispatch(bulkUpdateAttendanceError(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
              Toast.error(errorMessage);
            }
            console.error(errorMessage);
          }
        });
    };
  }

  // Attendance Bulk Update action
  static async bulkDeleteAttendance(ids, toggle) {
    return (dispatch) => {
      dispatch(requestBulkDeleteAttendance());
      apiClient
        .put(`${endpoints().attendanceAPI}/bulkDelete`, ids)
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
              "attendance",
              `${endpoints().attendanceAPI}/list`,
              Url.GetParam("page") ? Url.GetParam("page") : 1,
              Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
              {
                startDate: Url.GetParam("startDate"),
                endDate: Url.GetParam("endDate"),
                sort: Url.GetParam("sort"),
                sortDir: Url.GetParam("sortDir"),
                location: Url.GetParam("location"),
                user: Url.GetParam("user"),
                shift: Url.GetParam("shift"),
                type: Url.GetParam("type"),
              }
            )
          );
          dispatch(receiveBulkDeleteAttendance());
        })
        .catch((error) => {
          dispatch(bulkDeleteAttendanceError(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
              Toast.error(errorMessage);
            }
            console.error(errorMessage);
          }
        });
    };
  }
  // Attendance Filter
  static async searchAttendanceData(pageSize, params) {
    return (dispatch) => {
      dispatch(
        fetchList(
          "attendance",
          `${endpoints().attendanceAPI}/list`,
          1,
          pageSize,
          params,
          {
            search: Url.GetParam("search") || "",
            location: Url.GetParam("location") || "",
            user: Url.GetParam("user") || "",
            shift: Url.GetParam("shift") || "",
            startDate: Url.GetParam("startDate") || "",
            endDate: Url.GetParam("endDate") || "",
          }
        )
      );
      // dispatch(receivedResponse());
    };
  }
}

export default AttendanceService;
