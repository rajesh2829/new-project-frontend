import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Component
import Select  from "./Select";

// Services
import VendorProductService from "../services/VendorProductService";

/**
 * Product Name Name component
 *
 */
const Product = props => {
  const {
    selectedProductId,
    label,
    name,
    placeholder,
    onChange,
    required,
    disabled
  } = props;
  const [Product, setProducts] = useState([]);
  const [selectedProductName, setselectedProductName] = useState("");

  useEffect(() => {
    getProducts();
    selectedProductId && getProductName(selectedProductId);
  }, [selectedProductId]);

  // get all brand list
  const getProducts = async () => {
    try {
      let ProductNameList = [];
      const productNames = await service.getNameDetails();
      if (productNames.data && productNames.data.length > 0) {
        productNames.data.forEach(ProductName => {
          ProductNameList.push({
            label: ProductName.name,
            value: ProductName.id
          });
        });
      }
      setProducts(ProductNameList);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get selected brand details
  const getProductName = async () => {
    try {
      const ProductDetails = await service.getProductById(selectedProductId);
      if (ProductDetails.name) {
        setselectedProductName(ProductDetails.name);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  return (
    <Select
      name={name}
      placeholder={placeholder}
      label={label}
      defaultValue={
        selectedProductId
          ? {
              label: selectedProductName,
              value: selectedProductId
            }
          : ""
      }
      options={Product}
      onInputChange={onChange}
      required={required}
      isDisabled={disabled}
    />
  );
};

export default Product;
