import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../../firebase/firebase";

const HERO_CARD_ID = "homepageHeroCard";

const heroCardRef = doc(
  db,
  "homepageSettings",
  HERO_CARD_ID
);

/*
|--------------------------------------------------------------------------
| Default Hero Card
|--------------------------------------------------------------------------
*/

export const defaultHeroCard = {
  title: "UNSATA MUHAS",
  highlight: "Chapter",

  description:
    "Empowering nursing students at Muhimbili University of Health and Allied Sciences through leadership, academic excellence, research, innovation, and community engagement.",

  features: [
    {
      text: "Leadership Development",
      icon: "users",
    },
    {
      text: "Research & Innovation",
      icon: "book",
    },
    {
      text: "Community Engagement",
      icon: "lightbulb",
    },
    {
      text: "Academic Excellence",
      icon: "nurse",
    },
  ],

  updatedAt: null,
};

/*
|--------------------------------------------------------------------------
| Get Hero Card
|--------------------------------------------------------------------------
*/

export async function getHeroCard() {
  const snapshot = await getDoc(heroCardRef);

  if (!snapshot.exists()) {
    return defaultHeroCard;
  }

  return {
    ...defaultHeroCard,
    ...snapshot.data(),
  };
}

/*
|--------------------------------------------------------------------------
| Save Hero Card
|--------------------------------------------------------------------------
*/

export async function saveHeroCard(data) {
  await setDoc(
    heroCardRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}