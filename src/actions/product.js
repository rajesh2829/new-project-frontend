// import toast from "../components/toast";
import { fetchList } from "./table";
import { endpoints } from "../api/endPoints"; 



const Actions ={
  REQUEST_PRODUCT_LIST : "REQUEST_PRODUCT_LIST",
  RECEIVE_PRODUCT_LIST : "RECEIVE_PRODUCT_LIST",
  PRODUCT_LIST_ERROR : "PRODUCT_LIST_ERROR",
}

/**
 * Request for updating Expert
 */
export function requestProductList() {
  return {
    type: Actions.REQUEST_PRODUCT_LIST
  };
}

/**
 * Receive for updating Expert
 */
export function receiveProductList() {
  return {
    type: Actions.RECEIVE_PRODUCT_LIST
  };
}

/**
 * Receive for error updating Expert
 */
export function productListError(error) {
  return {
    type: Actions.PRODUCT_LIST_ERROR,
    error
  };
}

/**
 * Update Expert
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function filterProductList(params, pageSize = 25, page = 1) {
  return dispatch => {
    dispatch(requestProductList());
    dispatch(
      fetchList(
        "products",
        `${endpoints().product}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveProductList());
  };
}

/**
 * Get Vendor Product
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function filterVendorProductList(params, pageSize, page) {
  return dispatch => {
    dispatch(requestProductList());
    dispatch(
      fetchList(
        "NewVendorProducts",
        `${endpoints().vendorProduct}/search`,
        page,
        pageSize,
        {
          ...params,
          status: "New",
        
        }
      )
    );
    dispatch(
      fetchList(
        "ExportedVendorProducts",
        `${endpoints().vendorProduct}/search`,
        page,
        pageSize,
        {
          ...params,
          status:"Exported",
    
        }
      )
    );
    dispatch(
      fetchList(
        "Excluded",
        `${endpoints().vendorProduct}/search`,
        page,
        pageSize,
       {
         
        ...params,

         status:"Excluded"
       }
      )
    );
    dispatch(
      fetchList(
        "vendorProducts",
        `${endpoints().vendorProduct}/search`,
        page,
        pageSize,
        params ? params : {}
      )
    );
    dispatch(receiveProductList());
  };
}
