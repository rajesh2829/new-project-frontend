import React, { Component } from "react";
import Button from "./Button";
export default class Banner1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { altText, style, manIcon, history } = this.props;
    return (
      <div>
        <div>
          <div className="pl-5 bg-white" style={style}>
            <div className="row pr-3">
              <div className="col-lg-6 py-5 my-5">
                <h1 className="text-primary font-weight-bold">
                  Water Can delivered in <br />
                  <span className="text-danger">30 minutes</span> at your <br />
                  doorstep
                  <br />
                  <Button
                    className="px-4 py-2"
                    label="Book Now"
                    onClick={() => {
                      history.push("/signup");
                    }}
                  />
                </h1>
              </div>
              <div className="col-lg-6">
                <img
                  className="img-fluid float-right"
                  src={manIcon}
                  alt={altText}
                  style={{ height: "450px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
