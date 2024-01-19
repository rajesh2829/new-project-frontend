import React from "react";

// Component
import Select from "./Select";

// Constant
import { ProductShopifyStatus } from "../helpers/Product";

/**
 * Publish status dropdown component
 *
 * @param label
 * @param name
 * @param placeholder
 */
const PublishStatus = ({ label, name, placeholder }) => {
  return (
    <Select
      label={label}
      name={name}
      placeholder={placeholder}
      options={[
        {
          label: ProductShopifyStatus.DRAFT,
          value: ProductShopifyStatus.DRAFT
        },
        {
          label: ProductShopifyStatus.PUBLISHED,
          value: ProductShopifyStatus.PUBLISHED
        }
      ]}
    />
  );
};

export default PublishStatus;
