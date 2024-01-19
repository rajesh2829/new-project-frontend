import React from "react";
import HorizontalSpace from "../../components/HorizontalSpace";
import ContentCardSection3 from "../../components/static/contentCardSection3";
import Heading3 from "../../components/static/header/heading3";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const LookingFor = () => {
  const arrayList = [
    {
      col: "col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12   py-2",
      img: ThiDiffMedia.connect,
      heading: "MANAGED PROJECTS",
      pharagrap:
        "Web and mobile apps, MVPs. Small, medium and large projects. Fixed scope or agile development.",
    },
    {
      col: "col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12  py-2",
      img: ThiDiffMedia.deticated,
      heading: "DEDICATED TEAMS",
      pharagrap:
        "Long-term development. Direct collaboration or managed teams of different sizes and expertise.",
    },
    {
      col: "col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12   py-2",
      img: ThiDiffMedia.demand,
      heading: "ON-DEMAND SERVICES",
      pharagrap:
        "Hourly and monthly based professional support for your business. Everything you need to grow fast.",
    },
  ];
  return (
    <div>
      <Heading3
        className="text-center font-weight-bold"
        heading="What are you Looking For?"
        style={{ color: "#224a8b" }}
      />

      <HorizontalSpace bottom="5">
        <ContentCardSection3 arrayList={arrayList} />
      </HorizontalSpace>
    </div>
  );
};

export default LookingFor;
