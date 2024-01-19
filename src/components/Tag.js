import React, { useState, useEffect } from "react";

import TagTypeService from "../services/TagTypeService";

import Select from "./Select";

const Tag = (props) => {
  const { name, lable, tagName } = props;

  const [tagId, setTypeId] = useState();
  const [list, setList] = useState();

  useEffect(() => {
    getTagType();
  }, [props]);

  useEffect(() => {
    getCategoryTagList();
  }, [tagId]);

  //   Get Status List
  const getCategoryTagList = async () => {
    const response = await TagTypeService.TagList(tagId)
    let data = response.data

    if (data && data.length > 0) {
      const statusList = [];
      data
        .forEach((list) => {
          statusList.push({
            value: list.id,
            label: list.name,
          });
        });
      setList(statusList);
    }
  };

  //   Get Status List
  const getTagType = async () => {
    const response = await TagTypeService.search(
      tagName
    );
    
    const tagTypeList = response.data.data;
    tagTypeList &&
      tagTypeList.length > 0 &&
      tagTypeList.forEach((list) => {
        setTypeId(list.id);
      });
  };

  return (
    <div>
      <Select
        name={name ? name : "tag"}
        label={lable ? lable : "Tag"}
        options={list}
      />
    </div>
  );
};

export default Tag;
