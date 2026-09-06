import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const membersRef = collection(db, "members");

// =========================
// GET ALL MEMBERS
// =========================
export async function getMembers(status = "All") {
  const snapshot = await getDocs(
    query(
      membersRef,
      orderBy("joinedAt", "desc")
    )
  );

  let members = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (status !== "All") {
    members = members.filter(
      (member) =>
        member.status?.toLowerCase() ===
        status.toLowerCase()
    );
  }

  return members;
}

// =========================
// GET SINGLE MEMBER
// =========================
export async function getMember(id) {
  const snapshot = await getDoc(
    doc(db, "members", id)
  );

  if (!snapshot.exists()) {
    throw new Error("Member not found");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// =========================
// UPDATE MEMBER
// =========================
export async function updateMember(id, data) {
  await updateDoc(
    doc(db, "members", id),
    {
      ...data,
      updatedAt: new Date(),
    }
  );
}

// =========================
// SUSPEND MEMBER
// =========================
export async function suspendMember(id) {
  await updateDoc(
    doc(db, "members", id),
    {
      status: "Suspended",
      updatedAt: new Date(),
    }
  );
}

// =========================
// ACTIVATE MEMBER
// =========================
export async function activateMember(id) {
  await updateDoc(
    doc(db, "members", id),
    {
      status: "Active",
      updatedAt: new Date(),
    }
  );
}

// =========================
// DELETE MEMBER
// =========================
export async function deleteMember(id) {
  await deleteDoc(
    doc(db, "members", id)
  );
}

// =========================
// CHECK EXISTING MEMBER
// =========================
export async function checkExistingMember(
  registrationNumber,
  email,
  phone
) {
  const snapshot = await getDocs(membersRef);

  const existing = snapshot.docs.find((doc) => {
    const data = doc.data();

    return (
      data.registrationNumber === registrationNumber ||
      data.email === email ||
      data.phone === phone
    );
  });

  if (!existing) return null;

  return {
    id: existing.id,
    ...existing.data(),
  };
}

// =========================
// ADD MEMBER
// =========================
export async function addMember(memberData) {
  const docRef = await addDoc(
    membersRef,
    memberData
  );

  return docRef.id;
}