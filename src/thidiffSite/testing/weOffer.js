import React from "react";
import HorizontalSpace from "../../components/HorizontalSpace";
import Heading3 from "../../components/static/header/heading3";
import Headind5 from "../../components/static/header/heading5";
import VerticalSapce from "../../components/VerticalSapce";
import { getWeOfferList } from "./weOfferList";

const WeOffer = (props) => {
  const arrayList = getWeOfferList();
  return (
    <div>
      <div className="container">
        <Heading3
          className=" font-weight-bold  py-5"
          heading="TESTING SERVICES WE OFFER"
          style={{ color: "#224a8b" }}
        />
        <div className="d-none d-md-block">
          <div className="row  ">
            {arrayList &&
              arrayList.length > 0 &&
              arrayList.map((data) => (
                <div className="col-lg-3 mt-md-0 mt-sm-5  col-md-12   py-1">
                  <div className="card">
                    <div className=" d-flex">
                      <div className="mx-2 py-3">
                        <img src={data.img} width="" />
                      </div>

                      <div className="py-3 mx-3">
                        <h5 style={data.headingstyle}>{data.heading}</h5>
                        <p className="text-secondary">{data.pharagrap}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="d-block d-md-none">
          <div className="row  ">
            {arrayList &&
              arrayList.length > 0 &&
              arrayList.map((data) => (
                <div className="col-md-3 py-1">
                  <div className="card">
                    <div className=" d-flex">
                      <div className="mx-2 py-3">
                        <img src={data.img} width="" />
                      </div>

                      <HorizontalSpace bottom="3">
                        <VerticalSapce marginspace="3">
                          <Headind5
                            heading={data.heading}
                            style={{ position: "relative", top: "18px" }}
                          />
                          <p className="text-secondary">{data.pharagrap}</p>
                        </VerticalSapce>
                      </HorizontalSpace>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeOffer;
