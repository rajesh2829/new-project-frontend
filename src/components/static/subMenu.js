import React, { Component } from "react";

import { Collapse } from "reactstrap";

// import img from "../../assets/img/list.png";

import classnames from "classnames";

export default class SubMenu extends Component {
  constructor(props) {
    super(props);

    // Set the initial input values

    this.state = {
      isActive: false,
    };
  }

  //Faq toggle

  _toggle = (id) => {
    this.setState({ [id]: !this.state[id] });
  };

  render() {
    const { sublist } = this.props;

    const { isActive } = this.state;

    return (
      <div>
        <nav
          id="quickMenuPopOver"
          className={classnames(
            "quickMenu",

            isActive ? "expanded " : "collapsed"
          )}
        >
          <div
            className="quickMenuIcon"
            onClick={() => this.setState({ isActive: !isActive })}
          >
            {/* <Sidebaricon /> */}

            <img src="img" alt="humburger" />
          </div>

          <div className="card position-absolute" >
            {sublist && sublist.length > 0 && (
              <div className="section-maincontent mt-4">
                <h3 className="font-weight-bold mb-4">FAQ</h3>

                <hr />

                {sublist.map((data) => {
                  return (
                    <>
                      <div className="col-12">
                        <p
                          className="cursor-pointer mb-3"
                          onClick={() => {
                            this._toggle(data.id);
                          }}
                        >
                          <>
                            <b>{data.menu}</b>

                            {this.state[data.id] ? (
                              <i
                                className="fa fa-minus ml-5 pull-right pt-1"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i
                                className="fa fa-plus ml-5 pull-right pt-1"
                                aria-hidden="true"
                              ></i>
                            )}
                          </>
                        </p>
                      </div>

                      <Collapse className="pl-3" isOpen={this.state[data.id]}>
                        <ul>{data.label}</ul>

                        <li className="text-decoration-none">
                          <a href={data.url}>{data.menu}</a>
                        </li>

                        <hr></hr>
                      </Collapse>

                      <hr />
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}
