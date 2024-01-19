import React from "react";
const ContentSectionOne = (props) => {
  const { title } = props;
  return (
    <div>
      <h4 className="text-center font-weight-bold py-5">{title}</h4>
    </div>
  );
};

export default ContentSectionOne;
