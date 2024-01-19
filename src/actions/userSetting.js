import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";
import permissionConstants from "../helpers/Permission";

import Shift from "../actions/Shift";
import ArrayList from "../lib/ArrayList";
// Action Constants
export const Action = {
  // Delete User Role
  REQUEST_DELETE_USER_ROLE : "REQUEST_DELETE_USER_ROLE",
  RECEIVE_DELETE_USER_ROLE : "RECEIVE_DELETE_USER_ROLE",
  USER_ROLE_DELETE_ERROR : "USER_ROLE_DELETE_ERROR",
  // Add User Role
  REQUEST_CREATE_USER_ROLE : "REQUEST_CREATE_USER_ROLE",
  RECEIVE_CREATE_USER_ROLE : "RECEIVE_CREATE_USER_ROLE",
  USER_ROLE_CREATE_ERROR : "USER_ROLE_CREATE_ERROR",
  // Update User Role
  REQUEST_UPDATE_USER_ROLE : "REQUEST_UPDATE_USER_ROLE",
  RECEIVE_UPDATE_USER_ROLE : "RECEIVE_UPDATE_USER_ROLE",
  USER_ROLE_UPDATE_ERROR : "USER_ROLE_UPDATE_ERROR",
  // Delete User Permission
  REQUEST_DELETE_USER_PERMISSION : "REQUEST_DELETE_USER_PERMISSION",
  RECEIVE_DELETE_USER_PERMISSION : "RECEIVE_DELETE_USER_PERMISSION",
  USER_PERMISSION_DELETE_ERROR : "USER_PERMISSION_DELETE_ERROR",
  // Add User Permission
  REQUEST_CREATE_USER_PERMISSION : "REQUEST_CREATE_USER_PERMISSION",
  RECEIVE_CREATE_USER_PERMISSION : "RECEIVE_CREATE_USER_PERMISSION",
  USER_PERMISSION_CREATE_ERROR : "USER_PERMISSION_CREATE_ERROR",
  // Update User Permission
  REQUEST_UPDATE_USER_PERMISSION : "REQUEST_UPDATE_USER_PERMISSION",
  RECEIVE_UPDATE_USER_PERMISSION : "RECEIVE_UPDATE_USER_PERMISSION",
  USER_PERMISSION_UPDATE_ERROR : "USER_PERMISSION_UPDATE_ERROR",
  // Delete User Role Permission
  REQUEST_DELETE_USER_ROLE_PERMISSION : "REQUEST_DELETE_USER_ROLE_PERMISSION",
  RECEIVE_DELETE_USER_ROLE_PERMISSION : "RECEIVE_DELETE_USER_ROLE_PERMISSION",
  USER_ROLE_PERMISSION_DELETE_ERROR : "USER_ROLE_PERMISSION_DELETE_ERROR",
  // Create User Role Permission
  REQUEST_CREATE_USER_ROLE_PERMISSION : "REQUEST_CREATE_USER_ROLE_PERMISSION",
  RECEIVE_CREATE_USER_ROLE_PERMISSION : "RECEIVE_CREATE_USER_ROLE_PERMISSION",
  USER_ROLE_PERMISSION_CREATE_ERROR : "USER_ROLE_PERMISSION_CREATE_ERROR",

};

// Role based API
/**
 * Request for deleting UserRole
 */
export function requestDeleteUserRole() {
  return {
    type: Action.REQUEST_DELETE_USER_ROLE,
  };
}

/**
 * Receive for deleting UserRole
 */
export function receiveDeleteUserRole() {
  return {
    type: Action.RECEIVE_DELETE_USER_ROLE,
  };
}

/**
 * Receive for error deleting UserRole
 */
export function UserRoleDeleteError(error) {
  return {
    type: Action.USER_ROLE_DELETE_ERROR,
    error,
  };
}

/**
 * Delete UserRole
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteUserRole(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteUserRole());

    apiClient
      .delete(`${endpoints().userRoleAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "userRole",
            `${endpoints().userRoleAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(UserRoleDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}

/**
 * Request for creating UserRole
 */
export function requestCreateUserRole() {
  return {
    type: Action.REQUEST_CREATE_USER_ROLE,
  };
}

/**
 * Receive for receive UserRole
 */
export function receiveCreateUserRole() {
  return {
    type: Action.RECEIVE_CREATE_USER_ROLE,
  };
}

/**
 * Receive for error creating UserRole
 */
export function UserRoleCreateError(error) {
  return {
    type: Action.USER_ROLE_CREATE_ERROR,
    error,
  };
}

