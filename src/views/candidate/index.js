import React, { useEffect, useState } from "react";
import { endpoints } from "../../api/endPoints";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import AvatarCard from "../../components/AvatarCard";
import Button from "../../components/Button";
import AddModal from "../../components/Modal";
import CandidateService from "../../services/CandidateService.js";
import { useDispatch } from "react-redux";
import CandidateForm from "./components/form";
import { Link } from "react-router-dom";
import ObjectName from "../../helpers/ObjectName";
import { CandidateStatus } from "../../helpers/Candidate";
import StatusService from "../../services/StatusService";
// import { Candidate } from "../../../helpers/Candidate";

const Candidate = (props) => {
    const [isOpen, setIsOpen] = useState(0);
    const [status, setStatus] = useState();
    const { history } = props;

    const dispatch = useDispatch()
    const sortByOption = [
        {
            value: "id:DESC",
            label: "Most Recent",
        },
        {
            value: "first_name:ASC",
            label: "Name",
        },
    ];


    useEffect(() => {
        getStatus();
    }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (values) => {
        values.maritalStatus = values?.maritalStatus?.value;
        values.gender = values?.gender?.value;
        values.skills = JSON.stringify(values.skills)
        values.status = status
        dispatch(CandidateService.add(values, {}, toggle)
        );
    };

    const initialValues = {

        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        skills: "",
        interviewDate: "",
        phone: "",
        maritalStatus: "",
        age: "",
        position: "",
        qualification: "",
        currentAddress: "",
        currentArea: "",
        currentCountry: "",
        currentCity: "",
        currentState: "",
        currentPincode: "",
        permanentAddress: "",
        permanentArea: "",
        permanentCountry: "",
        permanentCity: "",
        permanentState: "",
        permanentPincode: "",
        department: "",
        yearOfPassing: "",
        over_all_experience: "",
        projectTitle: "",
        projectPeriod: "",
        projectDescription: "",
        courseName: "",
        coursePeriod: "",
        courseInstitution: "",
        currentSalary: "",
        expected_salary: "",
        message: "",
        percentage: "",
        positionType: "",
        dob: "",
        relevantExperience: "",
        expectedCostPerHour: "",
        jobReferenceType: "",
        jobReferenceName: "",
        willingToWorkInShift: "",
        stayingWith: "",
        tenthPercentage: "",
        tenthYearOfPassing: "",
        twelvethPercentage: "",
        twelvethYearOfPassing: "",
        degreeArrear: "",
        didCourse: "",
        didProject: "",
        linkedinProfileName: "",
        facebookProfileName: "",
        jobTitle: "",
        joinedMonth: "",
        joinedYear: "",
        companyName: "",
        knownLanguages: "",
        employmentEligibility: "",
        didVaccineStatus: "",
    }

    const accountForm = (<CandidateForm />);

    const getStatus = async () => {
        const status = await StatusService.search(
            ObjectName.CANDIDATE,
            CandidateStatus.STATUS_NEW
        );
        for (let i = 0; i < status.length; i++) {
            setStatus(status[i]?.id);
        }
    };

    const addSalesFooter = (
        <div className="container-fluid">
            <div className="col-sm-12 text-center">
                <Button type="submit" label="Add" className="h6-5-important" />
            </div>
        </div>
    );

    return (
        <>
            <PageTitle
                label="Candidates"
                buttonHandler={() => {
                    toggle();
                }}
                buttonLabel="Add New"
            />

            <AddModal
                isOpen={isOpen}
                toggle={toggle}
                toggleModalClose={toggle}
                modalTitle="Add Candidate"
                initialValues={initialValues}
                modalBody={accountForm}
                modalFooter={addSalesFooter}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
                hideDefaultButtons
            />

            <div className="mt-4">
                <ReduxTable
                    id="Candidate"
                    showHeader
                    searchPlaceholder="Search"
                    apiURL={`${endpoints().candidate}/list`}
                    newTableHeading
                    history={history}
                    paramsToUrl={true}
                    sortByOptions={sortByOption}
                >
                    <ReduxColumn
                        field="userName"
                        sortBy="first_name"
                        renderField={(row) => (
                            <>
                                <Link to={`/jobs/candidate/${row.candidateId}`}>
                                    <div className="d-flex text-break">
                                        <AvatarCard
                                            id="avatar"
                                            firstName={row.firstName}
                                            lastName={row.lastName}
                                            url={row.profilePhotoUrl}
                                        />
                                    </div>
                                </Link>
                            </>
                        )}
                    >
                        Name
                    </ReduxColumn>
                    <ReduxColumn
                        field="email"
                        sortBy="email"
                    >
                        Email
                    </ReduxColumn>
                    <ReduxColumn
                        field="gender"
                        sortBy="gender"
                    >
                        Gender
                    </ReduxColumn>
                    <ReduxColumn
                        field="interviewDate"
                        sortBy="interview_date"
                    >
                        Interview Date
                    </ReduxColumn>
                    <ReduxColumn
                        field="maritalStatus"
                        sortBy="marital_status"
                    >
                        Marital Status
                    </ReduxColumn>
                    <ReduxColumn
                        field="position"
                        sortBy="position"
                    >
                        Position
                    </ReduxColumn>
                    <ReduxColumn
                        field="phone"
                        sortBy="phone"
                    >
                        Phone
                    </ReduxColumn>
                    <ReduxColumn
                        field="statusText"
                        sortBy="statusText"
                    >
                        Status
                    </ReduxColumn>
                    <ReduxColumn
                        field="qualification"
                        sortBy="qualification"
                    >
                        Qualification
                    </ReduxColumn>

                </ReduxTable>
            </div>
        </>
    )
}

export default Candidate; 