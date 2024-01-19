import React from "react";
import Navigation from "../../components/static/navigation/navigation";
import logo from "../assets/img/logo.png";

const NavigationMenu = () => {
  const arrayList = [
    {
      label: "Extended Team",
      url: "/extended-team",
    },
    {
      label: "E-Commerce",
      url: "/ecommerce",
    },
    {
      label: "Mobility",
      url: "/mobility",
    },
    {
      label: "Testing",
      url: "/testing-services",
    },
    {
      label: "Careers ",
      url: "/career",
    },
  ];

  return (
    <div>
      <Navigation arrayList={arrayList} url="home" logo={logo} />
    </div>
  );
};

export default NavigationMenu;
