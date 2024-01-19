import React from "react";
import Heading4 from "../../components/static/header/heading4";
import mobile from "../assets/icons/tick.png";

const Testing = (props) => {
  const arrayList = [
    {
      col: "col-md-6 py-2",
      icon: mobile,
      heading: "What is mobile testing",
    },
    {
      col: "col-md-6 py-2",
      icon: mobile,
      heading: "Types of mobile testing",
    },
  ];
  return (
    <div>
      <div className="container shadow " style={{ backgroundColor: "#f8f8f8" }}>
        <div className="row py-4">
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <div className={data.col}>
                <img className="mx-auto" src={data.icon} alt="icon" />
                <Heading4
                  className="font-weight-bold text-center py-3"
                  heading={data.heading}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testing;
