import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Notifications from "react-notification-system-redux";
import Loadable from "react-loadable";
import { ToastContainer } from "react-toastify";

// ReactToastify CSS
import "react-toastify/dist/ReactToastify.min.css";

// History
import history from "./history";

// SCSS
import "./App.scss";

// Cookie
import  Cookie from "./lib/Helper";

// Constants
import { COOKIE_SESSION_TOKEN } from "./lib/Cookie";
import AdminLayout from "./components/layout/AdminLayout";

// Loading
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// 404 error page
const Page404 = Loadable({
  loader: () => import("./components/Page404"),
  loading
});

export class Main extends React.Component {
  bodyClass(authenticated) {
    if (!authenticated) {
      document.body.classList.remove("loggedin-layout");
    } else {
      document.body.classList.add("loggedin-layout");
    }
  }

  componentDidMount() {
    this.bodyClass(Cookie.get(COOKIE_SESSION_TOKEN));
  }

  componentDidUpdate() {
    this.bodyClass(Cookie.get(COOKIE_SESSION_TOKEN));
  }

  componentWillUnmount() {
    this.bodyClass(Cookie.get(COOKIE_SESSION_TOKEN));
  }

  render() {
    const { notifications } = this.props;
    return (
      <div>
        <Notifications notifications={notifications} />
        <ToastContainer
          autoClose={9000}
          hideProgressBar={true}
          pauseOnHover={false}
          toastClassName="toastRequestSuccess"
          bodyClassName="toastBody"
          closeButton={false}
        />
        <div className="routeSection">
          <Router history={history}>
            <Switch>
              <Route path="/" name="Home" component={AdminLayout} />
              <Route exact path="/404" name="Page 404" component={Page404} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default Main;
