import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Components
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import Select from "../../components/Select";
import BreadCrumb from "../../components/Breadcrumb";
import BillForm from "./components/purchaseForm";

// Action
import { addPurchase } from "../../actions/purchase";
import Currency from "../../lib/Currency";

const AddBill = (props) => {
  const { history } = props;
  const [imageList, setImageList] = useState([]);
  const dispatch = useDispatch();
  const purchaseAdd = (data) => {
    dispatch(addPurchase(data, {}, history));
  };

  const handleSubmit = (values) => {
    const data = new FormData();
    // const formData = new formData();
    const test = new Object();

    data.append("date", new Date(values.date));
    data.append("status", values && values.status ? values.status.value : "");
    data.append("vendor_purchase_number", values && values.vendor_purchase_number ? values.vendor_purchase_number.value : "");
    data.append("due_date", values && values.due_date ? values.due_date : "");
    data.append("amount", values && values.amount ? Currency.Get(values.amount) : "");

    let imageNames = [];
    for (let i = 0; i < imageList.length; i++) {
      imageNames.push({ name: imageList[i].file.name });
      data.append("files", imageList[i].file);
    }

    data.append("imageName", JSON.stringify(imageNames));
    data.append(
      "vendor_name",
      values && values.vendor_name.label ? values.vendor_name.label : ""
    );

    purchaseAdd(data);
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Bills",
      link: "/purchases",
    },
    {
      label: "Add Bill",
    },
  ];

  const purchaseStatusOptions = [
    {
      value: "New",
      label: "New",
    },
    {
      value: "Paid",
      label: "Paid",
    },
  ];

  return (
    <div>
      {/* Bread Crumb section */}
      <BreadCrumb list={breadcrumbList} />
      <Form
        initialValues={{
          purchase_number: "",
          date: new Date(),
          vendor_name: "",
          status: {
            value: "New",
            label: "New",
          },
          amount: "",
          description: "",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <div className="row">
          <div className="col  d-flex justify-content-between">
            <PageTitle label="Add Bill" />

            <Select
              width="150px"
              name="status"
              isClearable
              options={purchaseStatusOptions}
            />
          </div>
        </div>
        <div className=" card mt-2 mb-3 p-3">
          <div className="row">
            <div className="col-12">
              <BillForm
                history={history}
                imageList={imageList}
                setImageList={setImageList}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddBill;
