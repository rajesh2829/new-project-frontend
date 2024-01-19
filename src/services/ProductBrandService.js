/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { fetchList } from "../actions/table";
/**
 * Create new brand
 *
 * @param {*} brandDetails
 * @return {*} API response
 */
export async function createNewBrand(brandDetails) {
  const { data } = await apiClient.post(endpoints().brandAPI, brandDetails);
  return data;
}

/**
 * Get brand details by id
 *
 * @param {*} brandId
 * @return {*} API response
 */
export async function getBrandDetailsById(brandId) {
  const { data } = await apiClient.get(`${endpoints().brandAPI}/${brandId}`);
  return data;
}

/**
 * Get Brands
 *
 * @return {*} API response
 */
export async function getBrandsById(id) {
  const { data } = await apiClient.get(`${endpoints().brandAPI}/${id}`);
  return data;
}

/**
 * Get Brands List
 *
 * @return {*} API response
 */
export async function getBrands() {
  const { data } = await apiClient.get(`${endpoints().brandAPI}/search`);
  return data;
}

/**
 * Update brand details by id
 *
 * @param {*} brandId
 * @param {*} body
 * @return {*} API response
 */
export async function updateBrandDetailsById(brandId, body) {
  const { data } = await apiClient.put(
    `${endpoints().brandAPI}/${brandId}`,
    body
  );  
  return data;
}

/**
 * Delete brand by id
 *
 * @param {*} brandId
 * @return {*} API response
 */
export async function deleteBrandById(brandId) {
  const { data } = await apiClient.delete(`${endpoints().brandAPI}/${brandId}`);
  return data;
}

/**
 * Upload brand image by id
 *
 * @param {*} brandId
 * @param {*} file
 * @return {*} API response
 */
export async function uploadBrandImageById(brandId, file) {
  const { data } = await apiClient.put(
    `${endpoints().brandAPI}/image/${brandId}`,
    file
  );

  fetchList(
    "allBrand",
    `${endpoints().brandAPI}/search`,
    1,
    25,
  )
  fetchList(
    "activeBrand",
    `${endpoints().brandAPI}/search`,
    1,
    25,
    { status: Status.ACTIVE }
  );
  fetchList(
    "inactiveBrand",
    `${endpoints().brandAPI}/search`,
    1,
    25,
    { status: Status.INACTIVE }
  );
  return data;
}

/**
 * Delete brand image by id
 *
 * @param {*} brandId
 * @param {*} file
 * @return {*} API response
 */
export async function deleteBrandImageById(brandId, file) {
  const { data } = await apiClient.delete(
    `${endpoints().brandAPI}/image/${brandId}?file=${file}`
  );
  return data;
}

export default {
  createNewBrand,
  getBrandDetailsById,
  getBrands,
  getBrandsById,
  updateBrandDetailsById,
  uploadBrandImageById,
  deleteBrandById,
  deleteBrandImageById,
};
