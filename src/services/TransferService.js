import { fetchList } from "../actions/table";
import { requestDeleteTransfer, requestUpdateTransfer, transferDeleteError, transferUpdateError } from "../actions/transfer";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { Transfer } from "../helpers/Transfer";
import ArrayList from "../lib/ArrayList";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import Url from "../lib/Url";

class TransferService {
  static async clone(id, callback) {
    apiClient
      .put(`${endpoints().transferProductApi}/clone/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage)
        }
      }).catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
        }
      });
  }


  static delete = (id, params, allCurrentPage, allCurrentPageSize) => {

    return (dispatch) => {
      dispatch(requestDeleteTransfer());

      apiClient
        .delete(`${endpoints().transferApi}/delete/${id}`)
        .then((response) => {
          let successMessage
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "transfer",
              `${endpoints().transferApi}/search`,
              allCurrentPage ,
              allCurrentPageSize || 25,
              {
                search: Url.GetParam("search"),
                status: Url.GetParam("status"),
                type: Url.GetParam("type"),
                section: Url.GetParam("section"),
                startDate : Url.GetParam("startDate"),
                endDate : Url.GetParam("endDate"),
                user : Url.GetParam("user"),
                fromLocation :Url.GetParam("fromLocation"),
                toLocation :Url.GetParam("toLocation")


              },

            )
          );
        })
        .catch((error) => {
          dispatch(transferDeleteError(error));
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
  }

  static get = async (tansferId) => {
    const response = await apiClient.get(
      `${endpoints().transferApi}/${tansferId}`
    );
    return response;
  }


  static update = (tansferId, data, getDetails, getStoreDetails, getStoreProducts) => {
    apiClient
      .put(`${endpoints().transferApi}/${tansferId}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
          getDetails();
          getStoreDetails();
          getStoreProducts();
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


  static updateStatus = (id, data, getDetails, params) => {
    return (dispatch) => {
      dispatch(requestUpdateTransfer());
      apiClient
        .put(`${endpoints().transferApi}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          getDetails(id)
        }
        )
        .catch((error) => {
          dispatch(transferUpdateError(error));

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

  static async search(params) {

    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(`${endpoints().transferApi}/search`, queryString)
    return response;
  }

  static async replenish(bodyData, callback) {
    apiClient
      .post(`${endpoints().transferApi}/replenish`, bodyData)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
        return callback(true);
      }).catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
        }
        return callback(false);
      });
  }

  static async bulkReplenish(bodyData, callback) {
    apiClient
      .post(`${endpoints().transferApi}/bulkReplenish`, bodyData)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
        return callback(true);
      }).catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
        }
        return callback(false);
      });
  }

  static bulkUpdate = (id, data, _toggle) => {
    return (dispatch) => {
      dispatch(requestUpdateTransfer());
      apiClient
        .put(`${endpoints().transferApi}/bulkUpdate/${id}`, data)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            Toast.success(res?.data?.message);
            _toggle()
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
  }

}
export default TransferService;
