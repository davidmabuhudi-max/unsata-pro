import { useEffect, useState } from "react";
import { getAboutData } from "./aboutService";

export default function useAbout() {

  const [aboutData, setAboutData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    async function loadData() {

      try {

        setLoading(true);

        const data = await getAboutData();

        setAboutData(data);

      } catch (err) {

        console.error(err);

        setError(err);

      } finally {

        setLoading(false);

      }

    }

    loadData();

  }, []);

  return {

    aboutData,

    loading,

    error,

    refresh: async () => {

      try {

        setLoading(true);

        const data = await getAboutData();

        setAboutData(data);

      } catch (err) {

        console.error(err);

        setError(err);

      } finally {

        setLoading(false);

      }

    },

  };

}