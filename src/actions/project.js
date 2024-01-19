
/* purchase order Entry */
const project = {
    REQUEST_DELETE: "REQUEST_DELETE",
    RECEIVE_DELETE: "RECEIVE_DELETE",
  
    REQUEST_ADD: "REQUEST_ADD",
    RECEIVE_ADD: "RECEIVE_ADD",
    ADD_ERROR: "ADD_ERROR",
  
    REQUEST_UPDATE: "REQUEST_UPDATE",
    RECEIVE_UPDATE: "RECEIVE_UPDATE",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ERROR: "DELETE_ERROR",
  
    REQUEST_ADD_PROJECT: "REQUEST_ADD_PROJECT",
    RECEIVE_ADD_PROJECT: "RECEIVE_ADD_PROJECT",
    PROJECT_ADD_ERROR: "PROJECT_ADD_ERROR",
  
    REQUEST_DELETE_PROJECT: "REQUEST_DELETE_PROJECT",
    RECEIVE_DELETE_PROJECT: "RECEIVE_DELETE_PROJECT",
    PROJECT_DELETE_ERROR: "PROJECT_DELETE_ERROR",
  
    REQUEST_UPDATE_PROJECT: "REQUEST_UPDATE_PROJECT",
    RECEIVE_UPDATE_PROJECT: "RECEIVE_UPDATE_PROJECT",
    PROJECT_UPDATE_ERROR: "PROJECT_UPDATE_ERROR",
  
    RECEIVE_UPDATE_PURCHASE_ORDER_STATUS: "RECEIVE_UPDATE_PURCHASE_ORDER_STATUS",
    PURCHASE_ORDER_UPDATE_ERROR_STATUS: "PURCHASE_ORDER_UPDATE_ERROR_STATUS",
    
    REQUEST_UPDATE_STATUS_PROJECT:"REQUEST_UPDATE_STATUS_PROJECT",
    RECEIVE_UPDATE_STATUS_PROJECT:"RECEIVE_UPDATE_STATUS_PROJECT",
    PROJECT_UPDATE_STATUS_ERROR:"PROJECT_UPDATE_STATUS_ERROR"
  
  }
  
  
  /**
   * Request for creating purchase order Entry
   */
  
  class ProjectAdd{
  static  requestAddProject() {
    return {
      type: project.REQUEST_ADD,
    };
  }
  
  /**
   * Receive for receive purchase order Entry
   */
  static receiveAddProject() {
    return {
      type: project.RECEIVE_ADD,
    };
  }
  
  
  static projectCreateError(error) {
    return {
      type: project.ADD_ERROR,
      error,
    };
  }
  
  static requestAddPurchaseProductOrder() {
    return {
      type: project.REQUEST_ADD_PROJECT,
    };
  }
  
  
  static requestUpdateProject() {
    return {
      type: project.REQUEST_UPDATE_PROJECT,
    };
  }
  
  static receiveUpdateProject() {
    return {
      type: project.RECEIVE_UPDATE_PROJECT,
    };
  }
  
  
  static projectUpdateError(error) {
    return {
      type: project.PROJECT_UPDATE_ERROR,
      error,
    };
  }
  
 
  
  static requestDeleteProject() {
    return {
      type: project.REQUEST_DELETE_PROJECT,
    };
  }
  
  /**
   * Receive for deleting purchase order
   */
  static receiveDeleteProject() {
    return {
      type: project.RECEIVE_DELETE_PROJECT,
    };
  }
  
  /**
   * Receive for error deleting brand
   */
  static receiveProjectDeleteError(error) {
    return {
      type: project.PROJECT_DELETE_ERROR,
      error,
    };
  }

  static requestUpdateStatusProject() {
    return {
      type: project.REQUEST_UPDATE_STATUS_PROJECT,
    };
  }
  
  static receiveUpdateStatusProject() {
    return {
      type: project.RECEIVE_UPDATE_STATUS_PROJECT,
    };
  }
  
  
  static projectUpdateStatusError(error) {
    return {
      type: project.PROJECT_UPDATE_STATUS_ERROR,
      error,
    };
  }
  }
  
  export default ProjectAdd