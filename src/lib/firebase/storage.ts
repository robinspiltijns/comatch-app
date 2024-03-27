import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Result } from "../utils";

export async function uploadThumbnail(
  listingId: string,
  image: File
): Promise<Result<string>> {
  const mimeTypeToExtension: Record<string, string> = {
    "image/jpeg": "jpg", // This covers both .jpg and .jpeg extensions
    "image/png": "png",
  };
  const extension = mimeTypeToExtension[image.type] || null;
  if (extension === null)
    return { isSuccess: false, error: "Invalid file type" };

  try {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `listings/${listingId}/thumbnail.${extension}`
    );
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return { isSuccess: true, value: downloadURL };
  } catch (error) {
    return {
      isSuccess: false,
      error: "Something went wrong in uploading thumbnail",
    };
  }
}
