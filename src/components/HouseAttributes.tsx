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
} from "react-icons/tb";
import { GiBarbecue } from "react-icons/gi";
import { FaSink } from "react-icons/fa";
import { MdOutlineGarage, MdOutlineCleaningServices } from "react-icons/md";
import AttributeBadge, { AttributeBadgeProps } from "./AttributeBadge";
import { useState } from "react";

export type HouseAttributesProps = {
  roomSize: number;
  personalShower: boolean;
  roomSink: boolean;
  roomFurnished: boolean;
  forCouples: boolean;
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
  wifi: boolean;
  netflix: boolean;
  bbq: boolean;
  cleaningHelp: boolean;
  bikeStorage: boolean;
  carParking: boolean;
  garage: boolean;
};

type HouseAttributeCategory = "ROOM" | "COMMON_SPACE" | "AMENITIES";

type HouseAttribute = {
  [K in keyof HouseAttributesProps]: [K, HouseAttributesProps[K]];
}[keyof HouseAttributesProps];

function getHouseAttributePriority(houseAttribute: HouseAttribute): number {
  switch (houseAttribute[0]) {
    case "roomSize":
      return 1;
    case "forCouples":
      return 2;
    case "garden":
      return 3;
    case "terrace":
      return 4;
    case "washingMachine":
      return 5;
    case "dishWasher":
      return 6;
    case "bathrooms":
      return 7;
    case "toilets":
      return 8;
    case "roomFurnished":
      return 9;
    case "netflix":
      return 10;
    case "wifi":
      return 11;
    case "personalShower":
      return 12;
    case "roomSink":
      return 13;
    case "dryingMachine":
      return 13.5;
    case "cleaningHelp":
      return 14;
    case "bikeStorage":
      return 15;
    case "carParking":
      return 16;
    case "garage":
      return 17;
    case "workingSpace":
      return 18;
    case "bbq":
      return 19;
    case "basementStorage":
      return 20;
    case "kitchens":
      return 21;
  }
}

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
  return getApplicableHouseAttributes(houseAttributes)
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
