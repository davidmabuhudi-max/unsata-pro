import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export default function usePublicHero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHeroSlides() {
      try {
        setLoading(true);

        const snapshot = await getDocs(
          collection(db, "heroSlides")
        );

        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((slide) => slide.active !== false)
          .sort(
            (a, b) =>
              (Number(a.order) || 0) -
              (Number(b.order) || 0)
          );

        setSlides(data);
      } catch (error) {
        console.error(
          "Failed to load public hero slides:",
          error
        );

        setSlides([]);
      } finally {
        setLoading(false);
      }
    }

    loadHeroSlides();
  }, []);

  return {
    slides,
    loading,
  };
}