import ProjectAdd from "../actions/project";
import project from "../actions/project";
import  PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { Projects } from "../helpers/Project";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";

class ProjectService {

    // Update Purchase Order
  
    static updateProject = async (id, data) => {
       apiClient.put(`${endpoints().projectAPI}/${id}`, data)
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
  
    // Add Purchase Order
    static addProject =(data, params)=> {
  
  
      return (dispatch) => {
        dispatch(ProjectAdd.requestAddProject());
    
        apiClient
          .post(endpoints().projectAPI, data)
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
                "project",
                `${endpoints().projectAPI}/search`,
                1,
                25,
                params,
    
              )
            );
            dispatch(ProjectAdd.receiveAddProduct());
          })
          .catch((error) => {
            dispatch(ProjectAdd.projectCreateError(error));
    
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
  
  
    
  
  
  static deleteProject = (id) => {

    try {
      
      return (dispatch) => {
        dispatch(ProjectAdd.requestDeleteProject());
    
        apiClient
          .delete(`${endpoints().projectAPI}/${id}`)
          .then((response) => {
     
  
            let successMessage;
            if (response && response.data) {
              successMessage = response.data.message;
              Toast.success(successMessage);
            }
          })
          .then(() => {
            dispatch(
              fetchList("project", `${endpoints().projectAPI}/search`, 1, 25)
            );
          })
          .catch((error) => {
            dispatch(ProjectAdd.receiveProjectDeleteError(error));
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
  static async getProject(id) {
    try {
        const response = await apiClient.get(`${endpoints().projectAPI}/${id}`);
        const data = response?.data;
        return data;
    } catch (err) {

        console.log(err);
    }
}
static  updateProjectStatus =  (id, data, params) => {
  return (dispatch) => {
    
    dispatch(ProjectAdd.requestUpdateStatusProject);
    apiClient
      .put(`${endpoints().projectAPI}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("project", `${endpoints().projectAPI}/search`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(ProjectAdd.projectUpdateStatusError(error));
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

static getProjectList = async () => {
  const projectList = [];
  await apiClient
    .get(`${endpoints().projectAPI}/search?status=${Projects.STATUS_ACTIVE}`)
    .then((response) => {
      const data = response.data.data;
      if (data && data.length > 0) {
        data.forEach((projectData) => {
          projectList.push({
            value: projectData.id,
            label: projectData.name,
          });
        });
        
      }
    });
  return projectList;
};
  }
  export default ProjectService;
  