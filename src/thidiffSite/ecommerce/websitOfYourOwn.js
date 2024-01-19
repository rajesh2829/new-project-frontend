import React from "react";
import List from "../../components/static/list";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const WebsitOfYourOwn = () => {
  const arrayList = [
    {
      list: "100% customizable and accommodates 3rd party integrations",
    },
    {
      list: "Search engine and social media friendly",
    },
    {
      list: "Amazon cloud and dedicated server deployment",
    },
    {
      list: "Dashboards for Admin and sellers to know real-time sales updates",
    },
    {
      list: "Flexibility to set unique commission, shipping & seller subscription rates",
    },
    {
      list: "Exclusive profile pages for sellers and custom URLs for stores",
    },
  ];
  return (
    <>
      <div
        className="d-none d-md-block"
        style={{
          height: "716px",
          backgroundColor: "#f8f8f8",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img
          src={ThiDiffMedia.MarketPlaceSection}
          className="img-fluid mx-auto"
        />
      </div>
      <div
        className="d-block d-md-none py-4"
        style={{ backgroundColor: "#F8F8F8" }}
      >
        <div className="container">
          <h4
            className="text-center font-weight-bold"
            style={{ color: "#224a8b" }}
          >
            Create A Fully-Loaded Marketplace Website of Your Own{" "}
          </h4>
          <List arrayList={arrayList} />
        </div>
      </div>
    </>
  );
};

export default WebsitOfYourOwn;
