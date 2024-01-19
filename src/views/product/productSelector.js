import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// Component
import Select from "../../components/Select";
import Currency from "../../lib/Currency";
import Number from "../../lib/Number";
// Services
import service from "../../services/InventoryProductService";
import ProductCard from "../product/components/productCard";

/**
 * Product Name Name component
 *
 */
const ProductSelector = (props) => {
  const {
    selectedProductId,
    label,
    name,
    placeholder,
    onChange,
    required,
    disabled,
    ActiveProducts,
  } = props;

  const [Product, setProducts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [selectedProductName, setselectedProductName] = useState("");

  useEffect(() => {
    getProducts();
    getProductDetails();
    filteredProducts();
    selectedProductId && getProductName(selectedProductId);
  }, [selectedProductId]);

  // get all brand list
  const getProducts = async () => {
    try {
      let ProductNameList = [];
      const productNames = await service.getNameDetails();
      if (productNames.data && productNames.data.length > 0) {
        productNames.data.forEach((ProductName) => {
          ProductNameList.push({
            label: ProductName.name,
            value: ProductName.id,
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
      const ProductDetails = await service.getProductById(selectedProductName);
      if (ProductDetails.name) {
        setselectedProductName(ProductDetails.name);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  const getProductDetails = (
    productName,
    productImage,
    brandName,
    size,
    unit,
    salePrice,
    mrp
  ) => {
    return (
      <ProductCard
        productImageIcon
        square
        productName={productName}
        url={productImage}
        brandName={brandName}
        size={Number.Get(size)}
        unit={unit != "null" ? unit : ""}
        salePrice={Currency.Get(salePrice)}
        mrp={Currency.Get(mrp)}
      />
    );
  };

  const filteredProducts = async () => {
    let filterProductsList = [];

    const product = await service.getNameDetails();
    for (let i = 0; i < product.data.length; i++) {
      const data = product.data[i];

      if (data.status == "Active") {
        filterProductsList.push({
          label: getProductDetails(data.product_display_name, data.image),
          value: data.product_display_name,
          id: data.id,
          status: data.status,
        });
      }
    }
    setFilteredList(filterProductsList);
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
              value: selectedProductId,
            }
          : ""
      }
      options={ActiveProducts ? filteredList : Product}
      onInputChange={onChange}
      required={required}
      isDisabled={disabled}
    />
  );
};

export default ProductSelector;
