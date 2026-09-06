import { useEffect, useState } from "react";
import { getAboutData } from "../pages/admin/about/aboutService";

export default function usePublicAbout() {

  const [about, setAbout] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    let mounted = true;

    async function loadAbout() {

      try {

        setLoading(true);

        const data = await getAboutData();

        if (mounted) {

          setAbout(data);

        }

      } catch (err) {

        console.error(err);

        if (mounted) {

          setError(err);

        }

      } finally {

        if (mounted) {

          setLoading(false);

        }

      }

    }

    loadAbout();

    return () => {

      mounted = false;

    };

  }, []);

  return {

    about,

    loading,

    error,

    refresh: async () => {

      try {

        setLoading(true);

        const data = await getAboutData();

        setAbout(data);

      } catch (err) {

        console.error(err);

        setError(err);

      } finally {

        setLoading(false);

      }

    },

  };

}