import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import CategoryService from "../../../services/CategoryService";

// Services
import service from "../../../services/ProductCategoryService";

const CategoryFilter = props => {
  const { selectedCategories, onChange, categoryIds } = props;
  const [categoryLists, setCategoryLists] = useState([]);
  const [defaultCategoryLists, setDefaultCategoryLists] = useState([]);

  // Get Categories
  const getCategories = async () => {
    try {
      const categoryLists = await service.getCategories();
      if (categoryLists) {
        setCategoryLists(categoryLists.data);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Get Category Details by DefaultCategory Value
  const getDefaultCategories = async () => {
    const defaultCategories = [];
    categoryIds &&
      categoryIds
        .toString()
        .split(",")
        .forEach(async categoryId => {
          if (categoryId) {
            const categoryDetails = await CategoryService.get(
              categoryId
            );

            defaultCategories.push({
              label: categoryDetails.data.name,
              value: parseInt(categoryDetails.data.id, 10)
            });

            setDefaultCategoryLists(defaultCategories);
          }
        });
  };

  useEffect(() => {
    getCategories();
    getDefaultCategories();
  }, [categoryIds, selectedCategories]);

  let categoryList = [];
  categoryLists &&
    categoryLists.map(value => {
      categoryList.push({ label: value.name, value: value.id });
    });

  return (
    <>
      <Select
        defaultValue={
          selectedCategories && selectedCategories.length > 0
            ? selectedCategories
            : defaultCategoryLists
        }
        value={
          selectedCategories &&
          selectedCategories.length > 0 &&
          categoryIds &&
          categoryIds.toString().split(",").length > 0 &&
          selectedCategories.length >= categoryIds.toString().split(",").length
            ? selectedCategories
            : categoryIds &&
              categoryIds.toString().split(",").length > 0 &&
              defaultCategoryLists
            ? defaultCategoryLists
            : []
        }
        onChange={onChange}
        options={categoryList}
        placeholder="Select Categories"
        isMulti
      />
    </>
  );
};

export default CategoryFilter;
