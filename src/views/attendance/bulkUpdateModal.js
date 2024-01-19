import React from "react";
import { useDispatch } from "react-redux";

// Components
import CancelButton from "../../components/CancelButton";
import AddModal from "../../components/Modal";
import OutlineButton from "../../components/OutlineButton";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import SelectStore from "../../components/SelectStore";

// Helpers
import {
  attendanceStatusOptions,
  lateHoursStatusOptions,
  statusOptions,
  typeOptions,
} from "../../helpers/Attendance";

// Services
import AttendanceService from "../../services/AttendanceService";

const BulkUpdateModal = (props) => {
  const {
    isOpen,
    toggle,
    usersList,
    attendanceIds,
    storeList,
    shiftList,
    param,
  } = props;

  // Use Dispatch
  const dispatch = useDispatch();

  // Bulk Update modal Body
  const bulkUpdateBody = (
    <>
      <Select
        name="user"
        label="User"
        placeholder="Select User"
        options={usersList}
      />
      <Select
        name="type"
        label="Type"
        placeholder="Select Type"
        options={typeOptions}
      />
      <SelectStore name="location" label="Location" />
      <Select
        name="shift"
        label="Shift"
        placeholder="Select Shift"
        options={shiftList}
      />
      <Select
        name="late_hours_status"
        label="Late Hours Status"
        placeholder="Select Late Hours Status"
        options={lateHoursStatusOptions}
      />
      <Select
        name="attendance_status"
        label="Attendance Status"
        placeholder="Select Status"
        options={attendanceStatusOptions}
      />
      <Select
        name="activity_status"
        label="Activity Status"
        placeholder="Select Activity Status"
        options={statusOptions}
      />
      <TextArea name="notes" label="Notes" placeholder="Reason" />
    </>
  );

  // Bulk Update modal footer
  const bulkUpdateFooter = (
    <div>
      <CancelButton
        onClick={() => {
          toggle();
        }}
      />
      <SaveButton />
    </div>
  );

  // Initial Values
  const initialValues = {
    user: "",
    type: "",
    late_hours_status: "",
    attendance_status: "",
    activity_status: "",
    notes: "",
    location: "",
    shift: "",
  };

  // Handle on bulk update
  const handleBulkUpdate = (data) => {
    data.ids = attendanceIds;

    data.user = data.user && data.user.value ? data.user.id : "";

    data.type = data.type && data.type.value ? data.type.value : "";

    data.late_hours_status = data.late_hours_status.value
      ? data.late_hours_status.value
      : "";

    data.attendance_status = data.attendance_status.value
      ? data.attendance_status.value
      : "";

    data.activity_status =
      data.activity_status && data.activity_status.value
        ? data.activity_status.value
        : "";

    data.notes = data.notes ? data.notes : "";
    dispatch(AttendanceService.bulkUpdateAttendance(data, toggle));
  };

  return (
    <div>
      {/* Bulk Update Modal Button */}
      <OutlineButton
        label="Bulk Update"
        onClick={() => {
          toggle();
        }}
        backgroundColor="var(--bulkUpdate-button-bg-color)"
        borderColor="var(--bulkUpdate-button-border-color)"
        color="var(--bulkUpdate-button-text-color)"
        disabled={
          attendanceIds &&
            attendanceIds.selectedIds &&
            attendanceIds.selectedIds.length > 0
            ? false
            : true
        }
      />

      {/* Bulk Update Modal */}
      <AddModal
        modalTitle="Bulk Update"
        modalBody={bulkUpdateBody}
        modalFooter={bulkUpdateFooter}
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        initialValues={initialValues}
        hideDefaultButtons
        onSubmit={(values) => {
          handleBulkUpdate(values);
        }}
      />
    </div>
  );
};
export default BulkUpdateModal;
