import React, { Component } from "react";

export default class Banner extends Component {
  render() {
    const { heading, paragraph, altText, img, button, placeholder } =
      this.props;
    return (
      <div>
        <div className="banner" style={{ backgroundColor: "aliceblue" }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-5 col-lg-6 py-5 my-5">
                <h1 className="text-dark font-weight-bold">{heading}</h1>
                <p className="lead text-white-70">{paragraph}</p>
                <div className="search fw-bold">
                  {" "}
                  <i
                    className="fa fa-search position-absolute"
                    style={{ top: "21px", left: "18px" }}
                  ></i>{" "}
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={placeholder}
                    style={{
                      height: "60px",
                      textIndent: "25px",
                      border: "1px solid #403f3f",
                    }}
                  />{" "}
                  <button
                    className="btn btn-primary fw-bold position-absolute"
                    style={{
                      top: "4px",
                      right: "4px",
                      height: "52px",
                      width: "110px",
                      backGround: "blue",
                    }}
                  >
                    {button}
                  </button>{" "}
                </div>
              </div>
              <div className="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0 py-4">
                <img
                  className="img-fluid float-end"
                  src={img}
                  alt={altText}
                  style={{ width: "520px;" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
