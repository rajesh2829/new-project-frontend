import React, { Component } from "react";
import Banner from "../../components/static/banner";
import * as ShareMyCharegerMedia from "../../helpers/ShareMyChargerMedia";
export default class Bannner extends Component {
  render() {
    return (
      <div>
        <Banner
          heading="Find an electric charger near you to charge your electric
                  vehicle fast"
          paragraph="Are you having trouble finding an electric charging station
          near you? Don't worry, sharemycharger.in has the best solution
          for you."
          img={ShareMyCharegerMedia.HomeBanner}
          button="Search"
          placeholder="Enter your location"
        />
      </div>
    );
  }
}
