import React, { useState, useEffect } from "react";
import Form from "../../components/Form";
import SaveButton from "../../components/SaveButton";
import Text from "../../components/Text";
import DraftEditor from "../../components/Draft";
import DeleteButton from "../../components/DeleteButton";
import Select from "../../components/Select";
import SideNavBar from "./sideNavBar";
import { Row } from "reactstrap";
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";
import { endpoints } from "../../api/endPoints";
import toast from "../../components/Toast";
import DeleteModal from "../../components/DeleteModal";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

const DocsDetails = (props) => {
  const { history } = props;

  const [docList, setDocList] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [List, setList] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });

  const statusOptions = [
    {
      value: "Draft",

      label: "Draft",
    },

    {
      value: "Publish",

      label: "Publish",
    },
  ];

  const handleChange = (editorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    getDocsDetails();
  }, []);

  const getDocsDetails = async () => {
    try {
      const response = await apiClient.get(
        `${endpoints().docsAPI}/${props.match.params.tab}`
      );
      const data = response.data;
      setDocList(data);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(data.content)))
      );
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  const updateDocsDetails = async (values) => {
    let rawComment;
    if (editorState) { rawComment = convertToRaw(editorState.getCurrentContent()) };

    values.content = JSON.stringify(rawComment);
    values.status = values.status.value;

    try {
      const response = await apiClient.put(
        `${endpoints().docsAPI}/${props.match.params.tab}`,
        values
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
        getDocsDetails();
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  function deleteDocs(id) {
    apiClient
      .delete(`${endpoints().docsAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          props.history.push("/docs");
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });
  }

  const initialValues = {
    title: docList.title,
    slug: docList.slug,
    status: {
      label: docList.status,
      value: docList.status,
    },
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        title="Delete Docs"
        toggle={() => {
          setDeleteModal(false);
        }}
        label={docList.title}
        deleteFunction={() => deleteDocs(props.match.params.tab)}
      />

      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          updateDocsDetails(values);
        }}
      >
        <Row className="mt-n3 mt-md-n4 admin-setting w-100">
          <div className="sidemenu docs">
            <SideNavBar />
          </div>
          <div className="col card border-0">
            <div className="card border-0 p-3">
              <div>
                <DeleteButton
                  className="pl-3 pull-right m-1"
                  label={"Delete"}
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                />
                <div className="pull-right m-0">
                  <SaveButton label="Save" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1">
                  <Select
                    label="Status"
                    name="status"
                    options={statusOptions}
                  />
                  <Text name="title" label="Title" placeholder="New" />
                  <Text
                    name="slug"
                    label="Slug"
                    fontBolded
                    placeholder="slug"
                    error=""
                  />

                  <DraftEditor
                    name="content"
                    editorState={editorState}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default DocsDetails;
