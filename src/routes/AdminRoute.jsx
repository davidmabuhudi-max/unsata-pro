import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({
  children,
}) {
  const {
    currentUser,
    userData,
    loading,
  } = useAuth();

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  if (!currentUser) {

    return <Navigate to="/admin" replace />;

  }

  if (userData?.role !== "admin") {

    return <Navigate to="/" replace />;

  }

  return children;
}