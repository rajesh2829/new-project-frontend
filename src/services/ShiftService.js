import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import  {shift}  from "../helpers/Shift";

class ShiftService {
    static async search(id) {
        let lists = [];
        const response = await apiClient.get(`${endpoints().shiftAPI}/search`);
        const shiftLists = response.data.data;
        if (shiftLists && shiftLists.length > 0) {
            shiftLists.forEach((shiftList) => {
                lists.push({
                    id: shiftList.id,
                    value: shiftList.id,
                    label: shiftList.name,
                });
            });
        }
        if (lists && lists.length > 0) return lists;
    }
    static async delete(id) {
        try {
            apiClient
                .delete(`${endpoints().shiftAPI}/${id}`)
                .then((res) => {
                    if (res.status == SUCCESS_RESPONSE) {
                        Toast.success(res?.data?.message);
                        props.history.push("/setting/Shift");
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
        } catch (err) {
            console.log(err);
        }

    }
    static async update(id, data ,callback) {
        try {
            apiClient
                .put(`${endpoints().shiftAPI}/${id}`, data)
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
        } catch (err) {
            console.log(err);
        }

    }

    //Get stores List
    static getShiftLists = async () => {
        try {
            let lists = [];
            const response = await apiClient.get(`${endpoints().shiftAPI}/search`);
            const shiftLists = response.data.data;
            if (shiftLists && shiftLists.length > 0) {
                shiftLists.forEach((shiftList) => {
                    if (shiftList.status === shift.STATUS_ACTIVE_TEXT)
                        lists.push({
                            id: shiftList.id,
                            value: shiftList.id,
                            label: shiftList.name,
                        });
                });
            }
            if (lists && lists.length > 0) return lists;

        } catch (errorMessage) {
            console.log(errorMessage)
        }
    }


    //     //Get stores List
    static getShiftList = async () => {
        let lists = [];
        const response = await apiClient.get(`${endpoints().shiftAPI}/search`);
        const shiftLists = response.data.data;
        if (shiftLists && shiftLists.length > 0) {
            shiftLists.forEach((shiftList) => {
                lists.push({
                    id: shiftList.id,
                    value: shiftList.id,
                    label: shiftList.name,
                });
            });
        }
        if (lists && lists.length > 0) return lists;
    };

}

export default ShiftService;