
/* price add */
const productPrice = {
    REQUEST_ADD_PRODUCT_PRICE: "REQUEST_ADD_PRODUCT_PRICE",
    RECEIVE_ADD_PRODUCT_PRICE: "RECEIVE_ADD_PRODUCT_PRICE",
    ADD_ERROR_PRODUCT_PRICE: "ADD_ERROR_PRODUCT_PRICE",
    
    REQUEST_DELETE_PRODUCT_PRICE: "REQUEST_DELETE_PRODUCT_PRICE",
    RECEIVE_DELETE_PRODUCT_PRICE: "RECEIVE_DELETE_PRODUCT_PRICE",
  
    REQUEST_UPDATE_PRODUCT_PRICE: "REQUEST_UPDATE_PRODUCT_PRICE",
    RECEIVE_UPDATE_PRODUCT_PRICE: "RECEIVE_UPDATE_PRODUCT_PRICE",
    UPDATE_ERROR_PRODUCT_PRICE: "UPDATE_ERROR_PRODUCT_PRICE",
    PRODUCT_PRICE_UPDATE_ERROR: "PRODUCT_PRICE_UPDATE_ERROR",

    DELETE_ERROR_PRODUCT_PRICE: "DELETE_ERROR_PRODUCT_PRICE",
  }
  
  
  /**
   * Request for creating product price Entry
   */
  
  class ProductPrice{
  static  requestAddProductPrice() {
    return {
      type: productPrice.REQUEST_ADD_PRODUCT_PRICE,
    };
  }
  
  /**
   * Receive for receive product price Entry
   */
  static receiveAddProductPrice() {
    return {
      type: productPrice.RECEIVE_ADD_PRODUCT_PRICE,
    };
  }
  
  
  static productPriceCreateError(error) {
    return {
      type: productPrice.ADD_ERROR_PRODUCT_PRICE,
      error,
    };
  }

  
  static requestUpdateProductPrice() {
    return {
      type: productPrice.REQUEST_UPDATE_PRODUCT_PRICE,
    };
  }
  
  static receiveUpdateProductPrice() {
    return {
      type: productPrice.RECEIVE_UPDATE_PRODUCT_PRICE,
    };
  }
  
  
  static productPriceUpdateError(error) {
    return {
      type: productPrice.PRODUCT_PRICE_UPDATE_ERROR,
      error,
    };
  }
  
 
  
  static requestDeleteProductPrice() {
    return {
      type: productPrice.REQUEST_DELETE_PRODUCT_PRICE,
    };
  }
  
  /**
   * Receive for deleting purchase order
   */
  static receiveDeleteProductPrice() {
    return {
      type: productPrice.RECEIVE_DELETE_PRODUCT_PRICE,
    };
  }
  
  /**
   * Receive for error deleting brand
   */
  static receiveProductDeleteError(error) {
    return {
      type: productPrice.DELETE_ERROR_PRODUCT_PRICE,
      error,
    };
  }
  }
  
  export default ProductPrice