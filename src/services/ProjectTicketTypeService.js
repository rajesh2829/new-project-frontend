import ProjectAdd from "../actions/project";
import project from "../actions/project";
import ProjectTicketTypeAdd from "../actions/projectTicketType";
import PurchaseOrder from "../actions/purchaseOrder";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { Projects } from "../helpers/Project";
import ArrayList from "../lib/ArrayList";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import Url from "../lib/Url";

class ProjectTicketTypeService {
  // Update Purchase Order

  static updateProjectTicketType = async (id, data, cb) => {
    apiClient
      .put(`${endpoints().projectTicketTypeAPI}/${id}`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
          return cb(res?.data?.message);
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
  static addProjectTicketType = (data, params) => {
    return (dispatch) => {
      dispatch(ProjectTicketTypeAdd.requestAddProjectTicketType());

      apiClient
        .post(endpoints().projectTicketTypeAPI, data)
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
              "projectTicketType",
              `${endpoints().projectTicketTypeAPI}/search`,
              1,
              25,
              {
                projectId: Url.GetParam("projectId")
                  ? Url.GetParam("projectId")
                  : ""
              }
            )
          );
          dispatch(ProjectTicketTypeAdd.receiveAddProjectTicketType());
        })
        .catch((error) => {
          dispatch(ProjectTicketTypeAdd.projectTicketTypeCreateError(error));

          if (
            error.response &&
            error.response.status >= HttpStatus.BAD_REQUEST
          ) {
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
  };

  static deleteProjectTicketType = (id, params) => {
    try {
      return (dispatch) => {
        dispatch(ProjectTicketTypeAdd.requestDeleteProjectTicketType());

        apiClient
          .delete(`${endpoints().projectTicketTypeAPI}/${id}`)
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
                "projectTicketType",
                `${endpoints().projectTicketTypeAPI}/search`,
                1,
                25,
                params
              )
            );
          })
          .catch((error) => {
            dispatch(ProjectTicketTypeAdd.receiveProjectDeleteError(error));
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
      console.log(error);
    }
  };
  static async getProjectTicketType(id) {
    try {
      const response = await apiClient.get(
        `${endpoints().projectTicketTypeAPI}/${id}`
      );
      const data = response?.data?.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  static updateProjectTicketTypeStatus = (id, data, params) => {
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
            fetchList(
              "project",
              `${endpoints().projectAPI}/search`,
              1,
              25,
              params
            )
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
  };

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
              label: projectData.name
            });
          });
        }
      });
    return projectList;
  };

  static search = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(
      `${endpoints().projectTicketTypeAPI}/search`,
      queryString
    );

    return response;
  };
  static list = async () => {
    try {
      let ticketTypelist = [];
      let response = await Url.get(`${endpoints().projectTicketTypeAPI}/list`);

      const data = response.data.data;

      if (data && data.length > 0) {
        data.forEach((type) => {
          ticketTypelist.push({
            value: type.id,
            label: type.name,
            projectId: type.project_id
          });
        });
      }

      return ticketTypelist;
    } catch (err) {
      console.log(err);
    }
  };
}
export default ProjectTicketTypeService;
