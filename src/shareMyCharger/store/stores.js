import React from "react";
import GirdCard from "../../components/static/girdCard";
import logo from "../assets/img/amazon.png";
//config
import * as ShareMyCharegerMedia from "../../helpers/ShareMyChargerMedia";

const Stores = () => {
  const arrayList = [
    {
      img: ShareMyCharegerMedia.Electrotech,
      heading: "Black Electrotech",
      subheading: "₹1,680.00",
      logo: logo,
    },
    {
      img: ShareMyCharegerMedia.MecoEnergy,
      heading: "Meco MecoEnergy Meter",
      subheading: "₹1,899.00",
      logo: logo,
    },
    {
      img: ShareMyCharegerMedia.HTC,
      heading: "HTC PM-01",
      subheading: "₹1,569.00",
      logo: logo,
    },
    {
      img: ShareMyCharegerMedia.Electrobot,
      heading: "Electrobot Plasitic 24x7",
      subheading: "₹699.00",
      logo: logo,
    },
    {
      img: ShareMyCharegerMedia.EVT2G3C,
      heading: "EV-T2G3C",
      subheading: "₹24,418.00",
      logo: logo,
    },
    {
      img: ShareMyCharegerMedia.DC,
      heading: "DC Fast EV charger",
      subheading: "₹11,729.00",
      logo: logo,
    },
  ];
  return (
    <div>
      <GirdCard arrayList={arrayList} placeholder="Search products" />
    </div>
  );
};

export default Stores;
