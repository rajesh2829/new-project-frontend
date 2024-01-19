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
import GatePassService from "../../services/GatePassService";
import UserSelect from "../../components/UserSelect";


function GatePassDetail(props) {
  let { history } = props;
  let id = props.match.params.id;
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  let dispatch = useDispatch();

  useEffect(() => {
    getGatePassDetail();
  }, []);

  let initialValues = {
    notes: detail ? detail?.notes : "",
  };

  const handleUpdate = async (values) => {
    const data = new FormData();
    data.append("notes", values?.notes ? values?.notes : "");
    data.append("owner_id", values?.owner_id?.id ? values?.owner_id?.id : detail?.owner_id)
    data.append("media_file", selectedFile ? selectedFile : "");
    dispatch(await GatePassService.update(id, data, (res) => {
      if (res) {
        getGatePassDetail();
        setSelectedFile("")
      }
    }));

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

  const getGatePassDetail = async () => {
    let data = await GatePassService.get(id);
    setDetail(data);
  };

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    { label: "Gate Pass", link: "/gatePass" },
    { label: "Detail Page", link: "" },
  ];

  const handleDelete = async () => {
    dispatch(
      await GatePassService.delete(id, (res) => {
        if(res){
          history.push("/gatePass");

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
        label={detail?.id}
      />
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-1">
        <PageTitle label="Gate Pass Detail Page" />
        <div className="d-flex justify-content-end">
          <DeleteButton
            label="Delete"
            className="mr-2"
            onClick={() => {
              deleteToggle();
            }}
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
              <TextArea
                name="notes"
                label="Notes"
                placeholder="Enter Notes..."
                error=""
                fontBolded
              />
              <UserSelect name="owner_id" label="Owner" selectedUserId={detail?.owner_id} />

              <HorizontalSpace bottom="2">
                <SaveButton label="Save" />
                <CancelButton
                  onClick={() => {
                    history.push("/gatePass");
                  }}
                />
              </HorizontalSpace>
            </Form>
          </div>
          <div className="col-sm-5 bill-web-view ">
            <MediaCarousel
              showCarasoul
              modalTitle="Upload File"
              title="leads"
              objectName={ObjectName.GATE_PASS}
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

export default GatePassDetail;
