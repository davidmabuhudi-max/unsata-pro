import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const eventsRef = collection(db, "events");

// =========================
// Add Event
// =========================
export async function addEvent(event) {
  return await addDoc(eventsRef, {
    ...event,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// =========================
// Update Event
// =========================
export async function updateEvent(id, event) {
  return await updateDoc(doc(db, "events", id), {
    ...event,
    updatedAt: serverTimestamp(),
  });
}

// =========================
// Delete Event
// =========================
export async function deleteEvent(id) {
  return await deleteDoc(doc(db, "events", id));
}

// =========================
// Get Single Event
// =========================
export async function getEventById(id) {
  const snap = await getDoc(doc(db, "events", id));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}

// =========================
// Real-time Events
// =========================
export function subscribeToEvents(callback) {
  const q = query(
    eventsRef,
    orderBy("eventDate", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
}