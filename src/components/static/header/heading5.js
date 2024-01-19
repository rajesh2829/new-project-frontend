import React, { Component } from "react";

export default class Headind5 extends Component {
  render() {
    const { heading, className, style } = this.props;
    return (
      <div>
        <h5 className={className} style={style}>
          {heading}
        </h5>
      </div>
    );
  }
}
