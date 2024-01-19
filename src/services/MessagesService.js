import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";

 const REQUEST_UPDATE_MESSAGE = "REQUEST_UPDATE_MESSAGE";

 function requestUpdateMessage() {
  return {
    type: REQUEST_UPDATE_MESSAGE,
  };
}

class MessagesService {
  static async Create(data) {
    try {
      if (data) {
        let response = await apiClient.post(
          `${endpoints().messageAPI}/create`,
          data
        );
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getMessages(id) {
    try {
      if (id) {
        let response = await apiClient.get(`${endpoints().messageAPI}/${id}`);
        return response;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async search(params) {
    try {
      let queryString = await ArrayList.toQueryString(params);
      let response = await Url.get(`${endpoints().messageAPI}/search`, queryString)
      return response;
    } catch (err) {
      console.log(err);
      return callback(err, []);
    }
  }

  static update = (id,messageId) => {
    return (dispatch) => {
      dispatch(requestUpdateMessage());
      apiClient
        .put(`${endpoints().messageAPI}/${id}/${messageId}`)
        .then(() => {
          dispatch(
            fetchList(
              "navBar",
              `${endpoints().messageAPI}/search`,
              1,
              25,
            )
          );
        })
    };
  }
}
export default MessagesService;
