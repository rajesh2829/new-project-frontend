import { fetchList } from "../actions/table";
import { endpoints } from '../api/endPoints';
import { apiClient } from '../apiClient';
import Toast from '../components/Toast';
import { HttpStatus } from '../helpers/HttpStatus';
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";

class AccountProductService {

  static create(data, callback) {
    apiClient
      .post(`${endpoints().accountProductAPI}/create`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;

          Toast.success(successMessage);
        }
        return callback(response && response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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


  static updateProduct (data, callback) {
    try {
      return (dispatch) => {
        apiClient
          .post(`${endpoints().accountProductAPI}/update`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
            return callback(response && response.data);
          })
          .then(() => {
            dispatch(
              fetchList(
                "vendorProduct",
                `${endpoints().accountProductAPI}/search`,
                1,
                25,
                { accountId: data.account_id }
              )
            );
          })
          .catch((error) => {

            if (
              error.response &&
              error.response.status >= HttpStatus.BAD_REQUEST
            ) {
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
    } catch (error) {
      console.log(error);
    }
  };

  static search = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(
      `${endpoints().accountProductAPI}/search`,
      queryString
    );
    return response;
  };

  static update = async (params,data, callBack) => {

    try {
      return (dispatch) => {
        apiClient
          .put(`${endpoints().accountProductAPI}/${params.id}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              return callBack(response.data)
            }
          })
          .then(() => {
            dispatch(
              fetchList(
                "vendorProduct",
                `${endpoints().accountProductAPI}/search`,
                1,
                25,
                params
              )
            );
          })
          .catch((error) => {

            if (
              error.response &&
              error.response.status >= HttpStatus.BAD_REQUEST
            ) {
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
    } catch (error) {
      console.log(error);
    }
  };
  

}

export default AccountProductService;
