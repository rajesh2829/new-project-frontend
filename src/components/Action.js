import React from 'react';
import SelectDropdown from './SelectDropdown';

const Action = (props) => {
    const { buttonLabel, dropdownLinks, handleChange } = props;

    return (
        <>
            <SelectDropdown
                buttonLabel={buttonLabel ? buttonLabel : "Actions"}
                hideCaret={true}
                dropdownLinks={dropdownLinks}
                handleChange={(e) => handleChange(e)}
            />
        </>
    );
};

export default Action;