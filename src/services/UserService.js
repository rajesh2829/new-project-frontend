// API Client
import {
  CompanyUserUpdateError,
  requestUpdateCompanyUser,
} from "../actions/companyUser";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { User } from "../helpers/User";
import ArrayList from "../lib/ArrayList";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";
import UserCard from "../components/UserCard";
class CompanyUserService {
  static async search() {
    try {
      const response = await apiClient.get(`${endpoints().userAPI}/`);
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async update(userId, data, params) {
    try {
      return (dispatch) => {
        dispatch(requestUpdateCompanyUser());
        apiClient
          .put(`${endpoints().userAPI}/${userId}`, data)
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
                User.STATUS_ACTIVE_TEXT,
                `${endpoints().userAPI}/search`,
                1,
                25,
                params
              )
            );
            dispatch(
              fetchList(
                User.STATUS_INACTIVE_TEXT,
                `${endpoints().userAPI}/search`,
                1,
                25,
                params
              )
            );
            dispatch(
              fetchList("All", `${endpoints().userAPI}/search`, 1, 25, params)
            );
          })
          .catch((error) => {
            dispatch(CompanyUserUpdateError(error));
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
    } catch (err) {
      console.log(err);
    }
  }

  static async get(params) {
    try {
      const queryString = [];

      let apiUrl;

      if (params) {
        Object.keys(params).forEach((param) => {
          queryString.push(`${param}=${params[param]}`);
        });
      }

      if (queryString && queryString.length > 0) {
        apiUrl = `${endpoints().userAPI}/search?${queryString.join("&")}`;
      } else {
        apiUrl = `${endpoints().userAPI}/search`;
      }
      const { data } = await apiClient.get(apiUrl);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async list(params) {
    try {
      let queryString = await ArrayList.toQueryString(params);
      const { data } = await Url.get(
        `${endpoints().userAPI}/list`,
        queryString
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async projectUserList(params) {
    try {
      let queryString = await ArrayList.toQueryString(params);
      const { data } = await Url.get(
        `${endpoints().userAPI}/project/user/list`,
        queryString
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static statusUpdate(id, data, params) {
    return (dispatch) => {
      dispatch(requestUpdateCompanyUser());
      apiClient
        .put(`${endpoints().userAPI}/status/${id}`, data)
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
              params.tableId,
              `${endpoints().userAPI}/search`,
              params.page ? params.page : 1,
              params.pageSize ? params.pageSize : 25,
              params
            )
          );
          dispatch(
            fetchList(
              params.tableId,
              `${endpoints().userAPI}/search`,
              params.page ? params.page : 1,
              params.pageSize ? params.pageSize : 25,
              params
            )
          );
          dispatch(
            fetchList("All", `${endpoints().userAPI}/search`,  params.page ? params.page : 1,
            params.pageSize ? params.pageSize : 25, {
              pagination: true,
            })
          );
        })
        .catch((error) => {
          dispatch(CompanyUserUpdateError(error));
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

  static bulkUpdate(bodyData) {
    return (dispatch) => {
      dispatch(requestUpdateCompanyUser());
      apiClient
        .put(`${endpoints().userAPI}/bulkUpdate`, bodyData)
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
              User.STATUS_ACTIVE_TEXT,
              `${endpoints().userAPI}/search`,
              Url.GetParam("page") ?  Url.GetParam("page") : 1,
              Url.GetParam("pageSize") ?  Url.GetParam("pageSize") : 25,
              {
                pagination: true,
                status: User.STATUS_ACTIVE_VALUE,
                section: User.STATUS_ACTIVE_TEXT,
                search : Url.GetParam("search")
              }
            )
          );
          dispatch(
            fetchList(
              User.STATUS_INACTIVE_TEXT,
              `${endpoints().userAPI}/search`,
              Url.GetParam("page") ?  Url.GetParam("page") : 1,
              Url.GetParam("pageSize") ?  Url.GetParam("pageSize") : 25,
              {
                pagination: true,
                status: User.STATUS_INACTIVE_VALUE,
                section: User.STATUS_INACTIVE_TEXT,
                search : Url.GetParam("search")

              }
            )
          );
          dispatch(
            fetchList("All", `${endpoints().userAPI}/search`,  Url.GetParam("page") ?  Url.GetParam("page") : 1,
            Url.GetParam("pageSize") ?  Url.GetParam("pageSize") : 25, params, {
              pagination: true,
              search : Url.GetParam("search")

            })
          );
        })
        .catch((error) => {
          dispatch(CompanyUserUpdateError(error));
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

  static async getUserName(media_url, firstName, lastName) {
    return (
      <div className="d-flex">
        <UserCard
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
      </div>
    );
  }

  static async getOption(params, showAssignToMeOption,labelName) {
    try {
      const roleData = await this.list(params);
      let user = roleData.data;
      let logedInUser =
        user &&
        user.length > 0 &&
        user.find((data) => data?.isLogedInUser == true);
      const List = [];
      if (showAssignToMeOption) {
        List.push({
          value: labelName ? labelName:"Assignee To Me",
          id: logedInUser?.id,
          label: await this.getUserName(
            logedInUser?.media_url,
            labelName?labelName:"Assignee To Me"
          ),
        });
      }
      if (user && user.length > 0) {
        user.forEach(async (list) => {
          List.push({
            value: list.first_name + "" + list.last_name,
            id: list.id,
            label: await this.getUserName(
              list?.media_url,
              list.first_name,
              list.last_name
            ),
            isLogedInUser: list?.isLogedInUser,
          });
        });
        return List;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static loginByPassword(data, callback) {
    apiClient
      .post(`${endpoints().userAPI}/loginByPassword`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          return callback(response);
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

  static signUp(data, callback) {
    apiClient
      .post(`${endpoints().customerAPI}/signup`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
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
}

export default CompanyUserService;
// Role Constant
export const Role = {
  // Sales Executive
  SALES_EXECUTIVE_ROLE: "Sales Executive",
};

// Get User Role
export const getUserRole = async () => {
  const response = await apiClient.get(
    `${endpoints().userAPI}/search?status=${
      User.STATUS_ACTIVE_VALUE
    }&pagination=${false}`
  );
  const userRole = response.data.data;
  const data = [];
  userRole &&
    userRole.length > 0 &&
    userRole.forEach((list) => {
      if (list.role_name == Role.SALES_EXECUTIVE_ROLE) {
        data.push({
          label: list.first_name + " " + list.last_name,
          value: list.id,
        });
      }
    });

  if (data && data.length > 0) return data;
};

export const getUserRoleDetails = async () => {
  const response = await apiClient.get(
    `${endpoints().userAPI}/search?status=${User.STATUS_ACTIVE_VALUE}`
  );
  const roleDetail = response.data.data;
  const data = [];
  roleDetail &&
    roleDetail.length > 0 &&
    roleDetail.forEach((list) => {
      if (list.role_name == Role.SALES_EXECUTIVE_ROLE) {
        data.push({
          label: list.first_name + " " + list.last_name,
          value: list.id,
        });
      }
    });

  if (data && data.length > 0) return data;
};

export const search = async () => {
  try {
    const response = await apiClient.get(`${endpoints().userAPI}/search`);
    const data = response.data.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
