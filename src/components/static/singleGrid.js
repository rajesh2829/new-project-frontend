import React from "react";
import Heading2 from "./header/heading2";

const SingleGrid = (props) => {
  const {
    bannerStyle,
    contentStyle,
    heading,
    paragraph,
    submitbutton,
    headingCenter,
    buttonclassName,
    paragraphclassName,
  } = props;
  return (
    <div>
      <div className="jumbotron jumbotron-fluid mb-0" style={bannerStyle}>
        <div className="container" style={{ contentStyle, height: "100%" }}>
          <div
            className=" d-table-cell text-center align-middle"
            style={{ height: "500px" }}
          >
            {heading && (
              <div className="col-md-8">
                <Heading2
                  className=" font-weight-bold text-white text-left"
                  heading={heading}
                />
              </div>
            )}
            {headingCenter && (
              <div className="col-md-12">
                <h2 className=" font-weight-bold text-center text-white text-left">
                  {headingCenter}
                </h2>
              </div>
            )}

            {paragraph && (
              <p
                className={
                  paragraphclassName
                    ? paragraphclassName
                    : "lead ml-3 text-left text-white"
                }
              >
                {paragraph}
              </p>
            )}
            {submitbutton && (
              <button
                className={
                  buttonclassName
                    ? buttonclassName
                    : "btn btn-outline-dark ml-3 border border-white float-left btn-lg text-white"
                }
              >
                {submitbutton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGrid;
