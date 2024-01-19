import React from "react";


class Boolean extends React.Component{
    static Get(value){
        let boolValue = value ? true : false;
        return boolValue;
    }
}
export default Boolean;