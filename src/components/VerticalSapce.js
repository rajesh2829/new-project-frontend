import React from "react";
class VerticalSapce extends React.Component {
  render() {
    const { children, bottom, left, right, marginspace, align } = this.props;
    return (
      <div
        className={`my-${bottom ? bottom : "1"} 
        mx-${marginspace ? marginspace : ""} 
        mr-${right ? right : ""} 
        ml-${left ? left : ""} 
        float-${align ? align : ""}`}
      >
        {children}
      </div>
    );
  }
}
export default VerticalSapce;
