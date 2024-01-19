// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { useDispatch } from "react-redux";
import { receiveAddTransferTypesReason, requestAddTransferTypesReason } from "../actions/transferType";
import { fetchList } from "../actions/table";

class TranferTypeReasonService {

    static add(data, params) {
        return (dispatch) => {
            dispatch(requestAddTransferTypesReason());
            try {
                if (data) {
                    apiClient
                        .post(`${endpoints().TransferTypeReasonAPI}/create`, data)
                        .then((response) => {
                            if (response.status == SUCCESS_RESPONSE) {
                                Toast.success(response?.data?.message);
                                dispatch(fetchList(
                                    "TransferTypeReason",
                                    `${endpoints().TransferTypeReasonAPI}/search`,
                                    1,
                                    25,
                                    params
                                ));
                                dispatch(receiveAddTransferTypesReason());
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

            } catch (err) {
                console.log(err);
            }
        }
    }

    static update(id, data, params) {
        return (dispatch) => {
            dispatch(requestAddTransferTypesReason());
            try {
                if (id && data) {
                    apiClient
                        .put(`${endpoints().TransferTypeReasonAPI}/${id}`, data)
                        .then((response) => {
                            if (response.status == SUCCESS_RESPONSE) {
                                Toast.success(response?.data?.message);
                                dispatch(fetchList(
                                    "TransferTypeReason",
                                    `${endpoints().TransferTypeReasonAPI}/search`,
                                    1,
                                    25,
                                    params
                                ));
                                dispatch(receiveAddTransferTypesReason());
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

            } catch (err) {
                console.log(err);
            }
        }
    }

    static delete(id, params) {
        return (dispatch) => {
            dispatch(requestAddTransferTypesReason());
            try {

                if (id) {
                    apiClient
                        .delete(`${endpoints().TransferTypeReasonAPI}/${id}`)
                        .then((response) => {
                            if (response.status == SUCCESS_RESPONSE) {
                                Toast.success(response?.data?.message);
                                dispatch(fetchList(
                                    "TransferTypeReason",
                                    `${endpoints().TransferTypeReasonAPI}/search`,
                                    1,
                                    25,
                                    params
                                ));
                                dispatch(receiveAddTransferTypesReason());
                            }
                        })
                }

            } catch (err) {
                console.log(err);
                return null;
            }
        }
    }

    static async search() {
        let response = await apiClient.get(`${endpoints().TransferTypeReasonAPI}/search`);
        return response && response?.data && response?.data?.data;
    }

}

export default TranferTypeReasonService;

