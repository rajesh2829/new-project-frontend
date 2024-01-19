import React, { Component } from "react";
import Banner from "./bannner";
import Count from "./count";
import EarnCash from "./earnCash";
import HowItWorks from "./howItWorks.js";
class Home extends Component {
  render() {
    return (
      <div>
        <Banner />
        <Count />
        <HowItWorks />
        <EarnCash />
      </div>
    );
  }
}
export default Home;
