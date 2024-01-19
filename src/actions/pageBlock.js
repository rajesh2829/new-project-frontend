import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { endpoints } from "../api/endPoints";

export const saveBlockSetting = (data, pageId, blockName) => {
  // Save settings
  return apiClient
    .put(
      `${endpoints().pageBlockAttributeAPI}/${blockName}?pageId=${pageId}`,
      data
    )
    .then((response) => {
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
      }
    })
    .catch((error) => {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    });
};
