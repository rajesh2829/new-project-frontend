import React from "react";
import Image from "../../components/static/image";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function Banner() {
  return (
    <div>
      <Image
        bannerStyle={{
          backgroundImage: `url(${ThiDiffMedia.BannerSection})`,
          height: "290px",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}

export default Banner;
