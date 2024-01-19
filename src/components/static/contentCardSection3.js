import React from "react";

const ContentCardSection3 = (props) => {
  const {
    arrayList,
    className,
    style,
    paragraphclassName,
    classbutton,
    buttonicon,
    headingstyle,
    CardclassName,
  } = props;
  return (
    <div>
      <div className="container">
        <div className="row ">
          {arrayList &&
            arrayList.length > 0 &&
            arrayList.map((data) => (
              <div className={data.col}>
                <div
                  className={CardclassName ? CardclassName : "card shadow-lg"}
                  style={data.cardStyle}
                >
                  {data.img && (
                    <img
                      className="card-img-top"
                      src={data.img}
                      alt="Card image cap"
                    />
                  )}
                  <div className="card-body" style={style}>
                    {data.heading && (
                      <h5
                        className={
                          className
                            ? className
                            : "text-center font-weight-bold py-3"
                        }
                        style={headingstyle}
                      >
                        {data.heading}
                      </h5>
                    )}
                    {data.pharagrap && (
                      <p
                        className={
                          paragraphclassName
                            ? paragraphclassName
                            : "text-center font-weight-bold py-3"
                        }
                      >
                        {data.pharagrap}
                      </p>
                    )}
                    {data.subheading && (
                      <h6 className="font-weight-bold"> {data.subheading}</h6>
                    )}
                    {data.button && (
                      <button
                        className={
                          classbutton
                            ? classbutton
                            : "btn text-blue float-right"
                        }
                      >
                        {data.button}
                        <i
                          className={buttonicon ? "" : "fa fa-arrow-right mx-2"}
                        ></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCardSection3;
