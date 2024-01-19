import React from "react";
import TagList from "../../../components/TagList";
import { useState } from "react";

const TagDetail = (props) => {
  let tagType = props.match.params.id;
  const { history } = props;
  const [isOpen, setIsOpen] = useState(false);

  const _toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <>
        <TagList
          history={history}
          tagType={tagType}
          __toggle={_toggle}
          isModel={isOpen}
        />
      </>
    </div>
  );
};
export default TagDetail;
