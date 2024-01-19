import {
  addSaleSettlementError,
  receiveAddSaleSettlementProduct,
  receiveDeleteStockProductEntry,
  receivedResponse,
  receivedUpdateResponse,
  receiveUpdatedSaleStatus,
  requestAddSaleSettlement,
  requestAddSaleSettlementProduct,
  requestDeleteSaleSettlement,
  requestDeleteSaleSettlementProduct,
  requestUpdateSaleSettlement,
  SaleSettlementDeleteError,
  SaleSettlementProductDeleteError,
  saleUpdateStatusError,
  updateSaleSettlementError,
} from "../actions/saleSettlement";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class SaleSettlementService {
  static create = (data, params, callback) => {
    return async (dispatch) => {
      dispatch(requestAddSaleSettlement());

      try {
            const res = await apiClient
                .post(`${endpoints().saleSettlementAPI}`, data);
            if (res && res.data) {
                callback(true);
                Toast.success("Sales Data Added Successfully");
            } dispatch(
                fetchList(
                    "SaleSettlement",
                    `${endpoints().saleSettlementAPI}/list`,
                    1,
                    25,
                    {
                      startDate:Url.GetParam("startDate"),
                      endDate:Url.GetParam("endDate")
                    }
                )
            );
            

            dispatch(receivedResponse);
        } catch (err) {
            dispatch(addSaleSettlementError);

            if (isBadRequest(err)) {
                let errorMessage;
                const errorRequest = err.response.request;
                if (errorRequest && errorRequest.response) {
                    errorMessage = JSON.parse(errorRequest.response).message;
                }
                Toast.error(errorMessage);
            }
        }
    };
  };

  static update =(id,data,params,toggle,setIsSubmit ,callback)=>{
    return async (dispatch) => {
 dispatch(requestUpdateSaleSettlement());

  apiClient
    .put(`${endpoints().saleSettlementAPI}/${id}`, data)
    .then((res) => {
      if (res) {
        Toast.success(res?.data?.message);
        toggle(),
       setIsSubmit(true)
       dispatch(
        fetchList(
            "SaleSettlement",
            `${endpoints().saleSettlementAPI}/list`,
            1,
            25,
            {
              startDate:Url.GetParam("startDate"),
              endDate:Url.GetParam("endDate")
            }
        ))
        dispatch(receivedUpdateResponse);
      }
      
    })
    .catch((err) => {
      dispatch(updateSaleSettlementError);

      if (isBadRequest(err)) {
        let errorMessage;
        const errorRequest = err.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(errorMessage);
       setIsSubmit(true)
      }
    });


  }

    

  }
  static search = (pageSize, params) => {
    return (dispatch) => {
      dispatch(
        fetchList(
          "SaleSettlement",
          `${endpoints().saleSettlementAPI}/list`,
          1,
          25
        )
      );
    
    };
  };

  static delete = (
    id,
    allCurrentPage,
    allCurrentPageSize
  ) => {
    return (dispatch) => {
      dispatch(requestDeleteSaleSettlement());

      apiClient
        .delete(`${endpoints().saleSettlementAPI}/${id}`)
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
              "SaleSettlement",
              `${endpoints().saleSettlementAPI}/list`,
              allCurrentPage || 1,
              allCurrentPageSize || 25,
              {
                startDate:Url.GetParam("startDate"),
                endDate:Url.GetParam("endDate"),
                pagination: true,
              }
            )
          );
         
        })
        .catch((error) => {
          dispatch(SaleSettlementDeleteError(error));
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
  };

  static updateStatus = (
    id,
    status,
    allCurrentPage,
    allCurrentPageSize
  ) => {
    let data = {};
    data.status = status;
    return (dispatch) => {
      dispatch(receiveUpdatedSaleStatus());
      apiClient
        .put(`${endpoints().saleSettlementAPI}/status/${id}`, data)
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
              "SaleSettlement",
              `${endpoints().saleSettlementAPI}/list`,
              allCurrentPage || 1,
              allCurrentPageSize || 25,{

                
              }
            )
          );
        })
        .catch((error) => {
          dispatch(saleUpdateStatusError(error));
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
  };

  static addProduct = (
    data,
    params,
    setProductValue,
    setUnitValue,
    setAmountValue,
    setQuantityLabels
  ) => {
    return (dispatch) => {
      dispatch(requestAddSaleSettlementProduct());

      apiClient
        .post(endpoints().saleProduct, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          setProductValue();
          setUnitValue();
          setAmountValue();
          setQuantityLabels();
        })
        .then(() => {
          dispatch(
            fetchList(
              "saleSettlementProduct",
              `${endpoints().saleProduct}/search`,
              1,
              25,
              params ? params : {}
            )
          );
          dispatch(receiveAddSaleSettlementProduct());
        })
        .catch((error) => {
          dispatch(SaleSettlementProductCreateError(error));

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
            console.error(errorMessage);
          }
          return error;
        });
    };
  };

  static deleteProduct(id, params, closeDeleteModal) {
    return (dispatch) => {
      dispatch(requestDeleteSaleSettlementProduct());

      apiClient
        .delete(`${endpoints().saleProduct}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          closeDeleteModal();
          return response && response.data;
        })
        .then(() => {
          dispatch(
            fetchList(
              "saleSettlementProduct",
              `${endpoints().saleProduct}/search`,
              1,
              25,
              params ? params : {}
            )
          );
          dispatch(receiveDeleteStockProductEntry());
        })
        .catch((error) => {
          dispatch(SaleSettlementProductDeleteError(error));

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
            console.error(errorMessage);
          }
          return error;
        });
    };
  }
}

export default SaleSettlementService;
