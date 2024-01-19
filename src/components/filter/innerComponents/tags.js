import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

// Services
import tagService from "../../../services/TagService";

const Tags = props => {
  const { selectedTags, onChangeTags, tagIds } = props;
  const [tagLists, setTagLists] = useState([]);
  const [defaultTagLists, setDefaultTagLists] = useState([]);

  // Get Tags
  const getTags = async () => {
    try {
      const tagLists = await tagService.getTagDetails();
      if (tagLists) {
        setTagLists(tagLists.data);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Get Tag Details by DefaultTag Value
  const getDefaultTags = async () => {
    const defaultTags = [];
    tagIds &&
      tagIds
        .toString()
        .split(",")
        .forEach(async tagId => {
          if (tagId) {
            const tagDetails = await tagService.getTagById(tagId);

            defaultTags.push({
              label: tagDetails.data.name,
              value: parseInt(tagDetails.data.id, 10)
            });

            setDefaultTagLists(defaultTags);
          }
        });
  };

  useEffect(() => {
    getTags();
    getDefaultTags();
  }, [tagIds]);

  let tagList = [];
  tagLists &&
    tagLists.map(value => {
      tagList.push({ label: value.name, value: value.id });
    });

  return (
    <>
      <Select
        defaultValue={
          selectedTags && selectedTags.length > 0
            ? selectedTags
            : defaultTagLists
        }
        value={
          selectedTags &&
          selectedTags.length > 0 &&
          tagIds &&
          tagIds.toString().split(",").length > 0 &&
          selectedTags.length >= tagIds.toString().split(",").length
            ? selectedTags
            : tagIds &&
              tagIds.toString().split(",").length > 0 &&
              defaultTagLists
            ? defaultTagLists
            : []
        }
        onChange={onChangeTags}
        options={tagList}
        placeholder="Select Tags"
        isMulti
      />
    </>
  );
};

export default Tags;
