import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

// Components
import DateSelector from "../../../components/Date";
import Form from "../../../components/Form";
import Select from "../../../components/Select";

// Lib
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";

// Services
import StoreService from "../../../services/StoreService";
import TransferProductService from "../../../services/TransferProductService";
import TransferTypeService from "../../../services/TransferTypeService";

const TransferReportFilter = (props) => {
  const { params } = props;
  const [storeList, setStoreList] = useState([]);

  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [fromLocationValue, setFromLocationValue] = useState(
    Url.GetParam("from_location")
  );

  const [toLocationValue, setToLocationValue] = useState(Url.GetParam("to_location"));
  const [endDateValue, setEndDateValue] = useState(Url.GetParam("endDate"));
  const [startDateValue, setStartDateValue] = useState(
    Url.GetParam("startDate")
  );
  const [typeValue, setTypeValue] = useState(Url.GetParam("type"));
  const [typeList, setTypeList] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getStoreList();
    getType();
  }, []);

  if (fromLocationValue) {
    params.from_location = fromLocationValue;
  }

  if (typeValue) {
    params.type = typeValue;
  }

  if (toLocationValue) {
    params.to_location = toLocationValue;
  }

  if (endDateValue) {
    params.endDate = DateTime.toISOStrings(endDateValue);
  }

  if (startDateValue) {
    params.startDate = DateTime.formatDate(startDateValue);
  }

  const getStoreList = async () => {
    await StoreService.search((callback) => setStoreList(callback));
  };

  const getType = async () => {
    const list = await TransferTypeService.search();
    setTypeList(list);
  };

  const handleFromStore = async (values) => {
    const id = values?.value ? values?.value : "";
    let pageSize = Url.GetParam("pageSize");
    const param = {
      from_location: id ? id : "",
      to_location: toLocationValue ? toLocationValue : "",
      type: typeValue ? typeValue : "",
      category: Url.GetParam("category") ? Url.GetParam("category") : "",
      brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
      startDate: Url.GetParam("startDate") ? Url.GetParam("startDate") : "",
      endDate: endDate ? DateTime.toISOStrings(endDate) : "",
      search: Url.GetParam("search"),
    };
    setFromLocationValue(id);
    Url.UpdateUrl(
      {
        from_location: id ? id : "",
        to_location: toLocationValue ? toLocationValue : "",
        type: typeValue ? typeValue : "",
        startDate: selectedDate.startDate ? Url.GetParam("startDate") : "",
        endDate: selectedDate.endDate ? Url.GetParam("endDate") : "",
        category: Url.GetParam("category") ? Url.GetParam("category") : "",
        brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
        search: Url.GetParam("search"),
      },
      props
    );
    dispatch(await TransferProductService.search(pageSize, param));
  };

  const handleToStore = async (values) => {
    const id = values?.value ? values?.value : "";
    let pageSize = Url.GetParam("pageSize");
    const param = {
      to_location: id ? id : "",
      type: typeValue ? typeValue : "",
      from_location: fromLocationValue ? fromLocationValue : "",
      category: Url.GetParam("category") ? Url.GetParam("category") : "",
      brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
      startDate: Url.GetParam("startDate") ? Url.GetParam("startDate") : "",
      endDate: endDate ? DateTime.toISOStrings(endDate) : "",
      search: Url.GetParam("search"),
    };
    setToLocationValue(id);
    Url.UpdateUrl(
      {
        to_location: id ? id : "",
        type: typeValue ? typeValue : "",
        from_location: fromLocationValue ? fromLocationValue : "",
        startDate: selectedDate.startDate ? Url.GetParam("startDate") : "",
        category: Url.GetParam("category") ? Url.GetParam("category") : "",
        brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
        endDate: endDate ? DateTime.toISOStrings(endDate) : "",
        search: Url.GetParam("search"),
      },
      props
    );
    dispatch(await TransferProductService.search(pageSize, param));
  };

  const handleStartDate = async (startDate) => {
    setSelectedDate((prevState) => ({ ...prevState, startDate: startDate }));
    const value = startDate ? DateTime.formatDate(startDate) : "";
    let pageSize = Url.GetParam("pageSize");
    const param = {
      endDate: endDate ? DateTime.toISOStrings(endDate) : "",
      from_location: fromLocationValue ? fromLocationValue : "",
      category: Url.GetParam("category") ? Url.GetParam("category") : "",
      brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
      type: typeValue ? typeValue : "",
      to_location: toLocationValue ? toLocationValue : "",
      startDate: startDate ? DateTime.formatDate(startDate) : "",
      search: Url.GetParam("search"),
    };
    setStartDate(startDate);
    setStartDateValue(value);
    Url.UpdateUrl(
      {
        startDate: startDate ? value : "",
        endDate: endDate ? endDateValue : "",
        from_location: fromLocationValue ? fromLocationValue : "",
        category: Url.GetParam("category") ? Url.GetParam("category") : "",
        brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
        type: typeValue ? typeValue : "",
        to_location: toLocationValue ? toLocationValue : "",
        search: Url.GetParam("search"),
      },
      props
    );
    dispatch(await TransferProductService.search(pageSize, param));
  };

  const handleEndDate = async (endDate) => {
    setSelectedDate((prevState) => ({ ...prevState, endDate: endDate }));
    const value = endDate ? DateTime.formatDate(endDate) : "";
    let pageSize = Url.GetParam("pageSize");
    const param = {
      startDate: startDate ? startDateValue : "",
      from_location: fromLocationValue ? fromLocationValue : "",
      category: Url.GetParam("category") ? Url.GetParam("category") : "",
      brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
      type: typeValue ? typeValue : "",
      to_location: toLocationValue ? toLocationValue : "",
      endDate: endDate ? DateTime.toISOStrings(endDate) : "",
      search: Url.GetParam("search"),
    };
    setEndDate(endDate);
    setEndDateValue(value);
    Url.UpdateUrl(
      {
        endDate: endDate ? value : "",
        startDate: startDate ? startDateValue : "",
        from_location: fromLocationValue ? fromLocationValue : "",
        category: Url.GetParam("category") ? Url.GetParam("category") : "",
        brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
        type: typeValue ? typeValue : "",
        to_location: toLocationValue ? toLocationValue : "",
        search: Url.GetParam("search"),
      },
      props
    );

    dispatch(await TransferProductService.search(pageSize, param));
  };

  const handleType = async (type) => {
    const id = type?.id ? type?.id : "";
    let pageSize = Url.GetParam("pageSize");
    const param = {
      type: id ? id : "",
      from_location: fromLocationValue ? fromLocationValue : "",
      to_location: toLocationValue ? toLocationValue : "",
      startDate: Url.GetParam("startDate") ? Url.GetParam("startDate") : "",
      endDate: endDate ? DateTime.toISOStrings(endDate) : "",
      category: Url.GetParam("category") ? Url.GetParam("category") : "",
      brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
      search: Url.GetParam("search"),
    };
    setTypeValue(id);
    Url.UpdateUrl(
      {
        from_location: fromLocationValue ? fromLocationValue : "",
        type: id ? id : "",
        to_location: toLocationValue ? toLocationValue : "",
        startDate: selectedDate.startDate ? Url.GetParam("startDate") : "",
        category: Url.GetParam("category") ? Url.GetParam("category") : "",
        brand: Url.GetParam("brand") ? Url.GetParam("brand") : "",
        endDate: endDate ? DateTime.toISOStrings(endDate) : "",
        search: Url.GetParam("search"),
      },
      props
    );
    dispatch(await TransferProductService.search(pageSize, param));
  };

  const initialValues = {
    from_location: storeList.find((data) => data?.value == fromLocationValue),
    to_location: storeList.find((data) => data?.value == toLocationValue),
    type: typeList.find((data) => data?.id == typeValue),
    startDate: startDateValue,
    endDate: endDateValue,
  };

  return (
    <>
      <Form enableReinitialize initialValues={initialValues}>
        <div className="w-100 d-flex ">
          <div className="pr-2">
            <Select
              name="from_location"
              options={storeList}
              placeholder="Select From Location"
              handleChange={handleFromStore}
            />
          </div>
          <div className="w-100 pr-2">
            <Select
              name="to_location"
              options={storeList}
              placeholder="Select To Location"
              handleChange={handleToStore}
            />
          </div>
          <div className="w-100 pr-2">
            <Select
              name="type"
              options={typeList}
              placeholder="Select Type"
              handleChange={handleType}
            />
          </div>

          <div className="w-100 pr-2">
            <DateSelector
              selected={selectedDate.startDate}
              name="startDate"
              placeholder="Start Date"
              isClearable
              onChange={handleStartDate}
            />
          </div>
          <div className="w-100 pr-2">
            <DateSelector
              selected={selectedDate.endDate}
              name="endDate"
              placeholder="End Date"
              isClearable
              onChange={handleEndDate}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default TransferReportFilter;
