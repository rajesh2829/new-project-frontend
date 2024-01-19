import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setPortalName } from "../../lib/Portal";
// Context
import UserProvider from "../../context/userContext/userProvider";
import { isLoggedIn } from "../../lib/Helper";
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import linkedin from "../assets/icons/linkedin.svg";
import twitter from "../assets/icons/twitter.svg";
import logo from "../assets/img/logo.png";
//Components
import NavBar from "../component/navBar";
// routes config
import routes from "../routes";

const DefaultFooter = React.lazy(() => import("./defaultFooter"));

class ShareMyChargerLayout extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isOpen: false,
      avatarUrl: "",
      isLoading: false,
      userId: null,
      isOpen: false,
      allowAccess: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ isOpen: true });
    }
  };
  handleClickInside = () => {
    this.setState({ isOpen: false });
  };
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const icons = [twitter, instagram, facebook, linkedin];
    const { portalName } = this.props;
    const pathName = window.location.pathname;
    if (pathName == "/admin" && isLoggedIn()) return <Redirect to="/login" />;
    if (portalName) {
      setPortalName(portalName);
    }

    return (
      <div className="apsp">
        <UserProvider>
          <div className="app-body">
            <ToastContainer
              autoClose={4000}
              pauseOnHover={false}
              toastClassName="toastRequestSuccess"
              bodyClassName="toastBody"
            />
            <main
              className="main drawer-container"
              style={{ position: "relative" }}
            >
              <NavBar />
              <>
                <div
                  className=""
                  ref={this.myRef}
                  onClick={this.handleClickInside}
                >
                  <Suspense>
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
                </div>
              </>
            </main>
          </div>
          <footer
            className={`footer`}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#FFFFFF",
            }}
          >
            <div className="container">
              <Suspense fallback={this.loading()}>
                <DefaultFooter
                  footerColor={"#182864"}
                  footerHeadingColor={"#FFFFFF"}
                  footerCopyRightsText={
                    "Sharemycharger.in. All rights reserved"
                  }
                  footerTextColor={"black"}
                  facebookUrl={"http://google.com"}
                  instagramUrl={"http://google.com"}
                  linkedInUrl={"http://google.com"}
                  twitterUrl={"http://google.com"}
                  youtubeUrl={"http://google.com"}
                  footerLogo={logo}
                  socialIcon={icons}
                />
              </Suspense>
            </div>
          </footer>
        </UserProvider>
      </div>
    );
  }
}

export default ShareMyChargerLayout;
