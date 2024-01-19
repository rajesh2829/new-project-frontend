import icon from "../assets/icons/functional.png";
import usability from "../assets/icons/usability.png";
import ui from "../assets/icons/uitesting.png";
import cross from "../assets/icons/crossplatform.png";
import configuaration from "../assets/icons/crossplatform.png";
import acceptance from "../assets/icons/acceptance.png";
import campality from "../assets/icons/campality.png";
import loadstress from "../assets/icons/loadstress.png";
import integration from "../assets/icons/integration.png";
import security from "../assets/icons/security.png";
import migration from "../assets/icons/migration.png";
import internationalization from "../assets/icons/internationalization.png";

export function getWeOfferList() {
  let arrayList = [
    {
      img: icon,
      heading: "Functional Testing",
    },
    {
      img: usability,
      heading: "Usability Testing",
      headingstyle: { position: "relative", top: "18px" },
    },
    {
      img: ui,
      heading: "UI Testing",
      headingstyle: { position: "relative", top: "18px" },
    },
    {
      img: cross,
      heading: "Cross-Platform Testing",
    },
    {
      img: configuaration,
      heading: "Configuaration Testing",
    },
    {
      img: acceptance,
      heading: "Acceptance Testing",
    },
    {
      img: campality,
      heading: "Compatibility Testing",
    },
    {
      img: loadstress,
      heading: "Load and Stress Testing",
    },
    {
      img: integration,
      heading: "Integration Testing",
    },
    {
      img: security,
      heading: "Security Testing",
      headingstyle: { position: "relative", top: "18px" },
    },
    {
      img: migration,
      heading: "Data Migration Testing",
    },
    {
      img: internationalization,
      heading: "Internationalization Testing",
    },
  ];

  return arrayList;
}
