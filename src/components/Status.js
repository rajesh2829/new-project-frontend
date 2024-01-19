import React, { useEffect, useState } from "react";
import StatusService from "../services/StatusService";
import SelectDropdown from "./SelectDropdown";
import ArrayList from "../lib/ArrayList";

const Status = (props) => {
  const { handleChange, objectName, buttonLabel, currentStatusId, projectId, color, disabled, allowed_statuses } = props;
  const [list, setList] = useState([]);
  const [handleStatus, setHandleStatus] = useState();
  const [colorCode, setColorCode] = useState(null);

  useEffect(() => {
    getStatusDetail();
  }, [currentStatusId])

  useEffect(() => {
    getStatusList();
  }, [handleChange])

  const getStatusList = async () => {
    if (currentStatusId || handleStatus) {
      const data = await StatusService.nextStatusSearch(
        objectName,
        handleStatus ? handleStatus : currentStatusId,
        null,
        projectId,
        allowed_statuses
      );
      if (data && data.length > 0) {
        const statusList = [];
        data
          .sort((a, b) => parseFloat(a.sort_order) - parseFloat(b.sort_order))
          .forEach((list) => {
            statusList.push({
              value: list.id,
              label: list.name,
            });
          });
        setList(data);
      }
    }
  };

  const getStatusDetail = async () => {
    if (currentStatusId) {
      const response = await StatusService.get(currentStatusId);
      let data = response?.data;
      setColorCode(data?.colorCode)
    }
  }

  const onFocus = () => {
    if (list && list.length == 0) {
      getStatusList();
    }
  }

  return (
    <>
      <SelectDropdown
        buttonLabel={buttonLabel ? buttonLabel : "Status"}
        hideCaret={true}
        dropdownLinks={list}
        handleChange={(e) => {
          setHandleStatus(e)
          handleChange(e)
        }}
        disabled={disabled ? disabled : list ? false : true}
        onFocus={onFocus}
        colorCode={colorCode}
      />
    </>
  );
};

export default Status;
