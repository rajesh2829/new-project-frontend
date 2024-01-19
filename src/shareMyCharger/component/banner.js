import React, { Component } from "react";
import "../scss/style.scss";

export default class Banner extends Component {
  render() {
    const { heading, paragraph, altText, img } = this.props;
    return (
      <div>
        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-5 col-lg-6 py-5 my-5">
                <h1 className="text-dark font-weight-bold">{heading}</h1>
                <p className="lead text-white-70">{paragraph}</p>
                <div className="search fw-bold">
                  {" "}
                  <i className="fa fa-search"></i>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your location"
                  />{" "}
                  <button className="btn btn-primary fw-bold">Search</button>{" "}
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
