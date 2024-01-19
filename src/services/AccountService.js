/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";
import { fetchList } from "../actions/table";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import Account from "../helpers/Account";

export class AccountService {
  static search = async (params) => {
    const queryString = [];

    let apiUrl;

    if (params) {
      Object.keys(params).forEach((param) => {
        queryString.push(`${param}=${params[param]}`);
      });
    }

    if (queryString && queryString.length > 0) {
      apiUrl = `${endpoints().accountAPI}/search?${queryString.join("&")}`;
    } else {
      apiUrl = `${endpoints().accountAPI}/search`;
    }

    const { data } = await apiClient.get(apiUrl);
    return data;
  };
  static list = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    const { data } = await Url.get(
      `${endpoints().accountAPI}/list`,
      queryString
    );
    return data;
  };

  static async getOption(params) {
    const list = await AccountService.list(params);
    const vendorLists = [];
    if (ArrayList.isNotEmpty(list.data)) {
      list.data.forEach((vendor) => {
        vendorLists.push({
          label: vendor.name,
          value: vendor.id,
          id: vendor.id,
          cash_discount: vendor?.cash_discount,
          paymentAccount: vendor?.payment_account
        });
      });
    }
    return vendorLists;
  }

  static vendorList = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    const { data } = await Url.get(
      `${endpoints().accountAPI}/vendorList`,
      queryString
    );
    return data;
  };

 
  static createVendor = async (_VendorDetails,activeTab) => {
    if(activeTab === Account.TAB_CUSTOMER){
      const { data } = await apiClient.post(
        `${endpoints().accountAPI}/createCustomer`,
        _VendorDetails
      );
      return data;
    }else if(activeTab === Account.TAB_EMPLOYEE){
      const { data } = await apiClient.post(
        `${endpoints().accountAPI}/createEmployee`,
        _VendorDetails
      );
      return data;
    }
  else{
    const { data } = await apiClient.post(
      endpoints().accountAPI,
      _VendorDetails
    );
    return data;
  }
  };

  static getVendor = async (vendorById) => {
    const { data } = await apiClient.get(
      `${endpoints().accountAPI}/${vendorById}`
    );
    return data;
  };
  static updateVendor = async (vendorById, body) => {
    const { data } = await apiClient.put(
      `${endpoints().accountAPI}/${vendorById}`,
      body
    );
    return data;
  };
  static deleteVendor = async (vendorById) => {
    const { data } = await apiClient.delete(
      `${endpoints().accountAPI}/${vendorById}`
    );
    return data;
  };

  static searchVendor = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    let { data } = await Url.get(
      `${endpoints().accountAPI}/search`,
      queryString
    );
    return data;
  };
}

export default AccountService;
