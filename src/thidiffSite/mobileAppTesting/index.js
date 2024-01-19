import React from "react";
import { setPortalName } from "../../lib/Portal";
import ToolsTechnologies from "../testing/toolsTechnologies";
import WeOffer from "../testing/weOffer";
import Banner from "./banner";
import MobileAppication from "./mobileAppication";
import Testing from "./testing";
import TypesOfTesting from "./typesOfTesting";

function MobileAppTesting() {
  setPortalName("Mobile App Testing");
  return (
    <div>
      <Banner />
      <Testing />
      <MobileAppication />
      <TypesOfTesting />
      <WeOffer />
      <ToolsTechnologies />
    </div>
  );
}

export default MobileAppTesting;
