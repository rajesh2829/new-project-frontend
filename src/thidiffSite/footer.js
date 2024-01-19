/**
 * Footer navigation list
 */
export function getFooterList() {
  let arrayList = [
    {
      heading: "About ThiDiff",
      url: "#",
      name: "name",
      list: [
        {
          name: "About",
          url: "/about-us",
        },
        {
          name: "Contact Us",
          url: "/contact",
        },
      ],
    },
    {
      heading: "Services",
      url: "#",
      name: "name",
      list: [
        {
          name: "E-commerce Services",
          url: "/ecommerce",
        },
        {
          name: "Mobility Services",
          url: "/mobility",
        },
        {
          name: "Testing Services",
          url: "/testing-services",
        },
      ],
    },
    {
      heading: "Get in Touch",
      url: "#",
      name: "name",
      list: [
        {
          name: "info@thidiff.com",
          url: "mailto: info@thidiff.com",
        },
        {
          name: "jobs@thidiff.com",
          url: "mailto: jobs@thidiff.com",
        },
      ],
    },
  ];

  return arrayList;
}
