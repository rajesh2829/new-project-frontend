import React, { useState, useEffect } from "react";

// Component
import { Select } from "../../core/form";

// Helpers
import { ProductShopifyStatus } from "../../../helpers/Product";

/**
 * Shopify Status Filter component
 *
 */
const ShopifyStatusFilter = props => {
  const { selectedShopifyStatus, onChange } = props;

  const [
    selectedShopifyStatusOption,
    setSelectedShopifyStatusOption
  ] = useState({});
  const shopifyStatusOptions = [
    {
      label: ProductShopifyStatus.DRAFT,
      value: ProductShopifyStatus.DRAFT
    },
    {
      label: ProductShopifyStatus.PUBLISHED,
      value: ProductShopifyStatus.PUBLISHED
    }
  ];

  useEffect(() => {
    getSeletedShopifyStatusDetails(selectedShopifyStatus);
  }, [selectedShopifyStatus]);

  // get selected brand details
  const getSeletedShopifyStatusDetails = () => {
    if (selectedShopifyStatus == ProductShopifyStatus.PUBLISHED) {
      setSelectedShopifyStatusOption({
        label: ProductShopifyStatus.PUBLISHED,
        value: ProductShopifyStatus.PUBLISHED
      });
    } else if (selectedShopifyStatus == ProductShopifyStatus.DRAFT) {
      setSelectedShopifyStatusOption({
        label: ProductShopifyStatus.DRAFT,
        value: ProductShopifyStatus.DRAFT
      });
    } else {
      setSelectedShopifyStatusOption({});
    }
  };

  return (
    <Select
      name={"shopifyStatus"}
      placeholder="Select Shopify Status"
      defaultValue={selectedShopifyStatus ? selectedShopifyStatusOption : ""}
      options={shopifyStatusOptions}
      onInputChange={onChange}
    />
  );
};

export default ShopifyStatusFilter;
