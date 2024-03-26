import Listing from "@/components/ListingSummary";
import { db } from "@/lib/firebase";
import { ListingSummary, docToListingSummary } from "@/lib/schema";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

async function getListingSummaries(): Promise<ListingSummary[]> {
  // Note: documents without creationDate will not be included in the response.
  const querySnapshot = await getDocs(
    query(collection(db, "listingSummaries"), orderBy("creationDate", "desc"))
  );
  const docs = querySnapshot.docs.map((doc) => doc.data());
  console.log(docs);
  const listingSummaries: ListingSummary[] = [];
  for (let doc of docs) {
    const parsedDoc = docToListingSummary.safeParse(doc);
    if (parsedDoc.success) {
      listingSummaries.push(parsedDoc.data);
    } else {
      console.error(
        `Failed to parse document\n${JSON.stringify(
          doc
        )}.\nError: ${JSON.stringify(parsedDoc.error)}}\n`
      );
    }
  }
  return listingSummaries;
}

export default async function Listings() {
  // TODO: Decide on ISR vs dynamic data fetching
  const listingSummaries = await getListingSummaries();

  return (
    <div className="px-5 lg:px-20">
      <h1 className="font-mono text-2xl my-5">Cohousings in Leuven</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-8 xl:gap-10">
        {listingSummaries.map((listingSummary) => (
          <Listing key={listingSummary.listingId} {...listingSummary} />
        ))}
      </div>
    </div>
  );
}
