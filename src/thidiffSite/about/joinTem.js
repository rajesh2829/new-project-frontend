import React from "react";
import { Link } from "react-router-dom";
import BackGroundImage from "../../components/static/header/backGroundImage";
import Headind5 from "../../components/static/header/heading5";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

function JoinTem() {
  return (
    <div>
      <div className="d-none d-md-block">
        <BackGroundImage
          bannerStyle={{
            backgroundImage: `url(${ThiDiffMedia.JoinTeamSection})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          heading="Join Team"
        />
      </div>
      <div className="d-block d-md-none">
        <BackGroundImage
          bannerStyle={{
            backgroundImage: `url(${ThiDiffMedia.JoinTeamSection})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      </div>
      <div className="container d-none d-md-block">
        <div className="row py-3">
          <div className="col-md-6">
            <Headind5
              className="py-2 float-right font-weight-bold"
              heading="Have a Project in mind?"
              style={{ color: "#113b95" }}
            />
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#113b95" }}
            >
              <Link className="text-white" to="/contact">
                Contact Us
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="container d-block d-md-none">
        <div className="text-center">
          <div className="">
            <Headind5
              className="py-2  font-weight-bold"
              heading="Have a Project in mind?"
              style={{ color: "#113b95" }}
            />
          </div>
          <div className="">
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#113b95" }}
            >
              <Link className="text-white" to="/contact">
                Contact Us
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinTem;
