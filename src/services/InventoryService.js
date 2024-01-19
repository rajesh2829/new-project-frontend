/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";

export async function createNewInventory(inventoryDetails) {
  const { data } = await apiClient.post(
    endpoints().inventoryAPI,
    inventoryDetails
  );
  return data;
}

/**
 * Get Inventory Details by id
 *
 * @param {*} id
 * @return {*} API response
 */
export async function getInventoryDetailsById(inventoryId) {
  const { data } = await apiClient.get(
    `${endpoints().inventoryAPI}/${inventoryId}`
  );
  return data;
}

export async function getInventory() {
  const { data } = await apiClient.get(`${endpoints().inventoryAPI}/search`);
  return data;
}

export async function updateInventoryDetailsById(inventoryId, body) {
  const { data } = await apiClient.put(
    `${endpoints().inventoryAPI}/${inventoryId}`,
    body
  );
  return data;
}

/**
 * Delete Inventory
 *
 * @param {*} inventoryId
 * @return {*} API response
 */
export async function deleteInventory(inventoryId) {
  const { data } = await apiClient.delete(
    `${endpoints().inventoryAPI}/${inventoryId}`
  );
  return data;
}

export default {
  createNewInventory,
  getInventory,
  getInventoryDetailsById,
  updateInventoryDetailsById,
  deleteInventory,
};
