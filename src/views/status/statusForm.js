import React, { useEffect, useState } from 'react';
import ColorSelect from '../../components/colorSelect/colorSelect';
import MultiSelect from '../../components/Multiselect';

import Select from "../../components/Select";
import SingleCheckbox from '../../components/SingleCheckbox';
import Text from '../../components/Text';
import UserSelect from '../../components/UserSelect';

import ObjectName from "../../helpers/ObjectName";
import { groupOption } from '../../helpers/Status';
import StatusService from '../../services/StatusService';
import { getUserRole } from "../../services/UserSettingService";

const StatusForm = (props) => {

  const [userRole, setUserRole] = useState()
  const [statusList, setStatusList] = useState([])

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    getStatusList();
  }, [props?.objectName]);

  const getUserList = async () => {
    const roleData = await getUserRole();
    setUserRole(roleData);
  };


  const getStatusList = async () => {
    const list = await StatusService.search(
      props.objectName,
      null,
     props?. detail?.project_id ? props?.detail?.project_id : props?.project_id
    );
    let nextStatusValue = [];
    list &&
      list.forEach((value) => {
        nextStatusValue.push({
          label: value.name,
          id: value.id,
          value: value.id,
        });
      });
    setStatusList(nextStatusValue);
  };


  const dueDateOption = [
    {
      label: "Today",
      value: "Today",
    },
    {
      label: "Tomorrow",
      value: "Tomorrow",
    }
  ]










  return (
    <div className='row'>
      <div className="col">
        <div>
          <Text
            name="status"
            label="Status Name"
            placeholder="Enter Status Name "
          />
        </div>
        <ColorSelect
          name="colorcode"
          label="Color Code"
          defaultValue={props?.detail?.colorCode}
          setColor={props?.setColor}
        />

        <div>
          <MultiSelect
            label="Allowed Users"
            name="allowedUser"
            options={userRole ? userRole : []}
          />
        </div>
        <div>
          <MultiSelect
            label="Next Status"
            name="nextStatus"
            options={statusList}
          />
        </div>
        <UserSelect
          name="default_owner"
          label="Default Owner"
          selectedUserId={props?.defaultOwner ? props?.defaultOwner : null}
          showAssignToMeOption
          labelName ="Logged In User"
        />
        <Select name="default_due_date" label="Default Due Date" options={dueDateOption} />
        <UserSelect
          name="default_reviewer"
          label="Default Reviewer"
          selectedUserId={props?.defaultReviewer ? props?.defaultReviewer : null}
          userList={props?.userList} 
          showAssignToMeOption
          labelName ="Logged In User"
        />
        <Select
          label="Group"
          name="group"
          options={groupOption}
        // handleChange={(e) => handleChange(e)}
        />
        <div className="form-wrapper mb-3">
          {/* Enable accounts */}
          <div className="field-wrapper">
            <SingleCheckbox
              name={"update_quantity"}
              label="Update Quantity"
              className="accepted-terms mb-0 pb-0 mr-3"
            // handleFeatureChange={submit}
            />
          </div>
          <div className="form-wrapper mb-3">
            <div className="field-wrapper">
              <SingleCheckbox
                name={"allow_edit"}
                label="Allow Edit"
                className="accepted-terms mb-0 pb-0 mr-3"
              //  handleFeatureChange={submit}
              />
            </div>
          </div>
          <div className="form-wrapper mb-3">
            <div className="field-wrapper">
              <SingleCheckbox
                name={"send_notification_to_owner"}
                label="Send Notification to Owner"
                className="accepted-terms mb-0 pb-0 mr-3"
              //  handleFeatureChange={submit}
              />
            </div>
          </div>
          {props.objectName == ObjectName.STOCK_ENTRY_PRODUCT && (
            <div className="form-wrapper mb-3">
              <SingleCheckbox
                name={"update_location_product_last_stock_entry_date"}
                label="Update Location Product Last Stock Entry Date"
              />
            </div>
          )}

          {props.objectName == ObjectName.PRODUCT_PRICE && (
            <div className="form-wrapper mb-3">
              <SingleCheckbox
                name={"is_active_price"}
                label="Is Active Price"
              />
            </div>
          )}

          {props.objectName == ObjectName.SALE_SETTLEMENT && (
            <div className="form-wrapper mb-3">
              <SingleCheckbox
                name="validate_amount"
                label="Validate Amount"
              />
            </div>
          )}
          {(props.objectName == ObjectName.PURCHASE_PRODUCT || props.objectName == ObjectName.PURCHASE) && (

            <div className="form-wrapper mb-3">
              <div className="field-wrapper">
                <SingleCheckbox
                  name={"update_product_price"}
                  label="Update Product Price"
                  className="accepted-terms mb-0 pb-0 mr-3"
                />
              </div>
            </div>
          )}

          {(props.objectName == ObjectName.ORDER_PRODUCT || props.objectName == ObjectName.ORDER) && (

            <div className="form-wrapper mb-3">
              <div className="field-wrapper">
                <SingleCheckbox
                  name={"allow_cancel"}
                  label="Allow Cancel"
                  className="accepted-terms mb-0 pb-0 mr-3"
                />
              </div>
            </div>
          )}

          {props.objectName == ObjectName.TRANSFER && (
            <div className="form-wrapper mb-3">
              <div className="field-wrapper">
                <SingleCheckbox
                  name={"update_distribution_quantity"}
                  label="Update Distribution Quantity"
                  className="accepted-terms mb-0 pb-0 mr-3"
                />
              </div>
            </div>
          )}

          {props.objectName == ObjectName.TRANSFER && (
            <div className="form-wrapper mb-3">
              <div className="field-wrapper">
                <SingleCheckbox
                  name={"allow_replenishment"}
                  label="Allow Replenishment"
                  className="accepted-terms mb-0 pb-0 mr-3"
                />
              </div>
            </div>
          )}

          {props.objectName == ObjectName.FINE &&
            <div className="form-wrapper mb-3">
              <div className="field-wrapper">
                <SingleCheckbox
                  name={"allow_to_view"}
                  label="Allow To View"
                  className="accepted-terms mb-0 pb-0 mr-3"
                />
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
};


export default StatusForm;