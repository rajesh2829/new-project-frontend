import React, { useEffect } from "react";
import Form from "../../components/Form";
import Text from "../../components/Text";
import Select from "../../components/Select";
import Number from "../../components/Number";
import SaveButton from "../../components/SaveButton";
import AttendanceTypeService from "../../services/AttendanceTypeService";
import { useState } from "react";
import { statusOptions, typeOptions } from "../../helpers/AttendanceType";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import DeleteModal from "../../components/DeleteModal";
import BreadCrumb from "../../components/Breadcrumb";

const DetailPage = (props) => {
  const [detail, setDetail] = useState({});
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    getDetails();
  }, []);


  const Toggle = () => {
    setIsOpen(!isOpen)
  }

  const getDetails = async () => {
    let data = await AttendanceTypeService.get(props.match.params.id);
    setDetail(data);
  };

  let initialValues = {
    name: detail?.name,
    type: typeOptions.find((data) => data?.value == detail?.type),
    status: statusOptions.find((data) => data?.value == detail?.status),
    days_count: detail?.days_count,
  };

  const handleSubmit = async (values) => {
    let data = new FormData();

    data.append("name", values && values?.name ? values?.name : "");
    data.append("type", values && values?.type ? values?.type?.value : "");
    data.append(
      "status",
      values && values?.status ? values?.status?.value : ""
    );
    data.append(
      "days_count",
      values && values?.days_count ? values?.days_count : ""
    );
    dispatch(await AttendanceTypeService.update(props.match.params.id, data));
  }

  const deleteFunction = async () => {
    dispatch(await AttendanceTypeService.delete(props.match.params.id, (res) => {
      if (res) {
        Toggle()
        props.history.push("/setting/AttendanceTypes")
      }
    }));
  }

  const breadcrumbList = [
    { label: "Home", link: "/setting/AttendanceTypes" },
    { label: "Attendance Types", link: "/setting/AttendanceTypes" },
    { label: "Account Types Detail", link: "" },
  ];

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        toggle={Toggle}
        title="Delete"
        label={props.match.params.id}
        deleteFunction={deleteFunction}
      />
      <BreadCrumb list={breadcrumbList} />
      <PageTitle label="Detail Page" deletebuttonHandler={() => {
        Toggle()
      }}
        DeleteButtonLabel="Delete" />
      <div className="card card-body">
        <Form
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          <Text name="name" label="Name" />
          <Select name="type" label="Type" options={typeOptions} />
          <Select name="status" label="Status" options={statusOptions} />
          <Number name="days_count" label="Days Count" />
          <SaveButton />
        </Form>
      </div>
    </>
  );
};

export default DetailPage;
