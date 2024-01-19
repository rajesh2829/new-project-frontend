import React, { Component } from "react";

export default class Heading2 extends Component {
  render() {
    const { heading, className, style } = this.props;
    return (
      <div>
        <h2 className={className} style={style}>
          {heading}
        </h2>
      </div>
    );
  }
}
