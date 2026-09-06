import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import { subscribeToEvents } from "../../services/eventService";
import { Link } from "react-router-dom";
export default function EventsPreview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      // Show only upcoming or ongoing events
      const filtered = data.filter(
        (event) =>
          event.status === "Upcoming" ||
          event.status === "Ongoing"
      );

      setEvents(filtered);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="uppercase tracking-[4px] text-[#1976D2] font-semibold">
            Upcoming Events
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#0B3D91]">
            Join Our Upcoming Activities
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg">
            Stay connected with conferences, outreach programmes,
            workshops and leadership events organized by UNSATA.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No upcoming events available.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mt-16">

            {events.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -8 }}
                className="rounded-3xl overflow-hidden shadow-lg border border-blue-100 bg-white"
              >
             <div className="w-full bg-slate-100 flex justify-center">
  <img
    src={event.banner}
    alt={event.title}
    className="max-w-full max-h-[700px] object-contain"
  />
</div>
                <div className="p-8">

                  <span className="inline-block bg-blue-100 text-[#1565C0] px-4 py-1 rounded-full text-sm font-semibold">
                    {event.status}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold text-[#0B3D91]">
                    {event.title}
                  </h3>

                  <div className="mt-6 space-y-3 text-gray-600">

                    <p className="flex items-center gap-3">
                      <FaCalendarAlt />
                      {event.eventDate}
                    </p>

                    <p className="flex items-center gap-3">
                      <FaClock />
                      {event.eventTime}
                    </p>

                    <p className="flex items-center gap-3">
                      <FaMapMarkerAlt />
                      {event.venue}
                    </p>

                  </div>

                  {event.registrationLink ? (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-8 text-center bg-[#1565C0] hover:bg-[#0D47A1] text-white py-3 rounded-xl transition"
                    >
                      Register Now
                    </a>
                  ) : (
                    <Link
  to={`/events/${event.id}`}
  className="block mt-8 text-center bg-[#1565C0] hover:bg-[#0D47A1] text-white py-3 rounded-xl transition"
>
  View Details
</Link>
                  )}

                </div>
              </motion.div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}
