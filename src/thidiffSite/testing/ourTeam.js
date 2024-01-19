import React from "react";
import HorizontalSpace from "../../components/HorizontalSpace";
import Heading3 from "../../components/static/header/heading3";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";
function OurTeam() {
  return (
    <div>
      <div className="container py-3">
        <Heading3
          className="font-weight-bold py-5"
          style={{ color: "#113b95" }}
          heading="Our team uses a well-defined, no-nonsense testing process that typically includes the followes steps includes the followes steps"
        />
        <HorizontalSpace bottom="4">
          <img src={ThiDiffMedia.OurTeamImage} alt="img" />
        </HorizontalSpace>
      </div>
    </div>
  );
}

export default OurTeam;
