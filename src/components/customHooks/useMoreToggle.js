import { useState } from "react";

function useToggleMore(toggled = false) {
  const [toggle, setToggle] = useState(toggled);

  const clickHandler = () => setToggle((prevState) => !prevState);

  return [toggle, clickHandler];
}

export default useToggleMore;
