import React from "react";
import Heading4 from "../../components/static/header/heading4";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";
function BuildYourTeam() {
  return (
    <div>
      <div className="container py-4 d-none d-md-block">
        <div className="row">
          <div className="col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12 ">
            <img src={ThiDiffMedia.BuildYourTeamSection} alt="banner" />
          </div>
          <div className="col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12 ">
            <Heading4
              heading="Let's Build Your Team"
              className="font-weight-bold text-center  py-4"
              style={{ color: "#113b95" }}
            />
            <paragraphContentSection
              paragraphclass="text-center py-2"
              paragraph="Manage your projects with our hand-picked team which supports you to deliver your goals, as an extension of your in-house team."
              subpharagraphclass="text-center py-4"
              Subpharagraph="We specialize in building distributed agile teams that seamlessly integrate with your existing teams through our unique extended office global delivery model."
            />
          </div>
        </div>
      </div>
      <div className="container py-4 d-block d-md-none">
        <div className="row">
          <div className="col-md-6">
            <Heading4
              heading="Let's Build Your Team"
              className="font-weight-bold text-center  py-4"
              style={{ color: "#113b95" }}
            />
            <paragraphContentSection
              paragraphclass="text-center py-2"
              paragraph="Manage your projects with our hand-picked team which supports you to deliver your goals, as an extension of your in-house team."
              subpharagraphclass="text-center py-4"
              Subpharagraph="We specialize in building distributed agile teams that seamlessly integrate with your existing teams through our unique extended office global delivery model."
            />
          </div>
          <div className="col-md-6">
            <img src={ThiDiffMedia.BuildYourTeamSection} alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildYourTeam;
