import React from "react";
import Heading4 from "./header/Heading4";

const TwoCard = (props) => {
  const { heading, img, icon, content, button, url, subcontent } = props;
  return (
    <div>
      <div class="card shadow" style={{ height: "255px" }}>
        <div class="card-body">
          <Heading4
            heading={heading}
            className="font-weight-bold py-2"
            style={{ color: "#113b95" }}
          />
          <div class="card-text d-flex py-2">
            <img src={img} width="30px" height="25px" />
            <paragraphContentSection
              paragraph={content}
              Subpharagraph={subcontent}
              paragraphclass="pl-md-4 "
              style={{ width: "316px" }}
            />
          </div>
          <div className="d-flex py-2">
            <img src={icon} width="40px"></img>
            <a href={url} class="card-link py-2 mx-4">
              {button}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoCard;
