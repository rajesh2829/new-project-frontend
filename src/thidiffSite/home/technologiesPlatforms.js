import React from "react";
import Heading3 from "../../components/static/header/heading3";
import ImageCarousel from "../../components/static/imageCarousel";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";
const TechnologiesPlatforms = () => {
  const logo = [
    {
      icon: ThiDiffMedia.css,
    },
    {
      icon: ThiDiffMedia.html,
    },
    {
      icon: ThiDiffMedia.bootstrap,
    },
    {
      icon: ThiDiffMedia.nodejs,
    },
    {
      icon: ThiDiffMedia.wordpress,
    },
    {
      icon: ThiDiffMedia.react,
    },
    {
      icon: ThiDiffMedia.javascript,
    },
    {
      icon: ThiDiffMedia.technologiesruby,
    },
    {
      icon: ThiDiffMedia.php,
    },
    {
      icon: ThiDiffMedia.amazon,
    },
    {
      icon: ThiDiffMedia.selenium,
    },
    {
      icon: ThiDiffMedia.android,
    },
    {
      icon: ThiDiffMedia.magento,
    },
    {
      icon: ThiDiffMedia.ios,
    },
    {
      icon: ThiDiffMedia.docker,
    },
    {
      icon: ThiDiffMedia.durbal,
    },
    {
      icon: ThiDiffMedia.mysql,
    },
    {
      icon: ThiDiffMedia.monogo,
    },
  ];

  return (
    <div className="container py-5">
      <Heading3
        className="text-center font-weight-bold py"
        heading="Technologies and Platforms We Work With"
        style={{ color: "#224a8b" }}
      />
      <div className="py-5">
        <ImageCarousel photos={logo} arrows={true} />
      </div>
    </div>
  );
};

export default TechnologiesPlatforms;
