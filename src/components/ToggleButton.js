import React from 'react';
import { Button } from 'reactstrap';

const ToggleButton = ({ buttonOnLabel,  buttonOffLabel, handleToggle , toggled }) => {

  return (
    <Button color={toggled ? 'success' : 'danger'} onClick={handleToggle}>
      {toggled ? buttonOnLabel : buttonOffLabel }
    </Button>
  );
};

export default ToggleButton;