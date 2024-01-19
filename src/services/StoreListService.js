// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import * as storeConstant from "../helpers/StoreList";

//Get stores List
export const getStoresList = async () => {
  let lists = [];
  const response = await apiClient.get(`${endpoints().locationAPI}/list`);
  const storesLists = response.data.data;
  if (storesLists && storesLists.length > 0) {
    storesLists.forEach((storesList) => {
      lists.push({
        id: storesList.id,
        value: storesList.id,
        label: storesList.name,
      });
    });
  }
  if (lists && lists.length > 0) return lists;
};
