import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAppNavList } from "../nav/app";
export default class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [],
      hoveredIndex: null
    };
  }

  componentDidMount() {
    this.getNavList();
  }
  handleMouseEnter = (index) => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: null });
  };

  //Get Nav List
  getNavList = async () => {
    const list = await getAppNavList();
    this.setState({ navList: list });
  };

  render() {
    const currentRoute = window.location.pathname;
    const { navList } = this.state;
    return (
      <div>
        {navList &&
          navList.length > 0 &&
          navList.map((data, index) => (
            <div className="app-options">
              <Link class="text-decoration-none" to={data.url} >
                <div className="row pl-4 pb-1"
                  key={index}
                  onMouseEnter={() => this.handleMouseEnter(index)}
                  onMouseLeave={this.handleMouseLeave}
                  style={{
                    color: this.state.hoveredIndex === index
                      ? `${this.props?.leftNavigationTextHoverColor?.leftNavigationTextHoverColor}`
                      : `${this.props?.leftNavigationTextColor?.leftNavigationTextColor}`
                  }}
                >
                  <div className="py-2" >
                    <FontAwesomeIcon
                      icon={data.icon}
                      width="40px"
                      className="text-center"
                      size="xl"

                    />
                  </div>
                  <div className="row pl-4">
                    <h6 className="pt-2"
                    >{data.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}
