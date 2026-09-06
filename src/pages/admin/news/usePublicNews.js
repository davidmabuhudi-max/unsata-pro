import { useEffect, useState } from "react";
import { getNews } from "../pages/admin/news/newsService";

export default function usePublicNews() {

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  async function loadNews() {

    try {

      setLoading(true);

      const data = await getNews();

      setNews(data);

    } catch (err) {

      console.error(err);

      setError(err);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadNews();

  }, []);

  return {

    news,

    loading,

    error,

    refresh: loadNews,

  };

}