/**
 * Create UserRole
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createUserRole(data, params, toggle) {
  return async (dispatch) => {
    dispatch(requestCreateUserRole());

    try {
      const response = await apiClient.post(`${endpoints().userRoleAPI}`, data);
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
      }
      toggle();
      dispatch(
        fetchList(
          "userRole",
          `${endpoints().userRoleAPI}/search`,
          1,
          25,
          params
        )
      );
      dispatch(receiveCreateUserRole());
    } catch (error) {
      dispatch(UserRoleCreateError(error));

      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(errorMessage);
        console.error(errorMessage);
      }
    }
  };
}

/**
 * Request for updating UserRole
 */
export function requestUpdateUserRole() {
  return {
    type: Action.REQUEST_UPDATE_USER_ROLE,
  };
}

/**
 * Receive for updating UserRole
 */
export function receiveUpdateUserRole() {
  return {
    type: Action.RECEIVE_UPDATE_USER_ROLE,
  };
}

/**
 * Receive for error updating UserRole
 */
export function UserRoleUpdateError(error) {
  return {
    type: Action.USER_ROLE_UPDATE_ERROR,
    error,
  };
}

/**
 * Update UserRole details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateUserRole(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateUserRole());
    apiClient
      .put(`${endpoints().userRoleAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "userRole",
            `${endpoints().userRoleAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(UserRoleUpdateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}
//Permission based API
/**
 * Request for deleting Permission
 */
export function requestDeletePermission() {
  return {
    type: Action.REQUEST_DELETE_USER_PERMISSION,
  };
}

/**
 * Receive for deleting Permission
 */
export function receiveDeletePermission() {
  return {
    type: Action.RECEIVE_DELETE_USER_PERMISSION,
  };
}

/**
 * Receive for error deleting Permission
 */
