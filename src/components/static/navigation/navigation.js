import React from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import "./style.scss";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      click: false,
    };
    this.Close = this.Close.bind(this);
    this.state = {
      isOpen: false,
      click: false,
    };
  }
  Close() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleClick = () => this.setState({ click: !this.state.click });
  Close = () => this.setState(false);
  render() {
    const { arrayList, logo, url } = this.props;

    return (
      <div>
        <div
          className="d-none d-md-block"
          style={{ backgroundColor: "#224a8b" }}
        >
          <div className="container">
            <Navbar light expand="md" style={{ backgroundColor: "#224a8b" }}>
              <a className="navbar-brand" href={url}>
                <img src={logo} width="125px" alt="logo" />
              </a>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {arrayList &&
                    arrayList.length > 0 &&
                    arrayList.map((nav) => (
                      <NavItem className="mx-2">
                        <NavLink
                          className="text-white text-center"
                          href={nav.url}
                        >
                          {nav.label}
                        </NavLink>
                      </NavItem>
                    ))}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>
        <div className="d-block d-md-none">
          <div
            className={this.state.click ? "main-container" : ""}
            onClick={() => this.Close()}
          />
          <nav className="nav-bar" onClick={(e) => e.stopPropagation()}>
            <div className="nav-container">
              <a href={url}>
                <img src={logo} width="125px" alt="logo" />
              </a>
              <div
                className={this.state.click ? "nav-menu active" : "nav-menu"}
              >
                {arrayList &&
                  arrayList.length > 0 &&
                  arrayList.map((nav) => (
                    <>
                      <li
                        className="nav-item menu-item mr-auto py-3"
                        style={{
                          borderBottom: "1px solid #D3D3D3",
                          width: "100%",
                        }}
                      >
                        <a
                          href={nav.url}
                          className="nav-links text-dark mx-4 float-left"
                          onClick={this.state.click ? this.handleClick : null}
                        >
                          {nav.label}
                        </a>
                      </li>
                    </>
                  ))}
              </div>
              <div className="nav-icon" onClick={this.handleClick}>
                <i
                  className={this.state.click ? "fa fa-times" : "fa fa-bars"}
                ></i>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
