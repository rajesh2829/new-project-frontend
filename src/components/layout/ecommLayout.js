import React from "react";
import { Route } from "react-router-dom";
import EcommLayoutRoute from "../../views/ecomm/layout/mainLayout";


const EcommLayOut =(props)=>{

    let { component: Component, settings, ...rest } = props;

    return(
        <Route
        {...rest}
        render={(matchProps) => (
          <EcommLayoutRoute {...matchProps} {...settings}>
            <Component {...settings} {...matchProps} />
          </EcommLayoutRoute>
        )}
      />
    )
}

export default EcommLayOut