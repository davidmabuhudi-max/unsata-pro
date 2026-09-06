import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../../firebase/firebase";

const HERO_CARD_ID = "main";

const defaultHeroCard = {
  title: "UNSATA MUHAS",
  highlightedTitle: "Chapter",

  description:
    "Empowering nursing students at Muhimbili University of Health and Allied Sciences through leadership, academic excellence, research, innovation, and community engagement.",

  features: [
    "Leadership Development",
    "Research & Innovation",
    "Community Engagement",
    "Academic Excellence",
  ],

  active: true,
};

export async function getHeroCard() {
  const heroCardRef = doc(
    db,
    "homepage",
    "heroCard"
  );

  const snapshot = await getDoc(heroCardRef);

  if (!snapshot.exists()) {
    await setDoc(
      heroCardRef,
      defaultHeroCard
    );

    return defaultHeroCard;
  }

  return {
    ...defaultHeroCard,
    ...snapshot.data(),
  };
}

export async function updateHeroCard(data) {
  const heroCardRef = doc(
    db,
    "homepage",
    "heroCard"
  );

  await setDoc(
    heroCardRef,
    {
      ...defaultHeroCard,
      ...data,
    },
    {
      merge: true,
    }
  );
}