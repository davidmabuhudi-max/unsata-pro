import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";

export default function useApplications(initialStatus = "All") {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async (filter = status) => {
    try {
      setLoading(true);

      const data = await getApplications(filter);

      setApplications(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications(status);
  }, [status]);

  const refresh = () => loadApplications(status);

  return {
    applications,
    loading,
    error,
    status,
    setStatus,
    refresh,
  };
}