import { fetchList } from "./table";
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";

export async function searchSalesData(params) {
  try {
    const queryString = [];

    let apiUrl;

    if (params) {
      Object.keys(params).forEach((param) => {
        queryString.push(`${param}=${params[param]}`);
      });
    }

    if (queryString && queryString.length > 0) {
      apiUrl = `${endpoints().salesSettlementReportAPI}/search?${queryString.join("&")}`;
    } else {
      apiUrl = `${endpoints().salesSettlementReportAPI}/search`;
    }

    const response = await apiClient.get(apiUrl);

    const data = response && response.data;

    return data;

  } catch (err) {
    console.log(err);
  }
}