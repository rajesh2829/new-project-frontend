import { fetchList } from "../actions/table";
import { receiveAddWishlist, requestAddWishlist, requestDeleteWishlist, wishlistCreateError, wishlistDeleteError } from "../actions/wishlist";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";

class WishList {
    static async addWishlist(data, params, currentPage, pageSize) {
        return (dispatch) => {
          dispatch(requestAddWishlist());
      
          return apiClient
            .post(`${endpoints().wishlistAPI}`, data)
            .then((response) => {
              let successMessage;
              if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
              }
            })
            .then(() => {
              dispatch(
                fetchList(
                  "wishlist",
                  `${endpoints().wishlistAPI}/search`,
                  currentPage || 1,
                  pageSize || 25,
                  params,
                  { pagination: true }
                )
              );
              dispatch(receiveAddWishlist());
            })
            .catch((error) => {
              dispatch(wishlistCreateError(error));
      
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
        };
      }
      static async deleteWishlist(id, params, currentPage, pageSize) {
        return (dispatch) => {
          dispatch(requestDeleteWishlist());
      
          apiClient
            .delete(`${endpoints().wishlistAPI}/${id}`)
            .then((response) => {
              let successMessage;
              if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
              }
            })
            .then(() => {
              dispatch(
                fetchList(
                  "wishlist",
                  `${endpoints().wishlistAPI}/search`,
                  currentPage || 1,
                  pageSize || 25,
                  params
                )
              );
            })
            .catch((error) => {
              dispatch(wishlistDeleteError(error));
              if (isBadRequest(error)) {
                let errorMessage;
                const errorRequest = error.response.request;
                if (errorRequest && errorRequest.response) {
                  errorMessage = JSON.parse(errorRequest.response).message;
                }
                Toast.error(errorMessage);
              }
            });
        };
      }
      
}
export default WishList;
