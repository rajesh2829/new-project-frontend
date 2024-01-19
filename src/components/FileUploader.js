import React from 'react';

const FileUploader = ({ handleChange, hiddenFileInput }) => {

    return (
        <>
            <input type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    );
};
export default FileUploader;