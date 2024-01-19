import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";

class TagTypeService {
  static search = async (name) => {
    const response = await apiClient.get(
      `${endpoints().tagTypeApi}/search?tagName=${name}`
    );
    return response;
  };

  static TagList = async (typeId) => {
    const { data } = await apiClient.get(
      `${endpoints().tagApi}/search?typeId=${typeId}`
    );

    return data;
  };
}
export default TagTypeService;
