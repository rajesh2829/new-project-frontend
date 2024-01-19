import React from "react";
import Banner from "./banner";
import JoinTem from "./joinTem";
import OurCulture from "./ourCulture";
import OurVision from "./ourVision";
import ThidiffTeam from "./thidiffTeam";
import WhoWeAre from "./whoWeAre";

function About() {
  return (
    <div>
      <Banner />
      <WhoWeAre />
      <OurVision />
      <OurCulture />
      <ThidiffTeam />
      <JoinTem />
    </div>
  );
}

export default About;
