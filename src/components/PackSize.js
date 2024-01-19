import React, { useState, useEffect } from "react";
import Select from "./Select";

const PackSize = () => {
  const [packList, setPackList] = useState([]);

  useEffect(() => {
    getPackListNumber();
  }, []);

  const getPackListNumber = () => {
    let packList = new Array();
    for (let i = 1; i <= 500; i++) {
      packList.push({
        label: i,
        value: i,
      });
    }
    setPackList(packList);
  };

  return (
    <>
      <Select
        fullWidth={true}
        label="Pack Size"
        name="pack_size"
        placeholder="Pack Size"
        isClearable
        options={packList}
      />
    </>
  );
};
export default PackSize;