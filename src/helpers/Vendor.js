
// Status Constants
const Vendor = {
    STATUS_ACTIVE : "Active",
    STATUS_INACTIVE : "InActive",
    STATUS_ACTIVE_VALUE:1,
    STATUS_INACTIVE_VALUE:2,
    TYPE_VENDOR_TEXT:"Vendor",
    TYPE_VENDOR_VALUE:3,
    TYPE_CUSTOMER_TEXT:"Customer",
    TYPE_CUSTOMER_VALUE:1,
    TYPE_EMPLOYEE_TEXT:"Employee",
    TYPE_EMPLOYEE_VALUE:2,
    TYPE_OTHER_TEXT:"Other",
    TYPE_OTHER_VALUE:4
};

export default Vendor;

export const vendorStatusOptions = [
    {
      value: Vendor.STATUS_ACTIVE_VALUE,
      label: Vendor.STATUS_ACTIVE,
    },
    {
      value: Vendor.STATUS_INACTIVE_VALUE,
      label: Vendor.STATUS_INACTIVE,
    },
  ];
  export const typeOption = [
    {
      value: Vendor.TYPE_CUSTOMER_VALUE,
      label: Vendor.TYPE_CUSTOMER_TEXT,
    },
    {
      value: Vendor.TYPE_EMPLOYEE_VALUE,
      label: Vendor.TYPE_EMPLOYEE_TEXT,
    },
    {
      value: Vendor.TYPE_VENDOR_VALUE,
      label: Vendor.TYPE_VENDOR_TEXT,
    },
    {
      value: Vendor.TYPE_OTHER_VALUE,
      label: Vendor.TYPE_OTHER_TEXT,
    },
  ];