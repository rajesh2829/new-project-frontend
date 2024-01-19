import React from "react";
import Heading3 from "../../components/static/header/heading3";
import IconCard from "../../components/static/iconCard";
import ourmission from "../assets/img/ourMission.png";
import ourvision from "../assets/img/ourVision.png";
import Philosophy from "../assets/img/philosophy.png";

const OurVision = () => {
  const arrayList = [
    {
      col: "col-md-4 py-3",
      icon: ourvision,
      color: "#224a8b",
      heading: "Our Vision",
      paragraph:
        "To support our clients unleash the potential of global delivery, by building world-class extended teams and to provide world class delivery on product development and testing services.",
    },
    {
      col: "col-md-4 py-3",
      icon: ourmission,
      color: "#028f82",
      heading: "Our Mission",
      paragraph:
        "We listen to our clients convert their ideas into reality by building and delivering technology solutions as per their needs.",
    },
    {
      col: "col-md-4 py-3",
      icon: Philosophy,
      color: "#dd776a",

      heading: "Our Philosophy",
      paragraph:
        "We believe that to achieve the business value, we require a perfect blend of best technology and a passionate team.",
    },
  ];
  return (
    <div>
      <Heading3
        className="text-center font-weight-bold"
        heading="What are you Looking For?"
        style={{ color: "#224a8b" }}
      />
      <IconCard arrayList={arrayList} />
    </div>
  );
};

export default OurVision;
