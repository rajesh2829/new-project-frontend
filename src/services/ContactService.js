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

// contact service
class ContactService {
  // create a new contact
  static create = (data, params, addProductToggle,cb) => {
    return (dispatch) => {
      dispatch(requestAddContact());

      apiClient
        // post data
        .post(endpoints().contactAPI, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            // toggle close
            addProductToggle(false);
            return cb(successMessage)
          }
        })
       // redux table fetchlist
       .then(() => {
        dispatch(
          fetchList(
            "contact",
            `${endpoints().contactAPI}/search`,
            1,
            25,
            {
              pagination: true,
              object_id: params.object_id,
              sort:"id",
              sortDir:"DESC"
            },
            params
          )
        );
        dispatch(receiveContactAdd());
      })
        // Error Handling
        .catch((error) => {
          dispatch(contactCreateError(error));

          if (
            error.response &&
            error.response.status >= HttpStatus.BAD_REQUEST
          ) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            // toast responce
            Toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };
  };

  // update Exists contact
  static update = (id, data, params, addProductToggle,cb) => {
    return async (dispatch) => {
      apiClient
        // Put contact information
        .put(`${endpoints().contactAPI}/update/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            // toast success responce
            Toast.success(successMessage);
            // toggle close
            addProductToggle(false);
            return cb(successMessage)
            
          }
        })
        // redux table fetchlist
        .then(() => {
          dispatch(
            fetchList(
              "contact",
              `${endpoints().contactAPI}/search`,
              1,
              25,
              {
                pagination: true,
                object_id: params.object_id,
              },
              params
            )
          );
          dispatch(receiveContactAdd());
        })
        // Error Handling
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            // Toast.error
            Toast.error(error.response.data.message);
            console.error(errorMessage);
          }
        });
    };
  };

  // delete Exists contact
  static del = async (contactId, params,cb) => {
    
    return (dispatch) => {
      dispatch(requestAddContact());
      apiClient
        // delete contact
        .delete(`${endpoints().contactAPI}/delete/${contactId}`)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            // toast success
            Toast.success(res?.data?.message);
            return cb(res?.data?.message)
          }
        })
        // redux table fetchlist
        .then(() => {
          dispatch(
            fetchList(
              "contact",
              `${endpoints().contactAPI}/search`,
              1,
              25,
              {
                pagination: true,
                object_id: params.object_id,
              },
              params
            )
          );
          dispatch(receiveContactAdd());
        })
        // Error Handling
        .catch((err) => {
          if (isBadRequest(err)) {
            let errorMessage;
            const errorRequest = err.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            // toast responce
            Toast.error(errorMessage);
          }
        });
    };
  };
  static search = async (page,object_id,search,sort,sortDir) => {
    try {
      //create new array for store list

      //get store list
      let response = await apiClient.get(
        `${endpoints().contactAPI}/search?page=${page}&pagination=true&object_id=${object_id}&search=${search}&sort=${sort}&sortDir=${sortDir}`
      );

      //validate response xiist or not
      if (response && response.data && response.data.data) {
        //get store list
        let contacts = response.data;
         return contacts
        }
      }
    catch (err) {}
    
      
  };
}
// export service function
export default ContactService;
