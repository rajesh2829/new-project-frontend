// API Client

import { endpoints } from "../api/endPoints";
import ArrayList from "../lib/ArrayList";
import Url from "../lib/Url";
import { apiClient } from "../apiClient";


class AccountEntryReportService {

  static search = async (params) => {
    let queryString = await ArrayList.toQueryString(params);
    let response = await Url.get(
      `${endpoints().accountEntryReportAPI}/search`,
      queryString
    );
    return response;
  };
}

export default AccountEntryReportService;
