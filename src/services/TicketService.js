// import components
import {
  contactCreateError,
  receiveContactAdd,
  requestAddContact,
} from "../actions/contact";
import Toast from "../components/Toast";

// API functions

import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import { requestCreateTicket, TicketCreateError } from "../actions/ticket";
import Url from "../lib/Url";
import Cookie from "../helpers/Cookie";
import Cookies from "../lib/Helper";

// ticket service
class TicketService {
  static search = (pageSize, params) => {
    return (dispatch) => {
      dispatch(
        fetchList(
          "ticket",
          `${endpoints().ticketAPI}/search`,
          1,
          pageSize || 25,
          params
        )
      );
    };
  };

  static createTicket(data, params, callback) {
    return (dispatch) => {
      dispatch(requestCreateTicket());
      apiClient
        .post(`${endpoints().ticketAPI}`, data, params)
        .then((response) => {
          let successMessage;

          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            return callback(response);
          }
        })
        .then(() => {
          dispatch(
              fetchList("ticket", `${endpoints().ticketAPI}/search`, data.allPage ? data.allPage : 1,
              data.allCurrentPage  ? data.allCurrentPage : 25, params)
          );
        })

        .catch((error) => {
          dispatch(TicketCreateError(error));

          if (isBadRequest(error)) {
            let errorMessage;

            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
            console.error(errorMessage);
          }
          return callback(error);
        });
    };
  }
  

  static updateStatus = (id, data,callback, apiUrl) => {
    try{
      return (dispatch) => {
          apiClient
          .put(`${endpoints().ticketAPI}/status/${id}`, data)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              return callback(successMessage)
            }
          }).then(() => {
            dispatch(
              fetchList(
                "ticket",
                apiUrl ? apiUrl : `${endpoints().ticketAPI}/search`,
                data.allCurrentPage  ? data.allCurrentPage : 1,
                data.allCurrentPageSize ? data.allCurrentPageSize : 25,
                {
                  ...data.param
                }
              )
            );
          })

            .catch((error) => {
                if (isBadRequest(error)) {
                let errorMessage;
                const errorRequest = error.response.request;
                if (errorRequest && errorRequest.response) {
                  errorMessage = JSON.parse(errorRequest.response).message;
                }
                Toast.error(error.response.data.message);
                console.error(errorMessage);
              }
            })
          }
        }catch(err){
            console.log(err);
        }
        
      }

        static update=async (id, data, params,callback)=> {
          await apiClient
            .put(`${endpoints().ticketAPI}/${id}`, data)
            .then((response) => {
              let successMessage;
              if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
                return callback(successMessage)
              }
            })
            .catch((error) => {
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
      }

      static clone=async (id, callback)=> {
        await apiClient
          .put(`${endpoints().ticketAPI}/clone/${id}`)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              return callback(successMessage)
            }
          })
          .catch((error) => {
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
    }

    static sendEta (data,callback){
      apiClient
      .post(`${endpoints().ticketAPI}/change/eta/request`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(response);
        }
      })
      .catch((error) => {
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
    }

}
// export service function
export default TicketService;
