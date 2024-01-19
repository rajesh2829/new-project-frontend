import React, { Component } from "react";

export default class Heading4 extends Component {
  render() {
    const { heading, className, style } = this.props;
    return (
      <div>
        <h4 className={className} style={style}>
          {heading}
        </h4>
      </div>
    );
  }
}
