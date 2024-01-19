import React from "react";
import { Container } from "reactstrap";
import HorizontalSpace from "../../components/HorizontalSpace";
import ImageList from "../../components/static/imageList";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";
const WooCommerce = () => {
  const arrayList = [
    {
      list: "Seamless WordPress Integration",
    },
    {
      list: "It’s an Open Source Development Platform",
    },
    {
      list: "Unprecedented Flexibility",
    },
    {
      list: "In-Built Payment Processing",
    },
    {
      list: "Large Library of Extensions",
    },
    {
      list: "Extensive Theme Options",
    },
    {
      list: "Simple & Robust",
    },
    {
      list: "The SEO Advantage",
    },
    {
      list: "Managing Orders is As Easy as a Pie",
    },
    {
      list: "Smooth Integration with Your Marketing Tools",
    },
  ];
  return (
    <div className="bg-white">
      <Container>
        <HorizontalSpace bottom="4">
          <ImageList
            arrayList={arrayList}
            img={ThiDiffMedia.WooCommerceSection}
            heading="WooCommerce"
            headingClass="font-weight-bold py-4"
            style={{ color: "#234a8b" }}
          />
        </HorizontalSpace>
      </Container>
    </div>
  );
};

export default WooCommerce;
