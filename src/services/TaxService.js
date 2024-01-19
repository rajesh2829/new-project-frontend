import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";

class TaxService {
  static create = (data,toggles,dispatch, params, callback) => {
   try {
      apiClient
        .post(`${endpoints().taxApi}/create`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            toggles()
            dispatch(fetchList("tax", `${endpoints().taxApi}/search`, 1, 25, params));
          }
        })
        .then(() => {
          dispatch(
            fetchList("tax", `${endpoints().taxApi}/search`, 1, 25, params)
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
          }
        });
    }
    catch(err){
        console.log(err);
    }
    

  };
  static update = (data,toggles,dispatch, params, id,setDetail) => {
    try {
       apiClient
         .put(`${endpoints().taxApi}/${id}`, data)
         .then((response) => {
           let successMessage;
           if (response && response.data) {
             successMessage = response.data.message;
             Toast.success(successMessage);
             toggles()
             dispatch(fetchList("tax", `${endpoints().taxApi}/search`, 1, 25, params));
             setDetail("")
           }
         })
         .then(() => {
           dispatch(
             fetchList("tax", `${endpoints().taxApi}/search`, 1, 25, params)
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
           }
         });
     }
     catch(err){
         console.log(err);
     }
     
 
   };


  static delete = ( id,toggles,dispatch, params,setDetail) => {
    try {
       apiClient
         .delete(`${endpoints().taxApi}/${id}`)
         .then((response) => {
           let successMessage;
           if (response && response.data) {
             successMessage = response.data.message;
             Toast.success(successMessage);
             toggles()
             dispatch(fetchList("tax", `${endpoints().taxApi}/search`, 1, 25,params ));
             setDetail("")
           }
         })
         .then(() => {
           dispatch(
             fetchList("tax", `${endpoints().taxApi}/search`, 1, 25,params )
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
           }
         });
     }
     catch(err){
         console.log(err);
     }
     
 
   };
  
}
export default TaxService;
