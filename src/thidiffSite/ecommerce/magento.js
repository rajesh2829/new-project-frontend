import React from "react";
import ImageList from "../../components/static/imageList";
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const Magento = () => {
  const arrayList = [
    {
      list: "Catalog Management.",
    },
    {
      list: "Tools for Advertising and Marketing",
    },
    {
      list: "Fully SEO Centred",
    },
    {
      list: "Mobile Friendly Commerce",
    },
    {
      list: "Order Management",
    },
    {
      list: "Complete Site Management",
    },
    {
      list: "Checkout, Shipping, and Payment",
    },
    {
      list: "User Account",
    },
    {
      list: "Customer Service and International Support",
    },
    {
      list: "Tracking, Analytics, and Reporting",
    },
  ];
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <div className="container py-5">
        <ImageList
          arrayList={arrayList}
          img={ThiDiffMedia.MagentoSection}
          heading="Magento 1 / Magento 2"
          headingClass="font-weight-bold py-4"
          style={{ color: "#234a8b" }}
        />
      </div>
    </div>
  );
};

export default Magento;
