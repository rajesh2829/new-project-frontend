import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import MultiSelect from "../../components/Multiselect";
import Number from "../../components/Number";
// Components
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import SingleCheckbox from "../../components/SingleCheckbox";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import Spinner from "../../components/Spinner";
import BreadCrumb from "../../components/Breadcrumb";
import Jobs from "../../services/JobService";
import JobService from "../../services/JobService";
import Action from "../../components/Action";

const JobDetails = (props) => {

  const [jobDetails, setJobDetails] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const statusOptions = [
    {
      value: "Active",

      label: "Active",
    },

    {
      value: "InActive",

      label: "InActive",
    },
  ];

  const jobTypeOptions = [
    {
      value: "Full Time",
      label: "Full Time",
    },
    {
      value: "parttime",
      label: "part time",
    },
  ];

  const maximumSalary = [
    {
      value: "50000",
      label: "50000",
    },
    {
      value: "100000",
      label: "100000",
    },
    {
      value: "150000",
      label: "150000",
    },
    {
      value: "200000",
      label: "200000",
    },
    {
      value: "250000",
      label: "250000",
    },
    {
      value: "300000",
      label: "300000",
    },
    {
      value: "350000",
      label: "350000",
    },
    {
      value: "400000",
      label: "400000",
    },
    {
      value: "450000",
      label: "450000",
    },
    {
      value: "500000",
      label: "500000",
    },
    {
      value: "600000",
      label: "600000",
    },
    {
      value: "700000",
      label: "700000",
    },
    {
      value: "800000",
      label: "800000",
    },
    {
      value: "900000",
      label: "900000",
    },
    {
      value: "1000000",
      label: "1000000",
    },
  ];

  useEffect(() => {
    getJobDetail();
  }, [props]);

  const getJobDetail = async () => {
    setIsLoading(
      true
    );

    const data = await Jobs.get(props.match.params.id)
    setJobDetails(data);
    console.log(jobDetails);
    setIsLoading(false);


  };

  const _handleSubmit = (values, id) => {
    const data = new FormData();
    if (values && values.category !== undefined) {
      data.append(
        "category",
        values && values.category && values.category.value
          ? values.category.value
          : ""
      );
    }
    if (values && values.sub_category !== undefined) {
      data.append(
        "sub_category",
        values && values.sub_category && values.sub_category.value
          ? values.sub_category.value
          : ""
      );
    }
    if (values && values.job_title !== undefined) {
      data.append(
        "job_title",
        values && values.job_title ? values.job_title : ""
      );
    }
    if (values && values.slug !== undefined) {
      data.append("slug", values && values.slug ? values.slug : "");
    }
    if (values && values.sort !== undefined) {
      data.append("sort", values && values.sort ? values.sort : "");
    }
    if (values && values.status !== undefined) {
      data.append(
        "status",
        values && values.status && values.status.value
          ? values.status.value
          : ""
      );
    }
    if (values && values.job_type !== undefined) {
      data.append(
        "job_type",
        values && values.job_type && values.job_type.value
          ? values.job_type.value
          : ""
      );
    }
    if (values && values.location !== undefined) {
      data.append("location", values && values.location ? values.location : "");
    }
    if (values && values.experience !== undefined) {
      data.append(
        "experience",
        values && values.experience ? values.experience : ""
      );
    }
    if (values && values.job_description !== undefined) {
      data.append(
        "job_description",
        values && values.job_description ? values.job_description : ""
      );
    }

    if (values && values.mandatory_skills !== undefined) {
      data.append(
        "mandatory_skills",
        values && values.mandatory_skills && values.mandatory_skills
          ? values.mandatory_skills
          : ""
      );
    }
    if (values && values.show_project_details !== undefined) {
      data.append(
        "show_project_details",
        values && values.show_project_details == true ? true : false
      );
    }
    if (values && values.responsibilities !== undefined) {
      data.append(
        "responsibilities",
        values && values.responsibilities ? values.responsibilities : ""
      );
    }
    if (values && values.requirements !== undefined) {
      data.append(
        "requirements",
        values && values.requirements ? values.requirements : ""
      );
    }
    if (values && values.minimum_experience !== undefined) {
      data.append(
        "minimum_experience",
        values && values.minimum_experience ? values.minimum_experience : ""
      );
    }
    if (values && values.maximum_experience !== undefined) {
      data.append(
        "maximum_experience",
        values && values.maximum_experience ? values.maximum_experience : ""
      );
    }
    if (values && values.maximum_salary !== undefined) {
      data.append(
        "maximum_salary",
        values && values.maximum_salary && values.maximum_salary.value
          ? values.maximum_salary.value
          : ""
      );
    }
    if (values && values.course_name !== undefined) {
      data.append(
        "course_name",
        values && values.course_name ? values.course_name : ""
      );
    }
    if (values && values.project_name !== undefined) {
      data.append(
        "project_name",
        values && values.project_name ? values.project_name : ""
      );
    }
    if (values && values.show_current_address !== undefined) {
      data.append(
        "show_current_address",
        values && values.show_current_address === true ? true : false
      );
    }
    if (values && values.show_employment_eligibility !== undefined) {
      data.append(
        "show_employment_eligibility",
        values && values.show_employment_eligibility === true ? true : false
      );
    }
    if (values && values.show_skills !== undefined) {
      data.append("show_skills", values && values.show_skills);
    }
    if (values && values.show_home_town_address !== undefined) {
      data.append(
        "show_home_town_address",
        values && values.show_home_town_address === true ? true : false
      );
    }
    if (values && values.show_expected_salary !== undefined) {
      data.append(
        "show_expected_salary",
        values && values.show_expected_salary === true ? true : false
      );
    }
    if (values && values.show_current_salary !== undefined) {
      data.append("show_current_salary", values && values.show_current_salary === true ? true : false
      );
    }
    if (values && values.show_employment !== undefined) {
      data.append("show_employment", values && values.show_employment === true ? true : false
      );
    }

    if (values && values.show_course_details !== undefined) {
      data.append("show_course_details", values && values.show_course_details === true ? true : false
      );
    }
    if (values && values.show_vaccine_status !== undefined) {
      data.append("show_vaccine_status", values && values.show_vaccine_status === true ? true : false
      );
    }
    dispatch(JobService.update(id, data, {}, dispatch));
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/job/dashboard" },
    { label: "Joblist", link: "/jobs/jobslist" },
    { label: jobDetails.jobTitle, link: "" },
  ];

  const categoryOptions = [
    {
      value: "experienced",
      label: "Experienced",
    },
    {
      value: "fresher",
      label: "Fresher",
    },
  ];

  const subCategoryOptions = [
    {
      value: "Web Devlopment",
      label: "Web Devlopment",
    },

    {
      value: "Mobile Development",
      label: "Mobile Devlopment",
    },

    {
      value: "Testing",
      label: "Testing",
    },
  ];

  const initialValues = {
    job_title: jobDetails && jobDetails.jobTitle,
    slug: jobDetails && jobDetails.slug,
    job_description: jobDetails && jobDetails.jobDescription,
    category:
      jobDetails && jobDetails.category
        ? categoryOptions.find((data) => data.value == jobDetails.category)
        : " ",
    sub_category:
      jobDetails && jobDetails.subCategory
        ? subCategoryOptions.find(
          (data) => data.value == jobDetails.subCategory
        )
        : " ",
    job_type:
      jobDetails && jobDetails.jobType
        ? jobTypeOptions.find((data) => data.value == jobDetails.jobType)
        : " ",
    location: jobDetails && jobDetails.location,
    experience: jobDetails && jobDetails.experience,
    sort: jobDetails && jobDetails.sort,
    responsibilities: jobDetails && jobDetails.responsibilities,
    requirements: jobDetails && jobDetails.requirements,
    minimum_experience: jobDetails && jobDetails.minimumExperience,
    maximum_experience: jobDetails && jobDetails.maximumExperience,
    maximum_salary:
      jobDetails && jobDetails.maximumSalary
        ? maximumSalary.find(
          (data) => data.value == jobDetails.maximumSalary
        )
        : "",
    course_name: jobDetails && jobDetails.courseName,
    project_name: jobDetails && jobDetails.projectName,
    show_current_address: jobDetails ? jobDetails.showCurrentAddress : true,
    show_employment_eligibility:
      jobDetails && jobDetails.showEmploymentEligibility
      && jobDetails.showEmploymentEligibility,

    show_home_town_address:
      jobDetails && jobDetails.showHomeTownAddress
      && jobDetails.showHomeTownAddress,
    show_skills:
      jobDetails ? jobDetails.showSkills : true,
    show_expected_salary: jobDetails.showExpectedSalary
      && jobDetails.showExpectedSalary,
    show_current_salary:
      jobDetails
        ? jobDetails.showCurrentSalary
        : true,
    show_employment:
      jobDetails
        ? jobDetails.showEmployment
        : true,
    show_project_details:
      jobDetails
        ? jobDetails.showProjectDetails
        : true,
    show_course_details:
      jobDetails
        ? jobDetails.showCourseDetails
        : true,
    status:
      jobDetails && jobDetails.status
        ? statusOptions.find((data) => jobDetails.status == data.value)
        : "",
    show_vaccine_status:
      jobDetails
        ? jobDetails.showVaccineStatus
        : true,
    mandatory_skills: jobDetails && jobDetails.mandatorySkills,
  };

  const jobDelete = () => {
    let id = props.match.params.id;
    dispatch(JobService.delete(id, {}, dispatch, (response) => {
      if (response) {
        props.history.push("/jobs/jobslist");
      }
    }));
  };

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }

  };

  if (isloading) {
    return <Spinner />
  }

  return (
    <div>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Job "
        id={jobDetails.id}
        label={jobDetails.jobTitle
        }
        deleteFunction={jobDelete}
      />
      {/* Breadd Crumb Section */}
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-2">
        <PageTitle
          label="Job Details"
        />
        <Action
          dropdownLinks={actionsMenuList}
          handleChange={handleActionChange}
        /></div>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          _handleSubmit(values, props.match.params.id);
        }}
      >
        <div className="form-wrapper card p-3">
          <div className="col-lg-12 col-sm-12">
            <Text
              name="job_title"
              label="Job Title"
              fontBolded
              placeholder="Job title"
              error=""
            />

            <Select
              name="status"
              label="Status"
              fontBolded
              options={statusOptions}
            />

            <Text
              name="slug"
              label="Slug"
              fontBolded
              placeholder="slug"
              error=""
              required
            />

            <Select
              name="category"
              label="Category"
              fontBolded
              options={categoryOptions}
            />

            <Select
              name="job_type"
              label="Job Type"
              fontBolded
              options={jobTypeOptions}
            />

            <Select
              name="sub_category"
              label="Sub Category"
              fontBolded
              options={subCategoryOptions}
            />

            <Text
              name="location"
              label="Location"
              fontBolded
              placeholder="location"
              error=""
            />

            <Text
              name="experience"
              label="Experience"
              fontBolded
              placeholder="Experience"
              error=""
            />

            <Select name="sort" label="Sort" fontBolded />

            <label className="font-weight-bold">Job Description</label>

            <TextArea
              name="job_description"
              placeholder="Enter Job Description"
            />

            <label className="font-weight-bold ">Responsibilities</label>

            <TextArea
              name="responsibilities"
              placeholder="Enter Responsibilities"
            />

            <label className="font-weight-bold">Requirements</label>

            <TextArea name="requirements" placeholder="Enter Requirements" />

            <Text
              name="mandatory_skills"
              label="Mandatory Skill"
              fontBolded
            />

            <Text
              name="course_name"
              label="Course Name"
              fontBolded
              placeholder="Course Name"
              error=""
            />

            <Text
              name="project_name"
              label="Project Name"
              fontBolded
              placeholder="Project Name"
              error=""
            />

            <Number
              name="minimum_experience"
              label="Minimum Experience"
              fontBolded
              placeholder="Minimum Experience"
              error=""
            />

            <Number
              label="Maximum Experience"
              placeholder="Maximum Experience"
              fontBolded
              name="maximum_experience"
              error={""}
            />

            <Select
              name="maximum_salary"
              label="Select Maximum Salary"
              fontBolded
              options={maximumSalary}
            />

            <div className="field-wrapper  mt-3">
              <SingleCheckbox
                name="show_current_salary"
                label="Show Current Salary"
                className="accepted-terms  mb-2 pb-0 mr-3"

              />
            </div>
            <div className="field-wrapper mt-3">
              <SingleCheckbox
                name="show_expected_salary"
                label="Show Expected Salary"
                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>
            <div className="field-wrapper mt-3">
              <SingleCheckbox
                name="show_skills"
                label="Show Skills"
                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>
            <div className="field-wrapper  mt-3">
              <SingleCheckbox
                name="show_course_details"
                label="Show Course Details"
                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>
            <div className="field-wrapper  mt-3">
              <SingleCheckbox
                name="show_project_details"
                label="Show Project Details"
                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>
            <div className="field-wrapper mt-3">
              <SingleCheckbox
                name="show_employment_eligibility"
                label="Select Employment Eligibility"
                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>
            <div className="field-wrapper  mt-3">
              <SingleCheckbox
                name="show_current_address"
                label="Select Current Address"
                className="accepted-terms  mb-2 pb-0 mr-3"
              // value = {jobDetails?.showCurrentAddress}
              />
            </div>
            <div className="field-wrapper mt-3">
              <SingleCheckbox
                name="show_home_town_address"
                label="Show Home Town Address"

                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>
            <div className="field-wrapper  mt-3">
              <SingleCheckbox
                name="show_employment"
                label="ShowEmployment"
                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>
            <div className="field-wrapper mt-3">
              <SingleCheckbox
                name="show_vaccine_status"
                label="Show Vaccine status"
                className="accepted-terms  mb-2 pb-0 mr-3"
              />
            </div>

            <div className="btn-wrapper pull-left">
              <SaveButton />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default JobDetails;
