import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { useDispatch } from "react-redux";
import { Status } from "../helpers/Product";
import Url from "../lib/Url";

// const dispatch = useDispatch();

// Adding TRANSFER_TYPE
const REQUEST_ADD_TRANSFER_TYPE = "REQUEST_ADD_TRANSFER_TYPE";
const RECEIVE_ADD_TRANSFER_TYPE = "RECEIVE_ADD_TRANSFER_TYPE";
const TRANSFER_TYPE_ADD_ERROR = "TRANSFER_TYPE_ADD_ERROR";
const REQUEST_ADD_TRANSFER_TYPE_REASON = "REQUEST_ADD_TRANSFER_TYPE_REASON";
const RECEIVE_ADD_TRANSFER_TYPE_REASON = "RECEIVE_ADD_TRANSFER_TYPE_REASON";
const TRANSFER_TYPE_ADD_ERROR_REASON = "TRANSFER_TYPE_ADD_ERROR_REASON";



// Request Add TransferTypes
export function requestAddTransferTypes() {
    return {
        type: REQUEST_ADD_TRANSFER_TYPE
    }
};
// Receive Add TransferTypes
export function receiveAddTransferTypes() {
    return {
        type: RECEIVE_ADD_TRANSFER_TYPE
    }
}
// Error Add TransferTypes
export function addTransferTypesError() {
    return {
        type: TRANSFER_TYPE_ADD_ERROR
    }
};
export function requestAddTransferTypesReason() {
    return {
        type: REQUEST_ADD_TRANSFER_TYPE_REASON
    }
};
// Receive Add TransferTypes
export function receiveAddTransferTypesReason() {
    return {
        type: RECEIVE_ADD_TRANSFER_TYPE_REASON
    }
}
// Error Add TransferTypes
export function addTransferTypesErrorReason() {
    return {
        type: TRANSFER_TYPE_ADD_ERROR_REASON
    }
};



export function createTransferTypesData(data, params, toggle) {
    return (dispatch) => {
        dispatch(requestAddTransferTypes());

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
                dispatch(fetchList("TransferType", `${endpoints().TransferTypeApi}/search`, 1, 25,
                {status : Url.GetParam("status"),search : Url.GetParam("search")} ));



            })
            .catch((err) => {
                dispatch(addTransferTypesError());

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