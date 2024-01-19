import React from "react";
const ContentSectionTwo = (props) => {
  const { arrayList } = props;
  const column = 12 / arrayList.length;
  return (
    <div>
      <div className="container">
        <div className="row py-5">
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <div className={`col-${column}`}>
                <div className="row">
                  <div className="col3">
                    <img src={data.img} width="50px" />
                  </div>
                  <div className="col-10">
                    <h5>{data.heading}</h5>
                    <p className="text-secondary">{data.pharagrap}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSectionTwo;
