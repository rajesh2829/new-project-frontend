// API Client
import { apiClient } from "../apiClient";
import { endpoints } from "../api/EndPoints";

import { isPartner } from "./Helper";

/**
 * Create Activity
 *
 * @param {*} activityData
 * @param {*} callback
 * @returns
 */
export const createActivity = (activityData, callback) => {
  const { partnerId, notes, activityType } = activityData;

  const data = {};

  if (partnerId || isPartner()) {
    if (partnerId) {
      data.partnerId = partnerId;
    }

    if (activityType) {
      data.activityType = activityType;
    }

    if (notes) {
      data.notes = notes;
    }

    // Create Activity
    apiClient.post(`${endpoints().activity}`, data);

    return callback();
  } else {
    return callback();
  }
};
