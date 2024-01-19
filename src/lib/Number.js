import React from "react";

class Number extends React.Component {
    static Get(data){
          let formatData = data ? parseInt(data) : "";
          return formatData;
      }

      static Float(number, defaultValue = null) {
        try {
          if (number) {
            let formatData = parseFloat(number);
    
            if (formatData) {
              let floatNumber = formatData.toFixed(2);
    
              return parseFloat(floatNumber);
            }
          }
          return defaultValue;
        } catch (err) {
          console.log(err);
        }
      }

  static isNotNull(value) {
    if (value && value !== "undefined" && value !== undefined && value !=="" && value !=="null") {
      return true;
    }
    return false;
  }
      
    static PercentageData(data) {
        const validation = isFinite(data);
        if (validation) {
          return data;
        } else {
          let value = data.substring(0, data.length - 1);
          return value;
        }
      }
      static roundOff(number) {
        if (number) {
          return Math.round(number);
        } else {
          return null;
        }
      }
      static getPositive (number)  {
        return  number <= 0 ? "" : number;
      };
    
    }
    export default Number;