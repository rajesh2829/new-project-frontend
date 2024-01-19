// API Client

import {
  activityDeleteError,
  requestDeleteActivity,
} from "../actions/activity";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class InspectionService {

  constructor() {
    this.action = {
      REQUEST_ADD_INSPECTION: "REQUEST_ADD_INSPECTION",
      RECEIVE_ADD_INSPECTION: "RECEIVE_ADD_INSPECTION",
      ADD_INSPECTION_ERROR: "ADD_INSPECTION_ERROR"
    }
  }

  // Request update activity type
  static requestAddInspection() {
    return {
      type: inspectionService.action.REQUEST_ADD_INSPECTION,
    };
  }

  // Request update activity type
  static receiveAddInspection() {
    return {
      type: inspectionService.action.RECEIVE_ADD_INSPECTION,
    };
  }

  // Request update activity type
  static AddInspectionError() {
    return {
      type: inspectionService.action.ADD_INSPECTION_ERROR,
    };
  }

  static create(data, params, callback) {
    return (dispatch) => {
      dispatch(this.requestAddInspection());
      apiClient.post(`${endpoints().inspectionAPI}/create`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            return callback();
          }
        })
        .then(() => {
          dispatch(
            fetchList("inspections", `${endpoints().inspectionAPI}/search`, 1, 25, params)
          );
        })
        .catch((error) => {
          dispatch(this.AddInspectionError(error));

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

  static search = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(
      `${endpoints().inspectionAPI}/search`,
      queryString
    );
    return response;
  };

  static delete(id, params , callback) {
    return (dispatch) => {
      dispatch(requestDeleteActivity());
      apiClient
        .delete(`${endpoints().inspectionAPI}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            return callback(successMessage)
          }

        })
        .then(() => {
          dispatch(
            fetchList("inspections", `${endpoints().inspectionAPI}/search`, 1, 25, params)
          );
        })
        .catch((error) => {
          dispatch(activityDeleteError(error));
        });
    };
  }
}

const inspectionService = new InspectionService();

export default InspectionService;
