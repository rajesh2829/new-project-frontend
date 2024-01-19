import { paymentCreateError, receivePaymentAddPortal, requestAddPayment } from "../actions/payment";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";


class PaymentService {

    static async create(data, params, closeToggle,callback, errorCallback) {
        try {
            if (data) {
                return (dispatch) => {
                    dispatch(requestAddPayment());
                    apiClient
                        .post(`${endpoints().paymentAPI}`, data)
                        .then((response) => {
                            let successMessage;
                            if (response && response.data) {
                                successMessage = response.data.message;
                                closeToggle()
                                Toast.success(successMessage);
                                callback && callback(response)
                            }
                        })
                        .then(() => {
                            dispatch(
                                fetchList(
                                    "payment",
                                    `${endpoints().paymentAPI}/search`,
                                    1,
                                    25,
                                    params
                                )
                            );
                            dispatch(receivePaymentAddPortal());
                        })
                        .catch((err) => {
                            dispatch(paymentCreateError(err));
                            if (isBadRequest(err)) {
                                let errorMessage;
                                const errorRequest = err.response.request;
                                if (errorRequest && errorRequest.response) {
                                    errorMessage = JSON.parse(errorRequest.response).message;
                                }
                                Toast.error(errorMessage);
                                callback && callback(errorMessage)

                            }
                        });
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    static async get(id) {
        try {
            if (id) {
                const response = await apiClient.get(`${endpoints().paymentAPI}/${id}`);
                const data = response.data.data;
                return data;
            }

        } catch (err) {
            console.log(err);
        }
    }

    static update(id, data,setIsSubmitting,cb) {
        try {
            if (id && data) {
                apiClient
                    .put(`${endpoints().paymentAPI}/update/${id}`, data)
                    .then((response) => {
                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            Toast.success(successMessage);
                            return cb(successMessage)

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
                            setIsSubmitting(true)                        }
                    });
            }

        } catch (err) {
            console.log(err);
        }
    }

    static delete = (id, history,params) => {
        return (dispatch) => {
        apiClient
            .delete(`${endpoints().paymentAPI}/delete/${id}`)
            .then((response) => {
                let successMessage;
                if (response && response.data) {
                    successMessage = response.data.message;
                    Toast.success(successMessage);
                    if(!params.tabId){
                    history.push("/payment");
                    }

                }
            }).then(() => {
                dispatch(
                    fetchList(
                        "payment",
                        `${endpoints().paymentAPI}/search`,
                        1,
                        25,
                        {sort:Url.GetParam("sort"),
                        sortDir:Url.GetParam("sortDir"),
                        purchaseId:params.purchaseId,
                        page:Url.GetParam("page"),
                        pageSize:Url.GetParam("pageSize")

                    }
                    )
                );
                dispatch(receivePaymentAddPortal());
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

    static search =async (params) => {

        let queryString = await ArrayList.toQueryString(params);
        
        let response = await Url.get(`${endpoints().paymentAPI}/search`, queryString)

        return response;

    }
}

export default PaymentService;