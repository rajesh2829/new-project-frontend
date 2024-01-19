import React from "react";
import Heading4 from "../../components/static/header/heading4";
import SingleCardSection from "../../components/static/singleCardSection";
import Approach from "../assets/icons/approach.png";
import Start from "../assets/icons/start.png";
import Success from "../assets/icons/success.png";
import team from "../assets/icons/team.png";

const TeamDifferent = () => {
  const arrayList = [
    {
      col: "col-md-6 py-2",
      img: team,
      heading: "The Team",
      pharagrap:
        "Get your team customized by your requirements Development or Testing? Doesn't Matter.",
    },
    {
      col: "col-md-6 py-2",
      img: Success,
      heading: "Our Success",
      pharagrap:
        "Our clients have experienced greater flexibility, increased ROI and faster time to market by leveraging the ThiDiff Global Extended Teams. Yes. We have proven that.",
    },
    {
      col: "col-md-6 py-2",
      img: Approach,
      heading: "The Approach",
      pharagrap:
        "We tailor our systems and processes to match your team’s working methods, be they Scrum or Kanban, Slack or Hipchat.",
    },
    {
      col: "col-md-6 py-2",
      img: Start,
      heading: "Where to Start?",
      pharagrap:
        "You can start with a small tactical team or build a complete team to complement your onsite operation.",
    },
  ];
  return (
    <div className="container">
      <Heading4
        heading="Why ThiDiff's Extended Team is Different?"
        className="text-center font-weight-bold py-5"
        style={{ color: "#113b95" }}
      />
      <SingleCardSection arrayList={arrayList} />
    </div>
  );
};

export default TeamDifferent;
