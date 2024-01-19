import React from "react";
import SingleGrid from "../../components/static/singleGrid";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";
function Banner() {
  return (
    <div>
      <div className="d-none d-md-block">
        {}
        <SingleGrid
          bannerStyle={{
            backgroundImage: `url(${ThiDiffMedia.HomeBackgroundBanner})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          heading="LOOKING FOR GLOBAL EXTENDED TEAM FOR YOUR BUSINESS ?"
          paragraph=" We help tech startups to build their global extended team in
        Bangalore, India"
          submitbutton="GET STARTED"
        />
      </div>
      <div className="d-block d-md-none">
        {}
        <SingleGrid
          bannerStyle={{
            backgroundImage: `url(${ThiDiffMedia.HomeBackgroundBanner})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          heading="LOOKING FOR GLOBAL EXTENDED TEAM FOR YOUR BUSINESS ?"
          paragraph=" We help tech startups to build their global extended team in
        Bangalore, India"
          paragraphclassName=" mr-5 text-white h5 py-3"
          submitbutton="GET STARTED"
          buttonclassName="btn btn-outline-dark border border-white btn-lg text-white"
        />
      </div>
    </div>
  );
}

export default Banner;
