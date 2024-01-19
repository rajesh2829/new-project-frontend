import { endpoints } from "../api/endPoints";
import Url from "../lib/Url";
import { fetchList } from "./table";

export function searchSystemLogData(pageSize, params) {
    return (dispatch) => {
        dispatch(
            fetchList(
                "systemLog",
                `${endpoints().systemLogAPI}`,
                1,
                pageSize,
                params,
                {
                    search: Url.GetParam("search") || "",
                    user: Url.GetParam("user") || "",
                    startDate: Url.GetParam("startDate") || "",
                    endDate: Url.GetParam("endDate") || "",
                }
            )
        );
    };
}