import React, { Component } from "react";

export default class Heading3 extends Component {
  render() {
    const { heading, className, style } = this.props;
    return (
      <div>
        <h3 className={className} style={style}>
          {heading}
        </h3>
      </div>
    );
  }
}
