import React, { Component } from "react";
import { getCurrentYear } from "../../lib/Helper";
import { getFooterList } from "../../views/ecomm/components/footerConstants";

class Footer1 extends Component {
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
      footerLogo,
      showQuickLinks,
    } = this.props;

    const { serviceUrl } = this.state;

    const Navlist = getFooterList();

    return (
      <div
        className="footer p-3"
        style={{
          backgroundColor: footerColor,
          color: footerTextColor ? footerTextColor : "var(--page-footer-text-color)",
        }}
      >
        <div classclassName="container bg-white">
          {showQuickLinks && (
            <>
              {" "}
              <div className="row py-5">
                <div className="col-md-3">
                  <img src={footerLogo} width="170px" />
                  <div className="col mx-auto text-left"></div>
                </div>
                {Navlist &&
                  Navlist.length > 0 &&
                  Navlist.map((data) => (
                    <div className="col-md-3">
                      <h5 className="font-weight-bold">{data.heading}</h5>
                      {data &&
                        data.list &&
                        data.list.length > 0 &&
                        data.list.map((list) => (
                          <li className="list-unstyled my-2 ">{list}</li>
                        ))}
                    </div>
                  ))}
              </div>
              <hr></hr>
            </>
          )}
          <div className="row">
            <div className="col-10">
              <span>
                Copyright &copy; {getCurrentYear()}
                <a
                  href={serviceUrl}
                  className="ml-2"
                  target="_blank"
                  style={{
                    color: footerTextColor ? footerTextColor : "var(--page-footer-text-color)",
                    textDecoration: "none",
                  }}
                >
                  {footerCopyRightsText}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer1;
