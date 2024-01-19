import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { SUCCESS_RESPONSE, isBadRequest } from "../lib/Http";
import Url from "../lib/Url";


class CustomFieldService {

    static async create(data, callback) {
        await apiClient
            .post(`${endpoints().customFieldAPI}/create`, data)
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

    static search = async (params) => {

        let queryString = await ArrayList.toQueryString(params);
        let response = await Url.get(`${endpoints().customFieldAPI}/search`, queryString)

        return response;
    };

    static updateOrder = async (data, callback) => {
        apiClient.put(`${endpoints().customFieldAPI}/order`, data)
            .then((res) => {
                if (res.status == SUCCESS_RESPONSE) {
                    Toast.success(res?.data?.message);
                    return callback(res?.data?.message)
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

    static async update(id, data, callback) {

        await apiClient
            .put(`${endpoints().customFieldAPI}/update/${id}`, data)
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
    }

    static async delete(id, callback) {
        await apiClient
            .delete(`${endpoints().customFieldAPI}/delete/${id}`)
            .then((res) => {
                if (res.status == SUCCESS_RESPONSE) {
                    Toast.success(res?.data?.message);
                    return callback(res?.data?.message)
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
    }
}

export default CustomFieldService;