import { ListingSummaryType } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";

function ListingSummary(props: ListingSummaryType) {
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
          <div>Move in: {props.moveInDate.toLocaleDateString()}</div>
          <div>Domicile: {props.domicile ? "yes" : "no"}</div>
          <div>Housemates: {props.housemates}</div>
          <div>Age range: {`${props.ageRange[0]} - ${props.ageRange[1]}`}</div>
        </div>
        <div className="w-min py-2 px-4 rounded-full bg-light-purple font-mono">{`€${props.price}/month`}</div>
      </div>
    </Link>
  );
}

export default ListingSummary;
