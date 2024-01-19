import React, { Component } from "react";
import { getCurrentYear } from "../../lib/Helper";
import { getFooterList } from "../footer";
import MobileFooter from "../header/mobileFooter";
class DefaultFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceUrl: "/privacy-policy",
      serviceUrlOne: "/terms-of-use",
      serviceUrlTwo: "",
    };
  }
  render() {
    const {
      footerTextColor,
      footerCopyRightsText,
      socialIcon,
      footerCopyRightsTextOne,
      footerCopyRightsTextTwo,
    } = this.props;
    const { serviceUrl, serviceUrlOne, serviceUrlTwo } = this.state;
    const Footerlist = getFooterList();
    return (
      <>
        <div
          className="footer p-3 d-none d-md-block"
          style={{
            backgroundColor: "#224a8b",
            color: footerTextColor ? footerTextColor : "#fff",
          }}
        >
          <div className="d-none d-md-block">
            <div classclassName=" container ">
              <div className="row py-5">
                {Footerlist &&
                  Footerlist.length > 0 &&
                  Footerlist.map((data) => (
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-5 ">
                      <h6 className="font-weight-bold text-white py-2">
                        {data.heading}
                      </h6>
                      {data &&
                        data.list &&
                        data.list.length > 0 &&
                        data.list.map((list) => (
                          <li className="list-unstyled my-2 text-white ">
                            {list.name && (
                              <a className="text-white" href={list.url}>
                                {list.name}
                              </a>
                            )}{" "}
                            {list.icon && (
                              <img
                                src={list.icon}
                                className=" mx-3"
                                alt=""
                                width="25px"
                              />
                            )}
                          </li>
                        ))}
                      {socialIcon &&
                        socialIcon.length > 0 &&
                        socialIcon.map((icon) => (
                          <div className="mx-2">
                            <img
                              src={icon.social}
                              className="pull-right w-25"
                              alt=""
                              width="25px"
                            />
                          </div>
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
                        color: footerTextColor ? footerTextColor : "#FFFFFF",
                        textDecoration: "none",
                      }}
                    >
                      {footerCopyRightsText}
                    </a>
                    <a
                      href={serviceUrlOne}
                      className="ml-2"
                      target="_blank"
                      style={{
                        color: footerTextColor ? footerTextColor : "#FFFFFF",
                        textDecoration: "none",
                      }}
                    >
                      {footerCopyRightsTextOne}
                    </a>
                    <a
                      href={serviceUrlTwo}
                      className="ml-2"
                      target="_blank"
                      style={{
                        color: footerTextColor ? footerTextColor : "#FFFFFF",
                        textDecoration: "none",
                      }}
                    >
                      {footerCopyRightsTextTwo}
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
          <div />
        </div>

        <div className="d-block d-md-none">
          <div
            className="footer"
            style={{
              backgroundColor: "#fff",
              color: footerTextColor ? footerTextColor : "#fff",
            }}
          >
            <div classclassName=" container-fluid ">
              <MobileFooter />
              <div className="container">
                <div className="row">
                  <div className="text-center">
                    <span className="mx-2">
                      &copy; {getCurrentYear()}
                      <a
                        href={serviceUrl}
                        className="ml-2"
                        target="_blank"
                        style={{
                          color: footerTextColor ? footerTextColor : "#FFFFFF",
                          textDecoration: "none",
                        }}
                      >
                        {footerCopyRightsText}
                      </a>
                    </span>
                  </div>
                  <div className=" mx-auto d-flex py-3">
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
          </div>
        </div>
      </>
    );
  }
}

export default DefaultFooter;
