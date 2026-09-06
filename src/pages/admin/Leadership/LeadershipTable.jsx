import { useMemo, useState } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

export default function LeadershipTable({
  leaders,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredLeaders = useMemo(() => {
    if (!search.trim()) return leaders;

    const keyword = search.toLowerCase();

    return leaders.filter((leader) => {
      return (
        leader.fullName
          ?.toLowerCase()
          .includes(keyword) ||

        leader.position
          ?.toLowerCase()
          .includes(keyword) ||

        leader.registrationNumber
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [leaders, search]);

  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b">

        <h2 className="text-xl font-bold text-slate-800">
          Leadership Team
        </h2>

        <div className="relative">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search leader..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-11 pr-4 py-3 border rounded-xl w-72 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Photo
              </th>

              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Position
              </th>

              <th className="px-6 py-4 text-left">
                Year
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLeaders.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-12 text-slate-500"
                >
                  No leaders found.
                </td>

              </tr>

            )}

            {filteredLeaders.map((leader) => (

              <tr
                key={leader.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4">
{leader.photo ? (
  <img
    src={leader.photo}
    alt={leader.fullName}
    className="w-14 h-14 rounded-full object-cover border border-slate-300"
  />
) : (
  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
    {leader.fullName?.charAt(0)?.toUpperCase()}
  </div>
)}

                </td>

                <td className="px-6 py-4">

                  <div>

                    <p className="font-semibold text-slate-800">
                      {leader.fullName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {leader.registrationNumber}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-4">
                  {leader.position}
                </td>

                <td className="px-6 py-4">
                  {leader.academicYear}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      leader.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {leader.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        onEdit(leader)
                      }
                      className="w-10 h-10 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center justify-center"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(leader)
                      }
                      className="w-10 h-10 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}