import { billCreateError, billUpdateError, receiveAddPortal, requestAddBill, requestUpdateBill } from "../actions/bill.js";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";
class BillService {
    // create
    static create = (data, params, setIsSubmit,callback) => {
        return (dispatch) => {
            dispatch(requestAddBill());
            return apiClient
                .post(`${endpoints().billAPI}`, data)
                .then((response) => {
                    let successMessage;
                    if (response && response.data) {
                        successMessage = response.data.message;
                        Toast.success(successMessage);
                    }
                    return callback(response && response.data);
                })
                .then((response) => {
                    dispatch(
                        fetchList("bill", `${endpoints().billAPI}/search`, 1, 25, params)
                    );
                    dispatch(receiveAddPortal());
                })
                .catch((error) => {
                    dispatch(billCreateError(error));
                    if (isBadRequest(error)) {
                        let errorMessage;
                        const errorRequest = error.response.request;
                        if (errorRequest && errorRequest.response) {
                            errorMessage = JSON.parse(errorRequest.response).message;
                        }
                        Toast.error(errorMessage);
                        setIsSubmit(true)
                        console.error(errorMessage);
                    }
                });
        };
    };
    // Delete
    static delete = (id, history) => {
        apiClient
            .delete(`${endpoints().billAPI}/delete/${id}`)
            .then((response) => {
                let successMessage;
                if (response && response.data) {
                    successMessage = response.data.message;
                    Toast.success(successMessage);
                    history.push("/bill");
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
    static update = (id, data, params) => {
        return (dispatch) => {
            dispatch(requestUpdateBill());
            apiClient
                .put(`${endpoints().billAPI}/${id}`, data)
                .then((response) => {
                    let successMessage;
                    if (response && response.data) {
                        successMessage = response.data.message;
                        Toast.success(successMessage);
                    }
                })
                .then(() => {
                    dispatch(
                        fetchList("bill", `${endpoints().billAPI}/search`, 1, 25, params)
                    );
                })
                .catch((error) => {
                    dispatch(billUpdateError(error));
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

    static updateStatus = (id, data,params, cb) => {
        try{
              apiClient
                .put(`${endpoints().billAPI}/status/${id}`, data)
                .then((response) => {
                  let successMessage;
                  if (response && response.data) {
                    successMessage = response.data.message;
                    Toast.success(successMessage);
                    return cb(successMessage)
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
                })
            }catch(err){
                console.log(err);
            }
            
          }
          static updateGstStatus = (id, data,params, cb) => {
            try{
                  apiClient
                    .put(`${endpoints().billAPI}/gstStatusUpdate/${id}`, data)
                    .then((response) => {
                      let successMessage;
                      if (response && response.data) {
                        successMessage = response.data.message;
                        Toast.success(successMessage);
                        return cb(successMessage)
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
                    })
                }catch(err){
                    console.log(err);
                }
                
              }
}
export default BillService;