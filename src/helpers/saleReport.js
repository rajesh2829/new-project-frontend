// Status Constants
export const PaymentType = {
  CASH_TYPE_TEXT: "Cash",
  UPI_TYPE_TEXT: "Upi",
  CASH_VALUE:"amount_cash" ,
  UPI_VALUE:"amount_upi",
};

export const paymentTypeOptions = [
  {
    label: PaymentType.CASH_TYPE_TEXT,
    value: PaymentType.CASH_VALUE,
  },
  {
    label: PaymentType.UPI_TYPE_TEXT,
    value: PaymentType.UPI_VALUE,
  },
];
