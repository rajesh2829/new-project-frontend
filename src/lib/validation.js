/**
 * Is data True
 * @param value
 */
 export const isTrue = (value) => {
    if (value == "true") {
      return true;
    } else return false;
  };
  
  /**
   * Is data False
   * @param value
   */
  export const isFalse = (value) => {
    if (value != "true") {
      return true;
    } else return false;
  };