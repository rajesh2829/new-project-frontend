import React from "react";
import Heading4 from "./header/heading4";
const List = (props) => {
  const { arrayList, img, className, heading, style, headingClass } = props;
  return (
    <div>
      <Heading4 heading={heading} style={style} className={headingClass} />
      {arrayList &&
        arrayList.length > 0 &&
        arrayList.map((data) => (
          <li className={className ? className : " border-0 p-0 py-2"}>
            <span>{data.list}</span>
          </li>
        ))}
    </div>
  );
};

export default List;
