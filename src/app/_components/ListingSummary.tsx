import { ListingSummary } from "@/lib/firebase/firestore/schema";
import Image from "next/image";
import Link from "next/link";

function ListingSummary(props: ListingSummary) {
  return (
    <Link href={`/listing/${props.listingId}`}>
      <div className=" bg-white border-2 rounded-xl p-4">
        <div className="relative w-full h-56 rounded-t-xl overflow-hidden">
          <Image
            style={{ objectFit: "cover" }}
            src={props.thumbnail}
            alt="house example"
            fill
          />
        </div>
        <div className="font-semibold mt-4 py-4 border-dotted border-t-2 truncate">
          {props.title}
        </div>
        <div className="grid grid-cols-2 items gap-x-5 gap-y-2 mb-3">
          <div>Inhuisdatum: {props.moveInDate.toLocaleDateString()}</div>
          <div>Domicilie: {props.domicile ? "Ja" : "Nee"}</div>
          <div>Aantal cohousers: {props.amountOfCohousers}</div>
          <div>Leeftijden: {`${props.ageRange[0]} - ${props.ageRange[1]}`}</div>
        </div>
        <div className="w-min py-2 px-4 rounded-full bg-light-purple font-mono">{`€${props.price}/maand`}</div>
      </div>
    </Link>
  );
}

export default ListingSummary;
