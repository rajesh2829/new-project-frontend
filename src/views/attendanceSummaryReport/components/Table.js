import React from "react";
import { useTable } from "react-table";
import { Table } from "reactstrap";
import Pagination from '../../../components/Pagination'

export function Tables(props) {

    const { columns, Values, setPage, page, params, getDetails, pageSize, totalCount } = props;
    const data = Values ? Values : "";

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });
    const currentPage = page;
    const totalCounts = totalCount;
    const pageSizes = pageSize;
    const startPage = (currentPage - 1) * pageSize + 1;
    const firstPage = startPage > totalCount ? totalCount : startPage;
    const endPage = currentPage * pageSize;
    const lastPage = endPage > totalCount ? totalCount : endPage;

    return (
        <div className="redux-table">
            <Table
                hover
                responsive
                className="table-outline" {...getTableProps()}
            >
                <thead className="thead-light text-center">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th  {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td className="text-center" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
            <div className="d-flex justify-content-between">
                <div>
                    Showing {firstPage} to {lastPage} of {totalCounts} entries
                </div>

                <Pagination
                    currentPage={page}
                    totalCount={totalCounts}
                    pageSize={pageSizes}
                    onPageChange={(page) => {
                        setPage(page)

                    }}
                />
            </div>

        </div>
    );
}