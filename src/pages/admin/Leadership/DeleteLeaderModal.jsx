import { useState } from "react";

import { FaTrash } from "react-icons/fa";

import {
  deleteLeader,
} from "../../../services/leadershipService";

export default function DeleteLeaderModal({
  open,
  onClose,
  leader,
}) {
  const [loading, setLoading] =
    useState(false);

  if (!open || !leader) return null;

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteLeader(leader.id);

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed to delete leader.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

        <div className="p-8 text-center">

          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

            <FaTrash className="text-red-600 text-3xl" />

          </div>

          <h2 className="text-2xl font-bold text-slate-800 mt-6">

            Delete Leader

          </h2>

          <p className="text-slate-500 mt-3 leading-relaxed">

            Are you sure you want to delete

            <span className="font-semibold text-slate-800">
              {" "}
              {leader.fullName}
            </span>

            ?

            <br />

            This action cannot be undone.

          </p>

        </div>

        <div className="flex gap-4 justify-end px-8 pb-8">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}