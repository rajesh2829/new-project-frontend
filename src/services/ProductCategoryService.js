/**
 * Service dependencies
 */
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";
import { useDispatch } from "react-redux";
import { categoryProductCreateError, receiveCreateCategoryProduct, requestCreateCategoryProduct } from "../actions/productCategory";
import Toast from "../components/Toast";

/**
 * Create Product Category
 *
 * @param {*} ProductCategory Details
 * @return {*} API response
 */

export async function createProductCategory(ProductCategoryDetails) {
  const { data } = await apiClient.post(
    endpoints().categoryAPI,
    ProductCategoryDetails
  );
  return data;
}

/**
 * Get Product Category by id
 *
 * @param {*} categoryId
 * @return {*} API response
 */
export async function getProductCategoryById(categoryById) {
  const { data } = await apiClient.get(
    `${endpoints().categoryAPI}/${categoryById}`
  );
  return data;
}

/**
 * Update category details by id
 *
 * @param {*} categoryById
 * @param {*} body
 * @return {*} API response
 */
export async function updateProductCategoryDetailsById(categoryById, body) {
  const { data } = await apiClient.put(
    `${endpoints().categoryAPI}/${categoryById}`,
    body
  );
  return data;
}

/**
 * Delete category by id
 *
 * @param {*} categoryById
 * @return {*} API response
 */
export async function deleteProductCategoryId(categoryById) {
  const { data } = await apiClient.delete(
    `${endpoints().categoryAPI}/${categoryById}`
  );
  return data;
}
/**
 * Get category
 *
 * @return {*} API response
 */
export async function getCategoriesById(id) {
  const { data } = await apiClient.get(`${endpoints().categoryAPI}/${id}`);
  return data;
}
/**
 * Get category list
 *
 * @return {*} API response
 */
export async function getCategories() {
  const { data } = await apiClient.get(`${endpoints().categoryAPI}/search`);
  return data;
}


export const   addProduct =async (data, params,callback)=> {
  

    try {
      const response = await apiClient
        .post(`${endpoints().categoryAPI}/productAdd`, data);
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);  
        return callback(successMessage)
      } 
      

     
    } catch (error) {
      

      if (error.response) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(errorMessage);
        console.error(errorMessage);
      }
    }
  
}

export const   categoryProduct =async (categoryId)=> {
  

 
    const response = await apiClient
      .get(`${endpoints().categoryAPI}/productList/search?categoryId=${categoryId}`);
    
    return response && response.data && response.data.data




}


export default {
  createProductCategory,
  getProductCategoryById,
  getCategories,
  getCategoriesById,
  updateProductCategoryDetailsById,
  deleteProductCategoryId,
  addProduct,
  categoryProduct,
};
