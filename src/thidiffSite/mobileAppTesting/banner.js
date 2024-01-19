import React from "react";
import Heading4 from "../../components/static/header/heading4";
import Image from "../../components/static/image";
import Background from "../assets/img/mobileTestingBanner.png";

function Banner() {
  return (
    <div>
      <Image
        bannerStyle={{
          backgroundImage: `url(${Background})`,
          height: "290px",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="container py-5">
        <Heading4
          heading="Mobile App Testing"
          className="font-weight-bold"
          style={{ color: "#113b95" }}
        />
        <paragraphContentSection
          paragraphclass="h5"
          paragraph="The quality of a mobile application affects its sustainability in the market.Test your mobile web and native mobile applications on multiple mobile devices that increasingly command adoption & usage for enterprise and everyday computing."
        />
      </div>
    </div>
  );
}

export default Banner;
