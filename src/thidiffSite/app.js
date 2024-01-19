import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import MyProvider from "../context/myProvider";
// History
import history from "../history";
//Pages
import About from "./about/index";
import favicon from "./assets/icons/favicon.ico";
import Career from "./career";
import Client from "./client";
import Contact from "./contact";
import Ecommerce from "./ecommerce";
import ExtendedTeam from "./extendedTeam";
import Home1 from "./home";
//Layout
import ThidiffLayout from "./layout/publicLayout";
import MobileAppTesting from "./mobileAppTesting";
import Mobility from "./mobility/index";
import Privacy from "./privacyPolicy";
import TermsOfUse from "./termsOfUse";
import Testing from "./testing";

export default function getThidiffWebsiteRoutes(settings) {
  return (
    <>
      <MyProvider>
        <div className="routeSection">
          <Router history={history}>
            <Switch>
              <Route exact path="/"></Route>
              <ThidiffLayout
                exact
                path="/home"
                portalName="ThiDiff-Home"
                poratlfavicon={favicon}
                component={Home1}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/about-us"
                portalName="ThiDiff-Company"
                poratlfavicon={favicon}
                component={About}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/client"
                portalName="ThiDiff-Client"
                poratlfavicon={favicon}
                component={Client}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/extended-team"
                portalName="ThiDiff-Extended Team"
                poratlfavicon={favicon}
                component={ExtendedTeam}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/ecommerce"
                portalName="ThiDiff-Ecommerce"
                poratlfavicon={favicon}
                component={Ecommerce}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/mobility"
                portalName="ThiDiff-Mobility"
                poratlfavicon={favicon}
                component={Mobility}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/testing-services"
                portalName="ThiDiff-Testing Services"
                poratlfavicon={favicon}
                component={Testing}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/contact"
                portalName="ThiDiff-Contact"
                poratlfavicon={favicon}
                component={Contact}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/career"
                portalName="ThiDiff-Career"
                poratlfavicon={favicon}
                component={Career}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/mobile-app-testing"
                portalName="ThiDiff-Application Testing"
                poratlfavicon={favicon}
                component={MobileAppTesting}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/privacy-policy"
                portalName="ThiDiff.com"
                poratlfavicon={favicon}
                component={Privacy}
                settings={settings}
              />
              <ThidiffLayout
                exact
                path="/terms-of-use"
                portalName="ThiDiff.com"
                poratlfavicon={favicon}
                component={TermsOfUse}
                settings={settings}
              />
            </Switch>
          </Router>
        </div>
      </MyProvider>
    </>
  );
}
