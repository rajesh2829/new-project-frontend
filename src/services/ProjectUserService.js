import ProjectAdd from "../actions/project";
import project from "../actions/project";
import ProjectTicketTypeAdd from "../actions/projectTicketType";
import ProjectUser from "../actions/projectUser";
import  PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { Projects } from "../helpers/Project";
import ArrayList from "../lib/ArrayList";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import Url from "../lib/Url";

class ProjectUserService {

    // Update Purchase Order
  
   
    // Add Purchase Order
    static addProjectUser =(data, params,toggle)=> {
  
      return (dispatch) => {
        dispatch(ProjectUser.requestAddProjectUser);
    
        apiClient
          .post(endpoints().ProjectUserApi, data)
          .then((response) => {
    
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
              // toggle();
            }
          
          })
          .then(() => {
            dispatch(
              fetchList(
                "projectUser",
                `${endpoints().ProjectUserApi}/search`,
                1,
                25,
                {
                  projectId:Url.GetParam("projectId"),
                  sort:Url.GetParam("sort"),
                  sortDir:Url.GetParam("sortDir"),
                },
    
              )
            );
            dispatch(ProjectUser.receiveProjectAddError());
          })
          .catch((error) => {
            dispatch(ProjectUser.projectUserCreateError(error));
    
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
  
  
    
  
  
  static deleteProjectUser = (id,params) => {


    try {
      
      return (dispatch) => {
        dispatch(ProjectUser.requestDeleteProjectUser());
    
        apiClient
          .delete(`${endpoints().ProjectUserApi}/${id}`)
          .then((response) => {
     
  
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("projectUser", `${endpoints().ProjectUserApi}/search`, 1, 25,{
                projectId:Url.GetParam("projectId"),
                sort:Url.GetParam("sort"),
                sortDir:Url.GetParam("sortDir"),



              })
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
      };
    } catch (error) {
      console.log(error)
    }
    
  }
  }
  export default ProjectUserService;
  