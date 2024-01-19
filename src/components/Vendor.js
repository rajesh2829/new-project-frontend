import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Component
import  Select from "./Select";

// Services
import service from "../services/AccountService";

/**
 * Vendor component
 *
 */
const Vendor = props => {
  const { selectedVendorId, label, onChange, name, required, disabled } = props;
  
  const [vendors, setVendors] = useState([]);
  const [selectedVendorName, setSelectedVendorName] = useState("");
 
  useEffect(() => {
    getVendors();
    selectedVendorId && getSeletedVendorDetails(selectedVendorId);
  }, [selectedVendorId]);

  // get all vendor list
  const getVendors = async () => {
    try {
      let vendorList = [];
      const vendors = await service.getVendor();
      if (vendors.data && vendors.data.length > 0) {
        vendors.data.forEach(vendor => {
          vendorList.push({
            label: vendor.vendorName,
            value: vendor.id
          });
        });
      }
      setVendors(vendorList);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get selected vendor details
  const getSeletedVendorDetails = async () => {
    try {
      const vendorDetails = await service.getVendor(selectedVendorId);
      if (vendorDetails.data && vendorDetails.data.vendorName) {
        setSelectedVendorName(vendorDetails.data.vendorName);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  return (
    <Select
      name={name ? name : "supplier"}
      placeholder="Select Supplier"
      label={label}
      defaultValue={
        selectedVendorId
          ? {
              label: selectedVendorName,
              value: selectedVendorId
            }
          : ""
      }
      options={vendors}
      onInputChange={onChange}
      required={required}
      isDisabled={disabled}
    />
  );
};

export default Vendor;
