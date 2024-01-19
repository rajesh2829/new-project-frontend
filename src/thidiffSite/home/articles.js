import React from "react";
import HorizontalSpace from "../../components/HorizontalSpace";
import ContentCardSection3 from "../../components/static/contentCardSection3";
import Heading3 from "../../components/static/header/heading3";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const Artical = () => {
  const arrayList = [
    {
      col: "col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12 py-2",
      img: ThiDiffMedia.Blog,
      subheading: "Why Startups Need Extended Teams",
      button: "Learn more",
    },
    {
      col: "col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12  py-2",
      img: ThiDiffMedia.BlogTwo,
      subheading: "Why Extended Team Model Beats Outsourcing Model",
      button: "Learn more",
    },
  ];
  return (
    <div>
      <Heading3
        className="text-center font-weight-bold py-2"
        heading="Recent Articles"
        style={{ color: "#224a8b" }}
      />
      <HorizontalSpace bottom="5">
        <ContentCardSection3 arrayList={arrayList} />
      </HorizontalSpace>
    </div>
  );
};

export default Artical;
