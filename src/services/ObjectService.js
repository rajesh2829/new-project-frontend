import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";

//Get object List
class ObjectService {

 static async get ()  {
    let lists = [];
    const response = await apiClient.get(`${endpoints().objectAPI}`);

    const objectList = response.data.data;
    if (objectList && objectList.length > 0) {
      objectList.forEach((data) => {
        lists.push({
          value: data.id,
          label: data.name,
        });
      });
    }
    if (lists && lists.length > 0) return lists;
  };
}
export default ObjectService;
