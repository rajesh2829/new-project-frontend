import React from "react";
import ContentCardSection3 from "../../components/static/contentCardSection3";

const QulityAssurance = () => {
  const arrayList = [
    {
      col: "col-lg-6 mt-md-0 mt-sm-5  col-md-12  py-2",
      heading: "QUALITY ASSURANCE EXPERTS",
      pharagrap:
        "ThiDiff’s dedicated QA unit employs 40+ quality assurance professionals, including ISTQB®-certified engineers. We are highly motivated, results-oriented, and have a passion for constantly improving our processes and workflows.",
    },
    {
      col: "col-lg-6 mt-md-0 mt-sm-5  col-md-12  py-2",
      heading: "COMPREHENSIVE QA KNOWLEDGE",
      pharagrap:
        "Our engineers are well-versed in all the standard test types and beyond. Whether testing functionality, performance, UI, or localization, conducting security audits, or implementing complex test automation — we got you covered!",
    },
    {
      col: "col-lg-6 mt-md-0 mt-sm-5  col-md-12  py-2",
      heading: "100% TRANSPARENCY AND CONTROL",
      pharagrap:
        "Our approach relies on trust and 100% results visibility. You are always in control, with full access to comprehensive QA reporting, which includes test results, test coverage, quality level and status reports, quality trends, sign-off reports, and more.",
    },
    {
      col: "col-lg-6 mt-md-0 mt-sm-5  col-md-12  py-2",
      heading: "BUSINESS DOMAIN EXPERTISE",
      pharagrap:
        "Over the last decade, the QA team has accumulated a wealth of business domain experience. Our particular forte is e-Commerce, Entertainment, Advertising, Data Analytics, Online Video, Telecommunications, and EdTech.",
    },
  ];
  return (
    <div>
      <ContentCardSection3
        arrayList={arrayList}
        headingstyle={{ color: "#224a8b" }}
        CardclassName="card"
      />
    </div>
  );
};

export default QulityAssurance;
