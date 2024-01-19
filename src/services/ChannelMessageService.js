import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";



class ChannelMessagesService {
    static async Create(data) {
      try {
        if (data) {
          let response = await apiClient.post(
            `${endpoints().channelMessageAPI}/create`,
            data
          );
          return response;
        }
      } catch (error) {
        console.log(error);
      }
    }

    static async search (params){

        let queryString = await ArrayList.toQueryString(params);
        let { data } = await Url.get(
          `${endpoints().channelMessageAPI}/search`,
          queryString
        );
        return data;
    }
}

export default ChannelMessagesService;