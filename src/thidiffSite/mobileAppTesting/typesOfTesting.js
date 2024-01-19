import React from "react";
import team from "../assets/icons/fuctional.png";
import manual from "../assets/icons/manual.png";
import chart from "../assets/icons/chart.png";
import automated from "../assets/icons/automated.png";
import serachplay from "../assets/icons/serachplay.png";
import securitytesting from "../assets/icons/securitytesting.png";
import Heading4 from "../../components/static/header/heading4";
import SingleCardSection from "../../components/static/singleCardSection";

const TypesOfTesting = () => {
  const arrayList = [
    {
      col: "col-md-6",
      img: team,
      heading: "Functional Testing",
      pharagrap:
        "Functional mobile app testing helps in verifying that the functionalities of the app address the required objectives. Such type of testing focuses largely on the primary objective and flow of the mobile app.",
    },
    {
      col: "col-md-6",
      img: manual,
      heading: "Manual Testing",
      pharagrap:
        "Manual testing is one of the proven approaches for navigating the complexity of mobile app thoroughly. Manual testing helps ensuring final product is performing ideally according to intended expectations.",
    },
    {
      col: "col-md-6",
      img: chart,
      heading: "Performance Testing",
      pharagrap:
        "Performance testing is also a crucial variant of mobile app testing that reviews the speed, stability, and responsiveness of an application under different workload conditions.",
    },
    {
      col: "col-md-6",
      img: automated,
      heading: "Automated Testing",
      pharagrap:
        "As you must have noticed previously, manual testing is a comprehensive option for mobile app testing. However, certain mobile app quality tests are excessively complex and tedious. In such cases, Mobile App Test Automation",
    },
    {
      col: "col-md-6",
      img: serachplay,
      heading: "Interrrupt Testing",
      pharagrap:
        "Interruption testing is useful for testing the behavior of an application in an interrupted state prior to resuming the previous state. The general example of interruptions can include incoming phone calls or SMS, alarms",
    },
    {
      col: "col-md-6",
      img: securitytesting,
      heading: "Security Testing",
      pharagrap:
        "Certain applications such as travel apps require the personal information of users for different transactions. If your app demands something similar, then it is essential that you provide the guarantee of confidentiality",
    },
  ];
  return (
    <div>
      <div className="container">
        <Heading4
          heading="Types of Mobile Application Testing"
          className=" font-weight-bold py-5"
          style={{ color: "#113b95" }}
        />
        <SingleCardSection arrayList={arrayList} />
      </div>
    </div>
  );
};

export default TypesOfTesting;
