import React from "react";
import DragAndDropTable from "../../../components/StatusTable/StatusDragAndDropTable";
import ObjectName from "../../../helpers/ObjectName";

const StatusTab = (props) => {

    let { history, _toggle, isOpen, project_id, row, setRow } = props;
    return (
        <>
            <DragAndDropTable
                history={history}
                objectName={ObjectName.TICKET}
                showUrl
                _toggle={_toggle}
                isOpen={isOpen}
                project_id={project_id}
                row={row}
                setRow={setRow}
            />
        </>
    )
}

export default StatusTab;