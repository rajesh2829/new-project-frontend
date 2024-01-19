import React, { useState } from "react";
import ProductService from "../services/ProductService";
import Select from "./Select";
import ProductCard from "../views/product/components/productCard"

const ProductSelect = (props) => {

  let { name, handleProductChange, productOption } = props;

  const [productOptions, setProductOption] = useState([]);

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
        disableLink
        disableLinks
        productName={productName}
        url={productImage}
        brandName={brandName}
        size={size}
        unit={unit}
        salePrice={salePrice}
        mrp={mrp}
      />
    );
  };

  const getProducts = async () => {
    let response = await ProductService.getOption();
    let productList = new Array();

    if (response && response.data) {
      let products = response.data;
      if (products && products.length > 0) {
        for (let i = 0; i < products.length; i++) {
          let productDetails = products[i];
          productList.push({
            label: getProductDetails(
              productDetails.name,
              products[i].image,
              productDetails.brand,
              productDetails.size,
              productDetails.unit,
              productDetails.sale_price,
              productDetails.mrp,
              productDetails.id
            ),
            value: productDetails.product_display_name + products[i].id,
            id: products[i].id,
          });
        }
      }
    }
    setProductOption(productList);
    productOption(productList);
  };
  const productList = productOptions && productOptions.sort((a, b) => (a.value > b.value) ? 1 : -1);
  return (
    <>
      <Select
        name={name ? name : "product"}
        placeholder="Select Product"
        options={productList}
        handleChange={handleProductChange}
        autoFocus={getProducts}
        menuPortal={props.menuPortal}
        showVirtualizedMenu={true}
      />
    </>
  )

}

export default ProductSelect;