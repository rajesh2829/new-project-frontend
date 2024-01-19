// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { Local } from "../helpers/LocalStorage";

class SupportPortalService {
  static async getPortalList() {
    let lists = [];

    const localStorageValue = localStorage.getItem(Local.COMPANY);

    if (localStorageValue) {
      let list = JSON.parse(localStorageValue);
      if (list && list.length > 0) {
        list.forEach((portalList) => {

          lists.push({
            id: portalList.id,
            value: portalList.id,
            url: portalList.portal_url,
            label: portalList.company_name,
            template: portalList.template
          });
        });
      }
    } else {
      let response = await apiClient.get(`${endpoints().companyAPI}/list`);
      const portalLists = response.data.data;
      if (portalLists && portalLists.length > 0) {
        portalLists.forEach((portalList) => {
          lists.push({
            id: portalList.id,
            value: portalList.id,
            url: portalList.portal_url,
            label: portalList.company_name,
            template: portalList.template
          });
        });
      }
    }
    if (lists && lists.length > 0) return lists;
  }
  static async getPortalNameByBaseUrl(url) {
    try {
      let portalName;
      const lists = await this.getPortalList();
      if (lists && lists.length > 0) {
        lists.forEach((list) => {
          if (list && list.url == url) {
            portalName = list.label;
          }
        });
      }
      return portalName;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTemplateByBaseUrl(url) {
    try {
      let template;
      const lists = await this.getPortalList();
      if (lists && lists.length > 0) {
        lists.forEach((list) => {
          if (list && list.url == url) {
            template = list.template;
          }
        });
      }
      return template;
    } catch (err) {
      console.log(err);
    }
  }
  static async getPageList() {
    try {
      let lists = [];
      const response = await apiClient.get(`${endpoints().pageAPI}/search`);

      const portalLists = response.data.data;
      if (portalLists && portalLists.length > 0) {
        portalLists.forEach((portalList) => {
          lists.push(portalList);
        });
      }
      if (lists && lists.length > 0) return lists;
    } catch (err) {
      console.log(err);
    }
  }
}
export default SupportPortalService;
