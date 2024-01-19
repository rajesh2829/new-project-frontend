// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { accountEntryCreateError, AccountEntryDeleteError, AccountEntryUpdateError, receiveCreateAccountEntry, requestCreateAccountEntry, requestDeleteAccountEntry, requestUpdateAccountEntry } from "../actions/AccountEntry";
import { fetchList } from "../actions/table";

class AccountEntryService {

  static async get(id, callback) {
    try {
      if (id) {
        await apiClient.get(`${endpoints().accountEntryAPI}/${id}`).then((response) => {
          return callback(response, null);
        })
      }
    } catch (err) {
      console.log(null, err);
    }
  }

  static async getAccountEntry(callback) {
    try {
      const response = await apiClient.get(`${endpoints().accountEntryAPI}/list`)
      return callback(response, null)
    }
    catch (err) {
      console.error(err.message);
      return callback(null, err)
    }

  }

  static async create(data, setIsSubmit, params,callback) {
    return async (dispatch) => {
      dispatch(requestCreateAccountEntry());

      try {
        const response = await apiClient
          .post(`${endpoints().accountEntryAPI}`, data);
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
         
        }
         dispatch(
          fetchList(
            "accountEntry",
            `${endpoints().accountEntryAPI}/list`,
            1,
            25,
            params
          )
        );
        dispatch(receiveCreateAccountEntry());
        return callback(response && response.data)
      } catch (error) {
        dispatch(accountEntryCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
            setIsSubmit(true)
          }
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
      }
    };
  }

  static async import(data, history, params) {
    return async (dispatch) => {
      dispatch(requestCreateAccountEntry());

      try {
        const response = await apiClient
          .post(`${endpoints().accountEntryAPI}/import`, data);
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
         
        } dispatch(
          fetchList(
            "accountEntry",
            `${endpoints().accountEntryAPI}/list`,
            1,
            25,
            params
          )
        );
        dispatch(receiveCreateAccountEntry());
      } catch (error) {
        dispatch(accountEntryCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
      }
    };
  }

  static async update(id, data, params) {
    return (dispatch) => {
      dispatch(requestUpdateAccountEntry());
      apiClient
        .put(`${endpoints().accountEntryAPI}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage)
          }
        }).then(() => {
          dispatch(
            fetchList(
              "accountEntry",
              `${endpoints().accountEntryAPI}/list`,
              1,
              25,
              {
                
              }
            )
          );
        })

        .catch((error) => {
          dispatch(AccountEntryUpdateError(error));

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

  static async delete(id, history, params) {
    return (dispatch) => {
      dispatch(requestDeleteAccountEntry());

      apiClient
        .delete(`${endpoints().accountEntryAPI}/${id}`)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            history.push("/accountEntry");
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "accountEntry",
              `${endpoints().accountEntryAPI}/list`,
              1,
              25,
              params
            )
          );
        })
        .catch((error) => {
          dispatch(AccountEntryDeleteError(error));
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

  static search = (pageSize, params) => {
    return (dispatch) => {
      dispatch(
        fetchList(
          "accountEntry",
          `${endpoints().accountEntryAPI}/list`,
          1,
          pageSize || 25,
          params
        )
      );

    };
  };


  static updateStatus = (id, data) => {
    apiClient
      .put(`${endpoints().accountEntryAPI}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
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

  static async bulkUpdate(ids, data,callback) {
      apiClient
        .put(`${endpoints().accountEntryAPI}/bulkUpdate/${ids}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage)
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

}

export default AccountEntryService;

