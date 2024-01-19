const Action = {
  /* Fetch user details */
  REQUEST_USER_DETAIL: "REQUEST_USER_DETAIL",
  RECEIVE_USER_DETAIL: "RECEIVE_USER_DETAIL",
  FETCH_USER_DETAIL_FAIL: "FETCH_USER_DETAIL_FAIL",
}

// User reducer actions
export function userReducer(
  state = {
    isFetching: false,
  },
  action
) {
  // Action types
  switch (action.type) {
    case Action.REQUEST_USER_DETAIL:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case Action.RECEIVE_USER_DETAIL: {
      return Object.assign({}, state, { isFetching: false }, action.payload);
    }
    case Action.FETCH_USER_DETAIL_FAIL: {
      return { ...state, isFetching: false };
    }
    default:
      return state;
  }
}
