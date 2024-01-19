// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import { brandCreateError, brandUpdateError, brandUpdateStatusError, receiveAddBrand, receiveUpdatedBrandStatus, requestAddBrand, requestUpdateBrand } from "../actions/brand";
import { Brand } from "../helpers/Brand";
import Url from "../lib/Url";
import { fetchList } from "../actions/table";
import ArrayList from "../lib/ArrayList";

class BrandService {

  //create
  static async create(values, params, _toggle) {
    const e = params.params;
    const search = window.location.search;
    const pathParams = new URLSearchParams(search);
    const searchItem = pathParams.get("search");
    const searchTerm = searchItem !== null ? searchItem : ""
    const section = Url.GetParam("section");
    const data = new FormData();
    data.append("name", values.name.trim());
    return async (dispatch) => {
      dispatch(requestAddBrand());

      apiClient
        .post(`${endpoints().brandAPI}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
          _toggle();
        })
        .then(() => {
          dispatch(
            fetchList("activeBrand", `${endpoints().brandAPI}/search`,
              params.params.ActiveCurrentPage || 1,
              params.params.ActiveCurrentPageSize || 25,
              {
                status: Brand.STATUS_ACTIVE_TEXT,
                section: Brand.STATUS_ACTIVE_TEXT,
                search: section == "active" ? searchTerm : "",
                pagination: true,
                sort: Url.GetParam("sort"),
                sortDir: Url.GetParam("sortDir"),
                params
              })
          );
          dispatch(
            fetchList("inactiveBrand", `${endpoints().brandAPI}/search`,
              params.params.InActiveCurrentPage || 1,
              params.params.InActiveCurrentPageSize || 25,
              {
                status: Brand.STATUS_INACTIVE_TEXT,
                search: section == "InActive" ? searchTerm : "",
                pagination: true
              })
          );
          dispatch(
            fetchList("allBrand", `${endpoints().brandAPI}/search`,
              params.params.AllCurrentPage || 1,
              params.params.AllCurrentPageSize || 25,
              {
                section: Brand.STATUS_ALL_TEXT,
                search: section == "All" ? searchTerm : "",
                pagination: true,
                sort: Url.GetParam("sort"),
                sortDir: Url.GetParam("sortDir"),
                params
              })
          );
          dispatch(receiveAddBrand());
        })
        .catch((error) => {
          dispatch(brandCreateError(error));

          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };
  }
  //update
  static async update(id, data, params) {
    return async (dispatch) => {
      dispatch(requestUpdateBrand());
      await apiClient
        .put(`${endpoints().brandAPI}/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "allBrand",
              `${endpoints().brandAPI}/search`,
              1,
              25,
            )
          );
          dispatch(
            fetchList(
              "activeBrand",
              `${endpoints().brandAPI}/search`,
              1,
              25,
              { status: Brand.STATUS_ACTIVE_TEXT }
            )
          );
          dispatch(
            fetchList(
              "inactiveBrand",
              `${endpoints().brandAPI}/search`,
              1,
              25,
              { status: Brand.STATUS_INACTIVE_TEXT }
            )
          );
        })
        .catch((error) => {
          dispatch(brandUpdateError(error));

          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(error.response.data.message);
            console.error(errorMessage);
          }
        });
    };
  }
  //updateStatus
  static async updateStatus(id, status, params) {
    const AllPage = params.AllPage;
    const AllPageSize = params.AllPageSize;
    const InActivePage = params.InActivePage;
    const InActivePageSize = params.InActivePageSize;
    const ActivePage = params.ActivePage;
    const ActivePageSize = params.ActivePageSize;


    let data = {};
    data.status = status;
    return (dispatch) => {
      dispatch(receiveUpdatedBrandStatus());
      apiClient
        .put(`${endpoints().brandAPI}/status/${id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
          }
        })
        .then(() => {
          dispatch(
            fetchList("allBrand", `${endpoints().brandAPI}/search`,
              AllPage || 1,
              AllPageSize || 25, params)
          );
          dispatch(
            fetchList(
              "activeBrand",
              `${endpoints().brandAPI}/search`,
              ActivePage ? ActivePage : 1,
              ActivePageSize || 25,
              { status: Brand.STATUS_ACTIVE_TEXT, pagination: true, },
              params
            )
          );
          dispatch(
            fetchList(
              "inActiveBrand",
              `${endpoints().brandAPI}/search`,
              InActivePage || 1,
              InActivePageSize || 25,
              { status: Brand.STATUS_INACTIVE_TEXT },
              params
            )
          );
        })
        .catch((error) => {
          dispatch(brandUpdateStatusError(error));

          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(error.response.data.message);
            console.error(errorMessage);
          }
        });
    };
  }

  static async search(params) {

    const queryString = [];

    let apiUrl;

    if (params) {
      Object.keys(params).forEach((param) => {
        queryString.push(`${param}=${params[param]}`);
      });
    }

    if (queryString && queryString.length > 0) {
      apiUrl = `${endpoints().brandAPI}/search?${queryString.join("&")}`;
    } else {
      apiUrl = `${endpoints().brandAPI}/search`;
    }

    const { data } = await apiClient.get(apiUrl);
    return data;
  }

  static async list(params) {

    try {
      let queryString = await ArrayList.toQueryString(params);
      let { data } = await Url.get(`${endpoints().brandAPI}/list`, queryString)
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getBrandOption() {
    const response = await this.list();
    const data = response.data;
    const brands = [];
    if (data && data.length > 0) {
      data.forEach((brand) => {
        brands.push({
          id: brand.id,
          value: brand.id,
          label: brand.name,
        });
      });
    }
    return brands;
  };

}

export default BrandService;

