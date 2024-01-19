import React from "react";
import Heading5 from "./header/heading5";

const CardSection = (props) => {
  const {
    icon,
    style,
    pharagraph1,
    pharagraph2,
    heading,
    button,
    ButtonStyle,
  } = props;
  return (
    <div>
      <div class="card" style={style}>
        <div class="card-body">
          <div className="mx-auto">
            <img src={icon} alt="icons" className="mx-auto py-3" width="60" />
            <Heading5
              heading={heading}
              className="text-center font-weight-bold text-white py-2"
            />
            <p className="mx-auto text-white text-center">{pharagraph1}</p>
            <p className="mx-auto text-white text-center">{pharagraph2}</p>
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

export default CardSection;
