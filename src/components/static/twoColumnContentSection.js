import React, { Component } from "react";

export default class TwoColumnContentSection extends Component {
  render() {
    const { paragraph, heading, button, img } = this.props;
    return (
      <div className="bg-white">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-5 col-lg-6 py-5 my-5">
              <img
                className="img-fluid float-end"
                src={img}
                alt="crunchbase_2x"
              />
            </div>
            <div className="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0 py-4">
              <h1 className="text-dark font-weight-bold">{heading}</h1>
              <p className="s text-secondary">{paragraph}</p>
              <div>
                <button type="button" className="btn btn-primary">
                  {button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
