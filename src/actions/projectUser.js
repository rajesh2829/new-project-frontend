import ProjectUsers from "../views/project/components/projectUsers";

/* purchase order Entry */
const projectUserType = {
    REQUEST_DELETE: "REQUEST_DELETE",
    RECEIVE_DELETE: "RECEIVE_DELETE",
  
    REQUEST_ADD: "REQUEST_ADD",
    RECEIVE_ADD: "RECEIVE_ADD",
    ADD_ERROR: "ADD_ERROR",
  
    REQUEST_UPDATE: "REQUEST_UPDATE",
    RECEIVE_UPDATE: "RECEIVE_UPDATE",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ERROR: "DELETE_ERROR",
  
    REQUEST_ADD_PROJECT_USER: "REQUEST_ADD_PROJECT_USER",
    RECEIVE_ADD_PROJECT_USER: "RECEIVE_ADD_PROJECT_USER",
    PROJECT_USER_ADD_ERROR: "PROJECT_USER_ADD_ERROR",
  
    REQUEST_DELETE_PROJECT_USER: "REQUEST_DELETE_PROJECT_USER",
    RECEIVE_DELETE_PROJECT_USER: "RECEIVE_DELETE_PROJECT_USER",
    PROJECT_USER_DELETE_ERROR: "PROJECT_USER_DELETE_ERROR",
  
  }
  
  
  /**
   * Request for creating purchase order Entry
   */
  
  class ProjectUser{
  static  requestAddProjectUser() {
    return {
      type: projectUserType.REQUEST_ADD,
    };
  }
  
  /**
   * Receive for receive purchase order Entry
   */
  static  receiveProjectAddError() {
    return {
      type: projectUserType.RECEIVE_ADD_PROJECT_USER,
    };
  }
  
  
  static projectUserCreateError(error) {
    return {
      type: projectUserType.PROJECT_USER_ADD_ERROR,
      error,
    };
  }
  
  static requestAddProjectUser() {
    return {
      type: projectUserType.REQUEST_ADD_PROJECT_USER,
    };
  }
  
  
  
  
 
  
  static requestDeleteProjectUser() {
    return {
      type: projectUserType.REQUEST_DELETE_PROJECT_USER,
    };
  }
  
  /**
   * Receive for deleting purchase order
   */
  static receiveDeleteProject() {
    return {
      type: projectUserType.RECEIVE_DELETE_PROJECT_USER,
    };
  }
  
  /**
   * Receive for error deleting brand
   */
  static receiveProjectDeleteError(error) {
    return {
      type: projectUserType.PROJECT_USER_DELETE_ERROR,
      error,
    };
  }


  }
  
  export default ProjectUser