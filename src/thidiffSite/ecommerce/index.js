import React from "react";
import Banner from "./banner";
import Magento from "./magento";
import Shopify from "./shopify";
import WebsitOfYourOwn from "./websitOfYourOwn";
import WooCommerce from "./wooCommerce";

function Ecommerce() {
  return (
    <div>
      <Banner />
      <Shopify />
      <Magento />
      <WooCommerce />
      <WebsitOfYourOwn />
    </div>
  );
}

export default Ecommerce;
