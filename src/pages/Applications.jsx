import { useState } from "react";

import useApplications from "../hooks/useApplications";

import ApplicationTable from "../components/admin/applications/ApplicationTable";
import ApplicationDetailsDrawer from "../components/admin/applications/ApplicationDetailsDrawer";

import LoadingSpinner from "../components/admin/common/LoadingSpinner";
import EmptyState from "../components/admin/common/EmptyState";

export default function Applications() {
  const {
    applications,
    loading,
    error,
    refresh,
    status,
    setStatus,
  } = useApplications();

  const [selected, setSelected] = useState(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Applications
          </h1>

          <p className="text-gray-500">
            Review membership applications.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Total Applications:
          <span className="ml-2 font-bold text-blue-700">
            {applications.length}
          </span>
        </div>

      </div>

      {/* Status Filter */}

      <div className="flex gap-3">

        <button
          onClick={() => setStatus("All")}
          className={`px-5 py-2 rounded-lg transition ${
            status === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatus("Pending")}
          className={`px-5 py-2 rounded-lg transition ${
            status === "Pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setStatus("Rejected")}
          className={`px-5 py-2 rounded-lg transition ${
            status === "Rejected"
              ? "bg-red-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Rejected
        </button>

      </div>

      {applications.length === 0 ? (

        <EmptyState
          title="No applications found."
        />

      ) : (

        <ApplicationTable
          applications={applications}
          onView={setSelected}
        />

      )}

      {selected && (

        <ApplicationDetailsDrawer
          application={selected}
          refresh={refresh}
          onClose={() => setSelected(null)}
        />

      )}

    </div>
  );
}