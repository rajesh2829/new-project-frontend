import React, { Component } from "react";
import detectBrowser from "../lib/DetectBrowser";
import MyContext from "./myContext";

class MyProvider extends Component {
  state = {
    menuToggled: false,
    isMobile: detectBrowser()
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          menuToggled: this.state.menuToggled,
          isMobile: this.state.isMobile,
          updateMenuToggled: () => {
            this.setState({
              menuToggled: !this.state.menuToggled
            });
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
