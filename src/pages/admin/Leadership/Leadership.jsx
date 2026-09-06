import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";

import LeadershipTable from "./LeadershipTable";
import LeaderForm from "./LeaderForm";
import DeleteLeaderModal from "./DeleteLeaderModal";

import {
  subscribeToLeaders,
} from "../../../services/leadershipService";

export default function Leadership() {
  const [leaders, setLeaders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] =
    useState(false);

  const [selectedLeader, setSelectedLeader] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [leaderToDelete, setLeaderToDelete] =
    useState(null);

  useEffect(() => {
    const unsubscribe =
      subscribeToLeaders((data) => {
        setLeaders(data);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  function handleAddLeader() {
    setSelectedLeader(null);
    setFormOpen(true);
  }

  function handleEditLeader(leader) {
    setSelectedLeader(leader);
    setFormOpen(true);
  }

  function handleDeleteLeader(leader) {
    setLeaderToDelete(leader);
    setDeleteOpen(true);
  }

  function closeForm() {
    setSelectedLeader(null);
    setFormOpen(false);
  }

  function closeDeleteModal() {
    setLeaderToDelete(null);
    setDeleteOpen(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">

        <div className="text-xl font-semibold text-slate-600">
          Loading Leadership...
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Leadership Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage the leadership team of
            UNSATA MUHAS Chapter.
          </p>

        </div>

        <button
          onClick={handleAddLeader}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <FaPlus />

          Add Leader
        </button>

      </div>

    {/* Statistics */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="bg-white rounded-2xl shadow p-6 border">

    <p className="text-slate-500 text-sm">
      Total Leaders
    </p>

    <h2 className="text-4xl font-bold text-slate-800 mt-2">
      {leaders.length}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow p-6 border">

    <p className="text-slate-500 text-sm">
      Active Leaders
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {
        leaders.filter(
          (l) => l.status === "Active"
        ).length
      }
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow p-6 border">

    <p className="text-slate-500 text-sm">
      Inactive Leaders
    </p>

    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {
        leaders.filter(
          (l) => l.status === "Inactive"
        ).length
      }
    </h2>

  </div>

</div>

<LeadershipTable
  leaders={leaders}
  onEdit={handleEditLeader}
  onDelete={handleDeleteLeader}
/>

      {/* Add / Edit */}

      <LeaderForm
        open={formOpen}
        onClose={closeForm}
        leader={selectedLeader}
      />

      {/* Delete */}

      <DeleteLeaderModal
        open={deleteOpen}
        onClose={closeDeleteModal}
        leader={leaderToDelete}
      />

    </div>
  );
}