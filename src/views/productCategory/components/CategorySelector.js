import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MultiselectCreatable from "../../../components/MultiselectCreatable";

// Services
import productCategorySerice from "../../../services/ProductCategoryService";

/**
 * Product Category Selector component
 *
 */
const ProductCategorySelector = (props) => {
  const {
    selectedCategoryId,
    label,
    onChange,
    name,
    required,
    disabled,
    status,
    id,
    fullWidth,
    isSearchable,
    error,
  } = props;

  const [productCategory, setProductCategory] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    getCategoryList();
    selectedCategoryId && getSeletedCategoryDetails(selectedCategoryId);
  }, [selectedCategoryId]);

  // get all Category list
  const getCategoryList = async () => {
    try {
      let categoryList = [];
      const productCategory = await productCategorySerice.getCategories();
      if (productCategory.data && productCategory.data.length > 0) {
        productCategory.data.forEach((category) => {
          if (category.status == "Active") {
            categoryList.push({
              label: category.name,
              value: category.name,
              id: category.id,
              status: category.status,
            });
          }
        });
      }
      setProductCategory(categoryList);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get selected category details
  const getSeletedCategoryDetails = async () => {
    try {
      const categoryDetails = await productCategorySerice.getCategoriesById(
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
    <>
      <MultiselectCreatable
        value={id}
        name={name ? name : "ProductCategory"}
        placeholder="Select Category"
        label={label}
        status={status}
        defaultValue={
          selectedCategoryId
            ? {
                label: selectedCategoryName,
                value: selectedCategoryName,
                id: selectedCategoryId,
              }
            : ""
        }
        options={productCategory}
        onInputChange={onChange}
        required={required}
        isDisabled={disabled}
        fullWidth={fullWidth}
        isSearchable={isSearchable}
        error={error}
        isSingleSelect={true}
        disabled={disabled}
      />
    </>
  );
};

export default ProductCategorySelector;
