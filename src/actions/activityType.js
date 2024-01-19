
/* purchase order Entry */
const activityType = {
    REQUEST_DELETE: "REQUEST_DELETE",
    RECEIVE_DELETE: "RECEIVE_DELETE",
  
    REQUEST_ADD: "REQUEST_ADD",
    RECEIVE_ADD: "RECEIVE_ADD",
    ADD_ERROR: "ADD_ERROR",
  
    REQUEST_UPDATE: "REQUEST_UPDATE",
    RECEIVE_UPDATE: "RECEIVE_UPDATE",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ERROR: "DELETE_ERROR",
  
    REQUEST_ADD_ACTIVITY_TYPE: "REQUEST_ADD_ACTIVITY_TYPE",
    RECEIVE_ADD_ACTIVITY_TYPE: "RECEIVE_ADD_ACTIVITY_TYPE",
    ACTIVITY_TYPE_ADD_ERROR: "ACTIVITY_TYPE_ADD_ERROR",
  
    REQUEST_DELETE_ACTIVITY_TYPE: "REQUEST_DELETE_ACTIVITY_TYPE",
    RECEIVE_DELETE_ACTIVITY_TYPE: "RECEIVE_DELETE_ACTIVITY_TYPE",
    ACTIVITY_TYPE_DELETE_ERROR: "ACTIVITY_TYPE_DELETE_ERROR",
  
    REQUEST_UPDATE_ACTIVITY_TYPE: "REQUEST_UPDATE_ACTIVITY_TYPE",
    RECEIVE_UPDATE_ACTIVITY_TYPE: "RECEIVE_UPDATE_ACTIVITY_TYPE",
    ACTIVITY_TYPE_UPDATE_ERROR: "ACTIVITY_TYPE_UPDATE_ERROR",
  
    
    REQUEST_UPDATE_STATUS_ACTIVITY_TYPE:"REQUEST_UPDATE_STATUS_ACTIVITY_TYPE",
    RECEIVE_UPDATE_STATUS_ACTIVITY_TYPE:"RECEIVE_UPDATE_STATUS_ACTIVITY_TYPE",
    ACTIVITY_TYPE_UPDATE_STATUS_ERROR:"ACTIVITY_TYPE_UPDATE_STATUS_ERROR"
  
  }
  
  
  /**
   * Request for creating purchase order Entry
   */
  
  class ActivityTypeAdd{
  static  requestAddActivityType() {
    return {
      type: activityType.REQUEST_ADD,
    };
  }
  
  /**
   * Receive for receive purchase order Entry
   */
  static receiveAddActivityType() {
    return {
      type: activityType.RECEIVE_ADD_ACTIVITY_TYPE,
    };
  }
  
  
  static activitytypeCreateError(error) {
    return {
      type: activityType.ACTIVITY_TYPE_ADD_ERROR,
      error,
    };
  }
  
  static requestAddPurchaseProductOrder() {
    return {
      type: activityType.REQUEST_ADD_ACTIVITY_TYPE,
    };
  }
  
  
  static requestUpdateActivityType() {
    return {
      type: activityType.REQUEST_UPDATE_ACTIVITY_TYPE,
    };
  }
  
  static receiveUpdateActivityType() {
    return {
      type: activityType.RECEIVE_UPDATE_ACTIVITY_TYPE,
    };
  }
  
  
  static activitytypeUpdateError(error) {
    return {
      type: activityType.ACTIVITY_TYPE_UPDATE_ERROR,
      error,
    };
  }
  
 
  
  static requestDeleteActivityType() {
    return {
      type: activityType.REQUEST_DELETE_ACTIVITY_TYPE,
    };
  }
  
  /**
   * Receive for deleting purchase order
   */
  static receiveDeleteActivityType() {
    return {
      type: activityType.RECEIVE_DELETE_ACTIVITY_TYPE,
    };
  }
  
  /**
   * Receive for error deleting brand
   */
  static receiveActivityTypeDeleteError(error) {
    return {
      type: activityType.ACTIVITY_TYPE_DELETE_ERROR,
      error,
    };
  }

  static requestUpdateStatusActivityType() {
    return {
      type: activityType.REQUEST_UPDATE_STATUS_ACTIVITY_TYPE,
    };
  }
  
  static receiveUpdateStatusActivityType() {
    return {
      type: activityType.RECEIVE_UPDATE_STATUS_ACTIVITY_TYPE,
    };
  }
  
  
  static activitytypeUpdateStatusError(error) {
    return {
      type: activityType.ACTIVITY_TYPE_UPDATE_STATUS_ERROR,
      error,
    };
  }
  }
  
  export default ActivityTypeAdd