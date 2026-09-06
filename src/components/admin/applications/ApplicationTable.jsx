import { useMemo, useState } from "react";
import StatusBadge from "../common/StatusBadge";

export default function ApplicationsTable({
  applications,
  onView,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        application.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        application.registrationNumber
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        application.university
          ?.toLowerCase()
          .includes(search.toLowerCase());

     const matchesStatus =
  status === "all" ||
  application.status?.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, status]);

  return (
    <div className="space-y-6">

      {/* Search & Filter */}

      <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search name, email, registration..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B3D91]"
        />

        <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B3D91]"
>
  <option value="all">All Applications</option>
  <option value="Pending">Pending</option>
  <option value="Approved">Approved</option>
  <option value="Rejected">Rejected</option>
</select>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Applicant
              </th>

              <th className="p-4 text-left">
                Registration
              </th>

              <th className="p-4 text-left">
                University
              </th>

              <th className="p-4 text-left">
                Year
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

            {filteredApplications.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500"
                >
                  No applications found.
                </td>

              </tr>

            ) : (

              filteredApplications.map((application) => (

                <tr
                  key={application.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      {application.passportPhoto ? (

                        <img
                          src={application.passportPhoto}
                          alt="Passport"
                          className="w-12 h-12 rounded-full object-cover border"
                        />

                      ) : (

                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          ?
                        </div>

                      )}

                      <div>

                        <div className="font-semibold">
                          {application.fullName}
                        </div>

                        <div className="text-sm text-gray-500">
                          {application.email}
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {application.registrationNumber}
                  </td>

                  <td className="p-4">
                    {application.university}
                  </td>

                  <td className="p-4">
                    {application.year}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => onView(application)}
                      className="px-4 py-2 rounded-lg bg-[#0B3D91] text-white hover:bg-blue-800 transition"
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