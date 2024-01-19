import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";
import { OrderDeleteError, requestdeleteOrder } from "../actions/orders";
import { fetchList } from "../actions/table";
import Url from "../lib/Url";
import ArrayList from "../lib/ArrayList";

class OrderService {

    static async create(orderData) {
        try {
            let response = await apiClient.post(`${endpoints().orderAPI}`, orderData);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    static async search(params) {
        try {
          let queryString = await ArrayList.toQueryString(params);
          const { data } = await Url.get(
            `${endpoints().orderAPI}/search`,
            queryString
          );
    
          return data;
        } catch (err) {
          console.log(err);
        }
      }

    static async update(orderId, orderData, callback) {
        try {
            apiClient
                .put(`${endpoints().orderAPI}/${orderId}`, orderData)
                .then((response) => {
                    let successMessage;
                    if (response && response.data) {
                        successMessage = response.data.message;
                        toast.success(successMessage);
                    }
                    return callback(response);
                })
                .catch((error) => {
                    if (isBadRequest(error)) {
                        const errorRequest = error.response.request;
                        if (errorRequest && errorRequest.response) {
                            let response = JSON.parse(errorRequest.response);

                            if (response && response.outofStockProducts) {
                                if (response.message) {
                                    toast.error(response.message);
                                }
                                return callback(response, response.outofStockProducts);
                            }
                        }
                    }
                });
        } catch (err) {
            console.log(err);
        }

    }

    static async get(orderId) {
        try {
            const response = await apiClient.get(
                `${endpoints().orderAPI}/${orderId}`
            );
            return response;
        } catch (err) {
            console.log(err);
        }
    }
    static updateStatus = (id, data, params,callback) => {

        try {
            apiClient
                .put(`${endpoints().orderAPI}/status/${id}`, data)
                .then((response) => {
                    let successMessage;
                    if (response && response.data) {
                        successMessage = response.data.message;
                        toast.success(successMessage);
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
                        toast.error(error.response.data.message);
                        console.error(errorMessage);
                    }
                })
        } catch (err) {
            console.log(err);
        }

    }


    static async delete(id, status, params) {
        try {
            let data = {};
            data.status = status;
            return (dispatch) => {
                dispatch(requestdeleteOrder());

                apiClient
                    .delete(`${endpoints().orderAPI}/${id}`)
                    .then((response) => {
                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            toast.success(successMessage);
                        }
                    })
                    .then(() => {
                        dispatch(
                            fetchList("All", `${endpoints().orderAPI}/search`, 1, 25, params, { pagination: true })
                        );
                        dispatch(
                            fetchList("Completed", `${endpoints().orderAPI}/search`, 1, 25, params, { pagination: true })
                        );

                    })
                    .catch((error) => {
                        dispatch(OrderDeleteError(error));
                        if (isBadRequest(error)) {
                            let errorMessage;
                            const errorRequest = error.response.request;

                            if (errorRequest && errorRequest.response) {
                                errorMessage = JSON.parse(errorRequest.response).message;
                            }
                            toast.error(errorMessage);
                        }
                    });
            };
        } catch (err) {
            console.log(err);
        }
    }

    static async bulkUpdate(data, toggle) {
        try {
            return (dispatch) => {
                dispatch(requestdeleteOrder());

                apiClient
                    .put(`${endpoints().orderAPI}/bulkUpdate`, data)
                    .then((response) => {
                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            toast.success(successMessage);
                            toggle()
                        }
                    })
                   
                    .catch((error) => {
                        if (isBadRequest(error)) {
                            const errorRequest = error.response.request;
                            if (errorRequest && errorRequest.response) {
                                let response = JSON.parse(errorRequest.response);
                                if (response && response.outofStockProducts) {
                                    if (response.message) {
                                        toast.error(response.message);
                                    }
                                }
                            }
                        }
                    });
            }
        } catch (err) {
            console.log(err);
        }

    }
}

export default OrderService;