import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import {
  ListingSummary,
  ListingSummaryDoc,
  ListingType,
  docToListing,
  docToListingSummary,
} from "./schema";
import { Result } from "@/lib/utils";

const db = getFirestore(app);

export async function uploadListingSummary(listingSummary: ListingSummaryDoc) {
  await setDoc(
    doc(db, "listingSummaries", listingSummary.listingId),
    listingSummary
  );
}

export async function getListing(id: string): Promise<Result<ListingType>> {
  try {
    const document = (await getDoc(doc(db, "listings", id))).data();
    const parsedDoc = docToListing.parse(document);
    return {
      isSuccess: true,
      value: parsedDoc,
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "Something went wrong in retrieving the listing: " + error,
    };
  }
}

export async function getListingSummaries(): Promise<Result<ListingSummary[]>> {
  // Note: documents without creationDate will not be included in the response.
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "listingSummaries"), orderBy("creationDate", "desc"))
    );
    const docs = querySnapshot.docs.map((doc) => doc.data());
    const listingSummaries = docToListingSummary.array().parse(docs);
    return {
      isSuccess: true,
      value: listingSummaries,
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "Something went wrong in retrieving listing summaries: " + error,
    };
  }
}
