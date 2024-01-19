// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { User } from "../helpers/User";

// Get User Role
export const getUserRole = async () => {
  const response = await apiClient.get(`${endpoints().userRoleAPI}/search?status=${User.STATUS_ACTIVE_VALUE}`);

  const userRole = response.data.data;
  const data = [];
  userRole &&
    userRole.length > 0 &&
    userRole.forEach((list) => {
      if (list.status === User.STATUS_ACTIVE_TEXT)
        data.push({ label: list.role_name, value: list.id });
    });
  if (data && data.length > 0) return data;
};

export const getUserRoleList = async () => {
  const response = await apiClient.get(`${endpoints().userRoleAPI}/search?status=${User.STATUS_ACTIVE_VALUE}`);
  const userRole = response.data.data;
  const data = [];
  userRole &&
    userRole.length > 0 &&
    userRole.forEach((list) => {
        data.push({ label: list.role_name, value: list.id });
    });
  if (data && data.length > 0) return data;
};

// Get User Permission
export const getUserPermissions = async () => {
  const response = await apiClient.get(
    `${endpoints().userPermissionAPI}/search`
  );

  const rolePermission = response.data.data;
  const data = [];
  rolePermission &&
    rolePermission.length > 0 &&
    rolePermission.forEach((list) => {
      data.push({ label: list.name, value: list.id });
    });
  if (data && data.length > 0) return data;
};

// Get User Permission
export const getRoleNameById = async (id) => {
  const roles = await getUserRole();
  let roleName;
  roles &&
    roles.length > 0 &&
    roles.forEach((role) => {
      if (role.value == id) {
        roleName = role.label;
      }
    });
  return roleName;
};

// Get User Role Permissions
export const getUserPermissionById = async () => {
  const response = await apiClient.get(
    `${endpoints().userRolePermissionAPI}/search`
  );

  const permissions = response.data.data;
  const data = [];
  permissions &&
    permissions.length > 0 &&
    permissions.forEach((list) => {
      data.push({ label: list.role_permission, value: list.id });
    });
  if (data && data.length > 0) return data;
};
