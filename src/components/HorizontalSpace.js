import React from "react";

class HorizontalSpace extends React.Component {
  render() {
    const { children, bottom, top, paddingtop, paddingbottom, paddingleft } =
      this.props;
    return (
      <div
        className={`py-${bottom ? bottom : "1"} mt-${top ? top : ""} pt-${
          paddingtop ? paddingtop : ""
        } pb-${paddingbottom ? paddingbottom : ""} pl-${
          paddingleft ? paddingleft : ""
        }`}
      >
        {children}
      </div>
    );
  }
}
export default HorizontalSpace;
