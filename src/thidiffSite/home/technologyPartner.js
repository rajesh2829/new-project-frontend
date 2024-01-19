import React from "react";
import ImageGridSection from "../../components/static/imageGridSection";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function TechnologyPartner() {
  return (
    <div>
      <ImageGridSection
        heading="Your Technology Partner"
        img={ThiDiffMedia.TechnologyPartnerImage}
        paragraph="We are a custom software development company focused on helping startups and mid-size businesses reach their full potential by building great websites and intuitive mobile apps.With us it is a real win-win – high-quality software at affordable prices."
        button="Get Started"
      />
    </div>
  );
}

export default TechnologyPartner;
