import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { settingsReducer } from "./settingsReducer";
import table from "./table";
// Reducer
import { userReducer } from "./userReducer";

const appReducer = combineReducers({
  routing: routerReducer,
  table,
  form,
  user: userReducer,
  settings: settingsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "UNAUTH_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
