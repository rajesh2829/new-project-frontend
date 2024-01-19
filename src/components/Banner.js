import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Banner = (props) => {
  const { className, text } = props;
  const [isBannerVisible, setBannerVisible] = useState(true);

  const handleBannerClose = () => {
    setBannerVisible(false);
  };

  return (
    <>
      {isBannerVisible && (
        <div className={className ? `${className} top-banner` : "bg-success top-banner"}>
          <p className="mt-3 mx-2">{text}</p>
          <span className="close-icon pr-2" onClick={handleBannerClose}>
            <FaTimes />
          </span>
        </div>
      )}
    </>
  );
};

export default Banner;
