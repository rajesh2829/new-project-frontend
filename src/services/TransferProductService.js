import { fetchList } from "../actions/table";
import { receiveAddTransferProduct, receiveDeleteTransferProduct, receiveUpdateTransferProduct, requestAddTransferProduct, requestDeleteTransferProduct, requestUpdateTransferProduct, transferProductCreateError, TransferProductDeleteError, TransferProductUpdationError } from "../actions/transferProduct";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import Url from "../lib/Url";


class TransferProductService {

    static add = (data, params, setValue, setQuantityLabels) => {

        return (dispatch) => {
            try {
                dispatch(requestAddTransferProduct());

                apiClient
                    .post(endpoints().transferProductApi, data)
                    .then((response) => {

                        let successMessage;
                        if (response && response.data) {
                            successMessage = response.data.message;
                            Toast.success(successMessage);
                        }
                        setValue();
                        setQuantityLabels();
                    })
                    .then(() => {
                        dispatch(
                            fetchList(
                                "transferProduct",
                                `${endpoints().transferProductApi}/search`,
                                1,
                                25,
                                params
                            )
                        )
                        dispatch(receiveAddTransferProduct());
                    }).catch((error) => {
                        dispatch(transferProductCreateError(error));

                        if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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
            } catch (error) {
               console.log(error);
            };
        };
    }

    static create = (data,setOpenProductModel) => {
      return (dispatch) => {
          try {
              dispatch(requestAddTransferProduct());
              apiClient
                  .post(`${endpoints().transferProductApi}/bulkInsert`, data)
                  .then((response) => {
                      let successMessage;
                      if (response && response.data) {
                          successMessage = response.data.message;
                          Toast.success(successMessage);
                          setOpenProductModel(false)
                      }
                  })
                  .then(() => {
                      dispatch(
                          fetchList(
                              "transferProduct",
                              `${endpoints().transferProductApi}/search`,
                              1,
                              25,
                          )
                      )
                      dispatch(receiveAddTransferProduct());
                  }).catch((error) => {
                      dispatch(transferProductCreateError(error));

                      if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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
          } catch (error) {
             console.log(error);
          };
      };
  }

   static delete=(id, params, closeDeleteModal)=> {
        return (dispatch) => {
          dispatch(requestDeleteTransferProduct());
          apiClient
            .delete(`${endpoints().transferProductApi}/${id}`)
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
                  "transferProduct",
                  `${endpoints().transferProductApi}/search`,
                  Url.GetParam("page") ? Url.GetParam("page") : 1,
                  Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
                  params ? params : {}
                )
              );
              dispatch(receiveDeleteTransferProduct());
            })
            .catch((error) => {
              dispatch(TransferProductDeleteError(error));
              if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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


     static update=(id, body, params)=> {
        return (dispatch) => {
          try {
      
            dispatch(requestUpdateTransferProduct());
            apiClient
              .put(`${endpoints().transferProductApi}/${id}`, body)
              .then((response) => {
                let successMessage;
                if (response && response.data) {
                  successMessage = response.data.message;
                  Toast.success(successMessage);
                }
                return response && response.data;
              })
              .then(() => {
                dispatch(
                  fetchList(
                    "transferProduct",
                    `${endpoints().transferProductApi}/search`,
                    1,
                    25,
                    params ? params : {}
                  )
                );
                dispatch(receiveUpdateTransferProduct());
              })
              .catch((error) => {
                dispatch(TransferProductUpdationError(error));
                if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
                  let errorMessage;
                  const errorRequest = error.response.request;
                  if (errorRequest && errorRequest.response) {
                    errorMessage = JSON.parse(errorRequest.response).message;
                  }
                  Toast.error(errorMessage);
                  console.error(errorMessage);
                }
                return error;
              })
          } catch (error) {
           console.log(error);
          };
        };
      }

      static search(pageSize, params) {
        return (dispatch) => {
          dispatch(
            fetchList("transferReport", `${endpoints().transferProductApi}/report`, 1, pageSize, {
              ...params,
    
            })
          );
        }
      }

      static search(pageSize, params) {
        return (dispatch) => {
          dispatch(
            fetchList("transferProduct", `${endpoints().transferProductApi}/search`, 1, pageSize, {
              ...params,
    
            })
          );
        }
      }
}

export default TransferProductService;