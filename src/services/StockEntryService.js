import {
  receiveAddStockEntry,
  receiveUpdatedStockEntryStatus,
  requestAddStockEntry,
  requestUpdateStockEntry,
  StockEntryCreateError,
  stockEntryUpdateError,
  stockEntryUpdateStatusError,
} from "../actions/stockEntry";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";

class StockEntryService {
  //delete

  static create = (data, params, callback) => {
    return (dispatch) => {
      dispatch(requestAddStockEntry());

      apiClient
        .post(endpoints().stockEntry, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            // toast.success(successMessage);
          }
          return callback(response && response.data);
        })
        .then(() => {
          dispatch(
            fetchList(
              "stockEntry",
              `${endpoints().stockEntry}/search`,
              1,
              25,
              params
            )
          );
          dispatch(receiveAddStockEntry());
        })
        .catch((error) => {
          dispatch(StockEntryCreateError(error));

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

          return callback(error && error.response && error.response.data);
        });
    };
  };

  static update = (id, data, getDetails, params) => {
    return (dispatch) => {
      dispatch(requestUpdateStockEntry());
      apiClient
        .put(`${endpoints().stockEntry}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          getDetails(id);
        })
        .catch((error) => {
          dispatch(stockEntryUpdateError(error));

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
  };

  static delete = (id, props) => {
    try {
      apiClient
        .delete(`${endpoints().stockEntry}/${id}`)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            Toast.success(res?.data?.message);
            props.history.push("/stockEntry");
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
    } catch (err) {
      console.log(err);
    }
  };

  static updateStatus = (
    id,
    status,
    params,
    stockEntryCurrentpage,
    stockEntryPageSize
  ) => {
    let data = {};
    data.status = status;
    return (dispatch) => {
      dispatch(receiveUpdatedStockEntryStatus());
      apiClient
        .put(`${endpoints().stockEntry}/status/${id}`, data)
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
              "stockEntry",
              `${endpoints().stockEntry}/search`,
              stockEntryCurrentpage || 1,
              stockEntryPageSize || 25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(stockEntryUpdateStatusError(error));
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
  };
}
export default StockEntryService;
