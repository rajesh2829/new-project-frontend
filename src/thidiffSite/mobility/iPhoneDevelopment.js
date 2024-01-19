import React from "react";
import HorizontalSpace from "../../components/HorizontalSpace";
import Heading4 from "../../components/static/header/heading4";
import VerticalSapce from "../../components/VerticalSapce";
import icon from "../assets/icons/ios.png";
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function IphoneDevelopment() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 py-5 bg-white">
            <div className="py-4">
              <img src={icon} />
              <Heading4
                className="font-weight-bold mx-4"
                heading="iPhone App Development"
                style={{ marginTop: "-34px", color: "#113b95" }}
              />

              <HorizontalSpace bottom="5">
                <VerticalSapce marginspace="2">
                  <paragraphContentSection paragraph="Create beautiful mobile applications for Apple's popular mobile operating system and get your product shining on the hundreds of millions of iOS devices like iPads, iPhones and iPods." />
                </VerticalSapce>
              </HorizontalSpace>
            </div>
          </div>
          <div className="col-md-6 py-5">
            <img src={ThiDiffMedia.iosSection} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IphoneDevelopment;
