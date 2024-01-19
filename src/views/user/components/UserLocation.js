import React, { useEffect, useState } from 'react';
import Form from '../../../components/Form';
import SaveButton from "../../../components/SaveButton";
import SelectStore from "../../../components/SelectStore";
import ShiftSelect from "../../../components/ShiftSelect";
import { useDispatch } from "react-redux";
import UserLocationService from "../../../services/UserLocationService";
import StoreService from "../../../services/StoreService";
import ShiftService from "../../../services/ShiftService";
import { User } from "../../../helpers/User";

const UserLocation = (props) => {

  const [storeList, setStoreList] = useState([])
  const [detail, setDetail] = useState([])
  const [shiftList, setShiftList] = useState([])
  let dispatch = useDispatch()

  useEffect(() => {
    getDetails()
    getStores()
    getShifts()
  }, [])

  const getDetails = async () => {
    let response = await UserLocationService.get(props?.user_id);
    let data = response && response?.data && response?.data?.data;
    setDetail(data)
  }

  const getStores = async () => {
    await StoreService.list((callback) => {
      setStoreList && setStoreList(callback)
    });
  }

  const getShifts = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  }
  let initialValues = {
    primary_location: storeList && storeList.find((data) => data?.id == detail?.primary_location),
    primary_shift: shiftList && shiftList.find((data) => data?.id == detail?.primary_shift),
    secondary_location: storeList && storeList.find((data) => data?.id == detail?.secondary_location),
    secondary_shift: shiftList && shiftList.find((data) => data?.id == detail?.secondary_shift)
  }

  function areFieldsUndefined(obj) {
    for (const key in obj) {
      if (obj[key] !== undefined) {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async (values) => {

    let isUndefined = areFieldsUndefined(values);
    let data = [
      {
        primary_location: values && values?.primary_location ? values?.primary_location?.id : "",
        primary_shift: values && values?.primary_shift ? values?.primary_shift?.id : "",
        type: User.PRIMARY_TYPE
      },
      {
        secondary_location: values && values?.secondary_location ? values?.secondary_location?.id : "",
        secondary_shift: values && values?.secondary_shift ? values?.secondary_shift?.id : "",
        type: User.SECONDARY_TYPE
      }
    ]

    { !isUndefined && dispatch(await UserLocationService.update(props.user_id, data)) }
  }


  return (
    <div className="card card-body">
      <Form initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col'>
            <SelectStore label="Primary Location" name="primary_location" StoreList={setStoreList} />
          </div>
          <div className='col'>
            <ShiftSelect label="Primary Shift" name="primary_shift" />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <SelectStore label="Secondary Location" name="secondary_location" />
          </div>
          <div className='col'>
            <ShiftSelect label="Secondary Shift" name="secondary_shift" />
          </div>
        </div>
        <SaveButton label="Save" />
      </Form>
    </div>
  );
};

export default UserLocation;
