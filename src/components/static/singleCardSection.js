import React from "react";
const SingleCardSection = (props) => {
  const { arrayList } = props;
  return (
    <div>
      <div className="container">
        <div className="row  py-5">
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <div className={data.col}>
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

export default SingleCardSection;
