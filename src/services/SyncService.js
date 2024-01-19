/**
 * Service dependencies
 */
 import { apiClient }  from "../apiClient";
import { endpoints } from "../api/endPoints"; 
/**
 * Bulk update sync
 *
 * @param {*} body
 */
export async function bulkUpdateSync(body) {
  const { data } = await apiClient.put(
    `${endpoints().sync}/bulk/update`,
    body
  );

  return data;
}

/**
 * sync update
 *
 * @param {*} objectId
 * @param {*} body
 */
export async function updateSync(objectId, body) {
  const { data } = await apiClient.put(
    `${endpoints().sync}/update/${objectId}`,
    body
  );

  return data;
}

export default {
  bulkUpdateSync,
  updateSync
};
