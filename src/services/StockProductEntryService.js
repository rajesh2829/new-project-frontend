import {
  receiveAddStockProductEntry,
  receiveDeleteStockProductEntry,
  receiveUpdateStockProductEntry,
  requestAddStockProductEntry,
  requestDeleteStockProductEntry,
  requestUpdateStockProductEntry,
  StockEntryProductCreateError,
  StockEntryProductDeleteError,
  StockEntryProductUpdationError,
  stockEntryUpdateStatusError,
} from "../actions/stockEntry";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class StockEntryProductService {
  static create = (data, addProductToggle, params) => {
    return (dispatch) => {
      dispatch(requestAddStockProductEntry());

      apiClient
        .post(endpoints().stockProductEntry, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            addProductToggle();
          }
          return response && response.data;
        })
        .then(() => {
          dispatch(
            fetchList(
              "stockProductEntry",
              `${endpoints().stockProductEntry}/search`,
              1,
              25,
              params
            )
          );
          dispatch(receiveAddStockProductEntry());
        })
        .catch((error) => {
          dispatch(StockEntryProductCreateError(error));

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
            console.error(errorMessage);
          }
          return error;
        });
    };
  };

  static delete = (id, params, closeDeleteModal) => {
    return (dispatch) => {
      dispatch(requestDeleteStockProductEntry());

      apiClient
        .delete(`${endpoints().stockProductEntry}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          closeDeleteModal();
          return response && response.data;
        })
        .then(() => {
          dispatch(
            fetchList(
              "stockProductEntry",
              `${endpoints().stockProductEntry}/search`,
              1,
              25,
              params ? params : {}
            )
          );
          dispatch(receiveDeleteStockProductEntry());
        })
        .catch((error) => {
          dispatch(StockEntryProductDeleteError(error));

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
            console.error(errorMessage);
          }
          return error;
        });
    };
  };

  static search = async (params) => {

    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(`${endpoints().stockProductEntry}/search`, queryString)
    return response;
  }

  static update = (id, body, params) => {
    return (dispatch) => {
      dispatch(requestUpdateStockProductEntry());

      apiClient
        .put(`${endpoints().stockProductEntry}/${id}`, body)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          return response && response.data;
        })
        .then(() => {
          dispatch(
            fetchList(
              "stockProductEntry",
              `${endpoints().stockProductEntry}/search`,
              1,
              25,
              params ? params : {}
            )
          );
          dispatch(receiveUpdateStockProductEntry());
        })
        .catch((error) => {
          dispatch(StockEntryProductUpdationError(error));

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
            console.error(errorMessage);
          }
          return error;
        });
    };
  };

  static updateStoreQuantity = (body, params, callback) => {
    return (dispatch) => {
      dispatch(requestUpdateStockProductEntry());

      apiClient
        .put(`${endpoints().stockProductEntry}/updateStoreQuantity`, body)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          return callback();
        })
        .then(() => {
          dispatch(
            fetchList(
              "stockProductEntry",
              `${endpoints().stockProductEntry}/search`,
              1,
              25,
              params ? params : {}
            )
          );
          dispatch(receiveUpdateStockProductEntry());
        })
        .catch((error) => {
          dispatch(StockEntryProductUpdationError(error));

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
            console.error(errorMessage);
          }
          return error;
        });
    };
  };

  static updateStatus = (body, params, callback) => {
    return (dispatch) => {
      dispatch(requestUpdateStockProductEntry());
      apiClient
        .put(`${endpoints().stockProductEntry}/status`, body)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          return callback(response);
        })
        .then(() => {
          dispatch(
            fetchList(
              "stockProductEntry",
              `${endpoints().stockProductEntry}/search`,
              params.page,
              params.pageSize,
              params ? params : {}
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
          return error;
        });
    };
  };
}
export default StockEntryProductService;
