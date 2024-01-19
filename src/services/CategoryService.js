import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";

class CategoryService {
  static async search(params) {
    const queryString = [];

    let apiUrl;

    if (params) {
      Object.keys(params).forEach((param) => {
        queryString.push(`${param}=${params[param]}`);
      });
    }

    if (queryString && queryString.length > 0) {
      apiUrl = `${endpoints().categoryAPI}/search?${queryString.join("&")}`;
    } else {
      apiUrl = `${endpoints().categoryAPI}/search`;
    }

    const { data } = await apiClient.get(apiUrl);
    return data;
  }

  static async list(params) {
    let queryString = await ArrayList.toQueryString(params);
    let { data } = await Url.get(`${endpoints().categoryAPI}/list`, queryString)
    return data;
  }

  static async create(params) {
    const { data } = await apiClient.post(endpoints().categoryAPI, params);
    return data;
  }

  static async get(id) {
    const { data } = await apiClient.get(`${endpoints().categoryAPI}/${id}`);
    return data;
  }

  static async update(id, body) {
    const { data } = await apiClient.put(
      `${endpoints().categoryAPI}/${id}`,
      body
    );
    return data;
  }

  static async delete(id) {
    const { data } = await apiClient.delete(`${endpoints().categoryAPI}/${id}`);
    return data;
  }

  static async getOption() {
    const response = await this.list();
    const data = response && response.data;
    const categories = [];
    if (data && data.length > 0) {
      data.forEach((category) => {
        categories.push({
          id: category.id,
          value: category.id,
          label: category.name,
        });
      });
    }
    return categories;
  }
}

export default CategoryService;
