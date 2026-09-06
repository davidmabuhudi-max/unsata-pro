import { storage } from "../firebase/firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const uploadImage = async (file, folder) => {
  const filename = `${Date.now()}-${file.name}`;

  const imageRef = ref(storage, `${folder}/${filename}`);

  await uploadBytes(imageRef, file);

  return await getDownloadURL(imageRef);
};