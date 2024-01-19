

// Action Constants
export const Action = {
  // Delete Activity Type
  REQUEST_DELETE_ACTIVITY_TYPE: "REQUEST_DELETE_ACTIVITY_TYPE",
  RECEIVE_DELETE_ACTIVITY_TYPE: "RECEIVE_DELETE_ACTIVITY_TYPE",
  ACTIVITY_DELETE_ERROR: "ACTIVITY_TYPE_DELETE_ERROR",
  // Add Activity Type
  REQUEST_ADD_ACTIVITY_TYPE: "REQUEST_ADD_ACTIVITY_TYPE",
  RECEIVE_ADD_ACTIVITY_TYPE: "RECEIVE_ADD_ACTIVITY_TYPE",
  ACTIVITY_ADD_ERROR: "ACTIVITY_TYPE_ADD_ERROR",
  // Update Activity Type
  REQUEST_UPDATE_ACTIVITY_TYPE: "REQUEST_UPDATE_ACTIVITY_TYPE",
  RECEIVE_UPDATE_ACTIVITY_TYPE: "RECEIVE_UPDATE_ACTIVITY_TYPE",
  ACTIVITY_UPDATE_ERROR: "ACTIVITY_TYPE_UPDATE_ERROR",
};

export function requestAddActivityType() {
  return {
    type: Action.REQUEST_ADD_ACTIVITY_TYPE,
  };
}

export function receiveActivityType() {
  return {
    type: Action.RECEIVE_ADD_ACTIVITY_TYPE,
  };
}


// Request update activity type
export function requestUpdateActivityType() {
  return {
    type: Action.REQUEST_UPDATE_ACTIVITY_TYPE,
  };
}

//error while updating
export function activityTypeUpdateError(error) {
  return {
    type: Action.ACTIVITY_UPDATE_ERROR,
    error,
  };
}

//update activity type data


export function requestDeleteActivityType() {
  return {
    type: Action.REQUEST_DELETE_ACTIVITY_TYPE,
  };
}

export function activityDeleteError(error) {
  return {
    type: Action.ACTIVITY_DELETE_ERROR,
    error,
  };
}

