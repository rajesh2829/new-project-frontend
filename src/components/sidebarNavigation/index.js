import React, { Suspense, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import * as cookieConstant from "../../lib/Cookie";
//Lib
import Cookies from "../../lib/Helper";
// routes config
import routes from "../../routes";
//Pages
import SideBar from "./sideBar";

import "./sideBar/styles.scss";

const SideBarNavigation = (props) => {
  const {
    navList,
    leftNavigationBackgroundImage,
    leftNavigationTextColor,
    leftNavigationTextHoverColor,
    leftNavigationBackgroundColor,
    allowAccess,
    settings,
    history,
    showProjectSelector,
    projectId,
    defaultId,
    projectNavList,
  } = props;
  const [sideNav, setSideNav] = useState(false);

  const showSidenav = () => setSideNav(!sideNav);

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  return (
    <div>
      {Cookies.get(cookieConstant.COOKIE_SESSION_TOKEN) ? (
        <>
          <div
            className="left-nav-bg"
            style={{
              backgroundColor: `${leftNavigationBackgroundColor}`,
            }}
          ></div>
          <div className="container-fluid">
            <div className="row rowcontainer">
              <SideBar
                projectId={projectId}
                defaultId={defaultId}
                showProjectSelector={showProjectSelector}
                history={history}
                navList={navList}
                projectNavList={projectNavList}
                settings={settings || ""}
                enable={allowAccess || true}
                leftNavigationBackgroundImage={leftNavigationBackgroundImage}
                leftNavigationTextColor={leftNavigationTextColor}
                leftNavigationTextHoverColor={leftNavigationTextHoverColor}
                leftNavigationBackgroundColor={leftNavigationBackgroundColor}
                sideNav={sideNav}
                showSidenav={showSidenav}
              />
              <div className={"col col-lg pr-md-0 main-wrapper"}>
                <div className="mx-sm-0 mx-3 site-maincontent container-fluid">
                  <Suspense>
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={(props) => <route.component settings={settings && settings?.settings } showSidenav={showSidenav} {...props} />}
                          />
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
                </div>
                {/* /.main-content */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Suspense fallback={loading()}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              ) : null;
            })}
          </Switch>
        </Suspense>
      )}
    </div>
  );
};

export default SideBarNavigation;
