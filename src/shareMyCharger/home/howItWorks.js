import React from "react";
import ContentSectionTwo from "../../components/static/contentSectionTwo";
import Heading4 from "../../components/static/header/heading4";
import connect from "../assets/img/connect.png";

const HowItWorks = () => {
  const arrayList = [
    {
      col: "col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12",
      img: connect,
      heading: "Connect",
      pharagrap:
        "Download our app to get started. Connect with thousands of people who are sharing their charger and  charging their vehicles.",
    },
    {
      col: "col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12",
      img: connect,
      heading: "Connect",
      pharagrap:
        "Download our app to get started. Connect with thousands of people who are sharing their charger and  charging their vehicles.",
    },
    {
      col: "col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12",
      img: connect,
      heading: "Connect",
      pharagrap:
        "Download our app to get started. Connect with thousands of people who are sharing their charger and  charging their vehicles.",
    },
  ];
  return (
    <div>
      <Heading4
        heading="How it Works"
        className="text-center font-weight-bold py-5"
      />
      <ContentSectionTwo arrayList={arrayList} />
    </div>
  );
};

export default HowItWorks;
