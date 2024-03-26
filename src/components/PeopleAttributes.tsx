import { PeopleAttributes } from "@/lib/schema";
import { IconType } from "react-icons";
import {
  LuUsers,
  LuDumbbell,
  LuPartyPopper,
  LuFlower2,
  LuCoffee,
} from "react-icons/lu";
import {
  TbGenderBigender,
  TbMovie,
  TbDice5,
  TbChefHat,
  TbMicrophone2,
  TbBook,
} from "react-icons/tb";
import { BiDrink } from "react-icons/bi";
import { MdNordicWalking } from "react-icons/md";

type PeopleAttribute = {
  [K in keyof PeopleAttributes]: [K, PeopleAttributes[K]];
}[keyof PeopleAttributes];

function getHouseAttributePriority(PeopleAttribute: PeopleAttribute): number {
  switch (PeopleAttribute[0]) {
    case "amountOfCohousers":
      return 1;
    case "genderAmounts":
      return 2;
    case "workingOut":
      return 3;
    case "goingForDrinks":
      return 4;
    case "movieNights":
      return 5;
    case "boardGames":
      return 6;
    case "partying":
      return 7;
    case "hikes":
      return 8;
    case "cooking":
      return 9;
    case "karaoke":
      return 10;
    case "reading":
      return 11;
    case "gardening":
      return 12;
    case "coffee":
      return 13;
  }
}

function getGenderString(
  genderAmounts: PeopleAttributes["genderAmounts"]
): string {
  const genderStrings = [];
  if (genderAmounts.male > 0) genderStrings.push(`${genderAmounts.male} male`);
  if (genderAmounts.female > 0)
    genderStrings.push(`${genderAmounts.female} female`);
  if (genderAmounts.other > 0)
    genderStrings.push(`${genderAmounts.other} other`);
  return genderStrings.reduce((a, b) => a + " | " + b);
}

function getApplicablePeopleAttributes(
  peopleAttributes: PeopleAttributes
): PeopleAttribute[] {
  const attributes = Object.entries(peopleAttributes) as PeopleAttribute[];
  return attributes.filter((attribute) => attribute[1] !== false);
}

function peopleAttributeToIconAndLabel(peopleAttribute: PeopleAttribute): {
  label: string;
  icon: IconType;
} {
  switch (peopleAttribute[0]) {
    case "amountOfCohousers":
      return {
        label: `Other cohousers: ${peopleAttribute[1]}`,
        icon: LuUsers,
      };
    case "genderAmounts":
      return {
        label: getGenderString(peopleAttribute[1]),
        icon: TbGenderBigender,
      };
    case "workingOut":
      return {
        label: "Work out together",
        icon: LuDumbbell,
      };
    case "goingForDrinks":
      return {
        label: "Grab some drinks",
        icon: BiDrink,
      };
    case "movieNights":
      return {
        label: "Movie nights",
        icon: TbMovie,
      };
    case "boardGames":
      return {
        label: "Board games",
        icon: TbDice5,
      };
    case "partying":
      return {
        label: "Party animals",
        icon: LuPartyPopper,
      };
    case "hikes":
      return {
        label: "Hiking",
        icon: MdNordicWalking,
      };
    case "cooking":
      return {
        label: "Cooking",
        icon: TbChefHat,
      };
    case "karaoke":
      return {
        label: "Karaoke",
        icon: TbMicrophone2,
      };
    case "reading":
      return {
        label: "Reading",
        icon: TbBook,
      };
    case "gardening":
      return {
        label: "Gardening",
        icon: LuFlower2,
      };
    case "coffee":
      return {
        label: "Drinking coffee",
        icon: LuCoffee,
      };
  }
}

function getHouseAttributeEntries(
  peopleAttributes: PeopleAttributes
): JSX.Element[] {
  const applicableAttributes = getApplicablePeopleAttributes(peopleAttributes);
  return applicableAttributes
    .sort((a, b) => getHouseAttributePriority(a) - getHouseAttributePriority(b))
    .map(peopleAttributeToIconAndLabel)
    .map((props, index) => (
      <div
        key={props.label}
        className={
          "flex items-center space-x-2 py-3" +
          (applicableAttributes.length - 1 == index
            ? ""
            : " border-b-2 border-dotted border-white")
        }
      >
        {props.icon({ size: 24, color: "white" })}
        <div className="text-white">{props.label}</div>
      </div>
    ));
}

function PeopleAttributes(props: PeopleAttributes) {
  return <div>{getHouseAttributeEntries(props)}</div>;
}

export default PeopleAttributes;
