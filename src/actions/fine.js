
/* purchase order Entry */
const fine = {
    REQUEST_DELETE: "REQUEST_DELETE",
    RECEIVE_DELETE: "RECEIVE_DELETE",
  
    REQUEST_ADD: "REQUEST_ADD",
    RECEIVE_ADD: "RECEIVE_ADD",
    ADD_ERROR: "ADD_ERROR",
  
    REQUEST_UPDATE: "REQUEST_UPDATE",
    RECEIVE_UPDATE: "RECEIVE_UPDATE",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ERROR: "DELETE_ERROR",
  
    REQUEST_ADD_FINE: "REQUEST_ADD_FINE",
    RECEIVE_ADD_FINE: "RECEIVE_ADD_FINE",
    FINE_ADD_ERROR: "FINE_ADD_ERROR",
  
    REQUEST_DELETE_FINE: "REQUEST_DELETE_FINE",
    RECEIVE_DELETE_FINE: "RECEIVE_DELETE_FINE",
    FINE_DELETE_ERROR: "FINE_DELETE_ERROR",
  
    REQUEST_UPDATE_FINE: "REQUEST_UPDATE_FINE",
    RECEIVE_UPDATE_FINE: "RECEIVE_UPDATE_FINE",
    FINE_UPDATE_ERROR: "FINE_UPDATE_ERROR",
  
    
    REQUEST_UPDATE_STATUS_FINE:"REQUEST_UPDATE_STATUS_FINE",
    RECEIVE_UPDATE_STATUS_FINE:"RECEIVE_UPDATE_STATUS_FINE",
    FINE_UPDATE_STATUS_ERROR:"FINE_UPDATE_STATUS_ERROR"
  
  }
  
  
  /**
   * Request for creating purchase order Entry
   */
  
  class FineAdd{
  static  requestAddFine() {
    return {
      type: fine.REQUEST_ADD,
    };
  }
  
  /**
   * Receive for receive purchase order Entry
   */
  static receiveAddFine() {
    return {
      type: fine.RECEIVE_ADD,
    };
  }
  
  
  static fineCreateError(error) {
    return {
      type: fine.ADD_ERROR,
      error,
    };
  }
  
  static requestAddPurchaseProductOrder() {
    return {
      type: fine.REQUEST_ADD_FINE,
    };
  }
  
  
  static requestUpdateFine() {
    return {
      type: fine.REQUEST_UPDATE_FINE,
    };
  }
  
  static receiveUpdateFine() {
    return {
      type: fine.RECEIVE_UPDATE_FINE,
    };
  }
  
  static fineUpdateError(error) {
    return {
      type: fine.FINE_UPDATE_ERROR,
      error,
    };
  }
  
 
  
  static requestDeleteFine() {
    return {
      type: fine.REQUEST_DELETE_FINE,
    };
  }
  
  /**
   * Receive for deleting purchase order
   */
  static receiveDeleteFine() {
    return {
      type: fine.RECEIVE_DELETE_FINE,
    };
  }
  
  /**
   * Receive for error deleting brand
   */
  static receiveFineDeleteError(error) {
    return {
      type: fine.FINE_DELETE_ERROR,
      error,
    };
  }

  static requestUpdateStatusFine() {
    return {
      type: fine.REQUEST_UPDATE_STATUS_FINE,
    };
  }
  
  static receiveUpdateStatusFine() {
    return {
      type: fine.RECEIVE_UPDATE_STATUS_FINE,
    };
  }
  
  
  static fineUpdateStatusError(error) {
    return {
      type: fine.FINE_UPDATE_STATUS_ERROR,
      error,
    };
  }
  }
  
  export default FineAdd