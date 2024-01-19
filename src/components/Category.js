import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Component
import Select from "./Select";

// Constant
import { ACTIVE } from "../helpers/Status";

// Services
import service from "../services/ProductCategoryService";
import CategoryService from "../services/CategoryService";

/**
 * Product Category component
 *
 */
const Category = props => {
  const { selectedCategoryId, label, onChange } = props;

  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    getCategories();
    selectedCategoryId && getSeletedCategoryDetails(selectedCategoryId);
  }, [selectedCategoryId]);

  const getCategories = async () => {
    try {
      let categoryList = [];
      const categories = await service.getCategories();
      if (categories.data && categories.data.length > 0) {
        categories.data.forEach(category => {
          if (category.status == ACTIVE) {
            categoryList.push({
              label: category.name,
              value: category.id
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
  const getSeletedCategoryDetails = async () => {
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
      defaultValue={
        selectedCategoryId
          ? {
            label: selectedCategoryName,
            value: selectedCategoryId
          }
          : ""
      }
      options={categories}
      onInputChange={onChange}
    />
  );
};

export default Category;
