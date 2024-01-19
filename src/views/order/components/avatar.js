import PropTypes from "prop-types";
import React from "react";

class Avatar extends React.Component {
  render() {
    const {
      id,
      url,
      firstName,
      lastName,
      companyName,
      defaultUrl,
      size,
      bgColor,
      square,
      customSize,
      imageSize,
      fontSize,
      className,
      customStyle,
      allowEdit,
      productImageIcon,
      headerTextColor,
    } = this.props;

    const sizes = {
      xs: 32,
      sm: 33,
      md: 60,
      lg: 100,
      customSize: parseInt(imageSize, 10),
    };

    let dimension;
    if (customSize) {
      dimension = customSize;
    }

    if (!dimension && size) {
      dimension = sizes[size];
    }

    if (!dimension) {
      dimension = sizes["sm"];
    }

    const defaultStyle = {
      width: dimension,
      height: dimension,
      display: "block",
      borderRadius: square ? "0" : "50%",
    };

    if (url) {
      let backgroundImage = `url("${url}")`;
      if (defaultUrl) {
        backgroundImage = `${backgroundImage}, url(${defaultUrl})`;
      }

      const style = Object.assign({}, defaultStyle, {
        backgroundSize: "cover",
        backgroundRepeat: "initial",
        backgroundImage,
        backgroundPosition: "center",
      });

      return (
        <>
          <div
            id={id}
            style={style}
            className={["avatar-picture cursor-pointer"].join(" ")}
          />{" "}
          <div>
            {allowEdit == true && (
              <span
                style={{
                  right: "0",
                  bottom: "0",
                  padding: "10px",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
                className="pt-5 cursor-pointer position-absolute"
              >
                <EditIconAlt style={{ verticalAlign: "bottom" }} />
              </span>
            )}
          </div>
        </>
      );
    }

    if (firstName || lastName || companyName) {
      const initial = [];
      if (firstName) {
        initial.push(firstName[0]);
      }

      if (lastName) {
        initial.push(lastName[0]);
      }

      if (companyName) {
        initial.push(companyName[0]);
      }

      if (initial.length === 1 && firstName) {
        initial.push(firstName[1]);
      }

      if (initial.length === 1 && lastName) {
        initial.push(lastName[1]);
      }

      if (initial.length === 1 && companyName) {
        initial.push(companyName[1]);
      }

      if (initial.length > 0) {
        const style = Object.assign({}, defaultStyle, {
          lineHeight: `${dimension}px`,
          backgroundColor: bgColor || "#212121",
          color: headerTextColor || "#ffffff",
          textTransform: "uppercase",
          textAlign: "center",
          fontSize: fontSize || 11,
          letterSpacing: 1,
        });

        return (
          <>
            <div id={id} className={customStyle} style={style}>
              {initial.join("")}
            </div>
            <div>
              {allowEdit == true ? (
                <span
                  style={{
                    right: "0",
                    bottom: "0",
                    padding: "10px",
                    borderRadius: "8px",
                    color: headerTextColor || "#ffffff",
                  }}
                  className="pt-5 cursor-pointer position-absolute"
                >
                  <EditIconAlt style={{ verticalAlign: "bottom" }} />
                </span>
              ) : (
                ""
              )}
            </div>
          </>
        );
      }
    }

    if (defaultUrl) {
      const style = Object.assign({}, defaultStyle, {
        backgroundSize: "cover",
        backgroundImage: `url(${defaultUrl})`,
        margin: "auto",
      });

      return <div id={id} style={style} />;
    }

    const style = Object.assign({}, defaultStyle, {
      backgroundSize: "cover",
      // backgroundImage: `url(${
      //   productImageIcon ? defaultProductAvatar : defaultAvatar
      // })`,
    });

    return <div id={id} className={className} style={style} />;
  }
}

Avatar.propTypes = {
  url: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  defaultUrl: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  square: PropTypes.bool,
  productImageIcon: PropTypes.bool,
  customSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Avatar;
