import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getApplications() {
  const snapshot = await getDocs(
    collection(db, "applications")
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function approveApplication(id) {
  await updateDoc(
    doc(db, "applications", id),
    {
      applicationStatus: "Approved",
    }
  );
}

export async function rejectApplication(id) {
  await updateDoc(
    doc(db, "applications", id),
    {
      applicationStatus: "Rejected",
    }
  );
}