import React from "react";
import Currency from "../lib/Currency";

const NumberView = ( props ) => {
    return (
        <span className={props.number < 0 ? "text-danger" : props.number > 0 ? "text-success":"text-dark"}>
              {Currency.Format(props.number)}
            </span>
    )
}
export default NumberView;