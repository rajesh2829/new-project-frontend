import React from "react";
const ContentSection3 = (props) => {
  const { arrayList, className, style } = props;
  return (
    <div>
      <div className="container">
        <div className="row py-5">
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <div className={data.col}>
                <img className="m-auto" src={data.img} width={data.width} />
                <div style={data.style}>
                  {data.heading && (
                    <h5 className={className}>{data.heading}</h5>
                  )}
                  {data.pharagrap && (
                    <p className="text-secondary text-center m-2">
                      {data.pharagrap}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSection3;
