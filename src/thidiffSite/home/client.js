import React from "react";
import Heading3 from "../../components/static/header/heading3";
import ImageSection from "../../components/static/imageSection";
//config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const Client = () => {
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
  ];

  return (
    <>
      <div className="container">
        <Heading3
          className="text-center font-weight-bold"
          heading="Here Are Just Some Of The Great Clients We've Partnered With"
          style={{ color: "#224a8b" }}
        />
        <div className="d-none d-md-block">
          <ImageSection
            arrayList={arrayList}
            button="View All"
            buttonurl="/client"
          />
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

export default Client;
