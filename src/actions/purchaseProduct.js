import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import { useDispatch } from "react-redux";
import { REQUEST_UPDATE_PURCHASE } from "./purchase";

// const dispatch = useDispatch();

// Adding TRANSFER_TYPE
const REQUEST_UPDATE_PURCHASE_PRODUCT = "REQUEST_UPDATE_PURCHASE_PRODUCT";
const RECEIVE_UPDATE_PURCHASE_PRODUCT = "RECEIVE_UPDATE_PURCHASE_PRODUCT";
const PURCHASE_PRODUCT_UPDATE_ERROR = "PURCHASE_PRODUCT_UPDATE_ERROR";


// Request Update PurchaseProduc
export function requestUpdatePurchaseProduct() {
    return {
        type: REQUEST_UPDATE_PURCHASE_PRODUCT
    }
};
// Receive Update PurchaseProduc
export function receiveUpdatePurchaseProduct() {
    return {
        type: RECEIVE_UPDATE_PURCHASE_PRODUCT
    }
}
// Error Update PurchaseProduc
export function UpdatePurchaseProductError() {
    return {
        type: PURCHASE_PRODUCT_UPDATE_ERROR
    }
};


export function createTransferTypesData(id,data, toggle) {
    return (dispatch) => {
        dispatch(requestUpdatePurchaseProduct());

        return apiClient
        .put(`${endpoints().purchaseProductAPI}/update/${id}`, data)
        .then((res) => {
            if (res && res.data) {
              toast.success("Purchase Product Updated Successfully");
              toggle();
            }
          })
          .then(() => {
            dispatch(receiveUpdatePurchaseProduct(),
              fetchList(
                "purchaseProduct",
                `${endpoints().purchaseProductAPI}/search`,
                1,
                25
              )
            );
          })
            .catch((err) => {
                dispatch(UpdatePurchaseProductError());

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

