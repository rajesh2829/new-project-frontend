import { endpoints } from "../api/endPoints";

import { apiClient } from "../apiClient";

import { isBadRequest } from "../lib/Http";

import toast from "../components/Toast";

import { fetchList } from "../actions/table";

class ReplenishService {

    static REQUEST_UPDATE_REPLENISH_OWNER = "REQUEST_UPDATE_REPLENISH_OWNER";

    static RECEIVE_UPDATE_REPLENISH_OWNER = "RECEIVE_UPDATE_REPLENISH_OWNER";

    /**
 * Request for updating companyUser
 */
    static requestUpdateOwner() {
        return {
            type: this.REQUEST_UPDATE_REPLENISH_OWNER,
        };
    }

    /**
     * Receive for updating companyUser
     */
    static receiveUpdateOwner() {
        return {
            type: this.RECEIVE_UPDATE_REPLENISH_OWNER,
        };
    }


    static async search(params) {
        try {
            const queryString = [];

            let apiUrl;

            if (params) {
                Object.keys(params).forEach((param) => {
                    queryString.push(`${param}=${params[param]}`);
                });
            }

            if (queryString && queryString.length > 0) {
                apiUrl = `${endpoints().replenish}/search?${queryString.join("&")}`;
            } else {
                apiUrl = `${endpoints().replenish}/search`;
            }

            const response = await apiClient.get(apiUrl);

            const data = response && response.data;

            return data;

        } catch (err) {
            console.log(err)
        }
    }

    static updateOwner(data, params, toggle) {
        try {
            return (dispatch) => {
                dispatch(this.requestUpdateOwner());
                apiClient
                    .put(`${endpoints().replenish}/updateOwner`, data)
                    .then((response) => {
                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            toast.success(successMessage);
                            toggle && toggle();
                        }
                    })
                    .then(() => {
                        dispatch(
                            fetchList("ReplenishList", `${endpoints().replenish}/search`, 1, 25, params)
                        );
                    })
                    .catch((error) => {
                        dispatch(this.receiveUpdateOwner(error));

                        if (isBadRequest(error)) {
                            let errorMessage;
                            const errorRequest = error.response.request;
                            if (errorRequest && errorRequest.response) {
                                errorMessage = JSON.parse(errorRequest.response).message;
                            }
                            toast.error(error.response.data.message);
                            console.error(errorMessage);
                        }
                    });
            };
        } catch (err) {
            console.log(err);
        }
    }
}

export default ReplenishService;