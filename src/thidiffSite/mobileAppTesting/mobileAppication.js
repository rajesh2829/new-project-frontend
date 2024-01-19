import React from "react";
import Heading4 from "../../components/static/header/heading4";
import teamwork from "../assets/img/teamWork.png";

function MobileAppication() {
  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          <div className="col-md-6 py-5">
            <Heading4
              className="font-weight-bold mx-4 "
              heading="What is Mobile Application Testing?"
              style={{ marginTop: "-34px", color: "#113b95" }}
            />
            <paragraphContentSection
              paragraphclass="py-5 mx-2 h5"
              paragraph="Mobile application testing can be automated or manual, and helps you ensure that the application you’re delivering to users meets all business requirements as well as user expectations."
            />
            <paragraphContentSection
              paragraphclass="h5 mx-2"
              paragraph="In all software development processes, mobile app testing is a must before an app is released into the marketplace. This step ensures the final product functions properly throughout its customer experience journey."
            />
          </div>
          <div className="col-md-6 bg-white py-4">
            <div className="">
              <img src={teamwork} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileAppication;
