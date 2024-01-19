
  import Toast from "../components/Toast";
  
  // API functions
  
  import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
  import { fetchList } from "../actions/table";
  import { endpoints } from "../api/endPoints";
  import { apiClient } from "../apiClient";
  import { requestCreateTicket, TicketCreateError } from "../actions/ticket";
  
  // ticket service
  class RecurringService {
    
    static update = async (id, data ,cb) => {
      apiClient.put(`${endpoints().RecurringTaskAPI}/${id}`, data)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            Toast.success(res?.data?.message);
            return cb(res?.data?.message)
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
      return data;
    };
  
    static create(data, params,tableId) {
      return (dispatch) => {
        dispatch(requestCreateTicket());
        apiClient
          .post(`${endpoints().RecurringTaskAPI}`, data, params)
          .then((response) => {
            let successMessage;
  
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList(tableId, `${endpoints().RecurringTaskAPI}/search`, 1, 25, params)
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
          });
      };
    }
    static delete(id, params,tableId) {
      return (dispatch) => {
        apiClient
        .delete(`${endpoints().RecurringTaskAPI}/${id}`)
          .then((response) => {
            let successMessage;
  
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList(tableId, `${endpoints().RecurringTaskAPI}/search`, 1, 25, params)
            );
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
      };
    }
    static updateStatus(id, status, params) {

      return (dispatch) => {
        apiClient
          .put(`${endpoints().RecurringTaskAPI}/status/${id}`, status)
          .then((response) => {
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("recurringTask", `${endpoints().RecurringTaskAPI}/search`, 1, 25, params)
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
          });
      };
    }
  
  }
  // export service function
  export default RecurringService;
  