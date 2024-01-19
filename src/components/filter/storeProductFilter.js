import React, { useState, useEffect } from "react";

// Components
import Form from "../Form";
import Store from "./store";

/**
 * Store product filter component
 */
const Filter = props => {
  const { selectedStoreId, onFilterChange } = props;

  const [filterChanged, setFilterChanged] = useState(false);
  const [storeFilter, setStoreFilter] = useState(selectedStoreId);
  const initialValues = {};

  useEffect(() => {
    const filters = {
      storeFilter
    };

    filterChanged && onFilterChange && onFilterChange(filters);
  }, [storeFilter, filterChanged]);

  return (
    <div>
      <Form initialValues={initialValues}>
        <div className="row">
          <div className="col-md-3">
            <Store
              selectedStoreId={selectedStoreId}
              onChange={e => {
                setFilterChanged(true);
                setStoreFilter(e.values.locationName && e.values.locationName.value);
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
