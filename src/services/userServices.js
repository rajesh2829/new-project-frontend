import { productUpdateError, requestUpdateProduct } from "../actions/storeProduct";
import { receiveAddPortal } from "../actions/storeProductDetail";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest } from "../lib/Http";


class UserService {
    static async search(id) {
        try {
            const response = await apiClient.get(
              `${endpoints().userAPI}/search`
            );
            const data = response.data.data;
            return data;
          } catch (err) {
            console.log(err);
          }
    }
    static async delete(id) {
        try {
            const response = await apiClient.delete(
              `${endpoints().userAPI}/${id}`
            );
            const data = response.data.data;
            return data;
          } catch (err) {
            console.log(err);
          }
    }

}

export default UserService;