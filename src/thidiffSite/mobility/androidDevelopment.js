import React from "react";
import Heading4 from "../../components/static/header/heading4";
import VerticalSapce from "../../components/VerticalSapce";
import icon from "../assets/icons/android.png";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function AndroidDevelopment() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 py-4 bg-white">
            <VerticalSapce bottom="5">
              <img src={icon} />
              <Heading4
                className="font-weight-bold mx-4"
                heading="Android App Development"
                style={{ marginTop: "-34px", color: "#113b95" }}
              />
              <paragraphContentSection
                paragraphclass="py-5 mx-2"
                paragraph="Android is the popular mobile operation system in the market and vital part of great mobile strategy. We have many specialists in java and android development working on large scale projects and ready to take on yours."
              />
            </VerticalSapce>
          </div>
          <div className="col-md-6 py-4">
            <img src={ThiDiffMedia.AndroidSection} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AndroidDevelopment;
