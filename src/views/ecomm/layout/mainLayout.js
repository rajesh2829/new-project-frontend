import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import bookMyCanlogo from "../../ecomm/assets/img/bookMyWaterCanLogo.svg";
import img from "../../ecomm/assets/img/bookMyWaterCan.png";
import Header1 from "../../../components/header/header1";
import routes from "../routes";
import MyContext from "../../../context/myContext";

const Footer1 = React.lazy(() => import("../../../components/footer/footer1"));

class EcommLayout extends Component {
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
      contextState: {},
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
    return (
      <MyContext.Provider value={this.state.contextState}>
        <MyContext.Consumer>
          {(contextStateValue) => (
            (
              <div className="app">
                <div className="app-body">
                  <ToastContainer
                    autoClose={4000}
                    pauseOnHover={false}
                    toastClassName="toastRequestSuccess"
                    bodyClassName="toastBody"
                  />
                  <main
                    className="main drawer-container "
                    style={{
                      position: "relative",
                      backgroundColor: "#1075bc",
                      minHeight: "100vh",
                    }}
                  >
                    <>
                      <div
                        style={{ backgroundColor: "#1075bc" }}
                        className="container p-0 "
                        ref={this.myRef}
                        onClick={this.handleClickInside}
                      >
                        <Suspense>
                          <Header1
                            className="navbar-expand-lg grad"
                            logo={img}
                            //   Navlist={bookMyWaterCanConstant.getNavList()}
                            //   icon1={person}
                            //   icon2={cart}
                            contextStateValue={contextStateValue}
                          />
                          <div style={{ backgroundColor: "#1075bc" }}>
                            <Switch>
                              {routes.map((route, idx) => {
                                return route.component ? (
                                  <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props) => (
                                      <route.component
                                        {...props}
                                        contextStateValue={contextStateValue}
                                        contextState={(values) =>
                                          this.setState({
                                            contextState: values,
                                          })
                                        }
                                      />
                                    )}
                                  />
                                ) : null;
                              })}
                            </Switch>
                          </div>
                        </Suspense>
                      </div>
                      <footer
                        className={`footer text-white`}
                        style={{
                          backgroundColor: "#1075bc",
                          position: "fixed",
                          bottom: 0,
                          width: "100%",
                        }}
                      >
                        <div className="container text-center">
                          <Suspense fallback={this.loading()}>
                            <Footer1
                              footerLogo={bookMyCanlogo}
                              footerColor={"#1075bc"}
                              footerCopyRightsText={
                                "BookMyWaterCan.com All rights reserved. Site Map"
                              }
                            />
                          </Suspense>
                        </div>
                      </footer>
                    </>
                  </main>
                </div>
              </div>
            )
          )}
        </MyContext.Consumer>
      </MyContext.Provider>
    );
  }
}

export default EcommLayout;
