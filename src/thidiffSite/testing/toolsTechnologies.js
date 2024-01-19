import React from "react";
import Heading3 from "../../components/static/header/heading3";
import ImageSection from "../../components/static/imageSection";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";
import ToolsTechnologiesList from "./toolsTechnologiesList";

const ToolsTechnologies = () => {
  const arrayList = [
    {
      col: "col-3",
      img: ThiDiffMedia.seleinium,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.appache,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.waitir,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.loadrunner,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.jira,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.testdirector,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.silkperformer,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.mantis,
      url: "#",
    },
    {
      img: ThiDiffMedia.testcomplete,
      url: "#",
    },
    {
      img: ThiDiffMedia.confluence,
      url: "#",
    },
    {
      img: ThiDiffMedia.testlink,
      url: "#",
    },
    {
      img: ThiDiffMedia.qtp,
      url: "#",
    },
    {
      img: ThiDiffMedia.bamboo,
      url: "#",
    },
    {
      img: ThiDiffMedia.microfocus,
      url: "#",
    },
    {
      img: ThiDiffMedia.bugzilla,
      url: "#",
    },
    {
      img: ThiDiffMedia.jenkins,
      url: "#",
    },
  ];
  return (
    <div className="container py-5">
      <Heading3
        className=" font-weight-bold py-3"
        heading="TOOLS AND TECHNOLOGIES WE USE"
        style={{ color: "#224a8b" }}
      />
      <div className="d-none d-md-block">
        <ImageSection arrayList={arrayList} />
      </div>
      <div className="d-block d-md-none">
        <ToolsTechnologiesList arrayList={arrayList} />
      </div>
    </div>
  );
};

export default ToolsTechnologies;
