import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ==========================================
   COLLECTION
========================================== */

const leadershipCollection = collection(db, "leadership");

/* ==========================================
   REAL-TIME LISTENER
========================================== */

export function subscribeToLeaders(callback) {
  const q = query(
    leadershipCollection,
    orderBy("displayOrder", "asc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const leaders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(leaders);
    },
    console.error
  );
}

/* ==========================================
   GET ALL
========================================== */

export async function getLeaders() {
  const q = query(
    leadershipCollection,
    orderBy("displayOrder", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ==========================================
   ADD
========================================== */

export async function addLeader(data) {
  return await addDoc(
    leadershipCollection,
    {
      fullName: data.fullName,
      position: data.position,
      programme: data.programme,
      academicYear: data.academicYear,
      registrationNumber:
        data.registrationNumber,
      email: data.email,
      phone: data.phone,

      bio: data.bio,

      photo: data.photo || "",

      facebook: data.facebook || "",
      instagram: data.instagram || "",
      linkedin: data.linkedin || "",
      twitter: data.twitter || "",

      status: data.status || "Active",

      displayOrder:
        Number(data.displayOrder) || 1,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );
}

/* ==========================================
   UPDATE
========================================== */

export async function updateLeader(
  id,
  data
) {
  const ref = doc(db, "leadership", id);

  return await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/* ==========================================
   DELETE
========================================== */

export async function deleteLeader(id) {
  return await deleteDoc(
    doc(db, "leadership", id)
  );
}

/* ==========================================
   STATUS
========================================== */

export async function toggleLeaderStatus(
  
  id,
  currentStatus
)

{
  const ref = doc(db, "leadership", id);

  const nextStatus =
    currentStatus === "Active"
      ? "Inactive"
      : "Active";

  return await updateDoc(ref, {
    status: nextStatus,
    updatedAt: serverTimestamp(),
  });
}
/* ==========================================
   GET SINGLE LEADER
========================================== */

export async function getLeaderById(id) {
  const ref = doc(db, "leadership", id);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}