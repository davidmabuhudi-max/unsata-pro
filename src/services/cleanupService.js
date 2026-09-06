import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function cleanupRejectedApplications() {
  const snapshot = await getDocs(collection(db, "applications"));

  const now = Date.now();

  for (const document of snapshot.docs) {
    const data = document.data();

    if (
      data.status !== "Rejected" ||
      !data.rejectedAt
    )
      continue;

    const rejectedDate = data.rejectedAt.toDate();

    const deleteAfter =
      (data.deleteAfterDays || 30) *
      24 *
      60 *
      60 *
      1000;

    if (
      now - rejectedDate.getTime() >= deleteAfter
    ) {
      await deleteDoc(doc(db, "applications", document.id));
    }
  }
}