import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "../../../src/reducers/index";

/**
 * Configure store
 *
 *
 */
export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}
