import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// Collection
const registrationsRef = collection(db, "eventRegistrations");

/* ======================================================
   CHECK IF EMAIL ALREADY REGISTERED FOR THIS EVENT
====================================================== */
export async function hasAlreadyRegistered(eventId, email) {
  const q = query(
    registrationsRef,
    where("eventId", "==", eventId),
    where("email", "==", email.trim().toLowerCase())
  );

  const snap = await getDocs(q);

  return !snap.empty;
}

/* ======================================================
   REGISTER FOR EVENT
====================================================== */
export async function registerForEvent(data) {
  return await addDoc(registrationsRef, {
    ...data,
    email: data.email.trim().toLowerCase(),
    createdAt: serverTimestamp(),
  });
}

/* ======================================================
   GET ALL REGISTRATIONS FOR ONE EVENT
====================================================== */
export async function getEventRegistrations(eventId) {
  const q = query(
    registrationsRef,
    where("eventId", "==", eventId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ======================================================
   LIVE REGISTRATIONS
====================================================== */
export function subscribeToRegistrations(eventId, callback) {
  const q = query(
    registrationsRef,
    where("eventId", "==", eventId)
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

/* ======================================================
   GET ONE REGISTRATION
====================================================== */
export async function getRegistration(id) {
  const snap = await getDoc(
    doc(db, "eventRegistrations", id)
  );

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}

/* ======================================================
   UPDATE REGISTRATION
====================================================== */
export async function updateRegistration(id, data) {
  return updateDoc(
    doc(db, "eventRegistrations", id),
    data
  );
}

/* ======================================================
   UPDATE STATUS ONLY
====================================================== */
export async function updateRegistrationStatus(id, status) {
  return updateDoc(
    doc(db, "eventRegistrations", id),
    {
      status,
    }
  );
}

/* ======================================================
   DELETE REGISTRATION
====================================================== */
export async function deleteRegistration(id) {
  return deleteDoc(
    doc(db, "eventRegistrations", id)
  );
}