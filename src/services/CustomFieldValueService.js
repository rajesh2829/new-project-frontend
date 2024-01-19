import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class CustomFieldValueService {

    static async create(data, callback) {
        await apiClient
            .post(`${endpoints().customFieldValue}`, data)
            .then((response) => {
                let successMessage;
                if (response && response.data) {
                    successMessage = response.data.message;
                    Toast.success(successMessage);
                    return callback(response)
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

    static async get(id, params) {
        try {
            let queryString = await ArrayList.toQueryString(params);

            let response = await Url.get(`${endpoints().customFieldValue}/${id}`, queryString);

            return response;

        } catch (err) {
            console.log(err);
            return callback(err, []);
        }
    }

}

export default CustomFieldValueService;