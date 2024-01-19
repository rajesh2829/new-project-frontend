import React from "react";
import Currency, { Percentage } from "../../lib/Currency";

function ReportTable(props) {
  const { detail, detailValue, page } = props;
  const currentPage = page;
  const totalCounts = detailValue?.totalCount;
  const startPage = (currentPage - 1) * detailValue?.pageSize + 1;
  const firstPage =
    startPage > detailValue?.totalCount ? detailValue?.totalCount : startPage;
  const endPage = currentPage * detailValue?.pageSize;
  const lastPage =
    endPage > detailValue?.totalCount ? detailValue?.totalCount : endPage;

  return (
    <div>
      <table className="table bg-gray table-bordered">
        <thead className="bg-dark text-white">
          <tr className="text-center">
            <th className="align-middle w-25">GST</th>
            <th className="align-middle w-25">Total SGST Amount</th>
            <th className="align-middle w-25">Total CGST Amount</th>
            <th className="align-middle w-25">Total GST Amount</th>
          </tr>
        </thead>
        <tbody>
          {detail.map((item, index) => (
            <tr className="border-bottom" key={index}>
              <td className="align-middle text-center w-25">
                <div>{item && Percentage(item.gstPercentage)}</div>
              </td>
              <td className="align-middle text-center w-25">
                <div>{item && Currency.Format(item.sgstAmount)}</div>
              </td>
              <td className="align-middle text-center w-25">
                <div>{item && Currency.Format(item.cgstAmount)}</div>
              </td>
              <td className="align-middle text-center w-25">
                <div>{item && Currency.Format(item.totalAmount)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table ">
        <tbody>
          {totalCounts > 0 && (
            <tr className="">
              <td className="align-middle  text-start  w-25">
                <div>
                  Showing {firstPage} to {lastPage} of {totalCounts} entries
                </div>
              </td>
              <td className="align-middle  text-center w-25">
                <div>
                  <strong>
                    {" "}
                    Total Sgst : {Currency.Format(detailValue?.totalSgstAmount)}
                  </strong>
                </div>
              </td>
              <td className="align-middle  text-center w-25">
                <div>
                  {" "}
                  <strong>
                    Total Cgst : {Currency.Format(detailValue?.totalCgstAmount)}
                  </strong>{" "}
                </div>
              </td>
              <td className="align-middle text-center w-25">
                <div>
                  <strong>
                    Total Gst : {Currency.Format(detailValue?.totalAmount)}
                  </strong>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
