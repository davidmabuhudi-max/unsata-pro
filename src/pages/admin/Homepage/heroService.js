import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

const heroCollection = collection(db, "heroSlides");

export async function getHeroSlides() {
  const q = query(
    heroCollection,
    orderBy("order", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function createHeroSlide(data) {
  return await addDoc(heroCollection, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateHeroSlide(id, data) {
  const ref = doc(db, "heroSlides", id);

  return await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteHeroSlide(id) {
  const ref = doc(db, "heroSlides", id);

  return await deleteDoc(ref);
}