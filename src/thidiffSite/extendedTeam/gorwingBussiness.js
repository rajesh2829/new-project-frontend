import React from "react";
import Heading3 from "../../components/static/header/heading3";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function GorwingBussiness() {
  return (
    <div>
      <div
        className="jumbotron jumbotron-fluid  img-fluid mb-0"
        style={{
          backgroundImage: `url(${ThiDiffMedia.growingSection})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <div className="container">
          <div className=" d-table-cell  " style={{ height: "200px" }}>
            <div className="py-2">
              <Heading3
                className=" font-weight-bold  text-left"
                heading="Get on with growing your business"
                style={{ color: "#113b95" }}
              />
              <div className="col-md-8">
                <paragraphContentSection
                  paragraphclass="font-weight-bold py-4"
                  paragraph="Let us help you make your website work harder for you - get in touch with us today to find out more"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GorwingBussiness;
