import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import DragAndDropField from "../../../components/FileUpload";
import FeatureImage from "../../../components/Image";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import DeleteButton from "../../../components/DeleteButton";
import Drawer from "../../../components/Drawer";

// Actions
import { fetchList } from "../../../actions/table";

// Helpers
import Media from "../../../helpers/Media";
import MediaUpload from "../../../helpers/MediaUpload";
import ObjectName from "../../../helpers/ObjectName";

// Lib
import DateTime from "../../../lib/DateTime";

// Services
import TicketTestService from "../../../services/TicketTestService";

// API
import { endpoints } from "../../../api/endPoints";

const TicketTestTable = (props) => {
  let {
    history,
    setRowValue,
    rowValue,
    setSelectedFile,
    selectedFile,
    setIsSubmit,
    isSubmit
  } = props;
  const dispatch = useDispatch();

  const handleTicketTest = async (values) => {
    try {
      setIsSubmit(true)
      let data = new FormData();
      data.append("result", values && values?.result?.value);
      data.append("summary", values && values?.summary);
      data.append("ticket_id", props.ticketId);
      data.append(
        "media_file",
        selectedFile !== undefined ? selectedFile : null
      );

      if (rowValue && rowValue?.id) {
        dispatch(
          await TicketTestService.update(rowValue?.id, data, (res) => {
            if (res) {
              if (selectedFile && selectedFile !== undefined) {
                MediaUpload.uploadFile(
                  selectedFile,
                  rowValue?.id,
                  ObjectName.TICKET_TEST,
                  "",
                  Media.VISIBILITY_PUBLIC,
                  "",
                  (res) => {
                    if (res) {
                      dispatch(
                        fetchList(
                          "ticketTest",
                          `${endpoints().TicketTest}/search`,
                          1,
                          25,
                          {
                            ticket_id: props.ticketId
                          }
                        )
                      );
                    }
                  }
                );
              } else {
                if (res) {
                  dispatch(
                    fetchList(
                      "ticketTest",
                      `${endpoints().TicketTest}/search`,
                      1,
                      25,
                      {
                        ticket_id: props.ticketId
                      }
                    )
                  );
                }
              }
              props.toggle();
            }
          })
        );
      } else {
        dispatch(
          await TicketTestService.create(data, (res) => {
            if (res) {
              setIsSubmit(true);

              if (selectedFile && selectedFile !== undefined) {
                MediaUpload.uploadFile(
                  selectedFile,
                  res?.data.id,
                  ObjectName.TICKET_TEST,
                  "",
                  Media.VISIBILITY_PUBLIC,
                  "",
                  (res) => {
                    if (res) {
                      dispatch(
                        fetchList(
                          "ticketTest",
                          `${endpoints().TicketTest}/search`,
                          1,
                          25,
                          {
                            ticket_id: props.ticketId
                          }
                        )
                      );
                    }
                  }
                );
              } else {
                if (res) {
                  dispatch(
                    fetchList(
                      "ticketTest",
                      `${endpoints().TicketTest}/search`,
                      1,
                      25,
                      {
                        ticket_id: props.ticketId
                      }
                    )
                  );
                }
              }
              props.toggle();
            } else {
              setIsSubmit(false);
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  const onDrop = (selectedFile) => {
    setSelectedFile(selectedFile && selectedFile[0]);
  };

  const handleDelete = async () => {
    dispatch(
      await TicketTestService.delete(rowValue.id, (res) => {
        if (res) {
          dispatch(
            fetchList("ticketTest", `${endpoints().TicketTest}/search`, 1, 25, {
              ticket_id: props.ticketId
            })
          );
          props.toggle();
        }
      })
    );
  };

  const statusOption = [
    {
      label: "Passed",
      value: 1
    },
    {
      label: "Failed",
      value: 2
    }
  ];

  const modelBody = (
    <>
      <div className="row">
        <div className="col-12">
          <Text
            name="summary"
            label="Summary"
            required
          />
        </div>
        <div className="col-12">
          <Select
            name="result"
            label="Result"
            options={statusOption}
          />
        </div>
        <div className="col-12">
          <DragAndDropField
            label="Attachement"
            onDrop={onDrop}
            width="100%"
            selectedFile={selectedFile}
            initialValue={
              selectedFile == undefined ? rowValue && rowValue?.media_url : ""
            }
          />
        </div>
      </div>
    </>
  );

  const DrawerFooter = (
    <>
      <SaveButton type="submit" label={rowValue?.id ? "Save" : "Add"} loading={isSubmit == false} />
      {rowValue && rowValue?.id && (
        <DeleteButton onClick={handleDelete} label="Delete" className="ml-3" />
      )}
    </>
  );

  const initialValues = {
    summary: rowValue?.summary ? rowValue?.summary : "",
    result: rowValue?.result_id
      ? statusOption.find((data) => data?.value == rowValue?.result_id)
      : ""
  };

  const openModel = (rowValue) => {
    props && props.toggle();
    setRowValue(rowValue);
  };

  return (
    <>
      <Drawer
        modelTitle={rowValue?.id ? "Update Test" : "Add Test"}
        DrawerBody={modelBody}
        DrawerFooter={DrawerFooter}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleTicketTest}
        handleOpenModal={props.toggle}
        handleCloseModal={props.toggle}
        handleDrawerClose={props.toggle}
        isModalOpen={props.isOpen}
        showButton
        hideAddButton
      />
      <ReduxTable
        id="ticketTest"
        disableHeader
        paramsToUrl={true}
        params={{
          ticket_id: props.ticketId
        }}
        apiURL={`${endpoints().TicketTest}/search`}
        history={props.history}
      >
        <ReduxColumn
          field="test_number"
          sortBy="test_number"
          minWidth="112px"
          className="text-center"
          renderField={(row) => (
            <Link to="#" onClick={(e) => openModel(row)}>
              {row.test_number}
            </Link>
          )}
        >
          TS NO#
        </ReduxColumn>
        <ReduxColumn field="summary" sortBy="summary">
          Summary
        </ReduxColumn>
        <ReduxColumn
          field="result"
          minWidth="112px"
          sortBy="result"
          className="text-center"
        >
          Result
        </ReduxColumn>
        <ReduxColumn
          field="attachement"
          sortBy="attachement"
          className="text-center"
          renderField={(row) => (
            <FeatureImage
              size="imageSize"
              src={row?.media_url}
              className="img-fluid p-1 bg-white border rounded"
              minWidth="70px"
              maxHeight="80px"
            />
          )}
        >
          Attachement
        </ReduxColumn>
        <ReduxColumn
          field="updated_at"
          sortBy="updated_at"
          className="text-center"
          renderField={(row) => (
            <span>{DateTime.DateAndTime(row.updated_at)}</span>
          )}
        >
          UpdatedAt
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default TicketTestTable;
