import Listing from "@/app/_components/ListingSummary";
import { getListingSummaries } from "@/lib/firebase/firestore/queries";

export default async function Listings() {
  // TODO: Decide on ISR vs dynamic data fetching
  const listingSummariesResult = await getListingSummaries();
  if (listingSummariesResult.isSuccess) {
    return (
      <div className="px-5 lg:px-20">
        <h1 className="font-mono text-2xl my-5">Cohousings in Leuven</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-8 xl:gap-10">
          {listingSummariesResult.value.map((listingSummary) => (
            <Listing key={listingSummary.listingId} {...listingSummary} />
          ))}
        </div>
      </div>
    );
  } else {
    console.error(listingSummariesResult.error);
  }
}
