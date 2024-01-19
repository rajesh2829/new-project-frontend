import React from "react";
import Heading4 from "../../components/static/header/heading4";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function JoinUs() {
  return (
    <div>
      <div className="container py-3">
        <Heading4
          className="text-center font-weight-bold h3 py-3"
          heading="Come join us on an excting ride..."
          style={{ color: "#113b95" }}
        />
        <img src={ThiDiffMedia.joinus} className="w-100 img-fluid py-2" />
      </div>
    </div>
  );
}

export default JoinUs;
