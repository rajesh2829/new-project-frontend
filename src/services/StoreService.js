/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";




class StoreService {

  static get = async (storeId) => {
    const response = await apiClient.get(`${endpoints().locationAPI}/${storeId}`);
    return response;
  }


  static search = async (callback, params) => {
   
    let queryString= await ArrayList.toQueryString(params);
    let response =await Url.get(`${endpoints().locationAPI}/search`,queryString)
    let storeData = [];
    let values = response.data.data
    for (let i in values) {
      storeData.push({
        id: values[i].id,
        label: values[i].name,
        value: values[i].id
      })
    }
    return callback(storeData);

  }

  static list = async (callback, params) => {
   
    let queryString= await ArrayList.toQueryString(params);
    let response = await Url.get(`${endpoints().locationAPI}/list`,queryString);
    let storeData = [];
    let values = response.data.data
    for (let i in values) {
      storeData.push({
        id: values[i].id,
        label: values[i].name,
        value: values[i].id
      })
    }
    return callback(storeData);

  }

  static delete = async (storeId) => {
    const { data } = await apiClient.post(`${endpoints().store}/${storeId}`);
    return data;
  }
}


export default StoreService;
