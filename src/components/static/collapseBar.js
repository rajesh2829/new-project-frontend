import React, { Component } from "react";
import { Collapse } from "reactstrap";

export default class CollapseBar extends Component {
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

    return (
      <div>
        <div className="">
          {sublist && sublist.length > 0 && (
            <div className="section-maincontent mt-4">
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
                          <b className="text-dark">{data.label}</b>

                          {this.state[data.id] ? (
                            <i
                              className="fa fa-minus ml-5 pull-right text-dark pt-1"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <i
                              className="fa fa-plus ml-5 pull-right text-dark pt-1"
                              aria-hidden="true"
                            ></i>
                          )}
                        </>
                      </p>
                    </div>

                    <Collapse className="pl-3" isOpen={this.state[data.id]}>
                      {/* <ul className="text-dark">{data.label}</ul> */}
                      {data &&
                        data.list &&
                        data.list.length > 0 &&
                        data.list.map((list) => (
                          <li className="text-decoration-none list-unstyled py-2">
                            <a className=" text-dark" href={list.url}>
                              {list.menu}
                            </a>
                          </li>
                        ))}
                    </Collapse>

                    <hr />
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
