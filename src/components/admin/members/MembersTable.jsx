import { useMemo, useState } from "react";
import StatusBadge from "../common/StatusBadge";

export default function MembersTable({
  members,
  onView,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        member.fullName?.toLowerCase().includes(keyword) ||
        member.memberId?.toLowerCase().includes(keyword) ||
        member.registrationNumber?.toLowerCase().includes(keyword) ||
        member.email?.toLowerCase().includes(keyword) ||
        member.phone?.toLowerCase().includes(keyword) ||
        member.university?.toLowerCase().includes(keyword) ||
        member.programme?.toLowerCase().includes(keyword);

      const matchesStatus =
        status === "All" ||
        member.status?.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [members, search, status]);

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="All">All Members</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
        </select>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Member
              </th>

              <th className="p-4 text-left">
                Member ID
              </th>

              <th className="p-4 text-left">
                University
              </th>

              <th className="p-4 text-left">
                Programme
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredMembers.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-500"
                >
                  No members found.
                </td>

              </tr>

            ) : (

              filteredMembers.map((member) => (

                <tr
                  key={member.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      {member.passportPhoto ? (

                        <img
                          src={member.passportPhoto}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover border"
                        />

                      ) : (

                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          ?
                        </div>

                      )}

                      <div>

                        <div className="font-semibold">
                          {member.fullName}
                        </div>

                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {member.memberId}
                  </td>

                  <td className="p-4">
                    {member.university}
                  </td>

                  <td className="p-4">
                    {member.programme}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={member.status} />
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => onView(member)}
                      className="bg-[#0B3D91] text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}