import { fetchList } from "../actions/table";
import Visitor from "../actions/visitor";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Toast from "../components/Toast";
import { HttpStatus } from "../helpers/HttpStatus";
import { isBadRequest } from "../lib/Http";
import Url from "../lib/Url";

class visitorService {
  static add = (data, callback) => {
    return (dispatch) => {
      dispatch(Visitor.requestAddVisitor);

      apiClient
        .post(endpoints().visitor, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            Toast.success(successMessage);
            return callback(successMessage)
          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "visitors",
              `${endpoints().visitor}/search`,
              1,
              25,
              {visitorType:Url.GetParam("visitorType")}
            )
          );
          dispatch(Visitor.receiveAddVisitor());
        })
        .catch((error) => {
          dispatch(Visitor.VisitorCreateError(error));

          if (
            error.response &&
            error.response.status >= HttpStatus.BAD_REQUEST
          ) {
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
  };

  static update = async (id, data,uploadFile, getVisitordetail,toggle,dispatch) => {
    apiClient
      .put(`${endpoints().visitor}/${id}`, data)
      .then((res) => {
       if(res){
        Toast.success(res?.data?.message);
        dispatch(
          fetchList(
            "visitors",
            `${endpoints().visitor}/search`,
            1,
            25,
            {}
          )
        );
        toggle()
       }
        
        uploadFile&&  uploadFile(id)
        getVisitordetail &&  getVisitordetail()
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

  static updateMedia = async (id, data, getVisitordetail) => {
    apiClient
      .put(`${endpoints().visitor}/${id}`, data)
      .then((res) => {
        getVisitordetail && getVisitordetail()
      })
      .catch((err) => {
        if (isBadRequest(err)) {
          let errorMessage;
          const errorRequest = err.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
        }
      });
    return data;
  };

  static async get(id) {
    try {
      if (id) {
        const response = await apiClient.get(`${endpoints().visitor}/${id}`);
        return response && response.data && response.data.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(id, toggle, params) {
    try {
      return (dispatch) => {
        dispatch(Visitor.requestDeleteVisitor());
        apiClient
          .delete(`${endpoints().visitor}/delete/${id}`)
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
                "visitors",
                `${endpoints().visitor}/search`,
                1,
                25,
                params
              )
            );
          })
          .catch((error) => {
            dispatch(Visitor.receiveDeleteVisitor(error));
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
    } catch (err) {}
  }
}
export default visitorService;
