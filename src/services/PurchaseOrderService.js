import PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";

class PurchaseOrderService {

  // Update Purchase Order

  static update = async (id, data) => {
    apiClient.put(`${endpoints().purchaseOrderAPI}/${id}`, data)
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
    return data;
  };

  // Add Purchase Order
  static addPurchaseOrder = (data, params, callback) => {


    return (dispatch) => {
      dispatch(PurchaseOrder.requestAddPurchaseOrder());

      apiClient
        .post(endpoints().purchaseOrderAPI, data)
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
              "purchaseOrder",
              `${endpoints().purchaseOrderAPI}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(PurchaseOrder.receiveAddPurchaseOrder());
        })
        .catch((error) => {
          dispatch(PurchaseOrder.PurchaseOrderCreateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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
  }


  static updateStatus = (id, data, getDetails, params) => {

    return (dispatch) => {

      dispatch(PurchaseOrder.UpdatePurchaseOrderError);
      apiClient
        .put(`${endpoints().purchaseOrderAPI}/status/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          getDetails(id)
        })
        .then(() => {
          dispatch(
            fetchList("purchaseOrder", `${endpoints().purchaseOrderAPI}/search`, 1, 25, params)
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
  }


  static delete = (id, params, purchaseOrderCurrentpage, purchaseOrderPageSize) => {
    return (dispatch) => {
      dispatch(PurchaseOrder.requestDeletePurchaseOrder());

      apiClient
        .delete(`${endpoints().purchaseOrderAPI}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList("purchaseOrder", `${endpoints().purchaseOrderAPI}/search`, purchaseOrderCurrentpage || 1, purchaseOrderPageSize || 25, params)
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
  }

  static clone = (id, data) => {
    apiClient
      .put(`${endpoints().purchaseOrderAPI}/clone/${id}`,data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
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
  };

  static search = async () => {
    const response = await apiClient.get(`${endpoints().purchaseOrderAPI}/search`);
    const data = response && response.data && response.data.data;
    return data;
  };
  // Get Filtered List Based on status
  static list(params, pageSize) {
    return (dispatch) => {
      dispatch(
        fetchList("allpurchaseOrder", `${endpoints().purchaseOrderAPI}/search`, 1, pageSize, 
        {
          ...params,
        })
      );
    }
  }

  static addRecommendedProducts = (data, params, callback) => {


    return (dispatch) => {
      dispatch(PurchaseOrder.requestAddPurchaseOrder());

      apiClient
      .post(`${endpoints().purchaseOrderAPI}/createRecommendedProducts`,data)
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
              "purchaseProduct",
              `${endpoints().purchaseOrderProductAPI}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(PurchaseOrder.receiveAddPurchaseOrder());
        })
        .catch((error) => {
          dispatch(PurchaseOrder.PurchaseOrderCreateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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
  }

  static createPurchaseOrder = (data, params, callback) => {



    return (dispatch) => {
      dispatch(PurchaseOrder.requestAddPurchaseOrder());

      apiClient
      .post(`${endpoints().accountAPI}/createPurchaseOrder`,data)
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
              "purchaseOrder",
              `${endpoints().purchaseOrderAPI}/search`,
              1,
              25,
              {vendor:data.account_id},

            )
          );
          dispatch(PurchaseOrder.receiveAddPurchaseOrder());
        })
        .catch((error) => {
          dispatch(PurchaseOrder.PurchaseOrderCreateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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
  }

}
export default PurchaseOrderService;
