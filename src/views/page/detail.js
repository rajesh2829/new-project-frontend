import React, { useEffect, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
// Components
import BreadCrumb from '../../components/Breadcrumb';
import Form from "../../components/Form";
import DraftEditor from "../../components/Draft";
import SaveButton from '../../components/SaveButton';
import CancelButton from '../../components/CancelButton';
import Toast from '../../components/Toast';
// API 
import { apiClient } from '../../apiClient';
import { endpoints } from '../../api/endPoints';
// Lib
import { isBadRequest } from '../../lib/Http';
import PageTitle from '../../components/PageTitle';

const PageDetail = (props) => {

    // Use States
    const [pageDetails, setPageDetails] = useState([]);
    const [editorState, setEditorState] = useState(() => { EditorState.createEmpty(); });

    // Use Effect
    useEffect(() => {
        getPageDetails();
    }, []);

    // Bread Crumb list
    const breadcrumbList = [
        { label: "Page", link: "/pages/pagelist" },
        { label: pageDetails.name, link: "" },
    ];

    // Getting the page id
    const id = window.location.pathname.split("/")[4];

    // Getting the Page Details
    const getPageDetails = async () => {
        try {
            const response = await apiClient.get(`${endpoints().pageAPI}/${id}`);
            let data = response.data.data;
            setPageDetails(data);
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))));
        } catch (error) {
            if (isBadRequest(error)) {
                let errorMessage;
                const errorRequest = error.response.request;
                if (errorRequest && errorRequest.response) {
                    errorMessage = JSON.parse(errorRequest.response).message;
                };
                console.error(errorMessage);
            };
        };
    };

    // Handle change Editor state
    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
    };

    // Updating the Page Details
    const updatePageDetails = async (values) => {
        let rawComment;
        if (editorState) { rawComment = convertToRaw(editorState.getCurrentContent()) };
        values.content = JSON.stringify(rawComment);

        try {
            const response = await apiClient.put(`${endpoints().pageAPI}/${id}`, values);
            let successMessage;
            if (response && response.data) {
                successMessage = response.data.message;
                Toast.success(successMessage);
            };
        } catch (error) {
            if (isBadRequest(error)) {
                let errorMessage;
                const errorRequest = error.response.request;
                if (errorRequest && errorRequest.response) {
                    errorMessage = JSON.parse(errorRequest.response).message;
                };
                Toast.error(errorMessage);
                console.error(errorMessage);
            };
        };
    };

    return (
        <>
            {/* Breadcrumb section */}
            <div className='row'><BreadCrumb list={breadcrumbList} /></div>

            {/* PageTitle Section */}
            <PageTitle label={pageDetails.name} className="mb-1 mt-n3" />

            {/* Form section */}
            <Form
                enableReinitialize={true}
                initialValues={{ content: "" }}
                onSubmit={(values) => {
                    updatePageDetails(values);
                }}
            >
                {/* Draft JS - Rich Text Editor */}
                <DraftEditor name="content" editorState={editorState} onChange={handleEditorChange} />
                {/* Save Button */}
                <SaveButton />
                {/* Cancel Button */}
                <CancelButton onClick={() => { props.history.push("/pages/pagelist") }} />
            </Form>
        </>
    )
}

export default PageDetail;