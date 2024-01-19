import React from "react";
import { Container } from "reactstrap";
import HorizontalSpace from "../../components/HorizontalSpace";
import ImageList from "../../components/static/imageList";
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const Shopify = () => {
  const arrayList = [
    {
      list: "Fully customizable website, online store, and blog.",
    },
    {
      list: "Unlimited bandwidth, product inventory, and customer data.",
    },
    {
      list: "Sell on new sales channels like Pinterest and Amazon.",
    },
    {
      list: "All popular payment gateways supported.",
    },
    {
      list: "Automate your fulfillment process with 3rd party shipping apps.",
    },
    {
      list: "24/7 award-winning customer support.",
    },
  ];
  return (
    <div className="bg-white">
      <Container>
        <HorizontalSpace bottom="5">
          <ImageList
            arrayList={arrayList}
            img={ThiDiffMedia.ShopifySection}
            heading="Shopify"
            headingClass="font-weight-bold py-4"
            style={{ color: "#234a8b" }}
          />
        </HorizontalSpace>
      </Container>
    </div>
  );
};

export default Shopify;
