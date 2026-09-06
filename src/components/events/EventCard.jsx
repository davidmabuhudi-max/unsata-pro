import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function EventCard({ event }) {
  function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">

      <div className="relative">

        <img
  src={event.banner}
  alt={event.title}
  className="w-full h-64 object-cover object-top"
/>

        <span className="absolute top-5 left-5 bg-blue-600 text-white text-xs px-4 py-2 rounded-full font-semibold">
          {event.category}
        </span>

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          {event.title}
        </h2>

        <p className="text-slate-600 mt-4 line-clamp-3">
          {event.description}
        </p>

        <div className="mt-6 space-y-3 text-slate-600">

          <div className="flex items-center gap-3">

            <FaCalendarAlt className="text-blue-600" />

            {formatDate(event.eventDate)}

          </div>

          <div className="flex items-center gap-3">

            <FaClock className="text-green-600" />

            {event.eventTime}

          </div>

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-red-500" />

            {event.venue}

          </div>

        </div>

        <Link
          to={`/events/${event.id}`}
          className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          Read More

          <FaArrowRight />
        </Link>

      </div>

    </article>
  );
}