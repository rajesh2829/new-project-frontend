import React from "react";

const Image = (props) => {
  const { bannerStyle } = props;
  return (
    <div>
      <div className=" img-fluid" style={bannerStyle}></div>
    </div>
  );
};

export default Image;
