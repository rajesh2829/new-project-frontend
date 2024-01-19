import React, { useState, useEffect } from "react";

// Components
import Form from "../Form";
import Tags from "./innerComponents/tags";
import BrandFilter from "./innerComponents/brandFilter";
import CategoryFilter from "./innerComponents/categoryFilter";
import Store from "./store";

/**
 * Vendor filter component
 *
 * @param {*} getFilters
 */
const Filter = (props) => {
  const {
    selectedBrands,
    brandIds,
    onChangeBrand,
    selectedCategories,
    categoryIds,
    onChangeCatageory,
    productStatus,
    status,
    selectedTags,
    tagIds,
    onChangeTag,
    showTagFilter,
    selectedStoreId,
    showStoreFilter,
    onFilterChange,
    onChangeStatus,
  } = props;

  const [filterChanged, setFilterChanged] = useState(false);

  const [storeFilter, setStoreFilter] = useState(selectedStoreId);
  const productDefaultStatuses = {
    label: status,
    value: status,
  };
  const initialValues = {};

  useEffect(() => {
    const filters = {
      storeFilter,
    };

    filterChanged && onFilterChange && onFilterChange(filters);
  }, [storeFilter, filterChanged]);

  return (
    <div>
      <Form initialValues={initialValues}>
        <div className="row mb-3 ">
          {/* Brand */}
          <div className="col-md-6">
            <BrandFilter
              selectedBrands={selectedBrands}
              brandIds={brandIds}
              onChange={onChangeBrand}
            />
          </div>

          {/* Category */}
          <div className="col-md-6 mt-2 mt-md-0">
            <CategoryFilter
              selectedCategories={selectedCategories}
              categoryIds={categoryIds}
              onChange={onChangeCatageory}
            />
          </div>

          {/* Tag */}
          {showTagFilter && (
            <div className="col-md-3">
              <Tags
                onChangeTags={onChangeTag}
                selectedTags={selectedTags}
                tagIds={tagIds}
              />
            </div>
          )}

          {/* Store */}
          {showStoreFilter && (
            <div className="col-md-3">
              <Store
                selectedStoreId={selectedStoreId}
                onChange={(e) => {
                  setFilterChanged(true);
                  setStoreFilter(
                    e.values.locationName && e.values.locationName.value
                  );
                }}
              />
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Filter;
