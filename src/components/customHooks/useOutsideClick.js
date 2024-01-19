import { useRef, useEffect, useState } from "react";

export const useOutsideClick = (props) => {
  const [outsideClick, setOutsideClick] = useState(props);

  const handleOutsideClick = () => {
    setOutsideClick(!outsideClick);
  };

  const elmRef = useRef();

  const handleClickOutside = (event) => {
    if (elmRef.current && !elmRef.current.contains(event.target)) {
      setOutsideClick(!outsideClick);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outsideClick]);

  return [outsideClick, elmRef, handleOutsideClick];
};
