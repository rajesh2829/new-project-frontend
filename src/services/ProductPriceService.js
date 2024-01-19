import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { SUCCESS_RESPONSE } from "../lib/Http";
import ProductPrice from "../actions/productPrice";
import { fetchList } from "../actions/table";
import { HttpStatus } from "../helpers/HttpStatus";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";

class ProductPriceService {

  static updatePrice = async (id, data) => {
    try {
      let values = await
        apiClient
          .put(`${endpoints().productAPI}/updatePrice/${id}`, data)
          .then((res) => {
            if (res.status == SUCCESS_RESPONSE) {
              Toast.success(res?.data?.message);
            }
          })
      return values;
    } catch (error) {
      console.log(error)
    }

  }

  static create = async (data, params, toggle,setIsSubmit) => {
    return (dispatch) => {
      dispatch(ProductPrice.requestAddProductPrice());

      apiClient
        .post(endpoints().productPrice, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            toggle && toggle();
            setIsSubmit(true)
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "productPrice",
              `${endpoints().productPrice}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(ProductPrice.receiveAddProductPrice());
        })
        .catch((error) => {
          dispatch(ProductPrice.productPriceCreateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }

            Toast.error(errorMessage);
            setIsSubmit(true)
            // toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };

  }

  static update = async (Id, data, params, toggle) => {
    return (dispatch) => {
      dispatch(ProductPrice.requestUpdateProductPrice());

      apiClient
        .put(`${endpoints().productPrice}/${Id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            toggle && toggle();
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "productPrice",
              `${endpoints().productPrice}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(ProductPrice.receiveUpdateProductPrice());
        })
        .catch((error) => {
          dispatch(ProductPrice.productPriceUpdateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }

            Toast.error(errorMessage);
            // toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };

  }

  static delete = async (Id, params, toggle) => {
    return (dispatch) => {
      dispatch(ProductPrice.requestDeleteProductPrice());

      apiClient
        .delete(`${endpoints().productPrice}/${Id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            toggle && toggle();
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "productPrice",
              `${endpoints().productPrice}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(ProductPrice.receiveDeleteProductPrice());
        })
        .catch((error) => {
          dispatch(ProductPrice.receiveProductDeleteError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }

            Toast.error(errorMessage);
            // toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };

  }
  static async search (params) {

    let queryString = await ArrayList.toQueryString(params);
    const  data  = await Url.get(
      `${endpoints().productPrice}/search`,
      queryString
    );

    return data;

  }

  static updateStatus = async (Id, data, params) => {
    return (dispatch) => {
      dispatch(ProductPrice.requestUpdateProductPrice());

      apiClient
        .put(`${endpoints().productPrice}/updateStatus/${Id}`, data)
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
              "productPrice",
              `${endpoints().productPrice}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(ProductPrice.receiveUpdateProductPrice());
        })
        .catch((error) => {
          dispatch(ProductPrice.productPriceUpdateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }

            Toast.error(errorMessage);
            // toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };

  }
}
export default ProductPriceService;
