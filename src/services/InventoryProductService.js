/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";

/**
 * Create new vendor product
 *
 * @param {*} url
 * @return {*} API response
 */
export async function createVendorProduct(url) {
  const { data } = await apiClient.post(`${endpoints().productAPI}?url=${url}`);
  return data;
}

/**
 * Update vendor product status
 *
 * @param {*} productDetails
 * @return {*} API response
 */
export async function bulkUpdateVendorProductStatus(productDetails) {
  const { data } = await apiClient.put(
    `${endpoints().productAPI}/bulk/update`,
    productDetails
  );
  return data;
}

/**
 * Update product details by id
 *
 * @param {*} productId
 * @param {*} body
 * @return {*} API response
 */
export async function updateVendorProductDetailsById(productId, body) {
  const { data } = await apiClient.put(
    `${endpoints().productAPI}/${productId}`,
    body
  );
  return data;
}

/**
 * Bulk vendor delete
 *
 * @param {*} body
 * @return {*} API response
 */
export async function vendorBulkDelete(body) {
  const { data } = await apiClient.put(
    `${endpoints().productAPI}/bulk/delete`,
    body
  );
  return data;
}

/**
 * Sync products to Vendor Products
 *
 * @param {*} productIds
 * @return {*} API response
 */
export async function syncToVendorProduct(productIds) {
  const { data } = await apiClient.put(
    `${endpoints().productAPI}/sync`,
    productIds
  );
  return data;
}

/**
 * Get vendor product details by id
 *
 * @param {*} productId
 * @return {*} API response
 */
export async function getVendorProductDetailsById(productId) {
  const { data } = await apiClient.get(
    `${endpoints().productAPI}/${productId}`
  );
  return data;
}

/**
 * Delete vendor product by id
 *
 * @param {*} productId
 * @return {*} API response
 */
export async function deleteVendorProductById(productId) {
  const { data } = await apiClient.delete(
    `${endpoints().productAPI}/${productId}`
  );
  return data;
}

/**
 * get Name details
 * @return {*} API response
 */
export async function getNameDetails() {
  const { data } = await apiClient.get(`${endpoints().productAPI}/search`);
  return data;
}

/**
 * Get Product by id
 *
 * @param {*} selectedProductId
 * @return {*} API response
 */
export async function getProductById(selectedProductId) {
  const { data } = await apiClient.get(
    `${endpoints().productAPI}/${selectedProductId}`
  );
  return data;
}

export default {
  createVendorProduct,
  bulkUpdateVendorProductStatus,
  syncToVendorProduct,
  updateVendorProductDetailsById,
  getVendorProductDetailsById,
  deleteVendorProductById,
  vendorBulkDelete,
  getNameDetails,
  getProductById,
};
