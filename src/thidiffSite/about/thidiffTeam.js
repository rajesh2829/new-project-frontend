import React from "react";
import ContentSection3 from "../../components/static/contentSection3";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const ThidiffTeam = () => {
  const arrayList = [
    {
      col: "col-md-3",
      img: ThiDiffMedia.thidiffteam,
    },
    {
      col: "col-md-3",
      img: ThiDiffMedia.thidiff,
    },
    {
      col: "col-md-3",
      img: ThiDiffMedia.thidiffteam4,
    },
    {
      col: "col-md-3",
      img: ThiDiffMedia.thidiffteam1,
    },
  ];
  return (
    <div>
      <ContentSection3
        className="text-primary font-weight-bold text-center py-4"
        arrayList={arrayList}
      />
    </div>
  );
};

export default ThidiffTeam;
