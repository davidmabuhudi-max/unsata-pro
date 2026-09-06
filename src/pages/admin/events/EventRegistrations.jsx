import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getEventRegistrations,
  updateRegistration,
  deleteRegistration,
} from "../../../services/registrationService";

export default function EventRegistrations() {
  const { id } = useParams();

  const [registrations, setRegistrations] = useState([]);

  async function load() {
    const data = await getEventRegistrations(id);
    setRegistrations(data);
  }

  useEffect(() => {
    load();
  }, [id]);

  async function approve(reg) {
    await updateRegistration(reg.id, {
      status: "Approved",
    });

    load();
  }

  async function reject(reg) {
    await updateRegistration(reg.id, {
      status: "Rejected",
    });

    load();
  }

  async function waitlist(reg) {
    await updateRegistration(reg.id, {
      status: "Waitlist",
    });

    load();
  }

  async function remove(reg) {
    if (!window.confirm("Delete registration?"))
      return;

    await deleteRegistration(reg.id);

    load();
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Event Registrations
      </h1>

      <div className="bg-white rounded-xl shadow overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="p-4">Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>University</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {registrations.map((r) => (

              <tr
                key={r.id}
                className="border-t"
              >

                <td className="p-4">
                  {r.fullName}
                </td>

                <td>{r.email}</td>

                <td>{r.phone}</td>

                <td>{r.university}</td>

                <td>

                  <span className="font-semibold">

                    {r.status}

                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button
                      onClick={() => approve(r)}
                      className="px-3 py-2 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => reject(r)}
                      className="px-3 py-2 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => waitlist(r)}
                      className="px-3 py-2 bg-yellow-500 rounded"
                    >
                      Waitlist
                    </button>

                    <button
                      onClick={() => remove(r)}
                      className="px-3 py-2 bg-gray-700 text-white rounded"
                    >
                      Delete
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