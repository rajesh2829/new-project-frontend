import DateTime from "../lib/DateTime";

// Order Status Constants
export const Order = {
    STATUS_COMPLETED: "Completed",
    STATUS_DRAFT: "Draft",
    STATUS_ACTIVE: "Active",
    STATUS_ALL: "All",
    STATUS_CANCELLED: "Cancelled",
    PAYMENT_CASH_TEXT: "Cash",
    PAYMENT_UPI_TEXT: "Upi",
    PAYMENT_CASH_VALUE: 1,
    PAYMENT_UPI_VALUE: 2,
    PAYMENT_MIXED_TEXT:"Mixed",
    PAYMENT_MIXED_VALUE:3,
    TYPE_DELIVERY:2,
    TYPE_STORE : 1,
    TYPE_DELIVERY_TEXT:"Delivery"
};
export const orderPaymentTypeOptions = [
    {
      label: Order.PAYMENT_CASH_TEXT,
      value: Order.PAYMENT_CASH_VALUE,
    },
    {
      label: Order.PAYMENT_UPI_TEXT,
      value: Order.PAYMENT_UPI_VALUE,
    },
    {
      label: Order.PAYMENT_MIXED_TEXT,
       value: Order.PAYMENT_MIXED_VALUE,
    },
  ];
  
