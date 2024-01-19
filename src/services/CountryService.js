// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { fetchList } from "../actions/table";

class CountryService {
  static async get(id,stateList) {
    try {
      if (id) {
        const response = await apiClient.get(`${endpoints().countryAPI}/${id}?${stateList ? "stateList=true & pagination:true & page=1 pageSize:25 ":""}`);
        const data = response && response.data && response.data.data ;
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async statecreate(data,countryId){
  
      apiClient
          .post(`${endpoints().stateAPI}`,data)
          .then((response) => {
              let successMessage;
              if (response && response.data) {
                  successMessage = response.data.message;
                  Toast.success(successMessage);
                
              }
              CountryService.get(countryId ,stateList)
                
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
    
  static async stateDelete(id,countryId){
  
    apiClient
        .delete(`${endpoints().stateAPI}/${id}/${countryId}`)
        .then((response) => {
            let successMessage;
            if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
              
            }
            CountryService.get(countryId ,stateList)
              
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


  }







export default CountryService;
