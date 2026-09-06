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

const newsCollection = collection(db, "news");

/*
|--------------------------------------------------------------------------
| Get All News
|--------------------------------------------------------------------------
*/

export async function getNews() {

  const q = query(
    newsCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

}

/*
|--------------------------------------------------------------------------
| Create News
|--------------------------------------------------------------------------
*/

export async function createNews(data) {

  return await addDoc(newsCollection, {

    ...data,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),

  });

}

/*
|--------------------------------------------------------------------------
| Update News
|--------------------------------------------------------------------------
*/

export async function updateNews(id, data) {

  const ref = doc(db, "news", id);

  return await updateDoc(ref, {

    ...data,

    updatedAt: serverTimestamp(),

  });

}

/*
|--------------------------------------------------------------------------
| Delete News
|--------------------------------------------------------------------------
*/

export async function deleteNews(id) {

  const ref = doc(db, "news", id);

  return await deleteDoc(ref);

}