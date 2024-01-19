const { endpoints } = require("../api/endPoints");
const { apiClient } = require("../apiClient");
const { default: Toast } = require("../components/Toast");
const { isBadRequest } = require("../lib/Http");

class ProjectSettingService {
  static async create(data, projectId) {
    await apiClient
      .put(`${endpoints().ProjectSettingAPI}/create?project_id=${projectId}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          return callback(successMessage);
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
  static async getProjectSettingData(projectId) {
    let data = {};
    await apiClient
      .get(`${endpoints().ProjectSettingAPI}/search?projectId=${projectId}`)
      .then((response) => {

        data = response.data.settings;
      }) ;
    return data;
  }
}

export default ProjectSettingService;
