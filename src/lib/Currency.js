/**
 * Format currency in Indian format
 *
 * @param {*} price
 */

class Currency {
  static Format(price) {
    if(price===null){
      return ""
    }
    const formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
    if (!formattedPrice) {
      return "";
    }

    return `${formattedPrice}`;
  }

  // Currency Format Without Decimal Value
  static GetFormatted(value, locale) {
    const formattedValue = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value, locale);
    if (!formattedValue) {
      return "";
    }
    return `${formattedValue}`;
  }

  static Get(price) {
    if (price !== null) {
      return parseFloat(price);
    } else {
      return "0.00";
    }
  }

  static Math(data) {
    const value = `₹${Math.round(data)}`;
    return value ? value : "";
  }
}

export default Currency;

export function Decimal(data) {
  let price = data;
  let amount =
    price.indexOf(".") >= 0
      ? price.substr(0, price.indexOf(".")) +
        price.substr(price.indexOf("."), 3)
      : price;
  return amount;
}

export function Percentage(data) {
  let price = data;
  if (price) {
    return `${price}%`;
  } else {
    return "0%";
  }
}
