import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const SampleTooltip = (props) => {
  const { children, tooltipId = "sample", placement = "right" } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Tooltip
      className="sample-project-tooltip"
      placement={placement}
      isOpen={tooltipOpen}
      target={tooltipId}
      toggle={toggle}
      delay={{ show: 0, hide: 0 }}
    >
      {children}
    </Tooltip>
  );
};

export default SampleTooltip;
