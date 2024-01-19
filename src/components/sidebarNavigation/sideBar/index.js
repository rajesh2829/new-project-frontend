import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import MyContext from "../../../context/myContext";
import SideBarItem from "./sideBarItem";

// Font Awesome Icon
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import Cookie from "../../../helpers/Cookie";
import { setCookie } from "../../../lib/Helper";
import Url from "../../../lib/Url";
import ProjectSelector from "../../../views/project/components/projectSelector";
import AppNav from "../../AppNav";
import CreateTicketModel from "../../createTicketModel";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isModalOpen: false,
      isSubmit: true,
    };
  }
  // Render Sidebar list
  renderSideBarList(currentRoute, enable) {
    const textColor = this.props.leftNavigationTextColor
      ? this.props.leftNavigationTextColor
      : "";
    const backgroundColor = this.props.leftNavigationBackgroundColor
      ? this.props.leftNavigationBackgroundColor
      : "";
    const textHoverColor = this.props.leftNavigationTextHoverColor
      ? this.props.leftNavigationTextHoverColor
      : "";
    const navList =
      this.props && this.props.navList
        ? this.props.navList
        : this.props.projectNavList;
    const sideNav = this.props.sideNav;
    return (
      navList &&
      navList().map((navigation, key) => (
        <SideBarItem
          projectId={this.props.projectId}
          id={key}
          key={key}
          navigation={navigation}
          currentRoute={currentRoute}
          enable={enable}
          textColor={textColor}
          textHoverColor={textHoverColor}
          backgroundColor={backgroundColor}
          sideNav={sideNav}
          isOpen={this.state.isOpen}
        />
      ))
    );
  }

  closeMenuOnBlur = (e, ctx) => {
    if (e.target.classList.contains("site-sidebar")) return;
    ctx.updateMenuToggled();
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  // Handle Project
  handleProjectChange = async (values) => {
    const projectId =
      values &&
      values.values &&
      values.values.projectName &&
      values.values.projectName.value;

    Url.UpdateUrl(
      {
        projectId: projectId ? projectId : "",
        startDate: Url.GetParam("startDate"),
        endDate: Url.GetParam("endDate"),
        isLoading: true,
      },
      this.props
    );
    setCookie(Cookie.PROJECT_ID, projectId);
    this.props.actions.dispatch(
      this.props.actions.fetchList(
        "ticket",
        `${endpoints().ticketAPI}/search`,
        1,
        25,
        {
          startDate: Url.GetParam("startDate"),
          endDate: Url.GetParam("endDate"),
          projectId: projectId ? projectId : "",
        }
      )
    );
  };

  handleAppNavOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    let projectId = this.props.projectId || Url.GetParam("projectId");
    const currentRoute = window.location.pathname;
    let leftNavStyle = {};
    if (this.props.leftNavigationBackgroundColor) {
      leftNavStyle = {
        backgroundColor: `${this.props.leftNavigationBackgroundColor}`,
      };
    }
    const enable = !this.props.enable ? false : true;

    const sideNav = this.props.sideNav;

    const leftNavigationBackgroundColor = this.props;
    const leftNavigationTextColor = this.props;
    const leftNavigationTextHoverColor = this.props;

    const MemoizedChildComponent = React.memo(() => {
      const [isModalOpen, setModalOpen] = useState(false);
      const handleCloseModal = () => {
        setModalOpen(!isModalOpen);
      };
      return (
        <CreateTicketModel
          showButton={true}
          hideAddButton
          showAddButton
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      );
    });

    return (
      <>
        <MyContext.Consumer>
          {(context) => (
            <>
              <div
                id={!sideNav ? "sidebar" : "sidebar-sidenav"}
                className={` d-flex flex-column flex-shrink-0 " ${
                  context.menuToggled ? "menu-toggled" : "menu-hidden"
                }`}
                onClick={(e) => this.closeMenuOnBlur(e, context)}
                style={leftNavStyle}
              >
                <nav
                  className={
                    this.state.isOpen === false ? "d-none d-sm-block" : ""
                  }
                >
                  {this.props && this.props.showProjectSelector && (
                    <div className="d-flex  align-items-center">
                      <div className="w-100">
                        <ProjectSelector
                          clearable={false}
                          initialValues={projectId}
                          onInputChange={(e) => {
                            this.handleProjectChange(e);
                          }}
                          defaultId={this.props.defaultId}
                        />
                      </div>
                      <div>
                        <MemoizedChildComponent />
                      </div>
                    </div>
                  )}
                  <ul className="list-unstyled mb-0 pt-2 pb-5">
                    {/*render the sidebar menu*/}
                    {this.renderSideBarList(currentRoute, enable)}
                  </ul>
                </nav>
                <div
                  className="collapse-extend "
                  style={{
                    backgroundColor: `${this.props.leftNavigationBackgroundColor}`,
                    color: `${this.props.leftNavigationBackgroundColor}`,
                  }}
                  onClick={this.props.showSidenav}
                >
                  {!sideNav ? (
                    <Link className="sideNavIcon-left">
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  ) : (
                    <Link className="sideNavIcon-right">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  )}
                </div>
              </div>
              <AppNav
                leftNavigationBackgroundColor={leftNavigationBackgroundColor}
                leftNavigationTextColor={leftNavigationTextColor}
                leftNavigationTextHoverColor={leftNavigationTextHoverColor}
                handleAppNavOpen={this.handleAppNavOpen}
              />
            </>
          )}
        </MyContext.Consumer>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        dispatch,
        fetchList,
      },
      dispatch
    ),
  };
}
export default connect(() => {
  return "";
}, mapDispatchToProps)(Index);
