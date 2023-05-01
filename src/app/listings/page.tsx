import ListingSummary from "@/components/ListingSummary"
import Image from "next/image"

function Listings() {
    return (
        <div className="p-5 flex flex-col gap-5">
            <ListingSummary
                thumbnail="/house.jpg"
                title="Cute boi group zoekt nieuwe cohouser"
                moveInDate={new Date("2023-04-29")}
                domicile={true}
                cohousees={5}
                ageRange={[20,25]}
                price={500}
            />
            <ListingSummary
                thumbnail="/house2.png"
                title="Hype gang looking for gangster in Heverlee"
                moveInDate={new Date("2023-09-01")}
                domicile={false}
                cohousees={2}
                ageRange={[30,35]}
                price={450}
            />
            <ListingSummary
                thumbnail="/house.jpg"
                title="Rustige jongeren zoeken daddy"
                moveInDate={new Date("2023-12-01")}
                domicile={true}
                cohousees={3}
                ageRange={[20,23]}
                price={543}
            />
        </div>
    )
}
  
export default Listings
  