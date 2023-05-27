import ListingSummary from "@/components/ListingSummary"
import { db } from "@/lib/firebase";
import { ListingSummarySchema, ListingSummaryType } from "@/lib/schema";
import { collection, getDocs } from "firebase/firestore"; 

async function getListingSummaries(): Promise<ListingSummaryType[]> {
    const parsedDocs = (await getDocs(collection(db, "listings"))).docs
        .map(doc => ListingSummarySchema.safeParse(doc.data()))

    const listingSummaries: ListingSummaryType[] = []
    for (let parsedDoc of parsedDocs) {
        if (parsedDoc.success) {
            listingSummaries.push(parsedDoc.data)
        } else {
            console.error(`Failed to parse document: ${JSON.stringify(parsedDoc.error)}`);
        }
    }
    return listingSummaries
}

async function Listings() {
    // TODO: Decide on ISR vs dynamic data fetching
    const listings = await getListingSummaries() 

    return (
        <div className="p-5 flex flex-col gap-5">
            <ListingSummary
                id="ULID1"
                thumbnail="/house.jpg"
                title="Cute boi group zoekt nieuwe cohouser"
                moveInDate={new Date("2023-04-29")}
                domicile={true}
                housemates={5}
                ageRange={[20,25]}
                price={500}
            />
            <ListingSummary
                id="ULID2"
                thumbnail="/house2.png"
                title="Hype gang looking for gangster in Heverlee"
                moveInDate={new Date("2023-09-01")}
                domicile={false}
                housemates={2}
                ageRange={[30,35]}
                price={450}
            />
            <ListingSummary
                id="ULID3"
                thumbnail="/house.jpg"
                title="Rustige jongeren zoeken daddy"
                moveInDate={new Date("2023-12-01")}
                domicile={true}
                housemates={3}
                ageRange={[20,23]}
                price={543}
            />
            <p>Listings amount on firebase: {listings.length}</p>
        </div>
    )
}
  
export default Listings
  