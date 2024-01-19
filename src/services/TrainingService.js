import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";


class TrainingService {

    static create = async (data, callback) => {
        try {
            apiClient.post(`${endpoints().TrainingAPI}/create`, data)
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

        } catch (err) {
            console.log(err);
        }
    }

    static async search(params) {
        let queryString = await ArrayList.toQueryString(params);
        let { data } = await Url.get(`${endpoints().TrainingAPI}/search`, queryString)
        return data;
    }

    static async get(id) {
        let { data } = await apiClient.get(`${endpoints().TrainingAPI}/${id}`)
        return data;
    }

    static update(id, data, callback) {
        apiClient
            .put(`${endpoints().TrainingAPI}/update/${id}`, data)
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
                    Toast.error(errorMessage);
                    console.error(errorMessage);
                }
            });
    }

    static delete(id, callback) {
        apiClient
            .delete(`${endpoints().TrainingAPI}/delete/${id}`)
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
                    Toast.error(errorMessage);
                }
            });
    }
};



export default TrainingService; 