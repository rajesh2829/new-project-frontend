import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";


class OrderSummaryReportService {

    static async search (params)  {
    try {
        const queryString = [];
    
        let apiUrl;
    
        if (params) {
          Object.keys(params).forEach((param) => {
            queryString.push(`${param}=${params[param]}`);
          });
        }
    
        if (queryString && queryString.length > 0) {
          apiUrl = `${endpoints().orderSummaryReportAPI}/search?${queryString.join("&")}`;
        } else {
          apiUrl = `${endpoints().orderSummaryReportAPI}/search`;
        }
    
        const response = await apiClient.get(apiUrl);
    
        const data = response && response.data;
    
        return data;
    
      } catch (err) {
        console.log(err)
      }
}


}

export default OrderSummaryReportService;