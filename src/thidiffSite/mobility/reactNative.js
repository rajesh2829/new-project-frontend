import React from "react";
import HorizontalSpace from "../../components/HorizontalSpace";
import Heading4 from "../../components/static/header/heading4";
import VerticalSapce from "../../components/VerticalSapce";
import icon from "../assets/icons/react.png";
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function ReactNative() {
  return (
    <div>
      <div className="container d-none d-md-block">
        <div className="row">
          <div className="col-md-6 py-4">
            <img src={ThiDiffMedia.nativeSection} />
          </div>
          <div className="col-md-6 bg-white py-4">
            <div className="py-5">
              <img src={icon} />
              <Heading4
                className="font-weight-bold mx-4"
                heading="React Native App Development"
                style={{ marginTop: "-34px", color: "#113b95" }}
              />
              <paragraphContentSection
                paragraphclass="py-5 mx-2"
                paragraph="As a reputed mobile app development company in India, we offer top-class native mobile app development services to deliver the best mobile experiences and help your business grow as well as reach a wider audience."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container d-block d-md-none">
        <div className="row">
          <div className="col-md-6 py-4">
            <img src={icon} />
            <Heading4
              className="font-weight-bold mx-4"
              heading="React Native App Development"
              style={{ marginTop: "-34px", color: "#113b95" }}
            />
            <HorizontalSpace bottom="5">
              <VerticalSapce marginspace="2">
                <paragraphContentSection
                  paragraphclass="py-5 mx-2"
                  paragraph="As a reputed mobile app development company in India, we offer top-class native mobile app development services to deliver the best mobile experiences and help your business grow as well as reach a wider audience."
                />
              </VerticalSapce>
            </HorizontalSpace>
          </div>
          <div className="col-md-6 bg-white py-4">
            <div className="py-5">
              <img src={ThiDiffMedia.nativeSection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactNative;
