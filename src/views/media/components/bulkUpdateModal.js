import React from "react";
import { useDispatch } from "react-redux";
import { bulkUpdateMedia } from "../../../actions/media";
import Button from "../../../components/Button";
import CancelButton from "../../../components/CancelButton";
import AddModal from "../../../components/Modal";
import Select from "../../../components/Select";
import Media from "../../../helpers/Media";
import String from "../../../lib/String";

export default function BulkUpdateModal(props) {

    const dispatch = useDispatch();

    // Props
    const { isOpen, toggle, MediaParam } = props;

    // Media Bulk Update function
    const handleBulkUpdate = (values) => {
        const data = new FormData();
        data.append("ids", MediaParam.selectedIds ? MediaParam.selectedIds : "");
        data.append("visibility", values.visibility && String.Get(values.visibility.value));
        dispatch(bulkUpdateMedia(data, toggle));
    };

    // DropDown List
    const productStatusOptions = [
        {
            value: Media.VISIBILITY_ARCHIVE,
            label: Media.VISIBILITY_ARCHIVE_TEXT,
        },
        {
            value: Media.VISIBILITY_PUBLIC,
            label: Media.VISIBILITY_PUBLIC_TEXT,
        },
        {
            value: Media.VISIBILITY_PRIVATE,
            label: Media.VISIBILITY_PRIVATE_TEXT,
        },
    ];

    // Defining the initial values
    const initialValues = {
        visibility: "",
    };

    // Bulk Update Form
    const bulkUpdateForm = (
        <Select
            name="visibility"
            label="Visibility"
            placeholder="Select Status"
            options={productStatusOptions}
        />
    );

    // Bulk Update Modal Footer
    const bulkUpdateFooter = (
        <>

            <div className="justify-content-center">
                <Button type="submit" label="Update" />
                <CancelButton
                    name="Close"
                    onClick={() => {
                        props.toggle();
                    }}
                />
            </div>
        </>
    );

    return (
        <div>
            <AddModal
                isOpen={isOpen}
                toggle={toggle}
                toggleModalClose={toggle}
                modalTitle="Bulk Update"
                modalBody={bulkUpdateForm}
                modalFooter={bulkUpdateFooter}
                initialValues={initialValues}
                onSubmit={(values) => {
                    handleBulkUpdate(values);
                }}
                style={{ maxWidth: "800PX" }}
                hideDefaultButtons
            />
        </div>
    );


}