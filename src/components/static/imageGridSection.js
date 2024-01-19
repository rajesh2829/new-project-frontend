import React from "react";

const ImageGridSection = (props) => {
  const { heading, paragraph, button, img } = props;
  return (
    <div>
      <div className="" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12 py-5 my-5">
              {heading && (
                <h4 className=" font-weight-bold" style={{ color: "#224a8b" }}>
                  {heading}
                </h4>
              )}
              {paragraph && (
                <p className=" text-secondary  py-5">{paragraph}</p>
              )}
              <div>
                {button && (
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    style={{ backgroundColor: "#224a8b" }}
                  >
                    {button}
                  </button>
                )}
              </div>
            </div>
            <div className="col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12 offset-lg-0 pb-4">
              <img
                className="img-fluid float-end"
                src={img}
                alt="crunchbase_2x"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGridSection;
