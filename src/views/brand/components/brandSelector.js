import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// Component
import MultiselectCreatable from "../../../components/MultiselectCreatable";
import ArrayList from "../../../lib/ArrayList";
// Services
import productBrandService from "../../../services/ProductBrandService";

/**
 * Brand Selector component
 *
 */
const BrandSelector = (props) => {
  const {
    selectedBrandId,
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

  const [brands, setBrands] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState("");

  useEffect(() => {
    getBrandList();
    selectedBrandId && getSeletedBrandDetails(selectedBrandId);
  }, [selectedBrandId]);

  // get all brand list
  const getBrandList = async () => {
    try {
      let brandList = [];
      const brands = await productBrandService.getBrands();
      if (ArrayList.isNotEmpty(brands.data ) ){
        brands.data.forEach((brand) => {
          if (brand.status == "Active") {
            brandList.push({
              label: brand.name,
              value: brand.name,
              id: brand.id,
              status: brand.status,
            });
          }
        });
      }
      setBrands(brandList);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get selected brand details
  const getSeletedBrandDetails = async () => {
    try {
      const brandDetails = await productBrandService.getBrandsById(
        selectedBrandId
      );
      if (
        brandDetails.data &&
        brandDetails.data.name &&
        brandDetails.data.status !== "InActive"
      ) {
        setSelectedBrandName(brandDetails.data.name);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  return (
    <MultiselectCreatable
      value={id}
      name={name ? name : "brand"}
      placeholder="Select Brand"
      label={label}
      status={status}
      defaultValue={
        selectedBrandName
          ? {
              label: selectedBrandName,
              value: selectedBrandName,
              id: selectedBrandId,
            }
          : ""
      }
      options={brands}
      onInputChange={onChange}
      required={required}
      isDisabled={disabled}
      fullWidth={fullWidth}
      isSearchable={isSearchable}
      error={error}
      isSingleSelect={true}
      disabled={disabled}
    />
  );
};

export default BrandSelector;
