import React from "react";
import { Route, Router, Switch } from "react-router-dom";
//Context
import MyProvider from "../context/myProvider";
// History
import history from "../history";
import Home from "./home/index";
//Layout
import ShareMyChargerLayout from "./layout/shareMyChargerLayout";
//Pages
import Store from "./store/index";

export default function getShareMyChargerRoutes(settings) {
  return (
    <>
      <MyProvider>
        <div className="routeSection">
          <Router history={history}>
            <Switch>
              <Route exact path="/"></Route>
              <ShareMyChargerLayout
                exact={true}
                name="ShareMyCharger"
                portalName="ShareMyCharger.com"
                path="/home"
                component={Home}
                settings={settings}
              />
              <ShareMyChargerLayout
                exact={true}
                name="ShareMyChargerStore"
                portalName="Share My ChargerStore-Store"
                path="/store"
                component={Store}
                settings={settings}
              />
            </Switch>
          </Router>
        </div>
      </MyProvider>
    </>
  );
}
