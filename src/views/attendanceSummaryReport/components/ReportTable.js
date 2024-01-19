import React from "react";
import { toHoursAndMinutes } from "../../../lib/HoursAndMinutes";
import { Tables } from "./Table";
import Link from "../../../components/Link";
import UserCard from "../../../components/UserCard";

function ReportTable(props) {
    const { detail, setPage, page, params, getDetails, pageSize,
        totalCount } = props


    // Table Columns
    const columns = React.useMemo(
        () => [
            {
                Header: " ",
                columns: [
                    {
                        Header: "Name",
                        accessor: "userName",
                        Cell: row =>
                            <div className="text-left"><UserCard firstName={row.value.props.firstName} lastName={row.value.props.lastName} url={row.value.props.media_url} /></div>
                    }
                ]
            },
            {
                Header: "Attendance ( In days )",
                columns: [
                    {
                        Header: "Total", // Table Name
                        accessor: "total" // Value Name
                    },
                    {
                        Header: "Worked",
                        accessor: "worked",
                        Cell: row => (
                            <div>
                                <Link text={row.value} url={`/attendance?&startDate=${row?.row?.original?.startDate}&endDate=${row?.row?.original?.endDate}&user=${row?.row?.original?.id}&type=Working Day`} />
                            </div>
                        )

                    },
                    {
                        Header: "Additional",
                        accessor: "additional",
                        Cell: row => (
                            <div>
                                <Link text={row.value} url={`/attendance?&startDate=${row?.row?.original?.startDate}&endDate=${row?.row?.original?.endDate}&user=${row?.row?.original?.id}&type=Additional Day`} />
                            </div>
                        )
                    },
                    {
                        Header: "Leaves",
                        accessor: "leave",
                        Cell: row => (
                            <div>
                                <Link text={row.value} url={`/attendance?&startDate=${row?.row?.original?.startDate}&endDate=${row?.row?.original?.endDate}user=${row?.row?.original?.id}&type=Leave`} />
                            </div>
                        )
                    },
                    {
                        Header: "Absents",
                        accessor: "absent",
                        Cell: row => (
                            <div>
                                <Link text={row.value} url={`/attendance?&startDate=${row?.row?.original?.startDate}&endDate=${row?.row?.original?.endDate}&user=${row?.row?.original?.id}&type=Absent`} />
                            </div>
                        )
                    },
                    {
                        Header: "Late Hours",
                        accessor: "late_hours",
                        Cell: row =>
                            <div>
                                {toHoursAndMinutes(row.value)}
                            </div>
                    },
                ]
            },
            {
                Header: " ",
                columns: [
                    {
                        Header: "Additional Hours",
                        accessor: "additional_hours",
                        Cell: row => <div>{toHoursAndMinutes(row.value)}</div>
                    }
                ]
            }
        ],
        []
    );

    return (
        <Tables
            columns={columns}
            Values={detail}
            setPage={setPage}
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
        />
    );
}

export default ReportTable;
