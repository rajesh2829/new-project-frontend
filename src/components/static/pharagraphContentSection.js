import React from "react";
import Heading4 from "./header/Heading4";

const paragraphContentSection = (props) => {
  const {
    heading,
    paragraph,
    Subpharagraph,
    style,
    paragraphclass,
    subpharagraphclass,
  } = props;
  return (
    <div>
      {heading && (
        <Heading4
          className="font-weight-bold py-4"
          heading={heading}
          style={style}
        />
      )}
      {paragraph && <p className={paragraphclass}>{paragraph}</p>}
      {Subpharagraph && <p className={subpharagraphclass}>{Subpharagraph}</p>}
    </div>
  );
};

export default paragraphContentSection;
