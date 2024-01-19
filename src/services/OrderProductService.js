import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { fetchList } from "../actions/table";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";

class OrderProductService {

  constructor() {
    this.action = {
      REQUEST_CANCEL_ORDER_PRODUCT: "REQUEST_CANCEL_ORDER_PRODUCT",
      RECEIVE_CANCEL_ORDER_PRODUCT: "RECEIVE_CANCEL_ORDER_PRODUCT",
      CANCEL_ORDER_PRODUCT_ERROR: "CANCEL_ORDER_PRODUCT_ERROR"
    }
  }

  // Request update activity type
  static requestCancelOrderProduct() {
    return {
      type: orderProductService.action.REQUEST_CANCEL_ORDER_PRODUCT,
    };
  }

  // Request update activity type
  static receiveCancelOrderProduct() {
    return {
      type: orderProductService.action.RECEIVE_CANCEL_ORDER_PRODUCT,
    };
  }

  // Request update activity type
  static cancelOrderProductError() {
    return {
      type: orderProductService.action.CANCEL_ORDER_PRODUCT_ERROR,
    };
  }


    static async create(orderProductData) {
        try {
            let response = await apiClient.post(`${endpoints().orderProductAPI}/create`, orderProductData);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    static async update(orderProductId, orderProductData) {
        try {
            let response = await apiClient.put(
                `${endpoints().orderProductAPI}/update/${orderProductId}`,
                orderProductData
            );

            return response;
        } catch (err) {
            console.log(err);
        }

    }

    static async delete(orderProductId, params) {
        try {
            if (orderProductId) {
                const response = await apiClient.post(
                    `${endpoints().orderProductAPI}/delete/${orderProductId}`, params
                );
                return response;
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async get(location,startDate,endDate) {
        try {
          const response = await apiClient.get(`${endpoints().orderProductAPI}/list?location=${location}&startDate=${startDate}&end=${endDate}`);
          const data = response.data;
          return data;
        } catch (err) {
          console.log(err);
        }
      }

      static list = async (params) => {

        let queryString = await ArrayList.toQueryString(params);
        let response = await Url.get(`${endpoints().orderProductAPI}/search`, queryString)
        return response;
      }


      static async report (params)  {
        try {
            const queryString = [];
        
            let apiUrl;
        
            if (params) {
              Object.keys(params).forEach((param) => {
                queryString.push(`${param}=${params[param]}`);
              });
            }
        
            if (queryString && queryString.length > 0) {
              apiUrl = `${endpoints().orderProductReportAPI}/search?${queryString.join("&")}`;
            } else {
              apiUrl = `${endpoints().orderProductReportAPI}/search`;
            }
        
            const response = await apiClient.get(apiUrl);
        
            const data = response && response.data;
        
            return data;
        
          } catch (err) {
            console.log(err)
          }
      }

      static async search(pageSize, params) {
        try {
          return (dispatch) => {
            dispatch(
              fetchList(
                "orderProducts",
                `${endpoints().orderProductAPI}/list`,
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
          };
        } catch (err) {
          console.log(err);
        }
      }

      static bulkCancel = async (data, params, callback) => {
        return (dispatch) => {
          dispatch(this.requestCancelOrderProduct());
    
          apiClient
            .post(`${endpoints().orderProductAPI}/bulkCancel`, data)
            .then((response) => {
              let successMessage;
              if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
                return callback(successMessage);
              }
            })
            .then(() => {
              dispatch(
                fetchList(
                  "orderDetail",
                  `${endpoints().orderProductAPI}/search`,
                  1,
                  25,
                  params,
    
                )
              );
              dispatch(this.receiveCancelOrderProduct());
            })
            .catch((error) => {
              dispatch(this.cancelOrderProductError(error));
    
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
            });
        };
    
      }
      static bulkUpdateFromProduct(data, callback){

        apiClient
        .put(`${endpoints().orderProductAPI}/bulkUpdate/fromProduct`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            return callback(successMessage);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }

            Toast.error(errorMessage);
            console.error(errorMessage);
          }
        });

      }
}

const orderProductService = new OrderProductService();

export default OrderProductService;