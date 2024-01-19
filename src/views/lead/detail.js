import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import DateSelector from "../../components/Date";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import Phone from "../../components/Phone";
import PageTitle from "../../components/PageTitle";
import LeadService from "../../services/LeadService";
import HorizontalSpace from "../../components/HorizontalSpace";
import SaveButton from "../../components/SaveButton";
import CancelButton from "../../components/CancelButton";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import DateTime from "../../lib/DateTime";
import BreadCrumb from "../../components/Breadcrumb";
import StatusComponent from "../../components/Status";
import ObjectName from "../../helpers/ObjectName";
import DeleteButton from "../../components/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import MediaCarousel from "../../components/MediaCarousel";
import Media from "../../helpers/Media";
import MediaUpload from "../../helpers/MediaUpload";


function leadDetail(props) {
  let { history } = props;
  let id = props.match.params.id;
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  let dispatch = useDispatch();

  useEffect(() => {
    getLeadDetail();
  }, []);

  let initialValues = {
    date: detail ? detail?.date : "",
    mobile: detail ? detail?.mobile : "",
    name: detail ? detail?.name : "",
    notes: detail ? detail?.notes : "",
  };

  const handleUpdate = async (values) => {
    let data = new FormData();
    data.append("name", values && values?.name ? values?.name : "");
    data.append(
      "date",
      values && values?.date ? DateTime.formatDate(values?.date) : ""
    );
    data.append("notes", values && values?.notes ? values?.notes : "");
    data.append("mobile", values && values?.mobile ? values?.mobile : "");
    dispatch(
      await LeadService.update(id, data, (res) => {
        if (res) {
          setIsLoading(true);
          getLeadDetail();
          setIsLoading(false);
        }
      })
    );
  };

  const toggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  const handleImageUpload = async (values) => {
    if (id) {
      await MediaUpload.uploadFile(
        selectedFile,
        id,
        ObjectName.LEAD,
        values,
        Media.VISIBILITY_PRIVATE,
        ""
      );
    }
  };

  const getLeadDetail = async () => {
    let data = await LeadService.get(id);
    setDetail(data);
  };

  const breadcrumbList = [
    { label: "Home", link: "/marketing/dashboard" },
    { label: "Leads", link: "/leads" },
    { label: "Detail Page", link: "" },
  ];

  const onStatusChange = async (status) => {
    const data = new FormData();
    data.append("status", status ? status : "");
    if (status) {
      dispatch(
        await LeadService.statusUpdate(id, data, (res) => {
          if (res) {
            setIsLoading(true);
            getLeadDetail();
            setIsLoading(false);
          }
        })
      );
    }
  };

  const handleDelete = async () => {
    dispatch(
      await LeadService.delete(id, (res) => {
        if (res) {
          history.push("/leads");
        }
      })
    );
  };

  const deleteToggle = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        toggle={() => {
          deleteToggle();
        }}
        deleteFunction={handleDelete}
        title="Delete Image"
        label={detail?.name}
      />
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-1">
        <PageTitle label="Lead Detail Page" />
        <div className="d-flex justify-content-end">
          <DeleteButton
            label="Delete"
            className="mr-2"
            onClick={() => {
              deleteToggle();
            }}
          />
          <StatusComponent
            objectName={ObjectName.LEAD}
            handleChange={onStatusChange}
            buttonLabel={detail?.status_name}
            currentStatusId={detail?.status}
          />
        </div>
      </div>
      <div className="card card-body">
        <div className="row">
          <div className="col-sm-7">
            <Form
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleUpdate}
            >
              <DateSelector name="date" label="Date" required />
              <Text name="name" label="Name" required />
              <Phone
                name="mobile"
                label="Mobile Number"
                placeholder="Enter Mobile Number"
                error=""
                required
                fontBolded
              />
              <TextArea
                name="notes"
                label="Notes"
                placeholder="Enter Notes..."
                error=""
                fontBolded
              />
              <HorizontalSpace bottom="2">
                <SaveButton label="Save" />
                <CancelButton
                  onClick={() => {
                    history.push("/leads");
                  }}
                />
              </HorizontalSpace>
            </Form>
          </div>
          <div className="col-sm-5 bill-web-view">
            <MediaCarousel
              showCarasoul
              modalTitle="Upload File"
              title="leads"
              objectName={ObjectName.LEAD}
              objectId={id}
              history={history}
              billView={true}
              attachmentsList={true}
              modalOpen={isModelOpen}
              toggle={toggle}
              setIsModelOpen={setIsModelOpen}
              Attachments={"Attachments"}
              handleImageUpload={handleImageUpload}
              selectedFileValue={setSelectedFile}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default leadDetail;
