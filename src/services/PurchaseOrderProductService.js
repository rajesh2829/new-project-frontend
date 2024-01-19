import PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import ArrayList from "../lib/ArrayList";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import Url from "../lib/Url";

class PurchaseOrderProductService {
  static updatePurchaseOrder = (
    id,
    data,
    params,
    purchaseProductCurrentpage,
    purchaseProductPageSize
  ) => {
    return (dispatch) => {
      try {
        dispatch(PurchaseOrder.requestUpdateOrderProduct());
        apiClient
          .put(`${endpoints().purchaseOrderProductAPI}/${id}`, data)
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
                "purchaseProduct",
                `${endpoints().purchaseOrderProductAPI}/search`,
                purchaseProductCurrentpage,
                purchaseProductPageSize,
                params ? params : {}
              )
            );
            dispatch(PurchaseOrder.receiveAddPurchaseOrderProductEntry());
          })
          .catch((error) => {
            dispatch(PurchaseOrder.UpdatePurchaseOrderError(error));
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
      } catch (error) {
        dispatch(PurchaseOrder.UpdatePurchaseOrderError(error));

        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
        return error;
      }
    };
  };

  static search = async (params) => {

    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(`${endpoints().purchaseOrderProductAPI}/search`, queryString)
    return response;
  }

  static updatPurchaseStatus = (id, data, params) => {
    return (dispatch) => {
      dispatch(PurchaseOrder.UpdatePurchaseOrderError);
      apiClient
        .put(
          `${endpoints().purchaseOrderProductAPI}/status/${id}`,
          data,
          params
        )
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
              "purchaseProduct",
              `${endpoints().purchaseOrderProductAPI}/search`,
              params.currentPage || 1,
              params.pageSize || 25,
              { pagination: true, purchaseOrderId: params.purchaseOrderId },
              params
            )
          );
        })
        .catch((error) => {
          dispatch(PurchaseOrder.UpdatePurchaseOrderError(error));
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


  static deleteProduct = (id, params, currentPage, pageSize) => {
    return (dispatch) => {
      dispatch(PurchaseOrder.requestDeletePurchaseOrder());

      apiClient
        .delete(`${endpoints().purchaseOrderProductAPI}/${id}`)
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
              "purchaseProduct",
              `${endpoints().purchaseOrderProductAPI}/search`,
              currentPage || 1,
              pageSize || 25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(PurchaseOrder.receivePurchaseOrderDeleteError(error));
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

  static async create(data,toggleClose) {
    apiClient.post(`${endpoints().purchaseOrderProductAPI}`, data)
    .then((response) => {
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
        toggleClose()
      }
    })
    .catch((error) => {
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
}
export default PurchaseOrderProductService;
