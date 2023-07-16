import HouseAttributes from "@/components/HouseAttributes";
import { docToListing } from "@/lib/schema";
import { getDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { LuUsers } from "react-icons/lu";
import { db } from "@/lib/firebase";

async function Listing({ params }: { params: { id: string } }) {
  const document = (await getDoc(doc(db, "listings", params.id))).data();
  const parsedDoc = docToListing.safeParse(document);

  if (parsedDoc.success) {
    const listing = parsedDoc.data;
    console.log(listing);
    return (
      <div>
        <div className="relative h-72">
          <Image
            style={{ objectFit: "cover" }}
            src={listing.imageUrl}
            alt="house example"
            fill
          />
        </div>
        <div className="px-5 py-4 border-b-2 border-dotted">
          <h1 className="font-semibold text-2xl mb-2">{listing.title}</h1>
          <div className="italic">
            {listing.street}, {listing.city}
          </div>
        </div>
        <div className="px-5 py-4">
          <h2 className="font-mono text-2xl mb-2">Description</h2>
          <p className="mb-4">{listing.description}</p>
        </div>
        <div className=" bg-white px-5 py-4">
          <h2 className="font-mono text-2xl mb-3">The house</h2>
          <HouseAttributes {...listing.houseAttributes} />
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
          <div className="flex flex-row items-center justify-between px-5 py-4">
            <div>
              <div className="font-mono mb-1">€{listing.price}/month</div>
              <div className="italic">
                {/* TODO: Add translations */}
                Starting {listing.moveInDate.toLocaleDateString("nl-BE")}
              </div>
            </div>
            <div className="h-fit bg-light-purple border-2 rounded-full py-2 px-4">
              reach out
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    console.error(
      `Failed to parse document\n${JSON.stringify(
        doc
      )}.\nError: ${JSON.stringify(parsedDoc.error)}}\n`
    );
  }
}

export default Listing;
