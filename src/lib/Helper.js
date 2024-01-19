import moment from "moment";
import { COOKIE_SESSION_TOKEN } from "./Cookie";


/**
 * Get Url Parameter

 * @param password
 */
export function getpassword(password) {
  var strongRegex = new RegExp(
    ""
  );
  let data;
  if (password.match(strongRegex)) {
    data = true;
  } else {
    data = false;
  }
  return data;
}

/**
 * Strong Password validation
 *
 * @param password
 * @returns error
 */
export function validateStrongPassword(password) {
  let error;

  if (password && password.length < 8) {
    error = "Must be at least 8 characters";
  } else if (
    password &&
    password.length >= 8 &&
    getpassword(password) !== true
  ) {
    error = "";
  }

  return error;
}

/**
 * Get Current Year
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Get Formatted Today dd/mm/yyyy
 */
export function getFormattedTodayDate() {
  return moment().format("ll");
}




/**
 * Remove phone mask
 * @param {*} phoneNumber
 */
export function removeMaskedPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/[^0-9]/g, "");
}

/**
 * validate Routing Number
 * @param {*} routingNumber
 */
export function validateRoutingNumber(routingNumber) {
  if (routingNumber.length !== 9) {
    return false;
  }

  const checksumTotal =
    7 *
    (parseInt(routingNumber.charAt(0), 10) +
      parseInt(routingNumber.charAt(3), 10) +
      parseInt(routingNumber.charAt(6), 10)) +
    3 *
    (parseInt(routingNumber.charAt(1), 10) +
      parseInt(routingNumber.charAt(4), 10) +
      parseInt(routingNumber.charAt(7), 10)) +
    9 *
    (parseInt(routingNumber.charAt(2), 10) +
      parseInt(routingNumber.charAt(5), 10) +
      parseInt(routingNumber.charAt(8), 10));

  const checksumMod = checksumTotal % 10;

  if (checksumMod !== 0) {
    return false;
  } else {
    return true;
  }
}

/**
 *  Excerpt text
 *  @param {*} string
 */
export function excerptText(str = "", strLength = 0) {
  return `${str.slice(0, strLength)} ${str.length - 3 > strLength ? "..." : ""
    }`;
}

/**
 * Get Cookie
 *
 * @param cname
 * @returns {string}
 */

class Cookie {
 static get=(cname)=>{
  var nameEQ = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return "";
 }
}
export default Cookie;
/**
 * Set Cookie
 *
 * @param cookieName
 * @param cookieValue
 * @param days
 */
export function setCookie(cookieName, cookieValue, days = 1) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
}

/**
 * Clear Cookie
 *
 * @param name
 */
export function clearCookie(name) {
  setCookie(name, "", -24);
}

/**
 * Mask Phone Number
 *
 * @param phone number
 */
export function maskPhoneNumber(phoneNumber) {
  const num = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
    3,
    6
  )}-${phoneNumber.substring(6, phoneNumber.length)}`;
  return num;
}

/**
 * Get value by object
 *
 * @param {*} data
 * @param {*} keyValue
 */
export const getValueByObject = (data, keyValue) => {
  if (!data.length) {
    return "";
  }
  const obj = data.find((url) => url.label === keyValue);
  const SocialMedialink = obj.value;
  return SocialMedialink;
};

/**
 * Short Timezone
 *
 * @param {*} value
 */
export function shortTimeZone(value) {
  return value.slice(1, 10);
}

// Sort Array by order
export function sortNameByOrder(arrays) {
  return (
    arrays &&
    arrays.length > 0 &&
    arrays.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    })
  );
}


/**
 * Is data Empty
 * @param data
 */
export const isEmpty = (data) => {
  if (data && data.length > 0) {
    return true;
  } else return null;
};

/**
 * Is LoggedIn user
 *
 * @param name
 */
export function isLoggedIn() {
  const currentPath = window.location.pathname;
  let redirectUrl = "";
  if (currentPath) {
    redirectUrl = `?redirect=${currentPath}`;
  }

  if (!Cookie.get(COOKIE_SESSION_TOKEN)) {
    // if session_token is null redirect login
    window.location.replace(`/login${redirectUrl}`);
  }
}



/**
 * Get value by object key
 *
 * @param {*} data
 * @param {*} keyValue
 */
export const getKeyValueByObject = (data, keyValue) => {

  if (!data || (data && data.length == 0)) {
    return null;
  }

  let defaultValue = "";
  Object.keys(data).forEach(function (key) {
    var value = data[key];
    if (keyValue === value.name) {
      defaultValue = value.value;
    }
  });
  return defaultValue;
};

/**
 * To String
 *
 * @param {*} value
 */
export function toString(value) {
  return value ? value : null;
}

/**
 * From Array
 *
 * @param values
 * @returns {string}
 */
export function fromArray(values) {
  const arrayData = [];
  if (values && values.length > 0) {
    values.forEach((value) => {
      arrayData.push({ tagId: value.value });
    });
  }
  return arrayData ? arrayData : "";
}

export function getRandomColor(size) {
  let colorList = [];
  for (var i = 0; i < size; i++) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colorList.push(color);
  }
  return colorList;
}
export function getColorsRandom() {
  var color = '0123456789ABCDEF'.split('');
  var colorlist = '#';
  for (var i = 0; i < 6; i++) {
    colorlist += color[Math.floor(Math.random() * 16)];
  }
  return colorlist;
}

