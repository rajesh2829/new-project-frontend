import {
  receiveAddPurchaseProduct,
  requestAddPurchaseProduct,
} from "../actions/purchase";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class PurchaseProductService {
  // Update Purchase Order

  static update = (id, data, params, _toggle) => {
    return async (dispatch) => {
      dispatch(requestAddPurchaseProduct());
      apiClient
        // Put contact information
        .put(`${endpoints().purchaseProductAPI}/update/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            // toast success responce
            Toast.success(successMessage);
            // _toggle close
            _toggle();
          }
        })
        // redux table fetchlist
        .then(() => {
          dispatch(
            fetchList(
              "purchaseProduct",
              `${endpoints().purchaseProductAPI}/list`,
              Url.GetParam("page") ? Url.GetParam("page") : 1,
              Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
              params
            )
          );
          dispatch(receiveAddPurchaseProduct());
        })
        // Error Handling
        .catch((error) => {
          console.log(error);
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            // Toast.error
            Toast.error(error.response.data.message);
            console.error(errorMessage);
          }
        });
    };
  };
  static fetchingData(pageSize, params) {
    return (dispatch) => {
      dispatch(
        fetchList(
          "productReport",
          `${endpoints().purchaseProductReportAPI}/search`,
          1,
          pageSize,
          params,
          {
            search: Url.GetParam("search") || "",
            location: Url.GetParam("location") || "",
            startDate: Url.GetParam("startDate") || "",
            endDate: Url.GetParam("endDate") || ""
          }
        )
      );
      // dispatch(receivedResponse());
    };
  }
  static updateStatus = (
    id,
    status,
    product_id,
    params
  ) => {
    let data = {};
    data.status = status;
    if(product_id){
    data.productId = product_id;
  }
    return (dispatch) => {
      apiClient
        .put(`${endpoints().purchaseProductAPI}/status/${id}`, data)
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
              `${endpoints().purchaseProductAPI}/list`,
             Url.GetParam("page") ? Url.GetParam("page")  : 1,
             Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
              params
            )
          );
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
    };
  };

  static bulkUpdate = (data,callback) => {
      apiClient
        .put(`${endpoints().purchaseProductAPI}/bulkupdate`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            return callback(successMessage)
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
  };


  static updateMarginStatus = (
    id,
    status,
    params
  ) => {
    let data = {};
    data.margin_status = status;
    
    return (dispatch) => {
      apiClient
        .put(`${endpoints().purchaseProductAPI}/marginStatus/${id}`, data)
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
              `${endpoints().purchaseProductAPI}/list`,
               1,
               25,
              params
            )
          );
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
    };
    };
  
}
export default PurchaseProductService;
