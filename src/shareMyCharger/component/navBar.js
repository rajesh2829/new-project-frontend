import React, { Component } from "react";
import img from "../assets/img/logo.png";
import * as constant from "../navList";

class NavBar extends Component {
  render() {
    const Navlist = constant.getNavList();
    return (
      <div>
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src={img} width="170px" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  {Navlist &&
                    Navlist.length > 0 &&
                    Navlist.map((data) => (
                      <li className="nav-item active mx-2">
                        <a className="nav-link" href={data.url}>
                          {data.name}
                        </a>
                      </li>
                    ))}
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <button
                    type="button"
                    className="btn btn-outline-light me-2 mx-2"
                    style={{ background: "#1752c9" }}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-light "
                    style={{ background: "#f26426" }}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </>
      </div>
    );
  }
}
export default NavBar;
