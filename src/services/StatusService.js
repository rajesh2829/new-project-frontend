import { fetchList } from "../actions/table";
import { requestAddTagType, TagCreateError } from "../actions/tagType";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { isBadRequest, SUCCESS_RESPONSE } from "../lib/Http";
import Url from "../lib/Url";

class StatusService {
  static add = async (data, params, toggle, setData, setRows,objectName ,project_id) => {


    try {
      const response = await apiClient.post(`${endpoints().statusAPI}`, data, params);


      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
      }
      let responses = await StatusService.search(objectName,null,project_id)
      toggle()

    setData(responses);
      setRows(responses);


    } catch (error) {


      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(errorMessage);
        console.error(errorMessage);
      }
    }
  };


  static update = async (id, data,params,toggle, setData, setRows,objectName,project_id) => {
    apiClient.put(`${endpoints().statusAPI}/${id}`, data)
      .then(async (res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
        }
        toggle();
      
        let responses = await StatusService.search(objectName,null,project_id)
      
        setData(responses);
        setRows(responses);
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
    return data;
  };

  static updateOrder = async (data) => {
    apiClient.put(`${endpoints().statusAPI}/order`, data)
      .then((res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
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
    return data;
  }


  static Delete = async (id,objectName,setRows,setData,project_id,cb) => {
    apiClient.delete(`${endpoints().statusAPI}/delete/${id}`)
      .then(async (res) => {
        if (res.status == SUCCESS_RESPONSE) {
          Toast.success(res?.data?.message);
          let responses = await StatusService.search(objectName,null,project_id)
      
          setData(responses);
          setRows(responses);
          return cb(res?.data?.message)
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
  };

  static get = async (id) => {
    const statusDetail = await apiClient.get(`${endpoints().statusAPI}/${id}`)
    return statusDetail;
  };

  static search = async (objectName, name,project_id) => {
  
    const params = [];

    let url = `${endpoints().statusAPI}/search`;

    if (objectName) {
      params.push(`object_name=${objectName}`);
    }

    if (name) {
      params.push(`statusName=${name}`);
    }

    if (project_id) {
      params.push(`project_id=${project_id}`);
    }

    if (params.length > 0) {
      url = `${url}?${params.join("&")}`;
    }

    const response = await apiClient.get(url)
    const statusLists = response.data.data;
    return statusLists;
  };


  static nextStatusSearch = async (objectName, currentStatus, allowed_role_id,projectId,allowed_statuses) => {
    let lists = [];

    const response = await apiClient.get(`${endpoints().statusAPI}/nextStatus?object_name=${objectName}&currentStatus=${currentStatus}&projectId=${projectId}&allowed_statuses=${allowed_statuses}`)
    const statusLists = response.data.data;
    if (statusLists && statusLists.length > 0) {
      statusLists.forEach((statusList) => {
        lists.push({
          value: statusList.id,
          label: statusList.name,
          sort_order: statusList.sort_order
        });
      });
    }
    if (lists && lists.length > 0) return lists;
  };

  static getOption = async (objectName) => {
    const value = await StatusService.search(
      objectName,"", Url.GetParam("projectId")
    );
    const status = [];
    value.forEach((statusValue) => {
      status.push({
        value: statusValue.id,
        label: statusValue.name,
      });
    });
    return status;
  }

  static getGroupOption = async (objectName,projectId) => {
    const value = await StatusService.search(
      objectName,"",projectId
    );
    const status = [];
   value && value.forEach((statusValue) => {
    if(statusValue?.groupValue && statusValue?.group ) { status.push({
        value: statusValue?.groupValue,
        label: statusValue?.group,
      } ); }
    } );
    return status;
  }
}
export default StatusService;
