import HouseAttributes, {
  HouseAttributesProps,
} from "@/components/HouseAttributes";
import Image from "next/image";
import { LuUsers } from "react-icons/lu";

const myHouse: HouseAttributesProps = {
  roomSize: 25,
  personalShower: true,
  roomSink: true,
  roomFurnished: true,
  forCouples: true,
  garden: true,
  terrace: true,
  bathrooms: 2,
  toilets: 2,
  basementStorage: true,
  kitchens: 1,
  workingSpace: true,
  washingMachine: true,
  dishWasher: true,
  wifi: true,
  netflix: true,
  bbq: true,
  cleaningHelp: true,
  bikeStorage: true,
  carParking: true,
  garage: true,
  dryingMachine: true,
};

export default function Listing({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="relative h-72">
        <Image
          style={{ objectFit: "cover" }}
          src="/house.jpg"
          alt="house example"
          fill
        />
      </div>
      <div className="px-5 py-4 border-b-2 border-dotted">
        <h1 className="font-semibold text-2xl mb-2">
          Cute boi cohousing in Kessel-lo
        </h1>
        <div className="italic">Désiré Mellaertsstraat, Kessel-lo</div>
      </div>
      <div className="px-5 py-4">
        <h2 className="font-mono text-2xl mb-2">Description</h2>
        <p>
          Our cute boi cohousing is looking for a new, sociable bad boi
          housemate. We are a very spicy group of individuals who love both
          chilling and going out for some funzies.
        </p>
      </div>
      <div className=" bg-white px-5 py-4">
        <h2 className="font-mono text-2xl mb-3">The house</h2>
        <HouseAttributes {...myHouse} />
      </div>
      <div className=" bg-dark-purple px-5 py-4">
        <h2 className="font-mono text-2xl text-white">The people</h2>
        <div className="flex items-center space-x-2 py-3 border-b-2 border-dotted border-white">
          <LuUsers color="white" size={24} />
          <div className="text-white">5 other cohousers</div>
        </div>
        <div className="flex items-center space-x-2 py-3 border-b-2 border-dotted border-white">
          <LuUsers color="white" size={24} />
          <div className="text-white">5 other cohousers</div>
        </div>{" "}
        <div className="flex items-center space-x-2 py-3 border-b-2 border-dotted border-white">
          <LuUsers color="white" size={24} />
          <div className="text-white">5 other cohousers</div>
        </div>
        <div className="flex items-center space-x-2 pt-3">
          <LuUsers color="white" size={24} />
          <div className="text-white">5 other cohousers</div>
        </div>
      </div>
      <nav className="z-50 sticky bottom-0 w-full bg-white border-t-2">
        <div className="flex flex-row items-center justify-between px-5 py-6">
          <div>
            <div className="font-mono mb-1">500/month</div>
            <div className="italic">Starting 03/09/2023</div>
          </div>
          <div className="h-fit bg-light-purple border-2 rounded-full py-2 px-4">
            reach out
          </div>
        </div>
      </nav>
    </div>
  );
}
