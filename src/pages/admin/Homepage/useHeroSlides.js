import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "./heroService";

export default function useHeroSlides() {
  const [slides, setSlides] = useState([]);

  const [loading, setLoading] = useState(true);

  async function loadSlides() {
    try {
      setLoading(true);

      const data = await getHeroSlides();

      setSlides(data);
    } catch (error) {
      console.error(
        "Failed to load hero slides:",
        error
      );

      toast.error(
        "Failed to load hero slides."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSlides();
  }, []);

  async function addSlide(data) {
    try {
      const highestOrder =
        slides.length > 0
          ? Math.max(
              ...slides.map(
                (slide) =>
                  Number(slide.order) || 0
              )
            )
          : 0;

      await createHeroSlide({
        ...data,
        order: highestOrder + 1,
      });

      await loadSlides();

      toast.success(
        "Hero slide added successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to add hero slide."
      );

      throw error;
    }
  }

  async function editSlide(id, data) {
    try {
      await updateHeroSlide(id, data);

      await loadSlides();

      toast.success(
        "Hero slide updated successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update hero slide."
      );

      throw error;
    }
  }

  async function removeSlide(id) {
    try {
      await deleteHeroSlide(id);

      await loadSlides();

      toast.success(
        "Hero slide deleted successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete hero slide."
      );

      throw error;
    }
  }

  return {
    slides,
    loading,
    addSlide,
    editSlide,
    removeSlide,
    refresh: loadSlides,
  };
}