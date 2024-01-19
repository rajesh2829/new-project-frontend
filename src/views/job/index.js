import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import AddButton from "../../components/AddButton";
import Form from "../../components/Form";
import AddModal from "../../components/Modal";
import MultiSelect from "../../components/Multiselect";
import PageTitle from "../../components/PageTitle";
// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Select from "../../components/Select";
import Text from "../../components/Text";
import { fetchList } from "../../actions/table";
import { Jobs } from "../../helpers/Job";

//Config
import { endpoints } from "../../api/endPoints";
// Action
import { addJob } from "../../actions/jobs";
import Url from "../../lib/Url";
import JobService from "../../services/JobService";

const Job = (props) => {
  const { history } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState();
  const [status, setStatus] = useState();
  const [slug, setSlug] = useState("");

  //Sort By Option Values

  const StatusOptions = [
    {
      value: Jobs.STATUS_ACTIVE,

      label: "Active",
    },

    {
      value: Jobs.STATUS_INACTIVE,

      label: "InActive",
    },
  ];

  const sortByOptions = [
    {
      value: "job_title:ASC",
      label: "Job Title",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const categoryOptions = [
    {
      value: "Experienced",
      label: "Experienced",
    },
    {
      value: "Fresher",
      label: "Fresher",
    },
  ];

  const handleCategoryChange = (values) => {
    const category = values?.values?.category?.value;
    setCategories(category);
    dispatch(
      fetchList("job", `${endpoints().JobApi}/list`, 1, 25, {
        category: category ? category : "",
        status: status ? status : "",
        pagination: true,
      })
    );
  };

  const handleStatusChange = (values) => {
    const status = values?.values?.status?.value;

    setStatus(status);
    dispatch(
      fetchList("job", `${endpoints().JobApi}/list`, 1, 25, {
        status: status ? status : "",
        category: categories ? categories : "",
        pagination: true,
      })
    );
  };

  /**
   * Add job
   *
   * @param data
   */
  const jobAdd = (data) => {
    const name = data.title;
    data.slug = name.split(" ").join("-").toLowerCase();
    setSlug(slug);
    dispatch(JobService.create(data, {}, toggle, dispatch));
  };

  /**
   * Delete Job
   *
   * @param data
   */

  const addJobForm = (
    <Text
      name="title"
      label="Job Title"
      placeholder="Job Title..."
      error=""
      required={true}
    />
  );

  const addJobFooter = (
    <Button type="submit" label="" className="h6-5-important">
      Add
    </Button>
  );

  return (
    <>
      <AddModal
        modalTitle="Add Job"
        modalBody={addJobForm}
        modalFooter={addJobFooter}
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        initialValues={{
          title: "",
        }}
        onSubmit={(values) => {
          jobAdd(values);
        }}
        hideDefaultButtons
      />

      {/* /.page-heading */}
      <PageTitle
        label="Jobs"
        buttonLabel="Add New"
        buttonHandler={(e) => {
          toggle();
        }}
      />

      <div className="bg-white mt-3">
        <div className="card-body">
          <div className="mt-4">
            <ReduxTable
              id="job"
              apiURL={`${endpoints().JobApi}/list`}
              showHeader
              searchPlaceholder="Search"
              sortByOptions={sortByOptions}
              newTableHeading
              onRowClick
              paramsToUrl={true}
              showTagFilter
              tagFilterType={{ type: "Job Category" }}
              showStatusFilter
              customStatusOption={StatusOptions}
              history={history}
            >
              <ReduxColumn
                field="job_title"
                type="link"
                sortBy="job_title"
                isClickable="true"
                onLinkClick={(row) => history.push(`/job/detail/${row.id}`)}
              >
                Job Title
              </ReduxColumn>

              <ReduxColumn field="category" sortBy="category">
                Category
              </ReduxColumn>
            </ReduxTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
