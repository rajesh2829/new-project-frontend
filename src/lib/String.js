/**
 * Is data Empty
 * @param data
 */
export const isEmpty = (string) => {
  if (string == 0) {
    return true;
  } else return null;
};

/**
 * Is data Empty
 * @param data
 */
export const isNotEmpty = (string) => {
  if (string != 0) {
    return true;
  } else return null;
};

class String {
  static Get = (data) => {
    let formatData = data ? (data) : "";
    return formatData;
  }

  static replace = (data) => {
    if (data) {
      return data.replace(/[^\w\s]/gi, "")
    }
  }

  static isNotNull(value) {
    if (value && value !== "undefined" && value !== undefined && value !=="" && value !=="null") {
      return true;
    }
    return false;
  }
  static convertPropertiesToJSON(obj) {

    for (var prop in obj) {

      if (obj.hasOwnProperty(prop) && obj[prop] && obj[prop].value) {

        if (typeof obj[prop] === "object") {
          obj[prop] = JSON.stringify(obj[prop]);
        }
      }
    }

    return obj;
  }
};

export default String;
