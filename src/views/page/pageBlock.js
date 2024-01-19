import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
//Assets
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeleteButton from "../../components/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Select from "../../components/Select";
//Config
import { endpoints } from "../../api/endPoints";
// Action
import {
  createPageBlock,
  deletePageBlock,
  updatePageBlock,
} from "../../actions/page";
//Service
import PageService from "../../services/PageService";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageBlockList = (props) => {
  const { history, match } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [pageId, setPageId] = useState("");
  const [pageData, setPageData] = useState();
  const [currentData, setCurrentData] = useState();

  const sortByOption = [
    {
      value: "block_name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const Blocks = [
    {
      value: "header",
      label: "Header",
    },
    {
      value: "footer",
      label: "Footer",
    },
  ];

  const layouts = [
    {
      value: "fluid-width",
      label: "Fluid Width",
    },
    {
      value: "fixed-width",
      label: "Fixed Width",
    },
  ];

  const dispatch = useDispatch();

  //Toggle
  const toggle = (id) => {
    if (id) {
      setPageId(id);
    } else if (!id) {
      setPageId("");
      setCurrentData("");
    }
    setIsOpen(!isOpen);
  };

  /**
   * Create Page
   *
   * @param data
   */
  const createPageBlockData = (value) => {
    const pageId = match.params.id;
    const data = new FormData();

    data.append("page_id", pageData ? pageData.id : "");
    data.append("block_name", value.block_name ? value.block_name.value : "");
    data.append(
      "block_layout",
      value.block_layout ? value.block_layout.value : ""
    );

    dispatch(createPageBlock(data, pageId, {}));
    toggle();
  };

  /**
   * Update Page
   *
   * @param data
   */
  const updatePageBlockData = (id, value) => {
    const pageId = match.params.id;
    const data = new FormData();

    data.append("page_id", pageData ? pageData.id : "");
    data.append("block_name", value.block_name ? value.block_name.value : "");
    data.append(
      "block_layout",
      value.block_layout ? value.block_layout.value : ""
    );
    dispatch(updatePageBlock(id, data, pageId, {}));
    toggle();
  };

  /**
   * Delete Page
   *
   * @param id
   */
  const componentDelete = (id) => {
    const pageId = match.params.id;
    dispatch(deletePageBlock(id, pageId, {}));
    setIsDeleteModal(false);
  };

  const getPageDetail = async () => {
    const pageDetail = await PageService.getById(match.params.id);
    setPageData(pageDetail);
  };

  useEffect(() => {
    getPageDetail();
  }, [props]);

  const params = {
    pageId: match.params.id,
  };

  const initialValues = {
    block_layout:
      currentData &&
      layouts.find((layout) => layout.value === currentData.block_layout),
    block_name:
      currentData &&
      Blocks.find((block) => block.value === currentData.block_name),
  };

  return (
    <>
      {/* Breadcrumb Start */}
      <div className="d-flex align-items-center pb-2">
        <span
          className="cursor-pointer"
          onClick={() => {
            history.push(`/pages/pagelist`);
          }}
        >
          Page
        </span>
        <span className="d-inline-flex" style={{ width: "15px" }}>

          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <span
          className={`${pageData && pageData.page_name ? "text-dark font-weight-bold" : ""
            } d-inline-flex `}
        >
          <span>{pageData && pageData.page_name}</span>
        </span>
      </div>

      {/* Breadcrumb End */}
      <DeleteModal
        isOpen={isDeleteModal}
        toggle={() => {
          setIsDeleteModal(false);
        }}
        title="Delete Block"
        id={currentData && currentData.id}
        label={currentData && currentData.block_name}
        deleteFunction={componentDelete}
      />

      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="add-create-popup w-100"
        backdrop="static"
      >
        <ModalHeader
          toggle={toggle}
          close={
            <button className="close" onClick={toggle}>
              ×
            </button>
          }
          cssModule={{ "modal-title": "w-100 text-center" }}
        >
          <div className="content-wrapper">
            <div className="icon-wrapper">
              <div className="img-wrapper d-flex justify-content-center mb-2 mt-3">
                <img size="30" alt="" />
              </div>
              <p className="font-weight-bold mb-3">
                {pageId ? "Edit " : "Add"} Block
              </p>
            </div>
          </div>
        </ModalHeader>

        <Form
          initialValues={{ ...initialValues }}
          enableReinitialize={true}
          onSubmit={(values) => {
            pageId
              ? updatePageBlockData(pageId, values)
              : createPageBlockData(values);
          }}
        >
          <ModalBody className="custom-modal-body">
            <div className="mt-2 mb-3">
              <div>
                <Select
                  name="block_layout"
                  label="Layout"
                  placeholder="Select Layout..."
                  options={layouts}
                  error=""
                  fontBolded
                  required={true}
                />
              </div>
              <div>
                <Select
                  name="block_name"
                  label="Block Name"
                  placeholder="Select Block Name..."
                  options={Blocks}
                  error=""
                  fontBolded
                  required={true}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="container-fluid">
              <div className="col-sm-12 text-center">
                {pageId && (
                  <DeleteButton
                    onClick={() => {
                      componentDelete(pageId);
                    }}
                  />
                )}
                <Button type="submit" label="" className="ml-3 h6-5-important">
                  {pageId ? "Update" : "Create"} Block
                </Button>
              </div>
            </div>
          </ModalFooter>
        </Form>
      </Modal>

      {/* /.page-heading */}
      <PageTitle
        label="Blocks"
        buttonHandler={(e) => {
          toggle();
        }}
        buttonLabel="Add New"
      />

      <div className="mt-4">
        <ReduxTable
          id="pageBlock"
          paramsToUrl={true}
          params={params}
          history={props.history}
          apiURL={`${endpoints().pageBlockAPI}/search`}
          newTableHeading
          onRowClick={(row) => {
            history.push(
              `/pages/pagelist/detail/${match.params.id}/${row.block_name}`
            );
          }}
          sortByOptions={sortByOption}
          dropdownLabel="Sort By"
        >
          <ReduxColumn
            type="link"
            field="block_name"
            sortBy="block_name"
            isClickable="true"
          >
            Name
          </ReduxColumn>
          <ReduxColumn isClickable="false" field="block_layout">
            Layout
          </ReduxColumn>
          <ReduxColumn
            field="Action"
            disableOnClick
            renderField={(row) => (
              <div className="text-center action-group-dropdown">
                <MoreDropdown>
                  <DropdownItem
                    onClick={() => {
                      setCurrentData(row);
                      setPageId(row.id);
                      toggle(row.id);
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    onClick={() => {
                      setCurrentData(row);
                      setPageId(row.id);
                      setIsDeleteModal(true);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </MoreDropdown>
              </div>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
export default PageBlockList;
