import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "./newsService";

export default function useNews() {

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

      toast.error("Failed to load news.");

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadNews();

  }, []);

  async function addNews(article) {

    try {

      await createNews(article);

      toast.success("News published successfully.");

      await loadNews();

    } catch (err) {

      console.error(err);

      toast.error("Failed to publish news.");

      throw err;

    }

  }

  async function editNews(id, article) {

    try {

      await updateNews(id, article);

      toast.success("News updated successfully.");

      await loadNews();

    } catch (err) {

      console.error(err);

      toast.error("Failed to update news.");

      throw err;

    }

  }

  async function removeNews(id) {

    try {

      await deleteNews(id);

      toast.success("News deleted successfully.");

      await loadNews();

    } catch (err) {

      console.error(err);

      toast.error("Failed to delete news.");

      throw err;

    }

  }

  return {

    news,

    loading,

    error,

    refresh: loadNews,

    addNews,

    editNews,

    removeNews,

  };

}