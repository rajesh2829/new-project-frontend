import React from "react";
import Heading2 from "../../components/static/header/heading2";
import Heading4 from "../../components/static/header/heading4";
import Headind5 from "../../components/static/header/heading5";
import List from "../../components/static/list";

const PrivacyPolicy = () => {
  const arrayList = [
    {
      list: "Information that you provide via our website, including information you provide when you register on our website e.g. name, email address, designation, company, country and telephone number",
    },
    {
      list: "Information about your computer and about your visits to and use of this Site, such as your Internet Protocol (IP) address, demographics, your computers’ operating system, and browser type and information collected via cookies",
    },
  ];

  const PersonalInformation = [
    {
      list: "to provide better usability, troubleshooting and site maintenance;",
    },
    {
      list: "to understand which parts of the website are visited and how frequently;",
    },
    {
      list: "to create your user ID;",
    },
    {
      list: "to identify you once you register on our website;",
    },
    {
      list: "to contact you and respond to your questions or requests",
    },
    {
      list: "to provide access to desirable content based on your preferences.",
    },
    {
      list: "to process job application and alumni related requests, more details about which are available on corresponding portals of this website.",
    },
  ];
  const LegalBasis = [
    {
      list: "to provide better usability, troubleshooting and site maintenance;",
    },
    {
      list: "to create your user ID.",
    },
  ];
  const LegalBasisOne = [
    {
      list: "to identify you once you register on our website; and",
    },
    {
      list: "to contact you and respond to your questions or requests;",
    },
    {
      list: "to understand which parts of the website are visited and how frequently; and",
    },
    {
      list: "to provide access to desirable content based on your preferences.",
    },
  ];
  const Data = [
    {
      list: "ThiDiff or with any of its subsidiaries;",
    },
    {
      list: "Business partners",
    },
    {
      list: "Service vendors;",
    },
    {
      list: "Authorized third-party agents; or",
    },
    {
      list: "Contractors.",
    },
  ];
  return (
    <>
      <div className=" py-4" style={{ backgroundColor: "#F8F8F8" }}>
        <div className="container">
          <Heading2
            heading="Privacy Policy"
            className="text-center font-weight-bold py-2"
          />
          <Heading4
            heading="Last updated on 24th May 2018"
            className="text-center font-weight-bold"
          />
          <paragraphContentSection
            paragraph="ThiDiff technology, its subsidiaries and branch operations hereinafter referred as ‘ThiDiff’, ‘we’, ‘us’ or ‘our’ is committed 
          to respect your privacy and choices. The statement highlights our privacy practices regarding Personal Information that we collect and store about you through this website and also for those Personal Information that you provide us while participating in our events and campaigns."
          />
          <Headind5
            heading="Personal Information we collect and process and how we use it"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="Personal Information that we process"
            paragraphclass="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="For the purposes of this privacy statement, 
          'Personal Information' is any data which relates to an individual who may be identified 
          from that data, or from a combination of a set of data, and other information which 
          is in possession of ThiDiff."
          />
          <paragraphContentSection
            paragraph="In general, you may browse our website without providing 
          any Personal Information about yourself. However, we collect certain information such as"
          />
          <List arrayList={arrayList} />
          <paragraphContentSection
            paragraph="Use of your Personal Information"
            paragraphclass="font-weight-bold"
          />
          <paragraphContentSection paragraph="We use your Personal Information for the following purposes:" />
          <List arrayList={PersonalInformation} />
          <paragraphContentSection
            paragraph="Legal basis of the processing"
            paragraphclass="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="We process your Personal Information when it is necessary for the performance of a contract to which you are the party or in order to take steps at your request prior to entering into a contract. This applies in any case where we provide services to you pursuant
           to a contract, such as when you use our website or process your registration on the website. If you do not provide the Personal Information that we need in order to provide our services, we will not be able to provide our services to you. We process your Personal Information for 
           the performance of a contract in the following circumstances:"
          />
          <List arrayList={LegalBasis} />
          <paragraphContentSection
            paragraph="We process your Personal Information when it is necessary 
            for the purposes of a legitimate interest pursued by us or a third party 
            (when these interests are not overridden by your data protection rights). 
          This applies in the following circumstances:"
          />
          <List arrayList={LegalBasisOne} />
          <Headind5
            heading="Personal Information we collect and process and how we use it"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="If you choose not to provide your Personal Information that is mandatory 
            to process your request, we may not be able to provide the corresponding service."
            paragraphclass=""
          />
          <Headind5
            heading="Data recipients, transfer, and disclosure of Personal Information:"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="ThiDiff does not share your Personal Information with third parties 
            for marketing purposes without seeking your prior permission."
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="We share your Personal Information within"
            paragraphclass=""
          />
          <List arrayList={Data} />
          <paragraphContentSection
            paragraph="In general, ThiDiff Limited, domiciled in Bangalore, is the data controller processing 
            your Personal Information. The following applies only where the data
             controller processing your Personal Information is domiciled in the European Economic Area (“EEA”):"
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="We transfer Personal Information to countries outside the EEA to third parties, 
            including to countries which have different data protection standards to those which apply 
            in the EEA. The locations of Thidiff group companies is set out . Our service providers are 
            primarily located in US, Singapore, India and UK. Where service providers process your Personal 
            Information in countries deemed adequate by the European Commission, we rely on the European 
            Commission's decision to protect your Personal Information,"
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="For transfers to ThiDiff group companies and service providers outside the EEA, 
            we use standard contractual clauses or rely on a service provider's Privacy Shield certification 
            or a service provider's (EU data protection authority approved) corporate rules that are in place 
            to protect your Personal Information. Please contact us as set out below if you would like to 
            obtain a copy of the methods used. When required, ThiDiff discloses Personal Information to 
            external law enforcement bodies or regulatory authorities, in order to comply with legal obligations."
            paragraphclass=""
          />
          <Headind5
            heading="Access, correction, objection of your Personal Information:"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="You have the right to access, correct, delete or transfer your Personal 
            Information that we hold, including your profile and preferences. You also have the 
            right to object to certain processing and, where we have asked for your consent to 
            process your Personal Information, to withdraw this consent. Where we process your 
            Personal Information because we have a legitimate interest in doing so (as explained above), 
            you also have a right to object to this. These rights may be limited in 
            some situations – for example, where we can demonstrate that we have a legal requirement 
            to process your Personal Information."
            paragraphclass=""
          />
          <p>
            You can assert your rights in the corresponding sections where such
            information was provided or by contacting us at{" "}
            <a href="">hello@thidiff.com</a>
          </p>
          <Headind5 heading="Data security" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="ThiDiff adopts reasonable and appropriate security practices and procedures 
            including administrative, physical security, and technical controls in order to 
            safeguard your Personal Information."
            paragraphclass=""
          />
          <Headind5 heading="Data retention" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="Personal Information will not be retained for a period more than necessary 
            to fulfill the purposes outlined in this privacy statement, unless 
            a longer retention period is required by law or for directly related legitimate business purposes."
            paragraphclass=""
          />
          <Headind5 heading="Linked websites" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="Our privacy practices regarding Personal Information that we collect and store about 
            you through our portals such as Recruitment and Global Alumni will be as
             per the privacy policy of those portals."
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="ThiDiff provides links to third-party websites and services. However, ThiDiff is not 
            responsible for the privacy statements, practices, or the contents of such third-party websites."
            paragraphclass=""
          />
          <Headind5 heading="How to contact us" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="If you have any questions regarding our privacy practices or this privacy statement, please contact us at:
            Contact person: Contact address: Data Privacy Office, ThiDiff Technologies Private Limited, UMC Commercial 
            Complex, B-Block, 6th Floor Kudlu Gate Junction, Hosur Road Bangalore, KA 560 068, India"
            paragraphclass=""
          />
          <p>
            Email:<a href="">hello@thidiff.com</a>
          </p>
          <Headind5
            heading="Updates to this privacy statement"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="ThiDiff may change the data privacy practices and update this privacy 
            statement as and when the need arises, and the same will be made available on 
            the website. But our commitment to protect the privacy of website users will continue 
            to remain."
            paragraphclass=""
          />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
