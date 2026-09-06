import { useEffect, useState } from "react";

import {
  getHomepage,
} from "../pages/admin/homepage/homepageService";

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

export default function usePublicHomepage() {
  const [sections, setSections] = useState(
    defaultSections
  );

  const [sectionOrder, setSectionOrder] =
    useState(defaultSectionOrder);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomepage();
  }, []);

  async function loadHomepage() {
    try {
      setLoading(true);

      const data = await getHomepage();

      const savedOrder =
        Array.isArray(data?.sectionOrder) &&
        data.sectionOrder.length > 0
          ? data.sectionOrder
          : defaultSectionOrder;

      /*
       * Make sure every valid homepage section exists
       * exactly once in the final order.
       */

      const validKeys = new Set(
        defaultSectionOrder
      );

      const cleanedOrder = savedOrder.filter(
        (key, index, array) =>
          validKeys.has(key) &&
          array.indexOf(key) === index
      );

      /*
       * Add any new sections that may not yet exist
       * in the saved Firestore order.
       */

      defaultSectionOrder.forEach((key) => {
        if (!cleanedOrder.includes(key)) {
          cleanedOrder.push(key);
        }
      });

      setSections({
        ...defaultSections,
        ...(data?.sections || {}),
      });

      setSectionOrder(cleanedOrder);
    } catch (error) {
      console.error(
        "Failed to load homepage settings:",
        error
      );

      setSections(defaultSections);
      setSectionOrder(defaultSectionOrder);
    } finally {
      setLoading(false);
    }
  }

  return {
    sections,
    sectionOrder,
    loading,
  };
}