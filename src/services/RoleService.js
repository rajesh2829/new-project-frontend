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

class RoleService {


static getRoleDetail = async () => {
  const roleList = [];
  await apiClient
    .get(`${endpoints().userRoleAPI}/search`)
    .then((response) => {
      const data = response.data.data;
      if (data && data.length > 0) {
        data.forEach((roleData) => {
          roleList.push({
            value: roleData.id,
            label: roleData.role_name,
          });
        });
        
      }
    });
  return roleList;
};
  }
  export default RoleService