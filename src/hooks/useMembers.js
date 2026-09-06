import { useEffect, useState } from "react";
import { getMembers } from "../services/memberService";

export default function useMembers(initialStatus = "All") {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMembers = async (filter = status) => {
    try {
      setLoading(true);

      const data = await getMembers(filter);

      setMembers(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers(status);
  }, [status]);

  const refresh = () => loadMembers(status);

  return {
    members,
    loading,
    error,
    status,
    setStatus,
    refresh,
  };
}