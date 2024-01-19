import React from "react";
import "../../shareMyCharger/scss/_custom.scss";
import Pagination from "../Pagination";

const GirdCard = (props) => {
  const { arrayList, placeholder } = props;
  return (
    <div>
      <div className="container py-5">
        <div className="card shadow p-3 mb-5 bg-white rounded ">
          <div className="mx-5 py-4">
            <div class="py-2">
              <input
                type="text"
                class="form-control form-control-lg border-dark w-50 border-1"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                placeholder={placeholder}
                style={{ backgroundColor: "#f6f6f6" }}
              />
            </div>
            <div className="row">
              {arrayList &&
                arrayList.length > 0 &&
                arrayList.map((data) => (
                  <div className="col-md-4 py-2">
                    <div className="card" style={{ width: "18rem;" }}>
                      <div className="card-box">
                        <div className="card-thumbnail">
                          <img src={data.img} className="img-fluid" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="price row py-2">
                      <div className="col-md-7">
                        <h6 className="font-weight-bold">{data.heading}</h6>
                        <h6 className="font-weight-bold">{data.subheading}</h6>
                      </div>
                      <div className="col-md-5 py-2">
                        <img src={data.logo} className="float-end" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Pagination
              currentPage="1"
              totalCount="10"
              pageSize="5"
              onPageChange="5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GirdCard;
