import React from "react";
import MultiCardSection from "../../components/static/multiCardSection";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function TechnologyTeam() {
  return (
    <div>
      <MultiCardSection
        iconOne={ThiDiffMedia.extended}
        iconTwo={ThiDiffMedia.mobility}
        iconThree={ThiDiffMedia.Testing}
        iconFour={ThiDiffMedia.chrome}
        iconFive={ThiDiffMedia.ecommrece}
        button="Learn more"
        ButtonOne={{ position: "relative", top: "24px" }}
        ButtonTwo={{ position: "relative", top: "30px" }}
        ButtonThree={{ position: "relative", top: "34px" }}
        ButtonFour={{ position: "relative", top: "79px" }}
        ButtonFive={{ position: "relative", top: "60px" }}
        heading="Your Technology Team"
        headingOne="Extended Team"
        headingTwo="Mobility"
        headingThree="Testing"
        headingFour="Chrome Extension"
        headingFive="E-Commerce"
        pharagraphOne="Get your team customized by your requirements Development or Testing? Doesn't Matter.."
        pharagraph1="Our clients have experienced greater flexibility, increased ROI and faster time to market by leveraging the ThiDiff Global Extended Teams. Yes. We have proven that."
        pharagraphTwo="Mobility refers to the creation of apps for use on devices such as tablets, smartphones, automobiles and watches."
        pharagraph2="We follows the latest mobile technologies, applications which has contributed to the successful mobile projects so far and stimulates rapid creation of highly functional and well-looking applications."
        pharagraphThree="ThiDiff offers full-cycle testing and quality assurance services for desktop and mobile applications. Expert test engineers are an integral part of every project we work on, to ensure the deliverables meet the most stringent quality standards."
        pharagraphFour="ThiDiff will make a chrome extension and we follows the latest technologies to develop Google Chrome as well as all the other chromium based browsers."
        pharagraphFive="We have an excellent team of ecommerce experts who are constantly experimenting and implementing innovative ideas that will transform website designs into a gold mine for your business."
      />
    </div>
  );
}

export default TechnologyTeam;
