export const Sprint = {
  // Create Sprint 
  REQUEST_CREATE_SPRINT: "REQUEST_CREATE_SPRINT",
  RECEIVE_CREATE_SPRINT: "RECEIVE_CREATE_SPRINT",
  SPRINT_CREATE_ERROR: "SPRINT_CREATE_ERROR",
  // Update Sprint
  REQUEST_UPDATE_SPRINT: "REQUEST_UPDATE_SPRINT",
  RECEIVE_UPDATE_SPRINT: "RECEIVE_UPDATE_SPRINT",
  SPRINT_UPDATE_ERROR: "SPRINT_UPDATE_ERROR",
  // Delete Sprint
  REQUEST_DELETE_SPRINT: "REQUEST_DELETE_SPRINT",
  RECEIVE_DELETE_SPRINT: "RECEIVE_DELETE_SPRINT",
  SPRINT_DELETE_ERROR: "SPRINT_DELETE_ERROR",
}
export function requestCreateSprint() {
  return {
    type: Sprint.REQUEST_CREATE_SPRINT,
  };
}

/**
 * Receive for receive Sprint
 */
export function receiveCreateSprint() {
  return {
    type: Sprint.RECEIVE_CREATE_SPRINT,
  };
}

/**
 * Receive for error creating Sprint
 */
export function sprintCreateError(error) {
  return {
    type: Sprint.SPRINT_CREATE_ERROR,
    error,
  };
}


/**
 * Request for updating Sprint
 */
export function requestUpdateSprint() {
  return {
    type: Sprint.REQUEST_UPDATE_SPRINT,
  };
}

/**
 * Receive for updating Sprint
 */
export function receiveUpdateSprint() {
  return {
    type: Sprint.RECEIVE_UPDATE_SPRINT,
  };
}

/**
 * Receive for error updating Sprint
 */
export function SprintUpdateError(error) {
  return {
    type: Sprint.SPRINT_UPDATE_ERROR,
    error,
  };
}

/**
 * Request for deleting Sprint
 */
export function requestDeleteSprint() {
  return {
    type: Sprint.REQUEST_DELETE_SPRINT,
  };
}

/**
 * Receive for deleting Sprint
 */
export function receiveDeleteSprint() {
  return {
    type: Sprint.RECEIVE_DELETE_SPRINT,
  };
}

/**
 * Receive for error deleting Sprint
 */
export function SprintDeleteError(error) {
  return {
    type: Sprint.SPRINT_DELETE_ERROR,
    error,
  };
}

