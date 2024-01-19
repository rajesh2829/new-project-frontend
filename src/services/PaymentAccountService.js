// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import Account from "../helpers/Account";
import PaymentAccount from "../actions/paymentAccount";
import { fetchList } from "../actions/table";

class PaymentAccountService {

    static async get(id) {
        try {
            if (id) {
                const response = await apiClient.get(`${endpoints().paymentAccountAPI}/${id}`);

                return response;
            }

        } catch (err) {
            console.log(err);
        }
    }
      static async  create (data,setIsSubmit, params, callback) {
        return async (dispatch) => {
          dispatch(PaymentAccount.requestAddPaymentAccounts);
      
          try {
            const res = await apiClient
              .post(`${endpoints().paymentAccountAPI}`, data);
            if (res && res.data) {
              callback(true);
              Toast.success(res?.data?.message);
            } dispatch(
              fetchList("payment accounts", `${endpoints().paymentAccountAPI}/search`, 1, 25, params)
            );
            dispatch(PaymentAccount.receiveAddPaymentAccounts);
          } catch (err) {
            dispatch(PaymentAccount.addPaymentAccountsError);
      
            if (isBadRequest(err)) {
              let errorMessage;
              const errorRequest = err.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              setIsSubmit(true)
              Toast.error(errorMessage);
            }
          }
        }
      }
    static update(id, data,setIsSubmit,cb) {
        try {
            if (id && data) {
                apiClient
                    .put(`${endpoints().paymentAccountAPI}/${id}`, data)
                    .then((res) => {
                        if (res.status == SUCCESS_RESPONSE) {
                            Toast.success(res?.data?.message);
                            cb(res)
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
                            setIsSubmit(true)
                        }
                    });
            }

        } catch (err) {
            console.log(err);
        }
    }

    static async dashboard() {
        try {
            const response = await apiClient.get(`${endpoints().paymentAccountAPI}/dashboard`);
            const data = response && response.data;
            return data;

        } catch (err) {
            console.log(err);
        }
    }

    static async getList(callback) {
        try {
            const response = await apiClient.get(`${endpoints().paymentAccountAPI}/list`)
            return callback(response, null)
        }
        catch (err) {
            console.error(err.message);
            return callback(null, err)
        }

    }

    static async delete(id, params) {
        return (dispatch) => {
          dispatch(PaymentAccount.requestDeletePaymentAccount());
      
          apiClient
            .delete(`${endpoints().paymentAccountAPI}/${id}`)
            .then((response) => {
              let successMessage;
              if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
              }
            })
            .then(() => {
              dispatch(
                fetchList("payment accounts", `${endpoints().paymentAccountAPI}/search`, 1, 25, params)
              );
            })
            .catch((error) => {
              dispatch(PaymentAccount.PaymentAccountsDeleteError(error));
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
}

export default PaymentAccountService;

