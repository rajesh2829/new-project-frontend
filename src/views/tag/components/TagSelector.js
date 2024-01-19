import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//Configs
import { apiClient } from "../../../apiClient";

// Component
import MultiSelect from "../../../components/MultiselectCreatable";
import { endpoints } from "../../../api/endPoints";
import TagService from "../../../services/TagService";
import { TagTypeName } from "../../../helpers/Tag";

const ProductTagSelector = (props) => {
  const { selectedTagId, label, onChange, id, name, required, disabled, status } =
    props;

  const [productTag, setProductTag] = useState([]);
  const [selectedTagName, setSelectedTagName] = useState("");

  useEffect(() => {
    selectedTagId && getSeletedTagDetails(selectedTagId);
  }, [selectedTagId]);

  useEffect(() => {
    getTagList();
  }, [])

  // get all tag list
  const getTagList = async () => {
    try {
      let params = {
        type: TagTypeName.PRODUCT
      }
      const response = await TagService.getOption(params);
      setProductTag(response);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get selected tag details
  const getSeletedTagDetails = async () => {
    try {
      const response = await apiClient.get(
        `${endpoints().tagApi}/${selectedTagId}`
      );
      const tagDetails = response.data.data;
      if (
        tagDetails &&
        tagDetails.name &&
        tagDetails.status !== "InActive"
      ) {
        setSelectedTagName(tagDetails.name);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  return (
    <MultiSelect
      value={id}
      name={name ? name : "ProductTag"}
      placeholder="Select Tag"
      label={label}
      status={status}
      defaultValue={
        selectedTagName
          ? {
            label: selectedTagName,
            value: selectedTagName,
            id: selectedTagId,
          }
          : ""
      }
      options={productTag}
      onInputChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
};

export default ProductTagSelector;
