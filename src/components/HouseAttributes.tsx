"use client";

import {
  LuFlower2,
  LuMoveDiagonal,
  LuBath,
  LuShowerHead,
  LuUsers,
  LuSun,
  LuWifi,
} from "react-icons/lu";
import {
  TbWashTumbleDry,
  TbWashMachine,
  TbToiletPaper,
  TbBoxSeam,
  TbFridge,
  TbArmchair,
  TbLamp2,
  TbBrandNetflix,
  TbBike,
  TbCar,
  TbWashDry,
  TbDog,
  TbCat,
} from "react-icons/tb";
import { GiBarbecue } from "react-icons/gi";
import { FaSink } from "react-icons/fa";
import {
  MdOutlineGarage,
  MdOutlineCleaningServices,
  MdOutlineHeatPump,
} from "react-icons/md";
import AttributeBadge, { AttributeBadgeProps } from "./AttributeBadge";
import { useState } from "react";

export type HouseAttributesProps = {
  petsAllowed: boolean;
  petsPresent: boolean;
  roomSize: number;
  personalShower: boolean;
  roomSink: boolean;
  roomFurnished: boolean;
  garden: boolean;
  terrace: boolean;
  bathrooms: number;
  toilets: number;
  basementStorage: boolean;
  kitchens: number;
  workingSpace: boolean;
  washingMachine: boolean;
  dryingMachine: boolean;
  dishWasher: boolean;
  forCouples: boolean;
  wifi: boolean;
  netflix: boolean;
  bbq: boolean;
  cleaningHelp: boolean;
  bikeStorage: boolean;
  carParking: boolean;
  garage: boolean;
  epcRating: "A" | "B" | "C" | "D" | "E" | "F";
};

type HouseAttributeCategory = "ROOM" | "COMMON_SPACE" | "AMENITIES";

type HouseAttribute = {
  [K in keyof HouseAttributesProps]: [K, HouseAttributesProps[K]];
}[keyof HouseAttributesProps];

function getHouseAttributeCategory(
  houseAttribute: HouseAttribute
): HouseAttributeCategory {
  switch (houseAttribute[0]) {
    case "roomSize":
      return "ROOM";
    case "personalShower":
      return "ROOM";
    case "roomSink":
      return "ROOM";
    case "roomFurnished":
      return "ROOM";
    case "forCouples":
      return "ROOM";
    case "garden":
      return "COMMON_SPACE";
    case "terrace":
      return "COMMON_SPACE";
    case "bathrooms":
      return "COMMON_SPACE";
    case "toilets":
      return "COMMON_SPACE";
    case "basementStorage":
      return "COMMON_SPACE";
    case "kitchens":
      return "COMMON_SPACE";
    case "workingSpace":
      return "COMMON_SPACE";
    case "washingMachine":
      return "AMENITIES";
    case "dishWasher":
      return "AMENITIES";
    case "wifi":
      return "AMENITIES";
    case "netflix":
      return "AMENITIES";
    case "bbq":
      return "AMENITIES";
    case "cleaningHelp":
      return "COMMON_SPACE";
    case "bikeStorage":
      return "COMMON_SPACE";
    case "carParking":
      return "COMMON_SPACE";
    case "garage":
      return "COMMON_SPACE";
    case "dryingMachine":
      return "AMENITIES";
    case "epcRating":
      return "COMMON_SPACE";
    case "petsAllowed":
      return "COMMON_SPACE";
    case "petsPresent":
      return "COMMON_SPACE";
  }
}

function getHouseAttributePriority(houseAttribute: HouseAttribute): number {
  switch (houseAttribute[0]) {
    case "roomSize":
      return 2;
    case "epcRating":
      return 3;
    case "forCouples":
      return 4;
    case "garden":
      return 5;
    case "terrace":
      return 6;
    case "petsAllowed":
      return 7;
    case "petsPresent":
      return 8;
    case "washingMachine":
      return 9;
    case "dishWasher":
      return 10;
    case "bathrooms":
      return 11;
    case "toilets":
      return 12;
    case "roomFurnished":
      return 13;
    case "netflix":
      return 14;
    case "wifi":
      return 15;
    case "personalShower":
      return 16;
    case "roomSink":
      return 17;
    case "dryingMachine":
      return 18;
    case "cleaningHelp":
      return 19;
    case "bikeStorage":
      return 20;
    case "carParking":
      return 21;
    case "garage":
      return 22;
    case "workingSpace":
      return 23;
    case "bbq":
      return 24;
    case "basementStorage":
      return 25;
    case "kitchens":
      return 26;
  }
}

