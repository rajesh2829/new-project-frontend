import React from "react";
import Heading4 from "../../components/static/header/heading4";
import ThreeColumnCard from "../../components/static/threeColumnCard";
import focus from "../assets/icons/focus.png";
import goal from "../assets/icons/goal.png";
import time from "../assets/icons/time.png";

const DeticatedTeam = () => {
  return (
    <div>
      <div className="container py-5">
        <Heading4
          heading="Why our clients choose the dedicated development team"
          className="font-weight-bold text-center  py-4"
          style={{ color: "#113b95" }}
        />
        <div className="row">
          <div className="col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12  py-2">
            <ThreeColumnCard
              icon={time}
              width="100px"
              pharagraph1="Quickly scale up and down, with no need to get into a long, burdensome hiring process."
              paragraphclassName1="mx-auto text-dark text-center my-4"
            />
          </div>
          <div className="col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12 py-2">
            <ThreeColumnCard
              icon={goal}
              width="100px"
              pharagraph1="The talent pool is not limited to your local area, opening new horizons in finding rare expertise combined with reasonable rates."
              paragraphclassName1="mx-auto text-dark text-center my-3"
            />
          </div>
          <div className="col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12    py-2">
            <ThreeColumnCard
              icon={focus}
              width="90px"
              pharagraph1="Keeping your in-house team focused on what matters most, while continuing with the development of new features with your offshore team."
              paragraphclassName1="mx-auto text-dark text-center my-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeticatedTeam;
