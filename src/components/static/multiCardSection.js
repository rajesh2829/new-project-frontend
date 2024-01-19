import React from "react";
import CardSection from "./cardSection";
import Heading3 from "./header/heading3";

const MultiCardSection = (props) => {
  const {
    iconOne,
    iconTwo,
    heading,
    headingTwo,
    headingThree,
    headingFour,
    headingFive,
    headingOne,
    pharagraphOne,
    pharagraph1,
    pharagraphTwo,
    pharagraph2,
    pharagraphThree,
    pharagraph3,
    pharagraphFour,
    pharagraph4,
    pharagraphFive,
    pharagraph5,
    iconThree,
    iconFour,
    iconFive,
    button,
    ButtonOne,
    ButtonTwo,
    ButtonThree,
    ButtonFour,
    ButtonFive,
  } = props;
  return (
    <div>
      <div className="container">
        <Heading3
          heading={heading}
          className="text-center font-weight-bold py-5"
          style={{ color: "#224a8b" }}
        />
        <div className="row">
          <div className="col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12  py-3">
            <CardSection
              icon={iconOne}
              pharagraph1={pharagraphOne}
              pharagraph2={pharagraph1}
              style={{
                backgroundColor: "var(--card-one-bg-color)",
                minHeight: " 405px",
                maxHeight: "400px",
              }}
              heading={headingOne}
              button={button}
              ButtonStyle={ButtonOne}
            />
          </div>
          <div className="col-lg-6 mt-md-0 mt-sm-5 mt-5 col-md-12  py-3">
            <CardSection
              icon={iconTwo}
              style={{
                backgroundColor: "var(--card-two-bg-color)",
                minHeight: " 405px",
                maxHeight: "400px",
              }}
              pharagraph1={pharagraphTwo}
              pharagraph2={pharagraph2}
              heading={headingTwo}
              button={button}
              ButtonStyle={ButtonTwo}
            />
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12  py-3">
            <CardSection
              icon={iconThree}
              style={{
                backgroundColor: "var(--card-three-bg-color)",
                minHeight: " 405px",
                maxHeight: "400px",
              }}
              pharagraph1={pharagraphThree}
              pharagraph2={pharagraph3}
              heading={headingThree}
              button={button}
              ButtonStyle={ButtonThree}
            />
          </div>
          <div className="col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12  py-3">
            <CardSection
              icon={iconFour}
              style={{
                backgroundColor: "var(--card-four-bg-color)",
                minHeight: " 405px",
                maxHeight: "400px",
              }}
              pharagraph1={pharagraphFour}
              pharagraph2={pharagraph4}
              heading={headingFour}
              button={button}
              ButtonStyle={ButtonFour}
            />
          </div>
          <div className="col-lg-4 mt-md-0 mt-sm-5 mt-5 col-md-12 py-3">
            <CardSection
              icon={iconFive}
              style={{
                backgroundColor: "var(--card-five-bg-color)",
                minHeight: " 405px",
                maxHeight: "400px",
              }}
              pharagraph1={pharagraphFive}
              pharagraph2={pharagraph5}
              heading={headingFive}
              button={button}
              ButtonStyle={ButtonFive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCardSection;
