import React from "react";
import CardSection from "./cardSection";

const IconCard = (props) => {
  const { arrayList, className, style } = props;
  const column = 12 / arrayList.length;
  return (
    <div>
      <div className="container">
        <div className="row py-5">
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <div className={data.col}>
                <CardSection
                  icon={data.icon}
                  style={{
                    backgroundColor: data.color,
                    minHeight: " 300px",
                    maxHeight: "400px",
                  }}
                  pharagraph1={data.paragraph}
                  heading={data.heading}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default IconCard;
