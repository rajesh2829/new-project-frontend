import React from "react";
import "./style.scss";

// Assets
import NoImage from "../../assets/img/noImage.png";

const index = ({ src, alt, size, className, minWidth, maxWidth, maxHeight, minHeight }) => {
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <img
        src={src ? src : NoImage}
        alt={alt ? alt : "No Image"}
        className={`${size} ${className}`}
        style={{
          minWidth: minWidth,
          maxWidth: maxWidth,
          minHeight: minHeight,
          maxHeight: maxHeight
        }} />
    </div>
  )
}

export default index