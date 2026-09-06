import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

const messagesCollection = collection(
  db,
  "messages"
);


/* ============================================================
   GET ALL MESSAGES
============================================================ */

export async function getMessages() {
  const q = query(
    messagesCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}


/* ============================================================
   MARK MESSAGE AS READ / UNREAD
============================================================ */

export async function updateMessageStatus(
  id,
  status
) {
  const reference = doc(
    db,
    "messages",
    id
  );

  await updateDoc(reference, {
    status,
  });
}


/* ============================================================
   DELETE MESSAGE
============================================================ */

export async function deleteMessage(id) {
  const reference = doc(
    db,
    "messages",
    id
  );

  await deleteDoc(reference);
}