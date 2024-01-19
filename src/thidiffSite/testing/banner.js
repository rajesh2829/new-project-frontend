import React from "react";
import { Container } from "reactstrap";
import HorizontalSpace from "../../components/HorizontalSpace";
import Image from "../../components/static/image";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";
function Banner() {
  return (
    <div>
      <Image
        bannerStyle={{
          backgroundImage: `url(${ThiDiffMedia.TestingBannerSection})`,
          height: "290px",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Container>
        <HorizontalSpace bottom="5">
          <paragraphContentSection
            paragraphclass="text-center "
            paragraph="ThiDiff offers full-cycle testing and quality assurance services for desktop and mobile applications. Expert test engineers are an integral part of every project we work on, to ensure the deliverables meet the most stringent quality standards."
          />
        </HorizontalSpace>
      </Container>
    </div>
  );
}

export default Banner;
