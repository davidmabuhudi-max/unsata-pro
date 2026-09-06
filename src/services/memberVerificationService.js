import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/config";

/**
 * Verify a member by membership number.
 */
export async function verifyMember(membershipNumber) {
  try {
    const q = query(
      collection(db, "members"),
      where("membershipNumber", "==", membershipNumber)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return {
        success: false,
        message: "Member not found.",
      };
    }

    const doc = snapshot.docs[0];

    const member = {
      id: doc.id,
      ...doc.data(),
    };

    return {
      success: true,
      member,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
}