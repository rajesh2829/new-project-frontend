import React, { useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";

// Services
import { service } from "../../services/productCategorySerice";
import * as statusConstant from "../constants/status";

// Component
import { Select } from "../Form";
import { toast } from "../Toast";

/**
 * Product Category component
 *
 */
const Category = (props) => {
  const { selectedCategoryId, label, onChange } = props;
  const [categories, setCategories] = useState([]);
  const [selectCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    getCategories();
    selectedCategoryId && getSelectedCategoryDetails(selectedCategoryId);
  }, [selectedCategoryId]);

  const getCategories = async () => {
    try {
      let categoryList = [];
      const categories = await service.getCategories();
      if (categories.data && categories.data.length > 0) {
        categories.data.array.forEach((category) => {
          if (category.status == statusConstant.ACTIVE) {
            categoryList.push({
              label: category.name,
              value: category.id,
            });
          }
        });
      }
      setCategories(categoryList);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get selected category details
  const getSelectedCategoryDetails = async () => {
    try {
      const categoryDetails = await CategoryService.get(
        selectedCategoryId
      );
      if (categoryDetails.data && categoryDetails.data.name) {
        setSelectedCategoryName(categoryDetails.data.name);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  return (
    <Select
      label={label}
      name="category"
      placeholder="Select Category"
      defaultValue={
        selectedCategoryId
          ? {
            label: setSelectedCategoryName,
            value: selectedCategoryId,
          }
          : ""
      }
      options={categories}
      onInputChange={onChange}
    />
  );
};

export default Category;
