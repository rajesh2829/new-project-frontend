/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { ACTIVE } from "../helpers/Store";
import { OrderListStatus } from "../helpers/OrderList";
import Toast from "../components/Toast";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";
import ProductCard from "../views/product/components/productCard";
import { isBadRequest } from "../lib/Http";

class ProductService {
  static async get(productId) {
    try {
      const { data } = await apiClient.get(
        `${endpoints().purchaseProductAPI}/updateFromProduct/${productId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static reIndex(productId) {
    let data = {
      selectedIds: productId
    };
    apiClient
      .put(`${endpoints().productAPI}/reindex`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
      })
      .catch((err) => {
        if (isBadRequest(err)) {
          let errorMessage;
          const errorRequest = err.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
        }
      });
  }

  static async search(params) {
    try {
      let queryString = await ArrayList.toQueryString(params);
      let { data } = await Url.get(
        `${endpoints().productAPI}/search`,
        queryString
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateStatus(id, data, callBack) {
    try {
      const response = await apiClient.put(
        `${endpoints().productAPI}/status/${id}`,
        data
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
        return callBack(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async clone(id, data, callBack) {
    try {
      let response = await apiClient.put(
        `${endpoints().productAPI}/clone/${id}`,
        data
      );

      return callBack(response);
    } catch (err) {
      console.log(er);
    }
  }

  static async getOption() {
    let params = {
      brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
      category: Url.GetParam("category") ? Url.GetParam("category") : ""
    };

    let response =
      params &&
      (await this.search({
        pagination: false,
        ...params
      }));

    return response;
  }

  static async list(params) {
    try {
      let queryString = await ArrayList.toQueryString(params);
      let { data } = await Url.get(
        `${endpoints().productAPI}/list`,
        queryString
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async merge(id, data, callBack) {
    try {
      const response = await apiClient.put(
        `${endpoints().productAPI}/merge/${id}`,
        data
      );
      if (response && response.data) {
        let successMessage = response.data.message;
        Toast.success(successMessage);
        return callBack(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default ProductService;
