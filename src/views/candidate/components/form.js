import React from "react";

// Components
import DateSelector from "../../../components/Date";
import TextArea from "../../../components/TextArea";
// Helper
import Text from "../../../components/Text";
import Phone from "../../../components/Phone";
import Select from "../../../components/Select";
import Number from "../../../components/Number";
import Zipcode from "../../../components/Zipcode";
import Percentage from "../../../components/Percentage";
import SingleCheckbox from "../../../components/SingleCheckbox";
import FeatureImage from "../../../components/Image";

import Avatar from "../../../components/Avatar";
const CandidateForm = (props) => {
  const genderOptions = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  const maritalStatusOptions = [
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Married",
      label: "Married",
    },
  ];

  return (
    <>
      <div className="mt-2 mb-3">
        <div className="d-flex">
          <div className="col">
            <Text
              name="position"
              label="Position"
              placeholder="Enter postion"
              required
            />
          </div>
          <div className="col">
            <FeatureImage
              src={props?.image_url}
              alt="Feature product image"
              size={"large"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Text
              name="firstName"
              label="First Name"
              placeholder="Enter First Name..."
              error=""
              required={true}
            />
          </div>
          <div className="col-6">
            <Text
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name..."
              required
            />
          </div>
        </div>
        <div>
          <Phone
            name="phone"
            label="Phone"
            placeholder="Enter phone"
            required
          />
        </div>

        <div>
          <Text name="email" label="Email" placeholder="Enter User email..." />
        </div>

        <Select
          name="gender"
          label="Gender"
          placeholder="Select Gender"
          options={genderOptions}
          required
        />

        <Select
          name="maritalStatus"
          label="Marital Status"
          placeholder="Select Maritial Status"
          options={maritalStatusOptions}
        />

        {props.showEdit && (
          <>
            <div>
              <Text
                name="skills"
                label="Skills"
                placeholder="Enter skills..."
              />
              <DateSelector label="Interview Date" name="interviewDate" />
            </div>
            <Number label="Age" name="age" />
            <Text
              name="qualification"
              label="Qualification"
              placeholder="Enter Qualification"
            />
            <TextArea
              name="currentAddress"
              label="Current Address"
              placeholder="Enter Current Address..."
              error=""
            />
            <Text
              name="currentArea"
              label="Current Area"
              placeholder="Enter Current Area..."
              error=""
            />
            <Text
              name="currentCountry"
              label="Current Country"
              placeholder="Enter Current Country..."
              error=""
            />
            <Text
              name="currentCity"
              label="Current City"
              placeholder="Enter Current Area..."
              error=""
            />
            <Text
              name="currentState"
              label="Current State"
              placeholder="Enter Current State..."
              error=""
            />
            <Zipcode name="currentPincode" label="Current Pincode" />
            <TextArea
              name="permanentAddress"
              label="Permanent Address"
              placeholder="Enter Current Address..."
              error=""
            />
            <Text
              name="permanentArea"
              label="Permanent Area"
              placeholder="Enter Current Area..."
              error=""
            />
            <Text
              name="permanentCountry"
              label="Permanent Country"
              placeholder="Enter Permanent Country..."
              error=""
            />
            <Text
              name="permanentCity"
              label="Permanent City"
              placeholder="Enter Current Area..."
              error=""
            />
            <Text
              name="permanentState"
              label="Permanent State"
              placeholder="Enter Current State..."
              error=""
            />
            <Zipcode name="permanentPincode" label="Permanent Pincode" />
            <Text
              name="department"
              label="Department"
              placeholder="Enter Department..."
              error=""
            />
            <Number label="Year Of Passing" name="yearOfPassing" />
            <Number label="Over All Experience" name="over_all_experience" />
            <Text
              name="projectTitle"
              label="Project Title"
              placeholder="Enter Project Title..."
              error=""
            />
            <Text
              name="projectPeriod"
              label="Project Peried"
              placeholder="Enter Current Area..."
              error=""
            />
            <Text
              name="projectDescription"
              label="Project Description"
              placeholder="Enter Current State..."
              error=""
            />
            <Text
              name="courseName"
              label="Course Name"
              placeholder="Enter Course Name..."
              error=""
            />
            <Text
              name="coursePeriod"
              label="Course Peried"
              placeholder="Enter Current Area..."
              error=""
            />
            <Text
              name="courseInstitution"
              label="Course Institution"
              placeholder="Enter Course Institution..."
              error=""
            />
            <Number label="Current Salary" name="currentSalary" />
            <Number label="Expected Salary" name="expected_salary" />
            <TextArea
              name="message"
              label="Messagge"
              placeholder="Enter Message..."
              error=""
            />
            <Percentage name="percentage" label="Percentage" />
            <Text
              name="positionType"
              label="Position Type"
              placeholder="Enter Position Type..."
              error=""
            />
            <DateSelector label="Date Of Birth" name="dob" />
            <Number label="Relevant Experience" name="relevantExperience" />
            <Number label="Expected Cost Per Hour" name="expectedCostPerHour" />
            <Text
              name="jobReferenceType"
              label="Job Reference Type"
              placeholder="Enter Job Reference Type..."
              error=""
            />
            <Text
              name="jobReferenceName"
              label="Job Reference Name"
              placeholder="Enter Job Reference Type..."
              error=""
            />
            <Text
              name="willingToWorkInShift"
              label="Willing to Work in Shift"
              placeholder="Enter Willing to work in shift..."
              error=""
            />
            <Text
              name="stayingWith"
              label="Statying With"
              placeholder="Enter staying_with..."
              error=""
            />
            <Percentage
              name="tenthPercentage"
              label="Tenth Percentage"
              placeholder="Enter Tenth Percentage..."
              error=""
            />
            <Number
              name="tenthYearOfPassing"
              label="tenth year of passing"
              placeholder="Enter staying_with..."
              error=""
            />
            <Number
              label="Twelfth Year of passing"
              name="twelvethYearOfPassing"
            />
            <Percentage label="Twelfth percentage" name="twelvethPercentage" />
            <Text
              name="degreeArrear"
              label="Degree Arrear"
              placeholder="Enter Willing to work in shift..."
              error=""
            />
            <div className="my-2 d-flex justify-content-between">
              <SingleCheckbox name="didCourse" label="Did Course" />

              <SingleCheckbox name="didProject" label="Did Project" />
            </div>
            <Text
              name="linkedinProfileName"
              label="Linkedln Profile Name"
              placeholder="Enter linkedln_profile_name..."
              error=""
            />
            <Text
              name="facebookProfileName"
              label="Facebook Profile Name"
              placeholder="Enter linkedln_profile_name..."
              error=""
            />
            <Text
              name="jobTitle"
              label="Job Tilte"
              placeholder="Enter linkedln_profile_name..."
              error=""
            />
            <Number label="Joined Month" name="joinedMonth" />
            <Number label="Joined Year" name="joinedYear" />
            <Text
              name="companyName"
              label="Company Name"
              placeholder="Enter company name..."
              error=""
            />
            <Text
              name="knownLanguages"
              label="Known Languages"
              placeholder="Enter known languages..."
              error=""
            />
            <Text
              name="employmentEligibility"
              label="Employment Eligibility"
              placeholder="Enter known languages..."
              error=""
            />
            <Text
              name="didVaccineStatus"
              label="Vaccine status"
              placeholder="Enter Vaccine status ..."
              error=""
            />
          </>
        )}
      </div>
    </>
  );
};

export default CandidateForm;
