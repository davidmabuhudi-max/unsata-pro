import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const defaultContact = {
  subtitle: "GET IN TOUCH",
  title: "Contact UNSATA MUHAS",
  description:
    "Have a question, suggestion, or need more information about UNSATA MUHAS Chapter? Send us a message and our team will get back to you.",

  emails: [],
  phones: [],
  addresses: [],
  officeHours: [],
  websites: [],

  formEnabled: true,
};

export default function usePublicContact() {
  const [contact, setContact] =
    useState(defaultContact);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadContact() {
      try {
        const reference = doc(
          db,
          "contactSettings",
          "main"
        );

        const snapshot =
          await getDoc(reference);

        if (snapshot.exists()) {
          setContact({
            ...defaultContact,
            ...snapshot.data(),
          });
        }
      } catch (error) {
        console.error(
          "Failed to load contact settings:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadContact();
  }, []);

  return {
    contact,
    loading,
  };
}