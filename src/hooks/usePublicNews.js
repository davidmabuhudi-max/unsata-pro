import { useEffect, useState } from "react";
import { getNews } from "../pages/admin/news/newsService";

export default function usePublicNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    news,
    loading,
    refresh: loadNews,
  };
}