import React, { useEffect, useState } from "react";
import Select from "./Select";
import CategoryService from "../services/CategoryService";
import ArrayList from "../lib/ArrayList";

const CategorySelect = (props) => {
  let {
    name,
    handleCategoryChange,
    customCategoryOption,
    categoryList,
    label,
    isDisabled
  } = props;

  const [categoryOption, setCategoryOption] = useState([]);

  const getCategory = async () => {
    if (ArrayList.isEmpty(categoryOption)) {
      const response = await CategoryService.getOption();
      setCategoryOption(response);
      categoryList(response);
    }
  };

  return (
    <>
      <Select
        name={name ? name : "category"}
        placeholder="Select Category"
        label={label}
        options={customCategoryOption ? customCategoryOption : categoryOption}
        handleChange={handleCategoryChange}
        autoFocus={getCategory}
        menuPortal={props.menuPortal}
        isDisabled={isDisabled}
      />
    </>
  );
};
export default CategorySelect;