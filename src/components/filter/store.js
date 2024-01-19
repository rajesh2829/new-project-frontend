import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Component
import Select from "../Select"

// Services
import service from "../../services/StoreService";
import StoreService from "../../services/StoreService";

/**
 * Store select component
 *
 */
const Store = props => {
  const { selectedStoreId, label, onChange, name, required } = props;

  const [stores, setStores] = useState([]);
  const [selectedStoreName, setSelectedStoreName] = useState("");

  useEffect(() => {
    getStores();
    selectedStoreId && getSeletedStoreDetails(selectedStoreId);
  }, [selectedStoreId]);

  // get all store list
  const getStores = async () => {
    try {
      let storeList = [];
      const stores = await StoreService.search();
      if (stores.data && stores.data.length > 0) {
        stores.data.forEach(store => {
          storeList.push({
            label: store.name,
            value: store.id
          });
        });
      }
      setStores(storeList);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get selected store details
  const getSeletedStoreDetails = async () => {
    try {
      const storeDetails = await service.getStoreDetails(selectedStoreId);
      if (storeDetails.data && storeDetails.data.name) {
        setSelectedStoreName(storeDetails.data.name);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  return (
    <Select
      name={name ? name : "locationName"}
      placeholder="Select Location"
      label={label}
      defaultValue={
        selectedStoreId
          ? {
              label: selectedStoreName,
              value: selectedStoreId
            }
          : ""
      }
      options={stores}
      onInputChange={onChange}
      required={required}
    />
  );
};

export default Store;
