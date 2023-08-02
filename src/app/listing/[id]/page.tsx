import HouseAttributes from "@/components/HouseAttributes";
import { docToListing } from "@/lib/schema";
import { getDoc, doc, getDocs, query, collection } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/lib/firebase";
import PeopleAttributes from "@/components/PeopleAttributes";

async function Listing({ params }: { params: { id: string } }) {
  const before = Date.now();
  const document = (await getDoc(doc(db, "listings", params.id))).data();
  const after = Date.now();
  console.log("firebase query: " + (after - before));
  const parsedDoc = docToListing.safeParse(document);

  if (parsedDoc.success) {
    const listing = parsedDoc.data;
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
        <div className=" bg-dark-purple px-5 pt-4">
          <h2 className="font-mono text-2xl text-white mb-3">The people</h2>
          <PeopleAttributes {...listing.peopleAttributes} />
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
