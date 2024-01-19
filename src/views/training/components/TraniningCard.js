import React from "react";
import { Link } from "react-router-dom";

const TrainingCard = (props) => {
  let { list, className, disableLink } = props;

  return (
    <div className={className ? className : "col-lg-3 col-md-5 col-sm-5 mb-2"}>
      <Link to={`/training/${list?.id}`} style={{ pointerEvents: disableLink ? 'none' : "" }}>
        <div className="card shadow">
          <div className="position-relative" style={{ paddingTop: "100%" }}>
            <img
              className="position-absolute"
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              src={
                list?.banner_image
                  ? list?.banner_image
                  : "https://trustrace.com/hubfs/raw_assets/public/trustrace_May2022/images/grayscale-mountain.png"
              }
              alt="No Image"
            />
          </div>
          <div className="card-body w-100 h-100 border-top">
            <h5 className="card-title font-weight-bold text-dark">
              {list?.training_name}
            </h5>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h6
                className="text-center bg-black text-white rounded px-3"
              >
                {list?.status}
              </h6>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrainingCard;
