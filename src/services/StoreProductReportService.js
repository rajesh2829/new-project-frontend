import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";



class StoreProductReportService {

// search for products list
    static async search(store,brand,category,type,pagination) {
        try {
          const response = await apiClient.get(`${endpoints().storeProductReportAPI}/search?store=${store}&brand=${brand}&category=${category}&type=${type}`);
          const data = response.data;
          return data;
        } catch (err) {
          console.log(err);
        }
      }
}

export default StoreProductReportService;