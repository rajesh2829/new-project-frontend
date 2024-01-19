import ActivityTypeAdd from "../actions/activityType";
import FineTypeAdd from "../actions/fineType";
import project from "../actions/project";
import PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { ActivityType } from "../helpers/Project";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";

class fineTypeService {

  // Update Purchase Order

  static update = async (id, data) => {
    apiClient.put(`${endpoints().fineTypeApi}/${id}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
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
  static async get(id) {
    try {
        if (id) {
            let response = await apiClient
                .get(`${endpoints().fineTypeApi}/${id}`);

            return response;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}
  // Add Purchase Order
  static add = (data, params) => {

    return (dispatch) => {
      dispatch(FineTypeAdd.requestAddFineType);

      apiClient
        .post(endpoints().fineTypeApi, data)
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
              "fineType",
              `${endpoints().fineTypeApi}/search`,
              1,
              25,
              params,

            )
          );
          dispatch(FineTypeAdd.receiveAddFineType());
        })
        .catch((error) => {
          dispatch(FineTypeAdd.fineTypeCreateError(error));

          if (error.response && error.response.status >= HttpStatus.BAD_REQUEST) {
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
  }





  static delete = (id) => {

    try {

      return (dispatch) => {
        dispatch(FineTypeAdd.requestDeleteFineType);

        apiClient
          .delete(`${endpoints().fineTypeApi}/${id}`)
          .then((response) => {


            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("fines", `${endpoints().fineTypeApi}/search`, 1, 25)
            );
          })
          .catch((error) => {
            dispatch(FineTypeAdd.receiveFineTypeDeleteError(error));
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
    } catch (error) {
      console.log(error)
    }

  }

  static updateStatus = (id, data,params) => {
    
    try{
          apiClient
            .put(`${endpoints().fineTypeApi}/status/${id}`, data)
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
            })
        }catch(err){
            console.log(err);
        }
        
      }

      static search = async () => {
    
        try{
          const response = await apiClient
          .get(`${endpoints().fineTypeApi}/search`);
        
          console.log("......................",response)
          return response && response.data && response.data.data;;
      
            }catch(err){
                console.log(err);
            }
            
          }
}
export default fineTypeService;