function getApplicableHouseAttributes(
  houseAttributeProps: HouseAttributesProps
): HouseAttribute[] {
  const attributes = Object.entries(houseAttributeProps) as HouseAttribute[];
  return attributes.filter((attribute) => attribute[1] !== false);
}

function houseAttributeToBadgeProps(
  houseAttribute: HouseAttribute
): AttributeBadgeProps {
  switch (houseAttribute[0]) {
    case "petsAllowed":
      return { label: "Pets allowed", icon: TbDog };
    case "petsPresent":
      return { label: "Pet(s) present", icon: TbCat };
    case "roomSize":
      return {
        label: `Room size: ${houseAttribute[1]}m\u00b2`,
        icon: LuMoveDiagonal,
      };
    case "personalShower":
      return { label: "Personal shower", icon: LuShowerHead };
    case "roomSink":
      return { label: "Sink in room", icon: FaSink };
    case "roomFurnished":
      return { label: "Furnished", icon: TbArmchair };
    case "forCouples":
      return { label: "Couples allowed", icon: LuUsers };
    case "garden":
      return { label: "Garden", icon: LuFlower2 };
    case "terrace":
      return { label: "Terrace", icon: LuSun };
    case "bathrooms":
      return { label: `Bathrooms: ${houseAttribute[1]}`, icon: LuBath };
    case "toilets":
      return { label: `Toilets: ${houseAttribute[1]}`, icon: TbToiletPaper };
    case "basementStorage":
      return { label: "Basement storage", icon: TbBoxSeam };
    case "kitchens":
      return { label: `Kitchens: ${houseAttribute[1]}`, icon: TbFridge };
    case "workingSpace":
      return { label: "Shared work space", icon: TbLamp2 };
    case "washingMachine":
      return { label: "Washing machine", icon: TbWashMachine };
    case "dishWasher":
      return { label: "Dishwasher", icon: TbWashDry };
    case "wifi":
      return { label: "WiFi", icon: LuWifi };
    case "netflix":
      return { label: "Netflix (or other)", icon: TbBrandNetflix };
    case "bbq":
      return { label: "BBQ", icon: GiBarbecue };
    case "cleaningHelp":
      return { label: "Cleaning help", icon: MdOutlineCleaningServices };
    case "bikeStorage":
      return { label: "Bike storage", icon: TbBike };
    case "carParking":
      return { label: "Free parking", icon: TbCar };
    case "garage":
      return { label: "Garage", icon: MdOutlineGarage };
    case "dryingMachine":
      return { label: "Drying machine", icon: TbWashTumbleDry };
    case "epcRating":
      return {
        label: `EPC rating: ${houseAttribute[1]}`,
        icon: MdOutlineHeatPump,
      };
  }
}

function houseAttributeToBadge(houseAttribute: HouseAttribute): JSX.Element {
  const badgeProps = houseAttributeToBadgeProps(houseAttribute);
  return <AttributeBadge key={badgeProps.label} {...badgeProps} />;
}

function sortHouseAttributes(
  houseAttributes: HouseAttribute[]
): HouseAttribute[] {
  return houseAttributes.sort(
    (a, b) => getHouseAttributePriority(a) - getHouseAttributePriority(b)
  );
}

function getFirstBadges(houseAttributes: HouseAttributesProps): JSX.Element[] {
  return sortHouseAttributes(getApplicableHouseAttributes(houseAttributes))
    .slice(0, 6)
    .map(houseAttributeToBadge);
}

function getBadgesInCategory(
  houseAttributeCategory: HouseAttributeCategory,
  houseAttributes: HouseAttributesProps
): JSX.Element[] {
  return sortHouseAttributes(getApplicableHouseAttributes(houseAttributes))
    .filter(
      (houseAttribute) =>
        getHouseAttributeCategory(houseAttribute) == houseAttributeCategory
    )
    .map(houseAttributeToBadge);
}

export default function HouseAttributes(props: HouseAttributesProps) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      {showDetails ? (
        <div>
          <h3 className="font-bold mb-2">Your room</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {getBadgesInCategory("ROOM", props)}
          </div>
          <h3 className="font-bold mb-2">Common space</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {getBadgesInCategory("COMMON_SPACE", props)}
          </div>
          <h3 className="font-bold mb-2">Amenities</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {getBadgesInCategory("AMENITIES", props)}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {getFirstBadges(props)}
        </div>
      )}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex justify-center bg-light-purple py-2 border-2 rounded-lg hover:bg-black hover:text-white"
      >
        {showDetails ? "Hide details" : "Show all details"}
      </button>
    </div>
  );
}
