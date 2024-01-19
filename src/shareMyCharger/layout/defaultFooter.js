import React, { Component } from "react";
import { getCurrentYear } from "../../lib/Helper";
import { getFooterList } from "../footerConstants";
class DefaultFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceUrl: "",
    };
  }
  render() {
    const {
      footerColor,
      footerTextColor,
      footerCopyRightsText,
      socialIcon,
      footerLogo,
    } = this.props;
    const { serviceUrl } = this.state;
    const Navlist = getFooterList();
    return (
      <div
        className="footer p-3 bg-white"
        style={{
          backgroundColor: footerColor,
          color: footerTextColor ? footerTextColor : "text-dark",
        }}
      >
        <div classclassName=" container bg-white">
          <div className="row py-5">
            <div className="col-md-3">
              <img src={footerLogo} width="170px" />
              <div className="col mx-auto text-left"></div>
            </div>
            {Navlist &&
              Navlist.length > 0 &&
              Navlist.map((data) => (
                <div className="col-md-3">
                  <h6 className="font-weight-bold">{data.heading}</h6>
                  {data &&
                    data.list &&
                    data.list.length > 0 &&
                    data.list.map((list) => (
                      <li className="list-unstyled my-2 text-dark">{list}</li>
                    ))}
                </div>
              ))}
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-10">
              <span>
                &copy; {getCurrentYear()}
                <a
                  href={serviceUrl}
                  className="ml-2"
                  target="_blank"
                  style={{
                    color: footerTextColor ? footerTextColor : "var(--page-footer-text-color:white)",
                    textDecoration: "none",
                  }}
                >
                  {footerCopyRightsText}
                </a>
              </span>
            </div>
            <div className="col-2 d-flex">
              {socialIcon &&
                socialIcon.length > 0 &&
                socialIcon.map((icon) => (
                  <div className="mx-2">
                    <img
                      src={icon}
                      className="pull-right"
                      alt=""
                      width="25px"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultFooter;
