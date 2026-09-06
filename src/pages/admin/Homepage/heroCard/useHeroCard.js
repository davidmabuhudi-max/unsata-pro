import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getHeroCard,
  saveHeroCard,
  defaultHeroCard,
} from "./heroCardService";


function useHeroCard() {

  const [card, setCard] = useState(defaultHeroCard);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);


  // =====================================================
  // LOAD HERO CARD
  // =====================================================

  async function loadCard() {

    try {

      setLoading(true);

      const data = await getHeroCard();

      setCard({
        ...defaultHeroCard,
        ...data,
      });

    } catch (error) {

      console.error(
        "Failed to load hero card:",
        error
      );

      toast.error(
        "Failed to load hero card."
      );

      setCard(defaultHeroCard);

    } finally {

      setLoading(false);

    }

  }


  // =====================================================
  // LOAD ON START
  // =====================================================

  useEffect(() => {

    loadCard();

  }, []);


  // =====================================================
  // SAVE HERO CARD
  // =====================================================

  async function updateCard(data) {

    try {

      setSaving(true);

      await saveHeroCard(data);

      setCard({
        ...defaultHeroCard,
        ...data,
      });

      toast.success(
        "Hero card updated successfully."
      );

    } catch (error) {

      console.error(
        "Failed to save hero card:",
        error
      );

      toast.error(
        "Failed to save hero card."
      );

      throw error;

    } finally {

      setSaving(false);

    }

  }


  // =====================================================
  // RETURN
  // =====================================================

  return {

    card,

    setCard,

    loading,

    saving,

    updateCard,

    refresh: loadCard,

  };

}


// =====================================================
// EXPORT BOTH WAYS
// =====================================================

export { useHeroCard };

export default useHeroCard;