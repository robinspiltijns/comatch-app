import ListingSummary from "@/components/ListingSummary"
import { db } from "@/lib/firebase";
import { ListingSummaryType, docToListingSummary } from "@/lib/schema";
import { collection, getDocs, orderBy, query } from "firebase/firestore"; 

async function getListingSummaries(): Promise<ListingSummaryType[]> {
    // Note: documents without creationDate will not be included in the response.
    const sortedListingCollection = await getDocs(query(collection(db, "listings"), orderBy("creationDate", "desc")))
    const docs = (sortedListingCollection).docs.map(doc => doc.data())
    const listingSummaries: ListingSummaryType[] = []    
    for (let doc of docs) {
        const parsedDoc = docToListingSummary.safeParse(doc)
        if (parsedDoc.success) {
            listingSummaries.push(parsedDoc.data)
        } else {
            console.error(
                `Failed to parse document\n${JSON.stringify(doc)}.\nError: ${JSON.stringify(parsedDoc.error)}}\n`
            );
        }
    }
    return listingSummaries
}

async function Listings() {
    // TODO: Decide on ISR vs dynamic data fetching
    const listingSummaries = await getListingSummaries() 
    
    return (
        <div className="p-5 flex flex-col gap-5">
            {listingSummaries.map(listingSummary => (
                <ListingSummary
                key={listingSummary.id}
                {...listingSummary}
            />
            ))}
        </div>
    )
}
  
export default Listings
  