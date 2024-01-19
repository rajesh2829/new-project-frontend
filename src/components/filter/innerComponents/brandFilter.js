import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactSelect from "react-select";

// Constant
import { ACTIVE } from "../../constants/status";

// Services
import service from "../../../services/ProductBrandService";

/**
 * Product Brand Name component
 *
 */
const BrandFilter = props => {
  const { name, brandIds, selectedBrands, onChange } = props;

  const [brands, setBrands] = useState([]);

  const [defaultBrandList, setDefaultBrandList] = useState([]);
  const brandIdsList =
    brandIds && brandIds.toString().split(",").length > 0
      ? brandIds.toString().split(",")
      : [];

  // get all brand list
  const getBrands = async () => {
    try {
      const brandList = await service.getBrands();

      if (brandList.data && brandList.data.length > 0) {
        setBrands(brandList.data);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Get Brand Details by Default Brand ID
  const getDefaultBrands = async () => {
    const defaultBrands = [];
    if (brandIdsList && brandIdsList.length > 0) {
      brandIdsList.forEach(async brandId => {
        if (brandId) {
          const brandDetails = await service.getBrandDetailsById(brandId);

          defaultBrands.push({
            label: brandDetails.data.name,
            value: parseInt(brandDetails.data.id, 10)
          });
          setDefaultBrandList(defaultBrands);
        }
      });
    } else {
      setDefaultBrandList(defaultBrands);
    }
  };

  useEffect(() => {
    getBrands();
    getDefaultBrands();
  }, [brandIds, selectedBrands]);

  let brandList = [];
  brands.map(brand => {
    if (brand.status === ACTIVE) {
      brandList.push({
        label: brand.name,
        value: brand.id
      });
    }
  });

  return (
    <>
      <ReactSelect
        name={name ? name : "brandName"}
        value={
          selectedBrands &&
          selectedBrands.length > 0 &&
          brandIdsList &&
          brandIdsList.length > 0 &&
          selectedBrands.length >= brandIdsList.length
            ? selectedBrands
            : brandIdsList && brandIdsList.length > 0 && defaultBrandList
            ? defaultBrandList
            : []
        }
        onChange={onChange}
        options={brandList}
        placeholder="Select Brands"
        isMulti
      />
    </>
  );
};

export default BrandFilter;
