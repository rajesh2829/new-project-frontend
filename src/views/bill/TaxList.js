import React, { useState } from "react";

import { endpoints } from "../../api/endPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Currency from "../../components/Currency";
import TagSelect from "../../components/TagSelect";
import ObjectName from "../../helpers/ObjectName";
import TaxService from "../../services/TaxService";
import { useDispatch } from "react-redux";
import SaveButton from "../../components/SaveButton";
import Drawer from "../../components/Drawer";
import Percentage from "../../components/Percentage";

const TaxList = ({ toggles, isOpen, id }) => {
  const [taxType, setTaxType] = useState("");
  const [detail, setDetail] = useState("");
  const [tagList, setTagList] = useState([]);
  const dispatch = useDispatch();
  const handleTaxType = (e) => {
    const value = e?.values?.type?.id;
    setTaxType(value);
  };

  const addTaxForm = (
    <>
      <TagSelect
        name="tax_type"
        label="Type"
        placeholder="Type"
        params={{ type: "Tax" }}
        onChange={handleTaxType}
        TagList={setTagList}
      />
      <Currency name="amount" label="Amount" />
      <Percentage name="tax_percentage" label="Tax Percentage" />
      <Currency name="tax_amount" label="Tax Amount" />
    </>
  );

  const taxFooter = (
    <>
      <SaveButton type="submit" label={detail ? "Update" : "Add"} />
    </>
  );

  const initialValues = {
    tax_type: detail
      ? tagList.find((item) => detail?.taxType == item.label)
      : tagList.find((item) => taxType === item.value),
    tax_amount: detail ? detail?.taxAmount : "",
    amount: detail ? detail?.amount : "",
    tax_percentage: detail ? detail?.taxPercentage : "",
  };

  const handleSubmit = async (values) => {
    let params = { object_id: id, object_name: ObjectName.BILL };
    let data = new FormData();
    if (detail?.id) {
      data.append("tax_type", values && values?.tax_type?.id ? values?.tax_type?.id : "");
      data.append(
        "tax_amount",
        values && values?.tax_amount ? values?.tax_amount : ""
      );
      data.append("amount", values && values?.amount ? values?.amount : "");
      data.append(
        "tax_percentage",
        values && values?.tax_percentage ? values?.tax_percentage : ""
      );
      data.append("object_name", ObjectName.BILL);
      data.append("object_id", id);
      TaxService.update(data, toggles, dispatch, params, detail?.id, setDetail);
    } else {
      data.append("tax_type", values && values?.tax_type?.id ? values?.tax_type?.id : "");
      data.append("tax_amount", values && values?.tax_amount);
      data.append("amount", values && values?.amount);
      data.append("tax_percentage", values && values?.tax_percentage);
      data.append("object_name", ObjectName.BILL);
      data.append("object_id", id);
      TaxService.create(data, toggles, dispatch, params);
    }
  };

  const handleDelete = async () => {
    let params = { object_id: id };
    await TaxService.delete(detail?.id, toggles, dispatch, params, setDetail)
  }

  const _toggle = () => {
    toggles();
    setDetail("");
  };
  return (
    <>
      <Drawer
        hideAddButton
        DrawerBody={addTaxForm}
        DrawerFooter={taxFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={initialValues}
        handleOpenModal={_toggle}
        handleCloseModal={_toggle}
        handleDrawerClose={_toggle}
        isModalOpen={isOpen}
        buttonLabel={true}
        showButton={true}
        modelTitle={detail ? "Update Tax" : "Add Tax"}
        showDeleteButton={detail?.id ? true : false}
        handleDelete={handleDelete}
      />

      <ReduxTable
        id="tax"
        disableHeader
        showHeader
        newTableHeading
        apiURL={`${endpoints().taxApi}/search`}
        params={{ object_id: id, object_name: ObjectName.BILL }}
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        onRowClick={(row) => {
          setDetail(row);
          toggles();
        }}
      >
        <ReduxColumn
          field="taxType"
          className="text-center"
          sortBy="tax_type_id"
          isClickable="true"
          type="link"
        >
          Tax Type
        </ReduxColumn>
        <ReduxColumn field="amount" className="text-center" sortBy="amount">
          Amount
        </ReduxColumn>
        <ReduxColumn
          field="taxPercentage"
          className="text-center"
          sortBy="tax_percentage"
        >
          Tax Percentage
        </ReduxColumn>
        <ReduxColumn
          field="taxAmount"
          className="text-center"
          sortBy="tax_amount"
        >
          Tax Amount
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default TaxList;
