// API Client
import { endpoints } from "../api/endPoints";
import { fetchList } from "../actions/table";
import { apiClient } from "../apiClient";
class PurchaseService {

  static search = (pageSize, params) => {
    return (dispatch) => {
      dispatch(
        fetchList(
          "purchase",
          `${endpoints().purchaseAPI}/search`,
          1,
          pageSize || 25,
          params
        )
      );

    };
  };
  static get = async () => {
    const response = await apiClient.get(`${endpoints().purchaseProductAPI}/search`);
    const data = response && response.data && response.data.data;
    return data;
  };
  
  static async report (params)  {
    try {
        const queryString = [];
    
        let apiUrl;
    
        if (params) {
          Object.keys(params).forEach((param) => {
            queryString.push(`${param}=${params[param]}`);
          });
        }
    
        if (queryString && queryString.length > 0) {
          apiUrl = `${endpoints().purchaseSummaryReportAPI}/search?${queryString.join("&")}`;
        } else {
          apiUrl = `${endpoints().purchaseSummaryReportAPI}/search`;
        }
    
        const response = await apiClient.get(apiUrl);
    
        const data = response && response.data;
    
        return data;
    
      } catch (err) {
        console.log(err)
      }
  }



}

export default PurchaseService;

