import React from "react";
import Heading5 from "./header/heading5";

const ThreeColumnCard = (props) => {
  const {
    icon,
    width,
    pharagraph1,
    pharagraph2,
    paragraphclassName2,
    paragraphclassName1,
    heading,
    button,
    ButtonStyle,
  } = props;
  return (
    <div>
      <div class="card shadow" style={{ minHeight: "300px" }}>
        <div class="card-body">
          <div className="mx-auto">
            <img
              src={icon}
              alt="icons"
              className="mx-auto py-3"
              width={width}
            />
            {heading && (
              <Heading5
                heading={heading}
                className="text-center font-weight-bold text-white py-2"
              />
            )}
            {pharagraph1 && (
              <p
                className={
                  paragraphclassName1
                    ? paragraphclassName1
                    : "mx-auto text-dark text-center"
                }
              >
                {pharagraph1}
              </p>
            )}
            {pharagraph2 && (
              <p
                className={
                  paragraphclassName2
                    ? paragraphclassName2
                    : "mx-auto text-dark text-center"
                }
              >
                {pharagraph2}
              </p>
            )}
            {button && (
              <button class="btn text-white float-right" style={ButtonStyle}>
                {button}
                <i class="fa fa-arrow-right mx-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnCard;
