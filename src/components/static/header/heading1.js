import React, { Component } from "react";

export default class Heading1 extends Component {
  render() {
    const { heading, className, style } = this.props;
    return (
      <div>
        <h1 className={className} style={style}>
          {heading}
        </h1>
      </div>
    );
  }
}
