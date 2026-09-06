import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";

const homepageRef = doc(db, "website", "homepage");

const defaultSections = {
  hero: true,
  statistics: true,
  about: true,
  leadership: true,
  events: true,
  news: true,
  gallery: true,
  partners: true,
  membership: true,
};

const defaultSectionOrder = [
  "hero",
  "statistics",
  "about",
  "leadership",
  "events",
  "news",
  "gallery",
  "partners",
  "membership",
];

const defaultHomepage = {
  sections: defaultSections,
  sectionOrder: defaultSectionOrder,
};

export async function getHomepage() {
  try {
    const snapshot = await getDoc(homepageRef);

    if (!snapshot.exists()) {
      return defaultHomepage;
    }

    const data = snapshot.data();

    return {
      ...data,

      sections: {
        ...defaultSections,
        ...(data.sections || {}),
      },

      sectionOrder:
        Array.isArray(data.sectionOrder) &&
        data.sectionOrder.length > 0
          ? data.sectionOrder
          : defaultSectionOrder,
    };
  } catch (error) {
    console.error("Error loading homepage:", error);

    return defaultHomepage;
  }
}

export async function saveHomepage(data) {
  const cleanOrder =
    Array.isArray(data.sectionOrder) &&
    data.sectionOrder.length > 0
      ? data.sectionOrder
      : defaultSectionOrder;

  await setDoc(
    homepageRef,
    {
      sections: {
        ...defaultSections,
        ...(data.sections || {}),
      },

      sectionOrder: cleanOrder,

      updatedAt: new Date(),
    },
    {
      merge: true,
    }
  );
}