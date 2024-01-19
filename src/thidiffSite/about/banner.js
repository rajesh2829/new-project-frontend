import React from "react";
import Image from "../../components/static/image";
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function Banner() {
  return (
    <>
      <div className="d-none d-md-block">
        <Image
          bannerStyle={{
            backgroundImage: `url(${ThiDiffMedia.clientBanner})`,
            height: "290px",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      </div>
      <div className="d-block d-md-none">
        <Image
          bannerStyle={{
            backgroundImage: `url(${ThiDiffMedia.clientBanner})`,
            height: "290px",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </>
  );
}

export default Banner;
