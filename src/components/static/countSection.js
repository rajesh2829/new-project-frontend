import React from "react";
import CountUp from "react-countup";

const CountSection = (props) => {
  const { countlist, id, countColor } = props;
  return (
    <div className="bg-white py-5">
      <div class="container">
        <div className="row">
          {countlist &&
            countlist.length > 0 &&
            countlist.map((data) => (
              <div className="countItem col-md-4 col-lg-4">
                <div className="col-4">
                  <img src={data.img} width="67px" className="mx-3" />
                </div>
                <div className="col-8">
                  <span className=" font-weight-bold d-flex h2">
                    {" "}
                    <CountUp
                      id={id}
                      style={{ color: `${countColor}` }}
                      separator=""
                      start={0}
                      end={data.count || 0}
                      duration={3}
                    />
                    <img src={data.plus} width="30px" alt="pluse" />
                  </span>
                  <p className="">{data.name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <h3 className="mb-0 font-weight-bold text-primary"></h3>
    </div>
  );
};
export default CountSection;
