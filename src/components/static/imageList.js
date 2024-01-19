import React from "react";
import Heading4 from "./header/heading4";

const ImageList = (props) => {
  const { arrayList, img, heading, style, headingClass, width, colclassName } =
    props;
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mt-md-0 mt-sm-5 col-md-12">
          <Heading4 heading={heading} style={style} className={headingClass} />
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <li class=" border-0 p-0 py-2">
                <span>{data.list}</span>
              </li>
            ))}
        </div>
        <div
          className={
            colclassName ? colclassName : "col-lg-6 mt-md-0 mt-sm-5  col-md-12"
          }
        >
          <img src={img} alt="img" width={width} />
        </div>
      </div>
    </div>
  );
};

export default ImageList;
