import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function submitMembershipApplication(data) {
  const docRef = await addDoc(
    collection(db, "applications"),
    {
      ...data,
      applicationStatus: "Pending",
      paymentStatus: "Pending",
      submittedAt: serverTimestamp(),
    }
  );

  return docRef.id;
}