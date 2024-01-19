
import React from "react";

class Percentage extends React.Component {

      static Get(value, defaultValue = null) {
        let result = value ? `${value}%` : defaultValue;
        return result;
      }
}
export default Percentage;