const Action = {
    /* Setting List */
    REQUEST_SETTINGS_LIST: "REQUEST_SETTINGS_LIST",
    RECEIVE_SETTINGS_LIST: "RECEIVE_SETTINGS_LIST",
    FETCH_SETTINGS_LIST_FAIL: "FETCH_SETTINGS_LIST_FAIL",
}

export function settingsReducer(
  state = {
    isFetching: false,
  },
  action
) {
  // Request Settings
  switch (action.type) {
    case Action.REQUEST_SETTINGS_LIST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    // Receive Settings
    case Action.RECEIVE_SETTINGS_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        settings: action.payload,
      });
    // Fetch Settings fail
    case Action.FETCH_SETTINGS_LIST_FAIL: {
      return {
        ...state,
        settings: state.settings ? state.settings : action.payload,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
