import React from "react";

const BackGroundImage = (props) => {
  const { bannerStyle, contentStyle, heading, paragraph, submitbutton } = props;
  return (
    <div>
      <div className="jumbotron jumbotron-fluid mb-0" style={bannerStyle}>
        <div className="container" style={{ contentStyle, height: "100%" }}>
          <div
            className=" d-table-cell text-center align-middle"
            style={{ height: "500px" }}
          >
            {heading && (
              <div className="col-md-12">
                <h1
                  className=" font-weight-bold text-center text-white"
                  style={{ position: "relative", left: "500px" }}
                >
                  {heading}
                </h1>
              </div>
            )}

            {paragraph && (
              <p className="lead text-left text-white">{paragraph}</p>
            )}
            {submitbutton && (
              <button class="btn btn-outline-dark border border-white float-left btn-lg text-white">
                {submitbutton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackGroundImage;
