import React from "react";

const ToolsTechnologiesList = (props) => {
  const { arrayList } = props;

  return (
    <div>
      <div className="container">
        <div className="row py-5">
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <div
                className="card col-md-3 mx-auto"
                style={{ height: "200px" }}
              >
                <img
                  className="card-img-top mx-auto my-5"
                  src={data.img}
                  style={{ width: "33%" }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsTechnologiesList;
