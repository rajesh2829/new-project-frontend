import React, { Component } from "react";
import Thidiff from "../../assets/img/thidiff.jpg";
import Form from "../../components/Form";
import LeftSideSection from "./Components/LeftSideSection";
import GetStarted from "./Components/GetStarted";

export default class companySignup extends Component {
  render() {
    return (
      <div className="container-fluid vh-100 min-vh-100">
        <div className="row overflow-hidden ">
          <LeftSideSection
            height={"100vh"}
            sidebarImage={Thidiff}
            backgroundImage={Thidiff}
          />
          <div className="col bg-white h-100">
            <div className="row dashboard-right-side-section overflow-relative flex-column">
              <Form initialValues={{}}>
                <GetStarted />
              </Form>
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
}
