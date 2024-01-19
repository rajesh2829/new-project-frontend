import React from "react";
import CountSection from "../../components/static/countSection";
import plus from "../assets/icons/plus.svg";
import active from "../assets/img/blug.png";
import location from "../assets/img/location.png";
import user from "../assets/img/user.png";
const Count = () => {
  const countlist = [
    {
      img: user,
      count: "450",
      name: "Active User",
      plus: plus,
    },
    {
      img: location,
      count: "270",
      name: "Partner Collaboarations",
      plus: plus,
    },
    {
      img: active,
      count: "75",
      name: "Variety of Chargers",
      plus: plus,
    },
  ];
  return (
    <div>
      <CountSection countlist={countlist} />
    </div>
  );
};
export default Count;
