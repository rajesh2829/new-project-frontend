import { useState } from "react";

function useToggle(toggled = false) {
  const [toggle, setToggle] = useState(toggled);

  const clickHandler = (p) => setToggle((prevState) => !prevState);

  return [toggle, clickHandler];
}

export default useToggle;
