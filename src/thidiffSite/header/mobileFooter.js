import React from "react";
import CollapseBar from "../../components/static/collapseBar";

const MobileFooter = () => {
  const countlist = [
    {
      id: 1,
      label: "About ThiDiff",
      list: [
        {
          menu: "About",
          url: "/about-us",
        },
        {
          menu: "Contact Us",
          url: "/contact",
        },
      ],
    },
    {
      id: 2,
      label: "Services",
      list: [
        {
          menu: "E-commerce Services",
          url: "/ecommerce",
        },
        {
          menu: "Mobility Services",
          url: "/mobility",
        },
        {
          menu: "Testing Services",
          url: "/testing-services",
        },
      ],
    },
    {
      id: 3,
      label: "Get in Touch",
      list: [
        {
          menu: "info@thidiff.com",
          url: "mailto: info@thidiff.com",
        },
        {
          menu: "jobs@thidiff.com",
          url: "mailto: jobs@thidiff.com",
        },
      ],
    },
  ];

  return (
    <div>
      <CollapseBar sublist={countlist} />
    </div>
  );
};

export default MobileFooter;
