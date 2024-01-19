import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../../components/Form';
import SaveButton from '../../components/SaveButton';
import Select from '../../components/Select';
import TagTypeService from '../../services/TagTypeService';
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import { getKeyValueByObject } from "../../lib/Helper";
import { Setting } from "../../helpers/Setting";
const SettingPage = (props) => {
  const [typeList, setTypeList] = useState([]);
  const [cashMissing,setCashMissing]=useState([]);
  const [orderMissing, setOrderMissing]=useState([])
  const [orderUpiMissing, setOrderUpiMissing]=useState([])
  const [receivedCashMissing, setReceviedCashMissing]=useState([])
  const [receivedUpiMissing, setReceivedUpiMissing]=useState([])
  let dispatch = useDispatch();
  useEffect(() => {
    getFineTypes();
    getSettings()
  }, []);
  const getSettings = async () => {
    const settingData = await getCompanySettings();
    let cash = getKeyValueByObject(settingData, Setting.LOCATION_CASH_AMOUNT_MISSING_FINE_TYPE);
    let order = getKeyValueByObject(settingData, Setting.ORDER_CASH_AMOUNT_MISSING_FINE_TYPE);
    let upi = getKeyValueByObject(settingData, Setting.ORDER_UPI_AMOUNT_MISSING_FINE_TYPE);
    let receivedCash = getKeyValueByObject(settingData, Setting.RECEIVED_CASH_AMOUNT_MISSING_FINE_TYPE);
    let receivedUpi = getKeyValueByObject(settingData, Setting.RECEIVED_UPI_AMOUNT_MISSING_FINE_TYPE);
    setCashMissing(cash)
    setOrderMissing(order)
    setOrderUpiMissing(upi)
    setReceviedCashMissing(receivedCash)
    setReceivedUpiMissing(receivedUpi)
  };
  const getFineTypes = async () => {
    let response = await TagTypeService.TagList('FineType');
    let data = response && response?.data;
    if (data && data.length > 0) {
      let list = [];
      for (let i = 0; i < data.length; i++) {
        const { id, name } = data[i];
        list.push({
          value: id,
          label: name,
        });
      }
      setTypeList(list);
    }
  };
  const handleUpdate = async (values) => {
    let data = new FormData();
    data.append(
      Setting.LOCATION_CASH_AMOUNT_MISSING_FINE_TYPE,
      values && values?.location_cash_amount_missing_fine_type?.value
    );
    data.append(
      Setting.ORDER_CASH_AMOUNT_MISSING_FINE_TYPE,
      values && values?.order_cash_amount_missing_fine_type?.value
    );
    data.append(
      Setting.ORDER_UPI_AMOUNT_MISSING_FINE_TYPE,
      values && values?.order_upi_amount_missing_fine_type?.value
    );
    data.append(
      Setting.RECEIVED_CASH_AMOUNT_MISSING_FINE_TYPE,
      values && values?.received_cash_amount_missing_fine_type?.value
    );
    data.append(
      Setting.RECEIVED_UPI_AMOUNT_MISSING_FINE_TYPE,
      values && values?.received_upi_amount_missing_fine_type?.value
    );
    saveSetting(data,null, (res) => {
      if (res) {
      }
    });
  };
  return (
    <div>
      <Form
        enableReinitialize={true}
        initialValues={{
          location_cash_amount_missing_fine_type: typeList && typeList.length > 0 && typeList.find((data)=>data?.value ==cashMissing),
          order_cash_amount_missing_fine_type: typeList && typeList.length > 0 && typeList.find((data)=>data?.value ==orderMissing),
          order_upi_amount_missing_fine_type: typeList && typeList.length > 0 && typeList.find((data)=>data?.value ==orderUpiMissing),
          received_cash_amount_missing_fine_type: typeList && typeList.length > 0 && typeList.find((data)=>data?.value ==receivedCashMissing),
          received_upi_amount_missing_fine_type: typeList && typeList.length > 0 && typeList.find((data)=>data?.value ==receivedUpiMissing),
        }}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        <div className='card bg-white mb-3'>
          <div className='card-body'>
            <Select
              name={Setting.LOCATION_CASH_AMOUNT_MISSING_FINE_TYPE}
              label='Location Cash Amount Missing Fine Type'
              options={typeList}
            />
              <Select
              name={Setting.ORDER_CASH_AMOUNT_MISSING_FINE_TYPE}
              label='Order Cash Amount Missing Fine Type'
              options={typeList}
            />
              <Select
              name={Setting.ORDER_UPI_AMOUNT_MISSING_FINE_TYPE}
              label='Order Upi Amount Missing Fine Type'
              options={typeList}
            />
             <Select
              name={Setting.RECEIVED_CASH_AMOUNT_MISSING_FINE_TYPE}
              label='Received Cash Amount Missing Fine Type'
              options={typeList}
            />
              <Select
              name={Setting.RECEIVED_UPI_AMOUNT_MISSING_FINE_TYPE}
              label='Received Upi Amount Missing Fine Type'
              options={typeList}
            />
             <div className='mb-4'>
            <div>
              <SaveButton />
            </div>
          </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default SettingPage;