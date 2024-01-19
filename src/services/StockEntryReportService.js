import { endpoints } from "../api/endPoints";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";


class StockEntryReportService {
  static async search(params) {
    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(
      `${endpoints().stockEntryReportApi}/search`,
      queryString
    );
    return response;
  }
}

export default StockEntryReportService;