// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";

// Get Docs detail  by id
export const getDocsList = async () => {
  const response = await apiClient.get(`${endpoints().docsAPI}/list`);
  const data = response.data.pageList;
  if (data && data.length > 0) return data;
};
