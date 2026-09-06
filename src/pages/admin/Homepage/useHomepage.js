import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getHomepage,
  saveHomepage,
} from "./homepageService";

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

export default function useHomepage() {
  const [data, setData] = useState({
    sections: defaultSections,
    sectionOrder: defaultSectionOrder,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomepage();
  }, []);

  async function loadHomepage() {
    try {
      setLoading(true);

      const result = await getHomepage();

      setData({
        ...result,

        sections: {
          ...defaultSections,
          ...(result?.sections || {}),
        },

        sectionOrder:
          Array.isArray(result?.sectionOrder) &&
          result.sectionOrder.length > 0
            ? result.sectionOrder
            : defaultSectionOrder,
      });
    } catch (error) {
      console.error(
        "Failed to load homepage:",
        error
      );

      toast.error(
        "Failed to load homepage settings."
      );

      setData({
        sections: defaultSections,
        sectionOrder: defaultSectionOrder,
      });
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    try {
      await saveHomepage(data);

      // Reload from Firebase after saving.
      // This confirms that the saved order is actually stored.
      await loadHomepage();

      toast.success(
        "Homepage settings saved successfully."
      );

      return true;
    } catch (error) {
      console.error(
        "Failed to save homepage:",
        error
      );

      toast.error(
        "Failed to save homepage settings."
      );

      throw error;
    }
  }

  return {
    data,
    setData,
    loading,
    save,
    refresh: loadHomepage,
  };
}