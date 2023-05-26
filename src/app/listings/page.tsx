import ListingSummary from "@/components/ListingSummary"
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore"; 

async function Listings() {
    // TODO: Decide on ISR vs dynamic data fetching.
    const listings = (await getDocs(collection(db, "listings"))).docs.map(doc => doc.data());  
    console.log(listings);

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
  