import React from "react";
// import ContentSection3 from "../../components/static/ContentSection3";
import ContentCardSection3 from "../../components/static/contentCardSection3";
import Heading3 from "../../components/static/header/heading3";
//Config
import * as ThiDiffMedia from "../../helpers/ThidiffSiteMedia";

const CurrentOpening = () => {
  const arrayList = [
    {
      col: "col-md-6 py-2",
      img: ThiDiffMedia.fresher,
      pharagrap:
        "Are you a skilled fresh graduate and looking for an opportunity to build your career?",
      button: "Click Here",
    },
    {
      col: "col-md-6 py-2",
      img: ThiDiffMedia.experienced,
      pharagrap:
        "Are you a experienced graduate and looking for an opportunity to enhance your career?",
      button: "Click Here",
    },
  ];
  return (
    <div>
      <div className="container py-3">
        <Heading3
          className="text-center font-weight-bold h3 py-3"
          heading="Current Openings"
          style={{ color: "#224a8b" }}
        />
        <paragraphContentSection
          paragraphclass="text-center h5 py-3"
          paragraph="We are growing rapidly and are always looking for motivated and talented individuals to join us. Take a look at our current openings or learn about us."
        />
        <div className="d-none d-md-block">
          <ContentCardSection3
            buttonicon
            arrayList={arrayList}
            className="text-center text-white font-weight-bold py-3"
            paragraphclassName="text-white "
            style={{ backgroundColor: "#234a8b" }}
            classbutton="btn btn-primary float-right mx-auto"
          />
        </div>
        <div className="d-block d-md-none text-center">
          <ContentCardSection3
            buttonicon
            arrayList={arrayList}
            className="text-center text-white font-weight-bold py-3"
            paragraphclassName="text-white "
            style={{ backgroundColor: "#234a8b" }}
            classbutton="btn btn-primary  mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentOpening;
