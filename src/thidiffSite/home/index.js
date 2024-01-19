import React, { Component } from "react";
import Artical from "./articles";
import Banner from "./banner";
import Client from "./client";
import LookingFor from "./lookingFor";
import TechnologiesPlatforms from "./technologiesPlatforms";
import TechnologyPartner from "./technologyPartner";
import TechnologyTeam from "./technologyTeam";

export default class Home1 extends Component {
  render() {
    return (
      <div>
        <Banner />
        <TechnologyPartner />
        <TechnologyTeam />
        <TechnologiesPlatforms />
        <LookingFor />
        <Client />
        <Artical />
      </div>
    );
  }
}
