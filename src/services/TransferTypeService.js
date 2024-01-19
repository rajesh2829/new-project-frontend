import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { fetchList } from "../actions/table";
import toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import * as InventoryTransfer from "../actions/transferType";
class TransferTypeService {
    async get() {
        const response = apiClient.get(`${endpoints().TransferTypeApi}/search`)
        return response;
    }

    async Post(data, params, toggle) {
        return (dispatch) => {
            dispatch(InventoryTransfer.requestAddTransferTypes());

            return apiClient
                .post(`${endpoints().TransferTypeApi}/create`, data)
                .then((res) => {
                    if (res && res.data) {
                        // callback(true);
                        toast.success("Transfer Type Added Successfully");
                        toggle();
                    }
                })
                .then(() => {
                    dispatch(fetchList("TransferType", `${endpoints().TransferTypeApi}/search`, 1, 25));


                })
                .catch((err) => {
                    dispatch(InventoryTransfer.addTransferTypesError());

                    if (isBadRequest(err)) {
                        let errorMessage;
                        const errorRequest = err.response.request;
                        if (errorRequest && errorRequest.response) {
                            errorMessage = JSON.parse(errorRequest.response).message;
                        }
                        toast.error(errorMessage);
                    }
                });
        };
    }
    async getDetails(id, callback) {
        apiClient.get(`${endpoints().TransferTypeApi}/${id}`).then((response) => {
            return callback(response.data)
        })
            .catch((error) => {
                if (isBadRequest(error)) {
                    let errorMessage;
                    const errorRequest = err.response.request;
                    if (errorRequest && errorRequest.response) {
                        errorMessage = JSON.parse(errorRequest.response).message;
                    }
                    toast.error(errorMessage);
                }
            })
    }
    async update(id, updateData, callback) {
        apiClient.put(`${endpoints().TransferTypeApi}/${id}`, updateData).then((response) => {
            toast.success(response.data.message);
            return callback(response.data.message)
        })
            .catch((error) => {
                if (isBadRequest(error)) {
                    let errorMessage;
                    const errorRequest = error.response.request;
                    if (errorRequest && errorRequest.response) {
                        errorMessage = JSON.parse(errorRequest.response).message;
                    }
                    toast.error(errorMessage);
                }
            })
    }
    async delete(id, callback) {
        apiClient.delete(`${endpoints().TransferTypeApi}/${id}`).then((response) => {
            toast.success("Transfer Type deleted Successfully");
            return callback(response.data.message)
        })
            .catch((error) => {
                if (isBadRequest(error)) {
                    let errorMessage;
                    const errorRequest = err.response.request;
                    if (errorRequest && errorRequest.response) {
                        errorMessage = JSON.parse(errorRequest.response).message;
                    }
                    toast.error(errorMessage);
                }
            })
    }

    async search() {
        try {
            let lists = [];
            const response = await apiClient.get(`${endpoints().TransferTypeApi}/search`);
            const transferTypes = response.data.data;
            if (transferTypes && transferTypes.length > 0) {
                transferTypes.forEach((transferType) => {
                    lists.push({
                        id: transferType.id,
                        value: transferType.id,
                        label: transferType.name,
                        fromLocation: {
                            label: transferType.default_from_store,
                            value: transferType.default_from_store_id
                        },
                        allow_to_change_to_store: transferType.allow_to_change_to_store,
                        allow_to_change_from_store: transferType.allow_to_change_from_store,

                        toLocation: {
                            label: transferType.default_to_store,
                            value: transferType.default_to_store_id
                        },
                    });

                });
            }
            if (lists && lists.length > 0) return lists;
        } catch (error) {
            console.log(error);
        }
    };

     async getOption() {
        const { data } = await transferTypeService.get();
        const value = data.data;
        const type = [];
        value.forEach((typeValue) => {
            type.push({
                value: typeValue.id,
                label: typeValue.name,
            });
        });

        return type;
    }

}

const transferTypeService = new TransferTypeService();
export default transferTypeService;
