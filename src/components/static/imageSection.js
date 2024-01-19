import React from "react";

const ImageSection = (props) => {
  const { arrayList, button, buttonurl } = props;

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
                  style={{ width: "80%" }}
                />
              </div>
            ))}
        </div>
        <div className="text-center py-3">
          {button && (
            <a class="btn btn-primary" href={buttonurl} role="button">
              {button}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
