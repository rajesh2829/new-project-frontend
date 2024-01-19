import React, { Component } from "react";

export default class NavList1 extends Component {

  render() {
    const { Navlist, className } = this.props;

    return (
      <div>
        {" "}
        <ul className={className}>
          {Navlist &&
            Navlist.length > 0 &&
            Navlist.map((data) => (
              <li className="nav-item active mx-2">
                <a className="nav-link font-weight-bold" href={data.url}>
                  {data.name}
                </a>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
