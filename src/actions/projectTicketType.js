
/* purchase order Entry */
const projectTicketType = {
    REQUEST_DELETE: "REQUEST_DELETE",
    RECEIVE_DELETE: "RECEIVE_DELETE",
  
    REQUEST_ADD: "REQUEST_ADD",
    RECEIVE_ADD: "RECEIVE_ADD",
    ADD_ERROR: "ADD_ERROR",
  
    REQUEST_UPDATE: "REQUEST_UPDATE",
    RECEIVE_UPDATE: "RECEIVE_UPDATE",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ERROR: "DELETE_ERROR",
  
    REQUEST_ADD_PROJECT_TICKET_TYPE: "REQUEST_ADD_PROJECT_TICKET_TYPE",
    RECEIVE_ADD_PROJECT_TICKET_TYPE: "RECEIVE_ADD_PROJECT_TICKET_TYPE",
    PROJECT_TICKET_TYPE_ADD_ERROR: "PROJECT_TICKET_TYPE_ADD_ERROR",
  
    REQUEST_DELETE_PROJECT_TICKET_TYPE: "REQUEST_DELETE_PROJECT_TICKET_TYPE",
    RECEIVE_DELETE_PROJECT_TICKET_TYPE: "RECEIVE_DELETE_PROJECT_TICKET_TYPE",
    PROJECT_TICKET_TYPE_DELETE_ERROR: "PROJECT_TICKET_TYPE_DELETE_ERROR",
  
    REQUEST_UPDATE_PROJECT_TICKET_TYPE: "REQUEST_UPDATE_PROJECT_TICKET_TYPE",
    RECEIVE_UPDATE_PROJECT_TICKET_TYPE: "RECEIVE_UPDATE_PROJECT_TICKET_TYPE",
    PROJECT_TICKET_TYPE_UPDATE_ERROR: "PROJECT_TICKET_TYPE_UPDATE_ERROR",
  
    RECEIVE_UPDATE_PURCHASE_ORDER_STATUS: "RECEIVE_UPDATE_PURCHASE_ORDER_STATUS",
    PURCHASE_ORDER_UPDATE_ERROR_STATUS: "PURCHASE_ORDER_UPDATE_ERROR_STATUS",
    
    REQUEST_UPDATE_STATUS_PROJECT_TICKET_TYPE:"REQUEST_UPDATE_STATUS_PROJECT_TICKET_TYPE",
    RECEIVE_UPDATE_STATUS_PROJECT_TICKET_TYPE:"RECEIVE_UPDATE_STATUS_PROJECT_TICKET_TYPE",
    PROJECT_TICKET_TYPE_UPDATE_STATUS_ERROR:"PROJECT_TICKET_TYPE_UPDATE_STATUS_ERROR"
  
  }
  
  
  /**
   * Request for creating purchase order Entry
   */
  
  class ProjectTicketTypeAdd{
  static  requestAddProjectTicketType() {
    return {
      type: projectTicketType.REQUEST_ADD,
    };
  }
  
  /**
   * Receive for receive purchase order Entry
   */
  static receiveAddProjectTicketType() {
    return {
      type: projectTicketType.RECEIVE_ADD,
    };
  }
  
  
  static projectTicketTypeCreateError(error) {
    return {
      type: projectTicketType.ADD_ERROR,
      error,
    };
  }
  
  static requestAddPurchaseProductOrder() {
    return {
      type: projectTicketType.REQUEST_ADD_PROJECTTicketType,
    };
  }
  
  
  static requestUpdateProjectTicketType() {
    return {
      type: projectTicketType.REQUEST_UPDATE_PROJECTTicketType,
    };
  }
  
  static receiveUpdateProjectTicketType() {
    return {
      type: projectTicketType.RECEIVE_UPDATE_PROJECTTicketType,
    };
  }
  
  
  static projectTicketTypeUpdateError(error) {
    return {
      type: projectTicketType.PROJECTTicketType_UPDATE_ERROR,
      error,
    };
  }
  
 
  
  static requestDeleteProjectTicketType() {
    return {
      type: projectTicketType.REQUEST_DELETE_PROJECT_TICKET_TYPE,
    };
  }
  
  /**
   * Receive for deleting purchase order
   */
  static receiveDeleteProject() {
    return {
      type: projectTicketType.RECEIVE_DELETE_PROJECT_TICKET_TYPE,
    };
  }
  
  /**
   * Receive for error deleting brand
   */
  static receiveProjectDeleteError(error) {
    return {
      type: projectTicketType.PROJECT_TICKET_TYPE_DELETE_ERROR,
      error,
    };
  }

  static requestUpdateStatusProject() {
    return {
      type: projectTicketType.REQUEST_UPDATE_STATUS_PROJECT,
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
  
  export default ProjectTicketTypeAdd