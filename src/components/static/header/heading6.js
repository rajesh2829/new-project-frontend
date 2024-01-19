import React, { Component } from "react";

export default class Heading6 extends Component {
  render() {
    const { heading, className } = this.props;
    return (
      <div>
        <h3 className={className}>{heading}</h3>
      </div>
    );
  }
}