export function PermissionDeleteError(error) {
  return {
    type: Action.USER_PERMISSION_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Permission
 *
 * @param id
 * @returns {function(*): *}
 */
export function deletePermission(id, params) {
  return (dispatch) => {
    dispatch(requestDeletePermission());

    apiClient
      .delete(`${endpoints().userPermissionAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "userPermission",
            `${endpoints().userPermissionAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(PermissionDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}

/**
 * Request for creating Permission
 */
export function requestCreatePermission() {
  return {
    type: Action.REQUEST_CREATE_USER_PERMISSION,
  };
}

/**
 * Receive for receive Permission
 */
export function receiveCreatePermission() {
  return {
    type: Action.RECEIVE_CREATE_USER_PERMISSION,
  };
}

/**
 * Receive for error creating Permission
 */
export function PermissionCreateError(error) {
  return {
    type: Action.USER_PERMISSION_CREATE_ERROR,
    error,
  };
}

/**
 * Create Permission
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function createPermission(data, params) {
  return async (dispatch) => {
    dispatch(requestCreatePermission());

    try {
      const response = await apiClient.post(
        `${endpoints().userPermissionAPI}`,
        data
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
      }
      dispatch(
        fetchList(
          "userPermission",
          `${endpoints().userPermissionAPI}/search`,
          1,
          25,
          params
        )
      );
      dispatch(receiveCreatePermission());
    } catch (error) {
      dispatch(PermissionCreateError(error));

      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(errorMessage);
        console.error(errorMessage);
      }
    }
  };
}

/**
 * Request for updating Permission
 */
export function requestUpdatePermission() {
  return {
    type: Action.REQUEST_UPDATE_USER_PERMISSION,
  };
}

/**
 * Receive for updating Permission
 */
export function receiveUpdatePermission() {
  return {
    type: Action.RECEIVE_UPDATE_USER_PERMISSION,
  };
}

/**
 * Receive for error updating Permission
 */
export function PermissionUpdateError(error) {
  return {
    type: Action.USER_PERMISSION_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Permission details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updatePermission(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdatePermission());
    apiClient
      .put(`${endpoints().userPermissionAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "userPermission",
            `${endpoints().userPermissionAPI}/search`,
            1,
            25,
            params
          )
        );
      })
      .catch((error) => {
        dispatch(PermissionUpdateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}

//Role Permission based API
/**
 * Request for deleting RolePermission
 */
export function requestDeleteRolePermission() {
  return {
    type: Action.REQUEST_DELETE_USER_ROLE_PERMISSION,
  };
}

/**
 * Receive for deleting RolePermission
 */
export function receiveDeleteRolePermission() {
  return {
    type: Action.RECEIVE_DELETE_USER_ROLE_PERMISSION,
  };
}

/**
 * Receive for error deleting RolePermission
 */
export function RolePermissionDeleteError(error) {
  return {
    type: Action.USER_ROLE_PERMISSION_DELETE_ERROR,
    error,
  };
}

/**
 * Delete RolePermission
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteRolePermission(id, roleId, params, callback) {
  if (roleId) {
    params.role_id = roleId;
  }
  return (dispatch) => {
    dispatch(requestDeleteRolePermission());

    apiClient
      .delete(`${endpoints().userRolePermissionAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "userRolePermission",
            `${endpoints().userRolePermissionAPI}/search`,
            1,
            25,
            params
          )
        );
        return callback();
      })
      .catch((error) => {
        dispatch(RolePermissionDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}

/**
 * Request for creating RolePermission
 */
export function requestCreateRolePermission() {
  return {
    type: Action.REQUEST_CREATE_USER_ROLE_PERMISSION,
  };
}

/**
 * Receive for receive RolePermission
 */
export function receiveCreateRolePermission() {
  return {
    type: Action.RECEIVE_CREATE_USER_ROLE_PERMISSION,
  };
}

/**
 * Receive for error creating RolePermission
 */
export function RolePermissionCreateError(error) {
  return {
    type: Action.USER_ROLE_PERMISSION_CREATE_ERROR,
    error,
  };
}

/**
 * Create RolePermission
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const search = async (roleId) => {
  try {
    const response = await apiClient.get(
      `${endpoints().userRolePermissionAPI}/search?role_id=${roleId}`
    );
    //Get Permission List
    let data = permissionConstants.UserPermissionLists();
    let rolePermissionList = [];
    let permissionList = [];
    let result = response && response.data && response.data.data;
    let permissionData = await getPermissionList();

    //Get Role based List
    if (result && result.length > 0) {
      result.forEach((list) => {
        rolePermissionList.push(list.role_permission);
      });
    }
    if (data && data.length > 0) {
      data.forEach((list) => {
        permissionList.push(list.value);
      });
    }

    if(permissionData?.length) {
      permissionData.forEach(data => {
        permissionList.push(data?.name)
      })
    }

    //Array Filter
    let filteredValue = await ArrayList.arrayToArrayFilter(
      permissionList,
      rolePermissionList
    );

    //Filtered List
    let filteredList = [];
    filteredValue.forEach((list) => {
      filteredList.push({ label: list, value: list });
    });
    return filteredList;
  } catch (error) {
    console.log(error);
  }
};
export function createRolePermission(data, roleId, params, callback) {
  if (roleId) {
    params.role_id = roleId;
  }
  return async (dispatch) => {
    dispatch(requestCreateRolePermission());

    try {
      const response = await apiClient.post(
        `${endpoints().userRolePermissionAPI}?roleId=${roleId}`,
        data
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
      }
      dispatch(
        fetchList(
          "userRolePermission",
          `${endpoints().userRolePermissionAPI}/search`,
          1,
          25,
          params
        )
      );
      dispatch(receiveCreateRolePermission());
      return callback();
    } catch (error) {
      dispatch(RolePermissionCreateError(error));

      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(errorMessage);
        console.error(errorMessage);
      }
    }
  };
}

//Get permission list from api
export const getPermissionList = async () => {
  try {
    const response = await apiClient.get(`${endpoints().userPermissionAPI}/search`);
    return response && response?.data?.data;
  } catch(err) {
    console.log(err);
  }
}

//Get Role Based Permission List
export const getRolePermissionList = async (roleId) => {
  try {
    const response = await apiClient.get(
      `${endpoints().userRolePermissionAPI}/list`
    );
    //Get Permission List
    let data = permissionConstants.UserPermissionLists();
    let rolePermissionList = [];
    let permissionList = [];
    let result = response && response.data && response.data.data;
    let permissionData = await getPermissionList();

    //Get Role based List
    if (result && result.length > 0) {
      result.forEach((list) => {
        rolePermissionList.push(list.role_permission);
      });
    }
    if (data && data.length > 0) {
      data.forEach((list) => {
        permissionList.push(list.value);
      });
    }

    if(permissionData?.length) {
      permissionData.forEach(data => {
        permissionList.push(data?.name)
      })
    }

    //Array Filter
    let filteredValue = await ArrayList.arrayToArrayFilter(
      permissionList,
      rolePermissionList
    );

    //Filtered List
    let filteredList = [];
    filteredValue.forEach((list) => {
      filteredList.push({ label: list, value: list });
    });
    return filteredList;
  } catch (error) {
    console.log(error);
  }
};
