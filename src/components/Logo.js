import React, { Component } from "react";

export default class Logo extends Component {

  render() {

    const {
      src,
      className,
      link,
      altText,
      label,
      headerTextColor
    } = this.props;
    
    return (
      <div>
        {src === "" || src === undefined ? (
          <div className="col-12 mx-2 mt-2">
            <h3>
              <a
                href="/dashboard"
                className="logo"
                style={{ color: headerTextColor, textDecoration: "none" }}
              >
                {label}
              </a>
            </h3>
          </div>
        ) : (
          <div className="text-center mx-0">
            <a href={link}>
              <img src={src} className={className} alt={altText} />
            </a>
          </div>
        )}
      </div>
    );
  }
}
