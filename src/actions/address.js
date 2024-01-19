 
const address = {
    REQUEST_DELETE: "REQUEST_DELETE",
    RECEIVE_DELETE: "RECEIVE_DELETE",
  
    REQUEST_ADD: "REQUEST_ADD",
    RECEIVE_ADD: "RECEIVE_ADD",
    ADD_ERROR: "ADD_ERROR",
  
    REQUEST_UPDATE: "REQUEST_UPDATE",
    RECEIVE_UPDATE: "RECEIVE_UPDATE",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ERROR: "DELETE_ERROR",
  
  
  }
  
  /**
   * Request for  Address
   */
  
  class Address{
  static  requestAddAddress() {
    return {
      type: address.REQUEST_ADD,
    };
  }
  
  /**
   * Receive for Address
   */
  static receiveAddAddress() {
    return {
      type: address.RECEIVE_ADD,
    };
  }
  
  
  static AddressCreateError(error) {
    return {
      type: address.ADD_ERROR,
      error,
    };
  }
  
  static requestAddAddress() {
    return {
      type: address.REQUEST_ADD,
    };
  }
  
  
  static receiveAddAddress() {
    return {
      type: address.RECEIVE_ADD
    };
  }
  
  
  static addressCreateError(error) {
    return {
      type: address.ADD_ERROR,
      error,
    };
  }
  
  static requestUpdateAddress(){
    return {
      type: address.REQUEST_UPDATE,
    };
  }
  
  static receiveUpdateAddress() {
    return {
      type: address.RECEIVE_UPDATE,
    };
  }
  
  
  static AddressUpdateError(error) {
    return {
      type: address.UPDATE_ERROR,
      error,
    };
  }
  
  static receiveUpdatedAddressStatus() {
    return {
      type: address.RECEIVE_UPDATE,
    };
  }
  static UpdateAddressError(error) {
    return {
      type: address.UPDATE_ERROR,
      error,
    };
  }
  
  static requestDeleteAddress() {
    return {
      type: address.REQUEST_DELETE,
    };
  }
  
  /**
   * Receive for deleting address 
   */
  static receiveDeleteAddress() {
    return {
      type: address.RECEIVE_DELETE,
    };
  }
  
  /**
   * Receive for error deleting address
   */
  static receiveAddressDeleteError(error) {
    return {
      type: address.DELETE_ERROR,
      error,
    };
  }
  }
  export default Address