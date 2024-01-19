import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";

class UserRoleService {
    static async search() {
        try {
            const response = await apiClient.get(`${endpoints().userRoleAPI}/search`);

            return response;
        } catch (err) {
            console.log(err);
        }
    }
    static async list() {
        const response = await apiClient.get(`${endpoints().userRoleAPI}/list`);
        const userRole = response.data.data;

        const data = [];
        userRole &&
          userRole.length > 0 &&
          userRole.forEach((list) => {
            data.push({
              label: list.name,
              value: list.id
            });
          });
    
        if (data && data.length > 0) return data;
      }
}
export default UserRoleService;
