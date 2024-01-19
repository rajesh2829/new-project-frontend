import React, { Component } from "react";
import TwoColumnContentSection from "../../components/static/twoColumnContentSection";
//config
import * as ShareMyCharegerMedia from "../../helpers/ShareMyChargerMedia";
export default class EarnCash extends Component {
  render() {
    return (
      <TwoColumnContentSection
        img={ShareMyCharegerMedia.EarncashBanner}
        paragraph="Earn at your own time by sharing your charger. Set your hours
    based on your own convenience. Don't have a charger? Don't
    worry. Get a charger based on our recommendations. So what are
    you waiting for? Click on the link below to start earning now."
        heading="Earn cash by sharing your charger"
        button="Start Sharing Now"
      />
    );
  }
}
