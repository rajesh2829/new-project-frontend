import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setPortalFavicon, setPortalName } from "../../lib/Portal";
import fb from "../assets/icons/fb.png";
import facebook from "../assets/img/facebook.png";
import instagram from "../assets/img/instagram.png";
import linkedin from "../assets/img/linkedin.png";
import twitter from "../assets/img/twitter.png";
//Assets
import NavigationMenu from "../header/navigation";
// routes config
import routes from "../routes";
import DefaultFooter from "./defaultFooter";

class ThidiffLayout extends Component {
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
  render() {
    const icons = [twitter, instagram, facebook, linkedin];
    const socilaicons = [twitter, instagram, fb, linkedin];
    const { portalName, poratlfavicon } = this.props;

    if (portalName) {
      setPortalName(portalName);
    }

    if (poratlfavicon) {
      setPortalFavicon(poratlfavicon);
    }
    return (
      <div className="app">
        <div className="app-body">
          <ToastContainer
            autoClose={4000}
            pauseOnHover={false}
            toastClassName="toastRequestSuccess"
            bodyClassName="toastBody"
          />
          <main className="main drawer-container position-relative">
            <NavigationMenu />
          </main>
          <Suspense fallback={this.loading()}>
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
        <div className="d-none d-md-block">
          <footer
            className={`footer`}
            style={{
              backgroundColor: "#224a8b",
              color: "#FFFFFF",
            }}
          >
            <div className="container">
              <DefaultFooter
                footerColor={"#182864"}
                footerHeadingColor={"#FFFFFF"}
                footerCopyRightsText={
                  " ThiDiff Technologies. All rights reserved.Privacy Policy |  "
                }
                footerCopyRightsTextOne={"Terms of Use |"}
                footerCopyRightsTextTwo={"Site Map"}
                footerTextColor={"white"}
                facebookUrl={"http://google.com"}
                instagramUrl={"http://google.com"}
                linkedInUrl={"http://google.com"}
                twitterUrl={"http://google.com"}
                youtubeUrl={"http://google.com"}
                footerLogo={facebook}
                socialIcon={icons}
              />
            </div>
          </footer>
        </div>
        <div className="d-block d-md-none">
          <footer
            className={`footer`}
            style={{
              backgroundColor: "#fff",
              color: "#FFFFFF",
            }}
          >
            <div className="d-block d-md-none">
              <DefaultFooter
                footerColor={"#182864"}
                footerHeadingColor={"#000000"}
                footerCopyRightsText={
                  " ThiDiff Technologies. All rights reserved.Privacy Policy | Terms of Use | Site Map"
                }
                footerTextColor={"#000000"}
                facebookUrl={"http://google.com"}
                instagramUrl={"http://google.com"}
                linkedInUrl={"http://google.com"}
                twitterUrl={"http://google.com"}
                youtubeUrl={"http://google.com"}
                // footerLogo={fb}
                socialIcon={socilaicons}
              />
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default ThidiffLayout;
