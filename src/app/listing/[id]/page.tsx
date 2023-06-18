import Image from "next/image";
import { LuFlower2 } from "react-icons/lu";

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
        <h2 className="font-mono text-2xl mb-2">The house</h2>
        <div>
          <LuFlower2 size={24} />
          <div>Garden</div>
        </div>
      </div>
      <div className=" bg-dark-purple px-5 py-4">
        <h2 className="font-mono text-2xl mb-2 text-white">About you</h2>
        <p className="text-white">
          We love doing some tv watching, game playing or doing a little dance.
          Lisa is an astronaut, Ben is a consultant and Mary is a Navy Seal. We
          do love us some good food as well.
        </p>
      </div>
      <nav className="z-50 sticky bottom-0 w-full bg-white border-t-2">
        <div className="flex flex-row items-center justify-between px-5 py-4">
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
