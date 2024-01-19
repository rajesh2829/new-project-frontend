/**
 * Service dependencies
 */
 import { apiClient }  from "../apiClient";
 import { endpoints } from "../api/endPoints"; 

/**
 * Bulk product update in shopify
 *
 * @param {*} productIds
 * @return {*} API response
 */
export async function productBulkExportToShopify(productIds) {
  const body = productIds;

  const { data } = await apiClient.post(
    `${endpoints().productBulkExportToShopify}`,
    body
  );
  return data;
}

/**
 * Bulk product update in product page
 *
 * @param {*} body
 * @return {*} API response
 */
export async function bulkUpdateCreateInProducts(body ,callback) {
  const { data } = await apiClient.post(
    `${endpoints().vendorProduct}/create/product`,
    body
  );
   callback(data.message);
  return data;
}

/**
 * Bulk product update in product page
 *
 * @param {*} body
 * @return {*} API response
 */
 export async function createInProducts(body) {
   const { data } = await apiClient.put(
    `${endpoints().productAPI}/syncVendorProduct/${body.id}`,
    body
  );
  return data;
}

export default {
  productBulkExportToShopify,
  bulkUpdateCreateInProducts,
  createInProducts
};
