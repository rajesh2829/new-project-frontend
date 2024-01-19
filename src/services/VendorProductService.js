/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { isBadRequest } from "../lib/Http";
import Toast from "../components/Toast";
import {
  requestCreateVendorProduct,
  requestVendorProductList,
  vendorProductCreateError,
  vendorProductListError,
} from "../actions/vendorProduct";
import { fetchList } from "../actions/table";


export class VendorProductService {
    static async import(url) {
        try {
          const { data } = await apiClient.post(
            `${endpoints().vendorProductImport}?url=${url}`
          );
          return data;
          } catch (err) {
            console.log(err);
          }
    }
   
    static async create(data, params, addVendorToggle) {
      return (dispatch) => {
        dispatch(requestCreateVendorProduct());
        try {
          if (data) {
            apiClient
              .post(`${endpoints().vendorProductAPI}`, data)
              .then((response) => {
                let successMessage;
                if (response && response.data) {
                  successMessage = response.data.message;
                  Toast.success(successMessage);
                  addVendorToggle();
                }
              })
              .then(() => {
                dispatch(
                  fetchList(
                    "allvendors",
                    `${endpoints().vendorProductAPI}/search`,
                    1,
                    25,
                    params,
                    { pagination: true }
                  )
                );
              })
              .catch((err) => {
                dispatch(vendorProductCreateError(err));
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
        } catch (err) {
          console.log(err);
        }
      };
  }
}

// export default VendorProductService;

export const addVendorProduct = (data, params, addVendorToggle) => {
  return (dispatch) => {
    dispatch(requestCreateVendorProduct());
    try {
      if (data) {
        apiClient
          .post(`${endpoints().vendorProductAPI}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              addVendorToggle();
            }
          })
          .then(() => {
            dispatch(
              fetchList(
                "allvendors",
                `${endpoints().vendorProductAPI}/search`,
                1,
                25,
                params,
                { pagination: true }
              )
            );
          })
          .catch((err) => {
            dispatch(vendorProductCreateError(err));
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
    } catch (err) {
      console.log(err);
    }
  };
};

export function updateVendorProduct(
  id,
  data,
  params,
  addVendorToggle,
  addProductToggle
) {
  return (dispatch) => {
    dispatch(requestVendorProductList());
    apiClient
      .put(`${endpoints().vendorProductAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          if (addVendorToggle) {
            addVendorToggle();
          }
          if (addProductToggle) {
            addProductToggle();
          }
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "allvendors",
            `${endpoints().vendorProductAPI}/search`,
            1,
            25,
            params,
            { pagination: true }
          )
        );
        dispatch(
          fetchList(
            "vendorProduct",
            `${endpoints().vendorProductAPI}/search`,
            params.ActiveCurrentPage || 1,
            params.ActiveCurrentPageSize || 25,
            params,
            { pagination: true,sort:"id",sortDir:"ASC" }
          )
        );
      })
      .catch((error) => {
        dispatch(vendorProductListError(error));

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
  };
}

export function deleteVendorProduct(
  id,
  params,
  addVendorToggle,
  addProductToggle,
  callback
) {
  return (dispatch) => {
    dispatch(requestVendorProductList());

    apiClient
      .delete(`${endpoints().vendorProductAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage)
          if (addVendorToggle) {
            addVendorToggle();
          }
          if (addProductToggle) {
            addProductToggle();
          }
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "allvendors",
            `${endpoints().vendorProductAPI}/search`,
            params.ActiveCurrentPage || 1,
            params.ActiveCurrentPageSize || 25,
            params,
            { pagination: true }
          )
        );
        
      })
      .catch((error) => {
        dispatch(vendorProductListError(error));
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


