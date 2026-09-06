import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function EventTable({
  events,
  onEdit,
  onDelete,
}) {
  if (!events.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-12 text-center text-slate-500">
        No events found.
      </div>
    );
  }

  function statusColor(status) {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700";

      case "Ongoing":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-slate-200 text-slate-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <div className="overflow-x-auto w-full">

        <table className="min-w-[1300px] w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left px-6 py-4 whitespace-nowrap">
                Banner
              </th>

              <th className="text-left px-6 py-4">
                Event
              </th>

              <th className="text-left px-6 py-4">
                Date
              </th>

              <th className="text-left px-6 py-4">
                Venue
              </th>

              <th className="text-left px-6 py-4">
                Category
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {events.map((event) => (

              <tr
                key={event.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4">

                  <img
                    src={event.banner}
                    alt={event.title}
                    className="w-28 h-16 object-cover rounded-lg border"
                  />

                </td>

                <td className="px-6 py-4">

                  <h3 className="font-semibold text-slate-800">

                    {event.title}

                  </h3>

                  <p className="text-sm text-slate-500 line-clamp-2">

                    {event.description}

                  </p>

                </td>

                <td className="px-6 py-4">

                  <div className="flex items-center gap-2">

                    <FaCalendarAlt
                      className="text-blue-600"
                    />

                    {event.eventDate}

                  </div>

                </td>

                <td className="px-6 py-4">

                  <div className="flex items-center gap-2">

                    <FaMapMarkerAlt
                      className="text-red-500"
                    />

                    {event.venue}

                  </div>

                </td>

                <td className="px-6 py-4">

                  {event.category}

                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">
                  <Link
 to={`/admin/dashboard/events/${event.id}/registrations`}
  className="p-3 rounded-lg bg-green-100 hover:bg-green-200"
>
  <FaUsers className="text-green-700" />
</Link>
                    <button
                      onClick={() => onEdit(event)}
                      className="p-3 rounded-lg bg-blue-100 hover:bg-blue-200"
                    >
                      <FaEdit className="text-blue-700" />
                    </button>

                    <button
                     onClick={() => onDelete(event.id)}
                      className="p-3 rounded-lg bg-red-100 hover:bg-red-200"
                    >
                      <FaTrash className="text-red-700" />
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