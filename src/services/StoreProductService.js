import { productUpdateError, requestUpdateProduct } from "../actions/storeProduct";
import { receiveAddPortal, requestDeleteStore, storeDeleteError } from "../actions/storeProductDetail";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { Store } from "../helpers/Store";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";



class StoreProductService {
  static update(id, data, params, editToggle, isReplenishUpdate) {
    return (dispatch) => {
      if (id && data) {
        dispatch(requestUpdateProduct());
        apiClient
          .put(`${endpoints().storeProductAPI}/${id}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              editToggle();
            }
          })
          .then(() => {
            if (isReplenishUpdate) {
              dispatch(
                fetchList(
                  "storeProductReplenish",
                  `${endpoints().storeProductAPI}/replenish/search`,
                  params.CurrentPage || 1,
                  params.CurrentPageSize || 25,
                  params,
                )
              );
            } else {
              dispatch(
                fetchList(
                  "storeProduct",
                  `${endpoints().storeProductAPI}/search`,
                  params.CurrentPage || 1,
                  params.CurrentPageSize || 25,
                  params,

                )
              );
              dispatch(
                fetchList("stores", `${endpoints().storeProductAPI}/search`, 1, 25, params)
              );
            }
            dispatch(receiveAddPortal());

          })
          .catch((err) => {
            dispatch(productUpdateError(err));
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


  static search = async (params) => {

    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(`${endpoints().storeProductAPI}/search`, queryString)
    return response;
  }


  static bulkUpdate(data, toggle, id) {
    return (dispatch) => {
      dispatch(requestUpdateProduct());
      apiClient
        .put(`${endpoints().storeProductAPI}/bulkUpdate`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          };
        })
        .then(() => {
          dispatch(fetchList("storeProductReplenish", `${endpoints().storeProductAPI}/replenish/search`, 1, 25, {
            productId: Url.GetParam("productId"),
            status: Store.STATUS_ACTIVE,
            sort: "name",
            sortDir: "ASC"
          }));
          dispatch(requestUpdateProduct());
          toggle();

        })
        .catch((error) => {
          dispatch(requestUpdateProduct(error));
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
              Toast.error(errorMessage);
            };
            console.error(errorMessage);
          };
        });
    };
  };


  static async replenishSearch(params) {
    try {
      const queryString = [];

      let apiUrl;

      if (params) {
        Object.keys(params).forEach((param) => {
          queryString.push(`${param}=${params[param]}`);
        });
      }

      if (queryString && queryString.length > 0) {
        apiUrl = `${endpoints().storeProductAPI}/replenish/search?${queryString.join("&")}`;
      } else {
        apiUrl = `${endpoints().storeProductAPI}/replenish/search`;
      }

      const response = await apiClient.get(apiUrl);

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static updateReplenishQuantity = async (id, data, callback) => {
    try {
      apiClient.put(`${endpoints().storeProductAPI}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }

          return callback(null , response);
        })
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(error.response.data.message);
          }
          return callback(error , null);
        });

    } catch (err) {
      console.log(err);
      return callback(err , null);
    }
  }

  static updateMinMaxQuantity = async (productId, callback) => {
    try {
      apiClient.put(`${endpoints().storeProductAPI}/updateMinMaxQuantity/${productId}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }

          return callback(null , response);
        })
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(error.response.data.message);
          }
          return callback(error , null);
        });

    } catch (err) {
      console.log(err);
      return callback(err , null);
    }
  }

  static deleteReplenishStoreProduct = (id, params, tableId,CurrentPage,CurrentPageSize) =>{
    return (dispatch) => {
      dispatch(requestDeleteStore());
  
      apiClient
        .delete(`${endpoints().storeProductAPI}/${id}`)
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
              tableId,
              `${endpoints().storeProductAPI}/replenish/search`,
              CurrentPage||  1,
              CurrentPageSize|| 25,
              params
              
            )
          );
        })
        .catch((error) => {
          dispatch(storeDeleteError(error));
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


  static updateOrderQuantity(product_id,callback) {
   
        apiClient
          .put(`${endpoints().storeProductAPI}/updateOrderQuantity/${product_id}`)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              return callback(successMessage)
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
  static updateTransferQuantity(product_id,callback) {
   
    apiClient
      .put(`${endpoints().storeProductAPI}/updateTransferQuantity/${product_id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage)
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
static reIndex(product_id,callback) {
   
  apiClient
    .put(`${endpoints().storeProductAPI}/reIndex/${product_id}`)
    .then((response) => {
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
        return callback(successMessage)
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

static addToStockEntry(product_id,data,callback) {
   
  apiClient
    .put(`${endpoints().storeProductAPI}/addToStockEntry/${product_id}`,data)
    .then((response) => {
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
        return callback(successMessage)
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

export default StoreProductService;