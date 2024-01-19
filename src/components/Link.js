import { Link } from "react-router-dom";
import React from "react";

function To(props) {
  return (
    <Link
      onClick={props.onClick}
      className={props.decoration ? props.decoration : false}
      to={props.url ? props.url : "#"}
      style={{ cursor: "pointer" }}
    >
      {props.text}
    </Link>
  );
}

export default To;
