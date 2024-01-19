import React from "react";
import { getList } from "./howitworksList";
const HowitWorkList = (props) => {
  const {} = props;
  const arraylist = getList();
  return (
    <div>
      <div className="container">
        <div className="row py-5">
          {arraylist &&
            arraylist.length > 0 &&
            arraylist.map((data) => (
              <div className="col-md-4">
                <div className="py-4">
                  <h6 className="font-weight-bold" style={{ color: "#224a8b" }}>
                    {data.heading}
                  </h6>
                </div>
                {data &&
                  data.list &&
                  data.list.length > 0 &&
                  data.list.map((list) => (
                    <li class=" border-0 p-0 py-2">
                      <span>{list}</span>
                    </li>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HowitWorkList;
