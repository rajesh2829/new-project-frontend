import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Spinner from "../../components/Spinner";
import Text from "../../components/Text";
import TrainingService from "../../services/TrainingService";
import TrainingCard from "./components/TraniningCard";
import { Col, Row } from "reactstrap";
import Pagination from "../../components/Pagination";
import Url from "../../lib/Url";

const TrainingList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingList, setTrainingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(Url.GetParam("search"));
  const [pageDetails, setPageDetails] = useState();

  useEffect(() => {
    getTrainingDetails({ search: searchValue });
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const addModelBody = (
    <Text
      name="training_name"
      label="Training Name"
      placeholder="Training Name..."
      error=""
      required={true}
    />
  );

  const addModelFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <SaveButton
          type="submit"
          label="Add"
          className="ml-3 h6-5-important"
        />
      </div>
    </div>
  );

  const getTrainingDetails = async (param) => {
    setIsLoading(true);
    let params = {};

    if (param && param?.search) {
      params.search = param && param?.search ? param?.search : "";
    }

    if (param && param?.page) {
      params.page = param && param?.page ? param?.page : "";
    }

    if (param && param?.pageSize) {
      params.pageSize = param && param?.pageSize ? param?.pageSize : "";
    }

    Url.UpdateUrl(params, props);
    let { data, currentPage, pageSize, totalCount } =
      await TrainingService.search(params);
    setPageDetails({
      currentPage: currentPage,
      pageSize: pageSize,
      totalCount: totalCount,
    });
    setTrainingList(data);
    setIsLoading(false);
  };

  const AddTraining = async (values) => {
    let data = {
      training_name: values && values.training_name,
    };
    await TrainingService.create(data, (res) => {
      if (res) {
        toggle();
        setIsLoading(true);
        getTrainingDetails();
        setIsLoading(false);
      }
    });
  };

  const refreshButtonOnClick = () => {
    getTrainingDetails({ search: searchValue, pageSize: Url.GetParam("pageSize") });
  };

  const pageSearchOnChange = (e) => {
    setSearchValue(e?.target?.value ? e?.target?.value : "");
  };

  const onSearchKeyUp = (event) => {
    if (event.keyCode == 13) {
      getTrainingDetails({ search: searchValue });
    }
  };

  const onSearchClick = () => {
    getTrainingDetails({ search: searchValue });
  };

  let startPage = "";
  let currentPage = "";
  let totalCount = 0;
  let pageSize = "";
  let endPage = "";

  currentPage = pageDetails && pageDetails?.currentPage;
  totalCount = pageDetails && pageDetails?.totalCount;
  pageSize = pageDetails && pageDetails?.pageSize;

  startPage = (currentPage - 1) * pageSize + 1;
  startPage = startPage > totalCount ? totalCount : startPage;

  endPage = currentPage * pageSize;
  endPage = endPage > totalCount ? totalCount : endPage;

  const onPageChange = (page) => {
    getTrainingDetails({ page: page });
  };

  const getPageSizeByOptions = (pageSize) => {
    getTrainingDetails({ pageSize: pageSize });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add Training"
        modalBody={addModelBody}
        modalFooter={addModelFooter}
        hideDefaultButtons
        onSubmit={(values) => {
          AddTraining(values);
        }}
        initialValues={{ training_name: "" }}
      />
      <PageTitle
        label="Training"
        buttonHandler={() => {
          toggle();
        }}
        buttonLabel="Add"
        className="mb-3"
      />
      <Filter
        showHeader
        newTableHeading
        refreshButtonOnClick={refreshButtonOnClick}
        sortByDropdown
        searchPlaceholder="Search..."
        pageSearchOnChange={pageSearchOnChange}
        onKeyUp={(e) => onSearchKeyUp(e)}
        onSearchClick={onSearchClick}
        pageSearchValue={searchValue}
        showPageSize
        getPageSizeByOptions={getPageSizeByOptions}
        selectedPageSize={Url.GetParam("pageSize")}
      />
      <div className="row">
        {trainingList &&
          trainingList.map((list) => <TrainingCard list={list} />)}
      </div>
      {totalCount > 0 && (
        <Row>
          <Col>
            Showing {startPage} to {endPage} of {totalCount} entries
          </Col>
          <Col>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default TrainingList;
