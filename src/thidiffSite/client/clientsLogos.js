import React from "react";
import Heading3 from "../../components/static/header/heading3";
import ImageSection from "../../components/static/imageSection";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const ClientsLogos = () => {
  const arrayList = [
    {
      col: "col-3",
      img: ThiDiffMedia.sallybeauty,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.cosmo,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.sigstr,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.octiv,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.shopyourspot,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.salesvue,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.powderkeg,
      url: "#",
    },
    {
      col: "col-3",
      img: ThiDiffMedia.thenailscape,
      url: "#",
    },
    {
      img: ThiDiffMedia.mingwangknits,
      url: "#",
    },
    {
      img: ThiDiffMedia.littlenugget,
      url: "#",
    },
    {
      img: ThiDiffMedia.misook,
      url: "#",
    },
    {
      img: ThiDiffMedia.jonesnewyork,
      url: "#",
    },
    {
      img: ThiDiffMedia.loxabeaty,
      url: "#",
    },
    {
      img: ThiDiffMedia.mvp,
      url: "#",
    },
    {
      img: ThiDiffMedia.estesdesigns,
      url: "#",
    },
    {
      img: ThiDiffMedia.midwest,
      url: "#",
    },
    {
      img: ThiDiffMedia.torchlite,
      url: "#",
    },
  ];
  return (
    <>
      <div className="container py-5">
        <Heading3
          className="text-center font-weight-bold py-3"
          heading="Our Client"
          style={{ color: "#224a8b" }}
        />
        <paragraphContentSection
          paragraphclass="text-center"
          paragraph="We have an astounding client retention level, which we are extremely glad for. Here is a list of some of the clients we have worked with throughout the years, and in the principle still keep on doing as such."
        />
        <div className="d-none d-md-block">
          <ImageSection arrayList={arrayList} />
        </div>
      </div>
      <div className="container">
        <div class="row py-5 d-block d-md-none">
          <div class="col-md-12 clientsList text-center">
            <div>
              {arrayList &&
                arrayList.length > 0 &&
                arrayList.map((data) => (
                  <img
                    src={data.img}
                    alt=""
                    style={{ width: "100%", objectFit: "scale-down" }}
                    className=" img-fluid img-thumbnail border"
                    width="116"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsLogos;
