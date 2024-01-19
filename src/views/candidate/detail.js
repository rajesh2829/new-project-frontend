import React, { useEffect, useState } from "react";

// Components
// Helper
import { useDispatch } from "react-redux";
import BreadCrumb from "../../components/Breadcrumb";
import CancelButton from "../../components/CancelButton";
import DeleteButton from "../../components/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Status from "../../components/Status";
import ObjectName from "../../helpers/ObjectName";
import CandidateService from "../../services/CandidateService";
import CandidateForm from "./components/form";
const CandidateDetail = (props) => {
  const [details, setDetails] = useState()
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    getCandidateDetail()
  }, []);


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


  const maritialStatusOptions = [
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Married",
      label: "Married",
    },
  ]

  const getCandidateDetail = async () => {

    const id = props.match.params.id
    const response = await CandidateService.get(id)
    setDetails(response?.data?.data)

  }

  const breadcrumbList = [
    { label: "Home", link: "/job/dashboard" },
    {
      label: "Candidate",
      link: "/jobs/candidate",
    },
    {
      label: "Candidate Details",
      link: "",
    },
  ];

  const handleDelete = async (id) => {
    dispatch(await CandidateService.delete(id));
    props.history.push("/jobs/candidate")
  }

  const handleSubmit = async (values) => {

    try {
      values.maritalStatus = values?.maritalStatus?.value
      values.gender = values?.gender?.value
      const id = props.match.params.id
      await CandidateService.update(id, values)
    } catch (error) {
      console.log(error);
    }
  }

  const onStatusChange = async (values) => {
    const data = {};
    data.status = values;
    CandidateService.updateStatus(props.match.params.id, data);
  };

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between">
        <PageTitle
          label={"Candidate Details"}
        />
        <div className="d-flex my-2">
          <div className="mx-2">
            <DeleteButton
              label="Delete"
              onClick={() => {
                setDeleteModal(true);
              }}
            /></div>
          <Status
            objectName={ObjectName.CANDIDATE}
            handleChange={onStatusChange}
            buttonLabel={details?.status?.name}
            currentStatusId={details?.status?.id}
          />
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModal}
        title="Delete Candidate"
        toggle={() => {
          setDeleteModal(false)
        }}
        label={details?.first_name}
        deleteFunction={() => handleDelete(details.id)}
      />
      <div className="card p-3">
        <Form
          enableReinitialize={true}
          initialValues={{
            firstName: details?.first_name || "",
            lastName: details?.last_name || "",
            email: details?.email || "",
            gender: details?.gender
              ? genderOptions.find((data) => details?.gender == data.value)
              : "",
            skills: details?.skills || "",
            interviewDate: details?.interview_date || null,
            phone: details?.phone || "",
            maritalStatus: details?.marital_status
              ? maritialStatusOptions.find((data) => details?.marital_status == data.value)
              : "",
            age: details?.age || null,
            position: details?.position || "",
            qualification: details?.qualification || "",
            currentAddress: details?.current_address || "",
            currentArea: details?.current_area || "",
            currentCountry: details?.current_country || "",
            currentCity: details?.current_city || "",
            currentState: details?.current_state || "",
            currentPincode: details?.current_pincode && (details?.current_pincode).toString() || "",
            permanentAddress: details?.permanent_address || "",
            permanentArea: details?.permanent_area || "",
            permanentCountry: details?.permanent_country || "",
            permanentCity: details?.permanent_city || "",
            permanentState: details?.permanent_state || "",
            permanentPincode: details?.permanent_pincode && (details?.permanent_pincode).toString() || "",
            department: details?.department || "",
            yearOfPassing: details?.year_of_passing || "",
            over_all_experience: details?.overall_experience || "",
            projectTitle: details?.project_title || "",
            projectPeriod: details?.project_period || "",
            projectDescription: details?.project_description || "",
            courseName: details?.course_name || "",
            coursePeriod: details?.course_period || "",
            courseInstitution: details?.course_institution || "",
            currentSalary: details?.current_salary || null,
            expected_salary: details?.expected_salary || null,
            message: details?.message || "",
            percentage: details?.percentage || "",
            positionType: details?.position_type || "",
            dob: details?.dob || null,
            relevantExperience: details?.relevant_experience || null,
            expectedCostPerHour: details?.expected_cost_per_hour || null,
            jobReferenceType: details?.job_reference_type || "",
            jobReferenceName: details?.job_reference_name || "",
            willingToWorkInShift: details?.willing_to_work_in_shift || "",
            stayingWith: details?.staying_with || "",
            tenthPercentage: details?.tenth_percentage || "",
            tenthYearOfPassing: details?.tenth_year_of_passing || null,
            twelvethPercentage: details?.twelveth_percentage || "",
            twelvethYearOfPassing: details?.twelveth_year_of_passing || null,
            degreeArrear: details?.degree_arrear || "",
            didCourse: details?.did_course || false,
            didProject: details?.did_project || false,
            linkedinProfileName: details?.linkedin_profile_name || "",
            facebookProfileName: details?.facebook_profile_name || "",
            jobTitle: details?.job_title || "",
            joinedMonth: details?.joined_month || null,
            joinedYear: details?.joined_year || null,
            companyName: details?.company_name || "",
            knownLanguages: details?.known_languages || "",
            employmentEligibility: details?.employment_eligibility || "",
            didVaccineStatus: details?.vaccine_status || "",
          }}
          // onSubmit={(values)=>onSubmit(values)}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <CandidateForm showEdit image_url={details?.image_url} />
          <div className="d-flex">
            <SaveButton /><CancelButton onClick={() => props.history.push("/jobs/candidate")} /></div>
        </Form>
      </div>
    </>
  );
};

export default CandidateDetail;