import CandidateAdd from "../actions/candidate";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { ActivityType } from "../helpers/Project";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";







class CandidateService {

  // Update Purchase Order

  static update = async (id, data) => {
    apiClient.put(`${endpoints().candidate}/${id}`, data)
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
                .get(`${endpoints().candidate}/${id}`);

            return response;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}
  // Add Purchase Order
  static add = (data, params,toggle) => {


  return (dispatch) => {
    dispatch(CandidateAdd.requestAddCandidate);

    apiClient
      .post(`${endpoints().candidate}`, data)
      .then((response) => {

        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          toggle();
        }

      })
      .then(() => {
        dispatch(
          fetchList(
            "Candidate",
            `${endpoints().candidate}/list`,
            1,
            25,
            params,

          )
        );
        dispatch(CandidateAdd.receiveAddCandidate());
      })
      .catch((error) => {
        dispatch(CandidateAdd.candidateCreateError(error));

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
        dispatch(CandidateAdd.requestDeleteCandidate);

        apiClient
          .delete(`${endpoints().candidate}/${id}`)
          .then((response) => {


            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .catch((error) => {
            dispatch(CandidateAdd.receiveCandidateDeleteError(error));
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
            .put(`${endpoints().candidate}/status/${id}`, data)
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
}
export default CandidateService;